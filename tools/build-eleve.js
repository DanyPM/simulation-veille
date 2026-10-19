// Builds data/eleve/<id>.js, the redacted feeds loaded by eleve.html, and
// data/corrige/<id>.js, the matching answer sheets encrypted with the admin
// password (PBKDF2-SHA256 then AES-256-GCM, decrypted in the browser by app.js).
// Student files only hold what the student page can display: no answer key, no
// suspect flags, no account classification, no generation templates.
// Usage: VEILLE_ILI_MDP=<mot de passe> node tools/build-eleve.js          (write the files)
//        VEILLE_ILI_MDP=<mot de passe> node tools/build-eleve.js --check  (fail if the files are stale)
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const outputDir = path.join(root, "data", "eleve");
const answerDir = path.join(root, "data", "corrige");
const refreshPoolSize = 160;
const pbkdf2Iterations = 150000;

function createContext() {
  const element = () => ({ dataset: {}, append() {}, addEventListener() {}, querySelector: () => null });
  const document = {
    body: { dataset: { mode: "build" } },
    head: element(),
    currentScript: { src: "http://localhost/app.js" },
    createElement: element,
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const window = { location: { search: "", href: "http://localhost/" } };
  const context = vm.createContext({ window, document, console, URL, URLSearchParams, structuredClone, localStorage: { getItem: () => null, setItem() {} } });
  window.document = document;
  for (const file of ["data/assets.js", "data/scenarios/index.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  for (const { id } of context.window.veilleIliScenarioIndex) {
    vm.runInContext(fs.readFileSync(path.join(root, "data", "scenarios", `${id}.js`), "utf8"), context, { filename: `${id}.js` });
  }
  for (const file of ["engine.js", "app.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  context.state = vm.runInContext("state", context);
  return context;
}

function publicMedia(context, media, post) {
  if (!media) return null;
  const asset = media.asset || context.defaultEvidenceAsset(media, post);
  return asset ? { asset } : null;
}

function publicActor(context, actor) {
  const profile = context.buildProfile(actor);
  const result = {
    name: actor.name,
    handle: actor.handle,
    verified: Boolean(actor.verified),
    avatar: actor.avatar || "",
    bio: profile.bio,
    created: profile.created,
    followers: profile.followers,
    following: profile.following,
    dailyPosts: profile.dailyPosts
  };
  if (actor.language) result.language = actor.language;
  if (actor.languageLabel) result.languageLabel = actor.languageLabel;
  return result;
}

function answer(post) {
  const result = { suspect: Boolean(post.suspect) };
  if (post.reason) result.reason = post.reason;
  return result;
}

function publicPost(context, post, id) {
  const result = {
    id,
    actor: post.actor.handle,
    content: post.content,
    _targetLikes: Number(post._targetLikes ?? post.likes) || 0,
    _targetReposts: Number(post._targetReposts ?? post.reposts) || 0,
    _targetReplies: Number(post._targetReplies ?? post.replies) || 0,
    engagementMultiplier: context.engagementMultiplier(post, post.actor)
  };
  if (post.language) result.language = post.language;
  if (post.translation) result.translation = post.translation;
  const media = publicMedia(context, post.media, post);
  if (media) result.media = media;
  return result;
}

function buildScenario(context, id) {
  const scenario = context.window.veilleIliScenarios[id];
  context.state.scenario = structuredClone(scenario);
  context.state.posts = [];
  const scenarioCopy = context.state.scenario;
  const answers = {};
  const actors = scenarioCopy.actors.map((actor) => publicActor(context, actor));

  const commentTexts = [];
  const textIndex = (text) => {
    if (!commentTexts.includes(text)) commentTexts.push(text);
    return commentTexts.indexOf(text);
  };
  const posts = context.generatePosts(scenarioCopy)
    .sort((a, b) => a.minute - b.minute || a.id.localeCompare(b.id))
    .map((post, index) => {
      answers[`${id}-p${index + 1}`] = answer(post);
      const pool = context.buildCommentPool(post);
      const visible = pool.slice(0, Math.min(pool.length, Math.max(0, Number(post._targetReplies) || 0)));
      return {
        ...publicPost(context, post, `${id}-p${index + 1}`),
        minute: post.minute,
        commentPool: visible.map((comment) => [comment.actor.handle, textIndex(comment.content), Number(comment.likeShare.toFixed(4))])
      };
    });

  const contextDate = vm.runInContext("Date", context);
  const realNow = contextDate.now;
  let tick = 0;
  contextDate.now = () => 1700000000000 + (tick += 7919);
  context.state.posts = [];
  for (let index = 0; index < refreshPoolSize; index += 1) context.createLivePost(false);
  contextDate.now = realNow;
  const refreshPool = context.state.posts.slice().reverse().map((post, index) => {
    answers[`${id}-r${index + 1}`] = answer(post);
    return publicPost(context, post, `${id}-r${index + 1}`);
  });

  const { title, briefing, objective, timeWindow, location, trends } = scenario;
  const sheet = {
    clues: scenario.clues || [],
    actors: Object.fromEntries(scenario.actors.map((actor) => [actor.handle, {
      trust: actor.trust || "",
      stance: actor.stance || "",
      accountType: actor.accountType || (actor.teacherOnly ? "teacher_only" : "")
    }])),
    posts: answers
  };
  return { student: { id, title, briefing, objective, timeWindow, location, trends, actors, commentTexts, posts, refreshPool }, sheet };
}

async function encryptSheet(id, sheet, password) {
  const plaintext = Buffer.from(JSON.stringify(sheet));
  // Deterministic salt and IV keep the output stable for --check; the IV only repeats for an identical plaintext.
  const salt = crypto.createHash("sha256").update(`veille-ili:${id}`).digest().subarray(0, 16);
  const iv = crypto.createHmac("sha256", password).update(plaintext).digest().subarray(0, 12);
  const subtle = crypto.webcrypto.subtle;
  const baseKey = await subtle.importKey("raw", Buffer.from(password), "PBKDF2", false, ["deriveKey"]);
  const key = await subtle.deriveKey({ name: "PBKDF2", salt, iterations: pbkdf2Iterations, hash: "SHA-256" }, baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
  const data = Buffer.from(await subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext));
  const payload = { iterations: pbkdf2Iterations, salt: salt.toString("base64"), iv: iv.toString("base64"), data: data.toString("base64") };
  return `window.veilleIliAnswerSheets = window.veilleIliAnswerSheets || {};\nwindow.veilleIliAnswerSheets[${JSON.stringify(id)}] = ${JSON.stringify(payload)};\n`;
}

function render(scenario) {
  return `window.veilleIliStudentScenarios = window.veilleIliStudentScenarios || {};\nwindow.veilleIliStudentScenarios[${JSON.stringify(scenario.id)}] = ${JSON.stringify(scenario)};\n`;
}

async function main() {
  const check = process.argv.includes("--check");
  const password = process.env.VEILLE_ILI_MDP || "";
  if (!password) {
    console.error("Définir le mot de passe du mode admin dans la variable d'environnement VEILLE_ILI_MDP.");
    process.exit(2);
  }
  const context = createContext();
  const stale = [];
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(answerDir, { recursive: true });
  for (const { id } of context.window.veilleIliScenarioIndex) {
    const { student, sheet } = buildScenario(context, id);
    const outputs = [
      [path.join(outputDir, `${id}.js`), render(student)],
      [path.join(answerDir, `${id}.js`), await encryptSheet(id, sheet, password)]
    ];
    for (const [file, content] of outputs) {
      if (!check) fs.writeFileSync(file, content);
      else if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content) stale.push(path.relative(root, file));
    }
  }
  if (stale.length) {
    console.error(`Données élèves obsolètes ou mot de passe différent, relancer node tools/build-eleve.js :\n${stale.join("\n")}`);
    process.exit(1);
  }
  console.log(check ? "Données élèves à jour." : "Données élèves et corrigés chiffrés générés dans data/eleve et data/corrige.");
}

main();
