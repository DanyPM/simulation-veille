// Builds every published data file from the private sources:
// - data/enseignant/<id>.js and data/enseignant/engine.js: full scenarios and the
//   generation engine, encrypted, loaded by index.html once the password is entered;
// - data/eleve/<id>.js: redacted feeds loaded by eleve.html, holding only what the
//   student page displays (no answer key, no suspect flags, no account
//   classification, no generation templates);
// - data/corrige/<id>.js: encrypted answer sheets for the student admin mode.
// Encryption: PBKDF2-SHA256 then AES-256-GCM, decrypted in the browser by app.js.
// The private sources live in prive/ (ignored by git); data/enseignant is their
// encrypted backup and --extract restores prive/ from it.
// Usage, with VEILLE_ILI_MDP=<mot de passe> in the environment:
//   node tools/build.js            write the published files
//   node tools/build.js --check    fail if the published files are stale
//   node tools/build.js --extract  recreate prive/ from data/enseignant
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const privateDir = path.join(root, "prive");
const studentDir = path.join(root, "data", "eleve");
const answerDir = path.join(root, "data", "corrige");
const teacherDir = path.join(root, "data", "enseignant");
const refreshPoolSize = 160;
const pbkdf2Iterations = 150000;
// One salt for every file lets the browser derive the key once per session.
const salt = crypto.createHash("sha256").update("veille-ili").digest().subarray(0, 16);
const keyCache = new Map();

async function deriveKey(password, usage) {
  const cacheKey = `${usage}:${password}`;
  if (!keyCache.has(cacheKey)) {
    const subtle = crypto.webcrypto.subtle;
    const baseKey = await subtle.importKey("raw", Buffer.from(password), "PBKDF2", false, ["deriveKey"]);
    keyCache.set(cacheKey, await subtle.deriveKey({ name: "PBKDF2", salt, iterations: pbkdf2Iterations, hash: "SHA-256" }, baseKey, { name: "AES-GCM", length: 256 }, false, [usage]));
  }
  return keyCache.get(cacheKey);
}

async function encrypt(text, password) {
  const plaintext = Buffer.from(text);
  // A deterministic IV keeps the output stable for --check; it only repeats for an identical plaintext.
  const iv = crypto.createHmac("sha256", password).update(plaintext).digest().subarray(0, 12);
  const data = Buffer.from(await crypto.webcrypto.subtle.encrypt({ name: "AES-GCM", iv }, await deriveKey(password, "encrypt"), plaintext));
  return { iterations: pbkdf2Iterations, salt: salt.toString("base64"), iv: iv.toString("base64"), data: data.toString("base64") };
}

async function decrypt(payload, password) {
  const key = await deriveKey(password, "decrypt");
  try {
    return Buffer.from(await crypto.webcrypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(payload.iv, "base64") }, key, Buffer.from(payload.data, "base64"))).toString("utf8");
  } catch (error) {
    throw new Error("Mot de passe incorrect pour data/enseignant.");
  }
}

function registryScript(registry, name, value) {
  return `window.${registry} = window.${registry} || {};\nwindow.${registry}[${JSON.stringify(name)}] = ${JSON.stringify(value)};\n`;
}

function readRegistry(file, registry) {
  const window = {};
  vm.runInNewContext(fs.readFileSync(file, "utf8"), { window });
  return window[registry];
}

function scenarioIndex() {
  return readRegistry(path.join(root, "data", "scenarios", "index.js"), "veilleIliScenarioIndex") || [];
}

async function loadSources(password, fromBundle) {
  const ids = scenarioIndex().map((entry) => entry.id);
  if (!fromBundle && fs.existsSync(path.join(privateDir, "engine.js"))) {
    return {
      engine: fs.readFileSync(path.join(privateDir, "engine.js"), "utf8"),
      scenarios: Object.fromEntries(ids.map((id) => [id, readRegistry(path.join(privateDir, "scenarios", `${id}.js`), "veilleIliScenarios")[id]]))
    };
  }
  const bundle = (name) => readRegistry(path.join(teacherDir, `${name}.js`), "veilleIliTeacherBundle")[name];
  const scenarios = {};
  for (const id of ids) scenarios[id] = JSON.parse(await decrypt(bundle(id), password));
  return { engine: await decrypt(bundle("engine"), password), scenarios };
}

function scenarioSourceFile(scenario) {
  return `window.veilleIliScenarios = window.veilleIliScenarios || {};\nwindow.veilleIliScenarios[${JSON.stringify(scenario.id)}] = ${JSON.stringify(scenario, null, 2)};\n`;
}

function createContext(sources) {
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
  for (const scenario of Object.values(sources.scenarios)) {
    vm.runInContext(scenarioSourceFile(scenario), context, { filename: `${scenario.id}.js` });
  }
  vm.runInContext(sources.engine, context, { filename: "engine.js" });
  vm.runInContext(fs.readFileSync(path.join(root, "app.js"), "utf8"), context, { filename: "app.js" });
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

function extract(sources) {
  fs.mkdirSync(path.join(privateDir, "scenarios"), { recursive: true });
  fs.writeFileSync(path.join(privateDir, "engine.js"), sources.engine);
  for (const scenario of Object.values(sources.scenarios)) {
    fs.writeFileSync(path.join(privateDir, "scenarios", `${scenario.id}.js`), scenarioSourceFile(scenario));
  }
}

async function main() {
  const check = process.argv.includes("--check");
  const password = process.env.VEILLE_ILI_MDP || "";
  if (!password) {
    console.error("Définir le mot de passe enseignant dans la variable d'environnement VEILLE_ILI_MDP.");
    process.exit(2);
  }
  const extracting = process.argv.includes("--extract");
  const sources = await loadSources(password, extracting);
  if (extracting) {
    extract(sources);
    console.log("Sources privées restaurées dans prive/.");
    return;
  }
  const context = createContext(sources);
  const outputs = [[path.join(teacherDir, "engine.js"), registryScript("veilleIliTeacherBundle", "engine", await encrypt(sources.engine, password))]];
  for (const { id } of scenarioIndex()) {
    const { student, sheet } = buildScenario(context, id);
    outputs.push(
      [path.join(teacherDir, `${id}.js`), registryScript("veilleIliTeacherBundle", id, await encrypt(JSON.stringify(sources.scenarios[id]), password))],
      [path.join(studentDir, `${id}.js`), registryScript("veilleIliStudentScenarios", id, student)],
      [path.join(answerDir, `${id}.js`), registryScript("veilleIliAnswerSheets", id, await encrypt(JSON.stringify(sheet), password))]
    );
  }
  const stale = [];
  for (const [file, content] of outputs) {
    if (!check) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    } else if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content) {
      stale.push(path.relative(root, file));
    }
  }
  if (stale.length) {
    console.error(`Fichiers publiés obsolètes ou mot de passe différent, relancer node tools/build.js :\n${stale.join("\n")}`);
    process.exit(1);
  }
  console.log(check ? "Fichiers publiés à jour." : "Fichiers générés dans data/enseignant, data/eleve et data/corrige.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
