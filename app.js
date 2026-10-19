const evidenceAssets = window.veilleIliAssets?.evidence || {};
const avatarAssets = window.veilleIliAssets?.avatars || {};
const appLogo = "./assets/branding/hawk-logo.png";
const assetVersion = new URL(document.currentScript.src).searchParams.get("v") || "";

const state = {
  scenarios: (window.veilleIliScenarioIndex || []).map((entry) => ({ ...entry })),
  scenario: null,
  posts: [],
  flags: new Map(),
  filter: "all",
  query: "",
  activePostId: null
};

const els = {
  scenarioSelect: document.querySelector("#scenarioSelect"),
  scenarioBrief: document.querySelector("#scenarioBrief"),
  scenarioMeta: document.querySelector("#scenarioMeta"),
  trendList: document.querySelector("#trendList"),
  postCount: document.querySelector("#postCount"),
  feed: document.querySelector("#feed"),
  searchInput: document.querySelector("#searchInput"),
  flaggedCount: document.querySelector("#flaggedCount"),
  confidenceScore: document.querySelector("#confidenceScore"),
  flagList: document.querySelector("#flagList"),
  clearFlags: document.querySelector("#clearFlags"),
  importBtn: document.querySelector("#importBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  teacherToggle: document.querySelector("#teacherToggle"),
  fileInput: document.querySelector("#fileInput"),
  annotationDialog: document.querySelector("#annotationDialog"),
  annotationPost: document.querySelector("#annotationPost"),
  flagReason: document.querySelector("#flagReason"),
  flagNote: document.querySelector("#flagNote"),
  saveAnnotation: document.querySelector("#saveAnnotation"),
  teacherDialog: document.querySelector("#teacherDialog"),
  profileDialog: document.querySelector("#profileDialog"),
  profileContent: document.querySelector("#profileContent"),
  scenarioEditor: document.querySelector("#scenarioEditor"),
  answerKey: document.querySelector("#answerKey"),
  applyScenario: document.querySelector("#applyScenario"),
  copyTemplate: document.querySelector("#copyTemplate"),
  refreshFeedBtn: document.querySelector("#refreshFeedBtn"),
  composePostBtn: document.querySelector("#composePostBtn"),
  composeDialog: document.querySelector("#composeDialog"),
  composeActorSelect: document.querySelector("#composeActorSelect"),
  composeText: document.querySelector("#composeText"),
  composeMediaSelect: document.querySelector("#composeMediaSelect"),
  composeUpload: document.querySelector("#composeUpload"),
  composePreview: document.querySelector("#composePreview"),
  composeLiveHint: document.querySelector("#composeLiveHint"),
  generateComposeText: document.querySelector("#generateComposeText"),
  generateComposeVisual: document.querySelector("#generateComposeVisual"),
  publishComposePost: document.querySelector("#publishComposePost"),
  liveSessionBtn: document.querySelector("#liveSessionBtn"),
  liveClassStatus: document.querySelector("#liveClassStatus"),
  liveDialog: document.querySelector("#liveDialog"),
  liveDbUrl: document.querySelector("#liveDbUrl"),
  liveApiKey: document.querySelector("#liveApiKey"),
  liveTeacherId: document.querySelector("#liveTeacherId"),
  liveRoomCode: document.querySelector("#liveRoomCode"),
  liveStudentLink: document.querySelector("#liveStudentLink"),
  liveDialogStatus: document.querySelector("#liveDialogStatus"),
  startLiveSession: document.querySelector("#startLiveSession"),
  stopLiveSession: document.querySelector("#stopLiveSession"),
  copyStudentLiveLink: document.querySelector("#copyStudentLiveLink"),
  adminToggle: document.querySelector("#adminToggle"),
  adminDialog: document.querySelector("#adminDialog"),
  adminForm: document.querySelector("#adminForm"),
  adminPassword: document.querySelector("#adminPassword"),
  adminError: document.querySelector("#adminError"),
  adminUnlock: document.querySelector("#adminUnlock"),
  adminPanel: document.querySelector("#adminPanel"),
  adminClues: document.querySelector("#adminClues"),
  unlockDialog: document.querySelector("#unlockDialog"),
  unlockForm: document.querySelector("#unlockForm"),
  unlockPassword: document.querySelector("#unlockPassword"),
  unlockError: document.querySelector("#unlockError"),
  unlockSubmit: document.querySelector("#unlockSubmit")
};

function hashSeed(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(list, random) {
  return list[Math.floor(random() * list.length)];
}

function parisNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
}

function scenarioDurationMinutes(scenario) {
  const match = String(scenario.timeWindow || "").match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
  if (!match) return 300;
  const start = Number(match[1]) * 60 + Number(match[2]);
  const end = Number(match[3]) * 60 + Number(match[4]);
  return Math.max(90, end > start ? end - start : end + 1440 - start);
}

function formatTime(date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris"
  });
}

function formatRelativeTime(date, now = parisNow()) {
  const diffMinutes = Math.max(0, Math.round((now - date) / 60000));
  if (diffMinutes < 1) return "à l'instant";
  if (diffMinutes < 60) return `${diffMinutes} min`;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (hours < 24) return minutes ? `${hours} h ${minutes}` : `${hours} h`;
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", timeZone: "Europe/Paris" });
}

function livePostDate(minute, duration, now = parisNow()) {
  const ageMinutes = Math.max(0, duration - Number(minute || 0));
  return new Date(now.getTime() - ageMinutes * 60000);
}

function actorByHandle(scenario, handle) {
  return scenario.actors.find((actor) => actor.handle === handle) || scenario.actors[0];
}






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function isPoliticalActor(actor) {
  return actor?.accountType === "political" || String(actor?.avatar || "").includes("avatar_political_");
}

function isDistractorActor(actor) {
  return actor?.accountType === "distractor";
}

function isNgoActor(actor) {
  return actor?.accountType === "ngo";
}

function isAdversarialActor(actor) {
  return actor?.accountType === "adversarial";
}

function isFieldSourceActor(actor) {
  return actor?.accountType === "field_source";
}

function isMediaNetworkActor(actor) {
  return actor?.accountType === "media_network";
}

function isTeacherOnlyActor(actor) {
  return actor?.accountType === "teacher_only" || actor?.teacherOnly === true;
}

function isBotRelayActor(actor) {
  return actor?.accountType === "bot_relay";
}

function isChinaMediaActor(actor) {
  return actor?.accountType === "china_media";
}

function accountLanguageLabel(actor) {
  if (actor?.languageLabel) return actor.languageLabel;
  return {
    fr: "Français",
    en: "English",
    ru: "Русский",
    az: "Azərbaycanca",
    de: "Deutsch",
    es: "Español",
    ar: "العربية",
    zh: "中文"
  }[actor?.language] || "Français";
}

function engagementMultiplier(post, actor) {
  return isPoliticalActor(actor)
    ? 60
    : isTeacherOnlyActor(actor)
      ? 48
      : isMediaNetworkActor(actor)
        ? 14
        : isFieldSourceActor(actor)
          ? 9
          : isChinaMediaActor(actor)
            ? 16
            : isBotRelayActor(actor)
              ? 12
    : post.suspect
      ? 16
      : post.distractor
        ? (actor.trust === "low" ? 6 : 3)
        : (actor.verified ? 4 : 2);
}

function normalizePostEngagement(post, now = parisNow()) {
  const actor = post.actor || {};
  const targetLikes = Number(post._targetLikes ?? post.likes) || 0;
  const targetReposts = Number(post._targetReposts ?? post.reposts) || 0;
  const targetReplies = Number(post._targetReplies ?? post.replies) || 0;
  const ageMinutes = Math.max(0, Math.floor((now - post.liveDate) / 60000));
  const growth = Math.pow(ageMinutes, 0.82);
  const multiplier = Number(post.engagementMultiplier) || engagementMultiplier(post, actor);
  const caps = {
    likes: Math.ceil(multiplier * (8 + 22 * growth)),
    reposts: Math.ceil(multiplier * (2 + 6 * growth)),
    replies: Math.ceil(multiplier * (1 + 3 * growth))
  };
  return {
    ...post,
    _targetLikes: targetLikes,
    _targetReposts: targetReposts,
    _targetReplies: targetReplies,
    likes: Math.min(Math.max(0, targetLikes), caps.likes),
    reposts: Math.min(Math.max(0, targetReposts), caps.reposts),
    replies: Math.min(Math.max(0, targetReplies), caps.replies)
  };
}

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
function profileHue(actor) {
  return profileNumber(hashSeed(actor.handle), 178, 222);
}

function avatarAssetFor(actor) {
  const key = actor?.avatar || "";
  if (key && avatarAssets[key]) return { key, src: avatarAssets[key] };
  const fallback = Object.keys(avatarAssets)[hashSeed(actor?.handle || "avatar") % Math.max(1, Object.keys(avatarAssets).length)];
  return fallback ? { key: fallback, src: avatarAssets[fallback] } : null;
}

function renderAvatarButton(actor, extraClass = "") {
  const hue = profileHue(actor);
  const variant = actor.trust === "low" ? "avatar-warm" : actor.trust === "medium" ? "avatar-neutral" : "avatar-cool";
  const avatar = avatarAssetFor(actor);
  const fallback = `<span class="avatar-fallback" aria-hidden="true">${escapeHtml(initials(actor.name))}</span>`;
  const visual = avatar
    ? `${fallback}<img class="avatar-img" src="${avatar.src}" alt="" loading="lazy" onerror="this.remove()" />`
    : fallback;
  return `<button class="avatar profile-trigger avatar-photo ${escapeHtml(extraClass)} ${variant}" data-action="profile" data-handle="${escapeHtml(actor.handle)}" data-avatar="${escapeHtml(avatar ? avatar.key : "fallback")}" style="--avatar-hue:${hue}" title="Voir le profil de ${escapeHtml(actor.name)}" aria-label="Voir le profil de ${escapeHtml(actor.name)}">${visual}</button>`;
}


function profileSeed(actor) {
  return hashSeed(`${state.scenario?.id || "scenario"}:${actor.handle}`);
}

function profileNumber(seed, min, max) {
  return min + (seed % (max - min + 1));
}

function buildProfile(actor) {
  const seed = profileSeed(actor);
  const lowTrust = actor.trust === "low";
  const official = actor.trust === "high" && actor.verified;
  const analyst = actor.stance === "analyst";
  const createdDays = lowTrust ? profileNumber(seed, 2, 24) : actor.trust === "medium" ? profileNumber(seed, 80, 540) : profileNumber(seed, 760, 2800);
  const followers = Number(actor.followers) || (lowTrust ? profileNumber(seed * 7, 420, 18200) : actor.trust === "medium" ? profileNumber(seed * 11, 1600, 42000) : profileNumber(seed * 13, 18000, 420000));
  const following = Number(actor.following) || (lowTrust ? profileNumber(seed * 17, 12, 148) : profileNumber(seed * 19, 180, 1200));
  const dailyPosts = Number(actor.dailyPosts) || (lowTrust ? profileNumber(seed * 23, 58, 210) : actor.trust === "medium" ? profileNumber(seed * 29, 8, 34) : profileNumber(seed * 31, 2, 18));
  const names = state.scenario.actors.map((item) => item.name.toLowerCase());
  const imitates = !official && names.some((name) => actor.name.toLowerCase() !== name && similarName(actor.name.toLowerCase(), name));

  const bios = {
    official: "Canal officiel. Informations vérifiées et communiqués institutionnels.",
    media: actor.trust === "low" ? "Actu terrain, infos que les médias ne montrent pas." : "Rédaction locale. Vérification, terrain, contexte.",
    analyst: "Analyse de sources ouvertes, chronologie et vérification d'images.",
    citizen: "Compte personnel. Témoignages, questions et relais d'informations locales.",
    amplifier: "Alertes, révélations et contenus reçus en privé."
  };

  const signals = [];
  if (official) signals.push("Compte vérifié ou institutionnel", "Canal cohérent avec son rôle déclaré");
  if (analyst && actor.trust !== "low") signals.push("Explique ses méthodes", "Corrige ou nuance les contenus viraux");
  if (actor.trust === "medium") signals.push("Compte humain plausible", "Informations utiles mais à recouper");
  if (lowTrust) signals.push("Compte récent ou identité floue", "Volume de publication élevé", "Relais fréquent de captures non sourcées");
  if (imitates) signals.push("Nom proche d'un autre compte du scénario");
  if (actor.stance === "amplifier") signals.push("Formulations urgentes et très affirmatives");

  const risk = lowTrust ? "Élevé" : actor.trust === "medium" ? "Moyen" : "Faible";
  const status = official ? "Source primaire probable" : analyst ? "Source d'analyse" : lowTrust ? "Source à forte vigilance" : "Source à recouper";
  const posts = state.posts.filter((post) => post.actor.handle === actor.handle).slice(0, 4);

  return {
    actor,
    bio: actor.bio || bios[actor.stance] || "Compte participant au débat public.",
    created: actor.created || (createdDays < 31 ? `il y a ${createdDays} jours` : createdDays < 730 ? `il y a ${Math.round(createdDays / 30)} mois` : `il y a ${Math.round(createdDays / 365)} ans`),
    followers,
    following,
    dailyPosts,
    risk,
    status,
    signals,
    posts
  };
}

function similarName(a, b) {
  const cleanA = a.replace(/[^a-z0-9]/g, "");
  const cleanB = b.replace(/[^a-z0-9]/g, "");
  return cleanA.length > 7 && cleanB.length > 7 && (cleanA.includes(cleanB.slice(0, 8)) || cleanB.includes(cleanA.slice(0, 8)));
}

function formatCompact(value) {
  value = Number(value) || 0;
  if (value >= 100000) return `${Math.round(value / 1000)} k`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(".", ",")} k`;
  return String(value);
}

function openProfile(handle) {
  const actor = state.scenario.actors.find((item) => item.handle === handle);
  if (!actor) return;
  const profile = buildProfile(actor);
  els.profileContent.innerHTML = renderProfile(profile);
  els.profileDialog.showModal();
}

function renderProfile(profile) {
  const actor = profile.actor;
  const recentPosts = profile.posts.length ? profile.posts : state.posts.filter((post) => post.actor.handle === actor.handle).slice(0, 5);
  return `
    <section class="profile-page">
      <div class="x-cover" style="--avatar-hue:${profileHue(actor)}"></div>
      <div class="x-profile-head">
        ${renderAvatarButton(actor, "avatar-profile-large")}
        <button class="follow-button" type="button">Suivre</button>
      </div>
      <div class="x-profile-title">
        <h2>${escapeHtml(actor.name)} ${actor.verified ? `<span class="badge" title="Compte certifié" aria-label="Compte certifié">&#10003;</span>` : ""}</h2>
        <p>${escapeHtml(actor.handle)}</p>
      </div>
      <p class="x-bio" lang="${escapeHtml(actor.language || "fr")}">${escapeHtml(profile.bio)}</p>
      <div class="x-profile-meta">
        <span>${escapeHtml(profile.created)}</span>
        <span>${formatCompact(profile.following)} abonnements</span>
        <span>${formatCompact(profile.followers)} abonnés</span>
        <span>${formatCompact(profile.dailyPosts)} posts aujourd'hui</span>
        <span>Langue principale : ${escapeHtml(accountLanguageLabel(actor))}</span>
      </div>
      <div class="x-tabs" aria-label="Navigation du profil">
        <span class="is-active">Posts</span>
        <span>Réponses</span>
        <span>Médias</span>
      </div>
      <div class="x-profile-posts">
        ${recentPosts.length ? recentPosts.map((post) => `
          <article class="x-profile-post">
            ${renderAvatarButton(actor, "avatar-mini")}
            <div>
              <div class="post-head compact">
                <strong>${escapeHtml(actor.name)}</strong>
                ${actor.verified ? `<span class="badge" title="Compte certifié" aria-label="Compte certifié">&#10003;</span>` : ""}
                <span class="handle">${escapeHtml(actor.handle)}</span>
                <span class="time">&middot; ${escapeHtml(post.relativeTime || post.time)}</span>
              </div>
              <p lang="${escapeHtml(post.language || actor.language || "fr")}">${escapeHtml(post.content)}</p>
            </div>
          </article>
        `).join("") : '<p class="x-empty">Aucune publication récente.</p>'}
      </div>
    </section>
  `;
}
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderMedia(media, post) {
  if (!media) return "";
  const asset = media.asset || defaultEvidenceAsset(media, post);
  const src = media.dataUrl || evidenceAssets[asset];
  if (!src) return "";

  return `
    <div class="post-media evidence-card">
      <img class="evidence-image" src="${escapeHtml(src)}" alt="Image jointe à la publication" loading="lazy" />
    </div>
  `;
}

function chooseEvidenceAsset(options, media, post) {
  const available = options.filter((name) => evidenceAssets[name]);
  if (!available.length) return "convoy_ru.png";
  const seed = hashSeed(`${state.scenario?.id || "scenario"}:${post?.id || "post"}:${post?.actor?.handle || "actor"}:${media.kind || "media"}:${media.title || "title"}`);
  return available[seed % available.length];
}

function defaultEvidenceAsset(media, post) {
  const labels = state.scenario?.mediaLabels || [];
  const sameKind = labels.filter((item) => item.asset && (!media.kind || item.kind === media.kind));
  const pool = sameKind.length ? sameKind : labels.filter((item) => item.asset);
  if (pool.length) return chooseEvidenceAsset(pool.map((item) => item.asset), media, post);
  const allAssets = Object.keys(evidenceAssets);
  return allAssets.length ? chooseEvidenceAsset(allAssets, media, post) : "";
}
function renderEvidenceSvg(media, palette) {
  const label = escapeHtml(media.title);
  const common = `<rect width="220" height="140" fill="${palette[0]}"/><rect x="8" y="8" width="204" height="124" rx="8" fill="rgba(255,255,255,.72)"/>`;
  let body = "";
  if (media.kind === "map") {
    body = `<path d="M20 112 C54 88, 70 55, 104 66 S158 43, 198 18" fill="none" stroke="${palette[1]}" stroke-width="5"/><path d="M26 28 H202 M28 58 H194 M18 88 H184 M52 16 V126 M98 14 V126 M150 12 V126" stroke="rgba(52,68,86,.22)"/><circle cx="106" cy="66" r="7" fill="#b42318"/><circle cx="160" cy="42" r="7" fill="#2364aa"/><rect x="18" y="18" width="64" height="19" rx="3" fill="rgba(23,33,43,.78)"/><text x="25" y="32" fill="white" font-size="11" font-family="Arial">MAP</text>`;
  } else if (media.kind === "document" || media.kind === "school") {
    body = `<rect x="34" y="18" width="112" height="104" rx="3" fill="white" stroke="rgba(52,68,86,.22)"/><rect x="50" y="34" width="72" height="8" rx="2" fill="${palette[1]}" opacity=".75"/><rect x="50" y="52" width="80" height="5" rx="2" fill="rgba(52,68,86,.35)"/><rect x="50" y="64" width="62" height="5" rx="2" fill="rgba(52,68,86,.28)"/><rect x="50" y="76" width="84" height="5" rx="2" fill="rgba(52,68,86,.28)"/><rect x="50" y="96" width="48" height="12" rx="2" fill="#b42318" opacity=".78"/><rect x="154" y="28" width="42" height="42" rx="6" fill="rgba(23,33,43,.78)"/><text x="162" y="53" fill="white" font-size="13" font-family="Arial">PDF</text>`;
  } else if (media.kind === "chart" || media.kind === "oil") {
    body = `<path d="M28 112 H198" stroke="rgba(52,68,86,.38)"/><path d="M32 108 V24" stroke="rgba(52,68,86,.38)"/><path d="M38 96 C62 90, 70 72, 90 76 S116 92, 132 58 S168 44, 194 28" fill="none" stroke="${palette[1]}" stroke-width="6" stroke-linecap="round"/><rect x="132" y="18" width="58" height="22" rx="4" fill="#b42318"/><text x="142" y="33" fill="white" font-size="11" font-family="Arial">VIRAL</text><rect x="42" y="28" width="54" height="10" rx="2" fill="rgba(52,68,86,.24)"/>`;
  } else {
    body = `<rect x="20" y="26" width="180" height="88" rx="8" fill="rgba(23,33,43,.82)"/><path d="M30 92 C54 76, 72 70, 94 78 S134 88, 190 58" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="7"/><rect x="48" y="66" width="52" height="20" rx="6" fill="${palette[1]}"/><rect x="108" y="58" width="46" height="24" rx="5" fill="rgba(255,255,255,.72)"/><circle cx="168" cy="70" r="10" fill="#b42318" opacity=".9"/><rect x="28" y="30" width="68" height="18" rx="3" fill="rgba(180,35,24,.9)"/><text x="36" y="43" fill="white" font-size="11" font-family="Arial">VIDEO</text>`;
  }
  return `<svg role="img" aria-label="${label}" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">${common}${body}<text x="18" y="126" fill="rgba(23,33,43,.72)" font-size="10" font-family="Arial">SIMULATION - SOURCE A VERIFIER</text></svg>`;
}
function renderMediaMetadata(media, post) {
  const rows = media.metadata || simulatedMetadata(media, post);
  if (!rows.length) return "";
  return `
    <div class="metadata-box">
      <div class="metadata-title">
        <strong>Métadonnées simulées</strong>
        <span>indices EXIF</span>
      </div>
      ${rows.map((row) => `
        <div class="metadata-row">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function simulatedMetadata(media, post) {
  const scenarioId = state.scenario?.id || "";
  const seed = hashSeed(`${scenarioId}:${post?.id || media.title}:${media.kind}`);
  const suspect = Boolean(post?.suspect || post?.actor?.trust === "low");
  const profile = state.scenario?.traceProfile || ["ru", "az", "unknown", "fr"];
  const trace = media.trace || (suspect ? profile[seed % profile.length] : "fr");
  const data = {
    ru: { file: "пересылка_0742.jpg", locale: "ru_RU", tz: "UTC+3", gps: "55.7558, 37.6173", lang: "russe", operator: "Mikhail Orlov", chain: "export Telegram compressé" },
    az: { file: "subut_export_041.jpg", locale: "az_AZ", tz: "UTC+4", gps: "40.4093, 49.8671", lang: "azéri", operator: "Rashad Mammadov", chain: "copie depuis canal relais" },
    unknown: { file: `forwarded_${media.kind || "media"}_${String(seed).slice(0, 5)}.jpg`, locale: "inconnue", tz: "supprimé", gps: "41.0082, 28.9784", lang: "indéterminée", operator: "compte relais", chain: "capture recadrée" },
    fr: { file: `${media.kind || "media"}_${String(seed).slice(0, 5)}.jpg`, locale: "fr_FR", tz: "Europe/Paris", gps: "48.8566, 2.3522", lang: "français", operator: "source identifiée", chain: "source citée" }
  }[trace] || {};

  return [
    { label: "Fichier", value: data.file },
    { label: "Langue appareil", value: data.lang },
    { label: "Locale", value: data.locale },
    { label: "Fuseau", value: data.tz },
    { label: "GPS EXIF", value: data.gps },
    { label: "Nom opérateur", value: data.operator },
    { label: "Chaîne", value: data.chain },
    { label: "Cohérence", value: suspect ? "indice fort à recouper" : "éléments recoupables" }
  ];
}

function renderScenarioOptions() {
  if (!els.scenarioSelect) return;
  els.scenarioSelect.innerHTML = state.scenarios
    .map((scenario) => `<option value="${escapeHtml(scenario.id)}">${escapeHtml(scenario.title)}</option>`)
    .join("");
}

function renderScenarioInfo() {
  const scenario = state.scenario;
  els.scenarioBrief.textContent = scenario.briefing;
  els.postCount.textContent = `${state.posts.length} posts`;
  els.scenarioMeta.innerHTML = [
    ["Objectif", scenario.objective],
    ["Lieu", scenario.location || "Non précisé"],
    ["Fil simulé", `dernières ${Math.round(scenarioDurationMinutes(scenario) / 60)} h · heure de Paris`]
  ]
    .map(([label, value]) => `<div class="meta-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
  els.trendList.innerHTML = (scenario.trends || [])
    .map((trend) => `<div class="trend"><span>${escapeHtml(trend.tag)}</span><span>${escapeHtml(trend.count)}</span></div>`)
    .join("");
}

function filteredPosts() {
  const q = state.query.trim().toLowerCase();
  return state.posts.filter((post) => {
    const matchesFilter =
      state.filter === "all" ||
      (state.filter === "flagged" && state.flags.has(post.id)) ||
      (state.filter === "media" && post.media);
    const haystack = `${post.actor.name} ${post.actor.handle} ${post.content}`.toLowerCase();
    return matchesFilter && (!q || haystack.includes(q));
  });
}

function renderFeed() {
  const posts = filteredPosts();
  const feedKey = `${state.scenario?.id || "none"}:${state.filter}:${state.query.trim().toLowerCase()}`;
  if (state.feedKey !== feedKey) {
    state.feedKey = feedKey;
    state.feedLimit = 72;
  }
  const limit = Math.max(24, Number(state.feedLimit) || 72);
  const visiblePosts = posts.slice(0, limit);
  if (!posts.length) {
    els.feed.innerHTML = `<div class="panel"><p class="brief">Aucun post ne correspond au filtre actif.</p></div>`;
    return;
  }
  const remaining = posts.length - visiblePosts.length;
  els.feed.innerHTML = visiblePosts.map(renderPost).join("") + (remaining > 0 ? `
    <div class="feed-load-more">
      <button type="button" id="loadMorePosts" class="text-button">Afficher 72 publications supplémentaires</button>
      <span>${visiblePosts.length} sur ${posts.length} publications affichées</span>
    </div>` : "");
  const loadMoreButton = document.querySelector("#loadMorePosts");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      state.feedLimit = limit + 72;
      renderFeed();
    });
  }
}






































































































































function commentAgeLimit(post) {
  const ageMinutes = Math.max(0, Math.floor((parisNow() - post.liveDate) / 60000));
  return ageMinutes < 1 ? 0 : ageMinutes < 3 ? 1 : ageMinutes < 10 ? 2 : ageMinutes < 30 ? 4 : 7;
}

function pooledComments(post) {
  const count = Math.min(post.commentPool.length, commentAgeLimit(post), Math.max(0, Number(post.replies) || 0));
  const likeCap = Math.max(1, Math.floor((Number(post.likes) || 0) * 0.12));
  return post.commentPool.slice(0, count).map((comment, index) => ({
    id: `${post.id}-comment-${index}`,
    actor: typeof comment.actor === "string" ? actorByHandle(state.scenario, comment.actor) : comment.actor,
    content: comment.content,
    likes: Math.min(likeCap, Math.floor(1 + comment.likeShare * likeCap))
  }));
}

function postComments(post) {
  return post.comments || (post.commentPool ? pooledComments(post) : buildComments(post));
}

function renderComments(post) {
  const comments = postComments(post);
  if (!comments.length) return "";
  return `
    <div class="comment-thread">
      ${comments.map((comment) => `
        <article class="comment">
          ${renderAvatarButton(comment.actor, "avatar-comment")}
          <div>
            <div class="comment-head">
              <button class="profile-name" data-action="profile" data-handle="${escapeHtml(comment.actor.handle)}">${escapeHtml(comment.actor.name)}</button>
              <span class="handle">${escapeHtml(comment.actor.handle)}</span>
            </div>
            <p>${escapeHtml(comment.content)}</p>
            <span class="comment-stat">${formatNumber(comment.likes)} réactions</span>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderPostTranslation(post) {
  if (!post.translation || !post.language || post.language === "fr") return "";
  return `
    <button type="button" class="translate-post-button" data-action="translate-post" aria-expanded="false">Traduire le post</button>
    <div class="post-translation" lang="fr" hidden>
      <span>Traduit du ${escapeHtml(accountLanguageLabel(post.actor))}</span>
      <p>${linkify(escapeHtml(post.translation))}</p>
    </div>
  `;
}

function renderPost(post) {
  return `
    <article class="post ${post.teacherCreated ? "teacher-created" : ""}" data-post-id="${escapeHtml(post.id)}">
      ${renderAvatarButton(post.actor, "avatar-feed")}
      <div class="post-body">
        <div class="post-head">
          <button class="profile-name" data-action="profile" data-handle="${escapeHtml(post.actor.handle)}">${escapeHtml(post.actor.name)}</button>
          ${post.actor.verified ? `<span class="badge" title="Compte certifié" aria-label="Compte certifié">&#10003;</span>` : ""}
          <span class="handle">${escapeHtml(post.actor.handle)}</span>
          <span class="time">· ${escapeHtml(post.relativeTime)} · ${escapeHtml(post.time)}</span>
          ${post.teacherCreated && document.body.dataset.mode === "teacher" ? `<span class="teacher-post-label">Créé par l'enseignant</span>` : ""}
        </div>${renderAdminFlag(post)}
        <p class="post-content" lang="${escapeHtml(post.language || post.actor.language || "fr")}">${linkify(escapeHtml(post.content))}</p>
        ${renderPostTranslation(post)}
        ${renderMedia(post.media, post)}
        <div class="post-foot">
          <div class="stats">
            <span>${formatNumber(post.replies)} réponses</span>
            <span>${formatNumber(post.reposts)} relais</span>
            <span>${formatNumber(post.likes)} réactions</span>
          </div>
          ${post.teacherCreated && document.body.dataset.mode === "teacher" ? `<div class="post-actions"><button class="action-button" data-action="delete-teacher">Supprimer</button></div>` : ""}
        </div>
        ${renderComments(post)}
      </div>
    </article>
  `;
}
function refreshFeedManually() {
  if (!state.scenario) return;
  const batchSize = 3 + (hashSeed(`${state.scenario.id}:${Date.now()}`) % 4);
  for (let index = 0; index < batchSize; index += 1) {
    if (Array.isArray(state.scenario.refreshPool)) revealRefreshPost();
    else createLivePost(false);
  }
  renderScenarioInfo();
  refreshLiveTimes();
  document.querySelector(".feed-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function revealRefreshPost() {
  const pool = state.scenario.refreshPool;
  if (!pool.length) return null;
  const position = state.refreshCursor || 0;
  state.refreshCursor = position + 1;
  const source = pool[position % pool.length];
  const liveDate = parisNow();
  const post = normalizePostEngagement({
    ...source,
    id: `${source.id}-${position}`,
    sourceId: source.id,
    actor: actorByHandle(state.scenario, source.actor),
    liveDate,
    time: formatTime(liveDate),
    relativeTime: "à l'instant",
    comments: []
  }, liveDate);
  state.posts = [post, ...state.posts];
  return post;
}

function refreshLiveTimes() {
  const now = parisNow();
  state.posts = state.posts
    .map((post) => ({
      ...post,
      time: formatTime(post.liveDate),
      relativeTime: formatRelativeTime(post.liveDate, now)
    }))
    .map((post) => normalizePostEngagement(post, now))
    .sort((a, b) => b.liveDate - a.liveDate);
  renderFeed();
  renderFlags();
}

function linkify(value) {
  return value.replace(/(#[-\p{L}\p{N}_]+)/gu, '<strong class="hashtag">$1</strong>');
}

function formatNumber(value) {
  value = Number(value) || 0;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(".", ",")} k`;
  return String(value);
}

function renderFlags() {
  // Les élèves transmettent leurs signalements hors de la simulation.
}

function renderAnswerKey() {
  const suspectPosts = state.posts.filter((post) => post.suspect);
  if (!els.answerKey) return;
  els.answerKey.innerHTML = `
    <p class="helper">${suspectPosts.length} publications sont marquées comme problématiques dans ce scénario.</p>
    <div class="key-item">
      <strong>Métadonnées</strong>
      <span>Les champs ru_RU, az_AZ, UTC+3, UTC+4, export Telegram ou nom de fichier en cyrillique sont des indices de chaîne de diffusion. Ils doivent être recoupés avec le compte, la première publication, l'image, le fuseau horaire et le narratif.</span>
    </div>
    ${suspectPosts.slice(0, 18).map((post) => `
      <div class="key-item">
        <strong>${escapeHtml(post.time)} · ${escapeHtml(post.actor.handle)}</strong>
        <span>${escapeHtml(post.reason || "Signal suspect à justifier.")}</span>
      </div>
    `).join("")}
  `;
}

const registryScriptLoads = new Map();

function loadRegistryScript(file, registry, name) {
  if (!registryScriptLoads.has(file)) {
    registryScriptLoads.set(file, new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `./${file}?v=${encodeURIComponent(assetVersion)}`;
      script.addEventListener("load", () => {
        const value = window[registry]?.[name];
        if (value) resolve(value);
        else reject(new Error(`Contenu introuvable : ${file}`));
      });
      script.addEventListener("error", () => {
        registryScriptLoads.delete(file);
        reject(new Error(`Chargement impossible : ${file}`));
      });
      document.head.append(script);
    }));
  }
  return registryScriptLoads.get(file);
}

async function fetchScenario(id) {
  // Student pages load the redacted feeds built by tools/build.js, never the full scenarios.
  if (document.body.dataset.mode === "student") {
    return loadRegistryScript(`data/eleve/${encodeURIComponent(id)}.js`, "veilleIliStudentScenarios", id);
  }
  const payload = await loadRegistryScript(`data/enseignant/${encodeURIComponent(id)}.js`, "veilleIliTeacherBundle", id);
  return JSON.parse(await decryptPayload(payload, state.teacherPassword));
}

async function scenarioData(entry) {
  if (Array.isArray(entry.actors)) return entry;
  const scenario = await fetchScenario(entry.id);
  const index = state.scenarios.findIndex((item) => item.id === entry.id);
  if (index >= 0 && !Array.isArray(state.scenarios[index].actors)) state.scenarios[index] = scenario;
  return scenario;
}

function scenarioPosts(scenario) {
  if (!Array.isArray(scenario.posts)) return generatePosts(scenario);
  const now = parisNow();
  const duration = scenarioDurationMinutes(scenario);
  return scenario.posts
    .map((post) => ({ ...post, liveDate: livePostDate(post.minute, duration, now) }))
    .sort((a, b) => b.liveDate - a.liveDate)
    .map((post) => normalizePostEngagement({
      ...post,
      time: formatTime(post.liveDate),
      relativeTime: formatRelativeTime(post.liveDate, now),
      actor: actorByHandle(scenario, post.actor),
      commentPool: (post.commentPool || []).map(([actor, text, likeShare]) => ({ actor, content: scenario.commentTexts[text], likeShare }))
    }, now));
}

async function loadScenario(id) {
  const entry = state.scenarios.find((item) => item.id === id) || state.scenarios[0];
  const loadToken = (state.loadToken || 0) + 1;
  state.loadToken = loadToken;
  const scenario = await scenarioData(entry);
  if (state.loadToken !== loadToken) return;
  state.scenario = structuredClone(scenario);
  if (els.scenarioSelect) els.scenarioSelect.value = scenario.id;
  state.refreshCursor = 0;
  state.posts = mergeLivePosts([...restoreTeacherPosts(state.scenario), ...scenarioPosts(state.scenario)], state.scenario);
  state.flags.clear();
  state.query = "";
  if (els.searchInput) els.searchInput.value = "";
  renderScenarioInfo();
  renderFeed();
  renderFlags();
  renderAnswerKey();
  refreshAdminMode();
  if (els.scenarioEditor) els.scenarioEditor.value = JSON.stringify(state.scenario, null, 2);
}

function toggleFlag(postId) {
  if (state.flags.has(postId)) {
    state.flags.delete(postId);
  } else {
    state.flags.set(postId, { postId, reason: "À vérifier", note: "" });
  }
  renderFeed();
  renderFlags();
}

function openAnnotation(postId) {
  const post = state.posts.find((item) => item.id === postId);
  if (!post) return;
  state.activePostId = postId;
  const flag = state.flags.get(postId) || { reason: "Coordination", note: "" };
  els.annotationPost.textContent = `${post.actor.handle} : ${post.content}`;
  els.flagReason.value = flag.reason === "À vérifier" ? "Coordination" : flag.reason;
  els.flagNote.value = flag.note || "";
  els.annotationDialog.showModal();
}

function saveAnnotation() {
  if (!state.activePostId) return;
  state.flags.set(state.activePostId, {
    postId: state.activePostId,
    reason: els.flagReason.value,
    note: els.flagNote.value.trim()
  });
  state.activePostId = null;
  renderFeed();
  renderFlags();
}

function exportScenario() {
  const teacherPosts = state.posts.filter((post) => post.teacherCreated).map(serializeTeacherPost);
  const payload = { ...state.scenario, teacherPosts };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.scenario.id || "scenario"}-veille-ili.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importScenario(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  const scenarios = Array.isArray(parsed) ? parsed : [parsed];
  scenarios.forEach(addScenario);
  renderScenarioOptions();
  if (els.scenarioSelect) els.scenarioSelect.value = scenarios[0].id;
  await loadScenario(scenarios[0].id);
}

function addScenario(scenario) {
  validateScenario(scenario);
  const existingIndex = state.scenarios.findIndex((item) => item.id === scenario.id);
  if (existingIndex >= 0) {
    state.scenarios[existingIndex] = scenario;
  } else {
    state.scenarios.push(scenario);
  }
}

function validateScenario(scenario) {
  const required = ["id", "title", "briefing", "actors", "normalTemplates", "suspectTemplates"];
  const missing = required.filter((key) => !scenario[key] || (Array.isArray(scenario[key]) && !scenario[key].length));
  if (missing.length) {
    throw new Error(`Champ manquant dans le scénario : ${missing.join(", ")}`);
  }
}

function applyScenarioJson() {
  try {
    const scenario = JSON.parse(els.scenarioEditor.value);
    addScenario(scenario);
    renderScenarioOptions();
    if (els.scenarioSelect) els.scenarioSelect.value = scenario.id;
    loadScenario(scenario.id).catch((error) => alert(`Impossible d'appliquer ce JSON : ${error.message}`));
    if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) if (els.teacherDialog) els.teacherDialog.close();
  } catch (error) {
    alert(`Impossible d'appliquer ce JSON : ${error.message}`);
  }
}

function emptyTemplate() {
  return {
    id: "nouveau-scenario",
    title: "Nouveau scénario",
    briefing: "Décris ici la situation fictive à analyser.",
    objective: "Décris ce que les élèves doivent repérer.",
    timeWindow: "08:00-12:00",
    location: "Lieu",
    volume: 100,
    seed: 12345,
    trends: [{ tag: "#MotCle", count: "1,2 k" }],
    clues: ["Indice attendu dans la correction."],
    actors: [
      { name: "Compte officiel", handle: "@officiel", verified: true, stance: "official", trust: "high" },
      { name: "Compte amplificateur", handle: "@alerte_info", verified: false, stance: "amplifier", trust: "low" }
    ],
    normalTemplates: ["Message prudent avec demande de source."],
    suspectTemplates: ["Message alarmiste sans source qui pousse à partager vite."],
    mediaLabels: [{ kind: "document", title: "Document partagé", caption: "Indice visuel à vérifier" }],
    fixedPosts: [
      {
        id: "nouveau-fixed-1",
        minute: 20,
        actor: "@alerte_info",
        content: "Message problématique explicitement placé par l'enseignant.",
        suspect: true,
        reason: "Explique ici le signal faible attendu.",
        likes: 400,
        reposts: 280,
        replies: 60
      }
    ]
  };
}







































































































































































































































































































































































































































































































































































































































































































































function teacherStorageKey() {
  return `veille-ili:teacher-posts:${state.scenario?.id || "scenario"}`;
}

function serializeTeacherPost(post) {
  return {
    id: post.id,
    scenarioId: state.scenario?.id || post.scenarioId || "",
    actor: post.actor.handle,
    content: post.content,
    language: post.language || post.actor.language || "fr",
    translation: post.translation || "",
    translationLanguage: post.translationLanguage || "fr",
    suspect: Boolean(post.suspect),
    reason: post.reason || "",
    likes: Number(post.likes) || 0,
    reposts: Number(post.reposts) || 0,
    replies: Number(post.replies) || 0,
    media: post.media || null,
    liveDate: post.liveDate.toISOString(),
    teacherCreated: true
  };
}

function persistTeacherPosts() {
  if (!state.scenario) return false;
  const posts = state.posts.filter((post) => post.teacherCreated).map(serializeTeacherPost);
  try {
    localStorage.setItem(teacherStorageKey(), JSON.stringify(posts));
    return true;
  } catch (error) {
    const compactPosts = posts.slice(0, 120).map((post) => ({
      ...post,
      media: post.media?.dataUrl
        ? { ...post.media, dataUrl: "", storageLimited: true }
        : post.media
    }));
    try {
      localStorage.setItem(teacherStorageKey(), JSON.stringify(compactPosts));
      return "compact";
    } catch (storageError) {
      console.warn("Publication visible pour la séance, mais stockage local indisponible.", storageError);
      return false;
    }
  }
}

function restoreTeacherPosts(scenario) {
  let localPosts = [];
  try {
    localPosts = JSON.parse(localStorage.getItem(`veille-ili:teacher-posts:${scenario.id}`) || "[]");
  } catch (error) {
    localPosts = [];
  }
  const importedPosts = Array.isArray(scenario.teacherPosts) ? scenario.teacherPosts : [];
  const unique = new Map([...importedPosts, ...localPosts].map((post) => [post.id, post]));
  const now = parisNow();
  return [...unique.values()].map((post) => {
    const liveDate = new Date(post.liveDate || now);
    const actor = actorByHandle(scenario, post.actor);
    return normalizePostEngagement({
      ...post,
      actor,
      liveDate,
      time: formatTime(liveDate),
      relativeTime: formatRelativeTime(liveDate, now),
      teacherCreated: true
    }, now);
  });
}

// VEILLE-ILI LIVE SYNC START
const liveSync = {
  enabled: false,
  dbUrl: "",
  apiKey: "",
  room: "",
  expiresAt: 0,
  remotePosts: [],
  signature: "",
  timer: null,
  stream: null,
  reconnectTimer: null,
  inFlight: false,
  pollDelay: 15000,
  currentStream: null,
  currentTimer: null,
  currentReconnectTimer: null
};

const liveAuth = {
  apiKey: "",
  uid: "",
  idToken: "",
  expiresAt: 0
};

function isTeacherPage() {
  return document.body.dataset.mode === "teacher";
}

function directConfig() {
  const config = window.VEILLE_ILI_DIRECT || {};
  return {
    dbUrl: String(config.dbUrl || "").trim(),
    apiKey: String(config.apiKey || "").trim(),
    authEmulator: String(config.authEmulator || "").trim().replace(/\/+$/, "")
  };
}

function normalizeLiveDbUrl(value) {
  const url = String(value || "").trim().replace(/\/+$/, "");
  const isFirebase = /^https:\/\/[a-z0-9.-]+(?:firebasedatabase\.app|firebaseio\.com)$/i.test(url);
  const isLocalTest = /^(?:http:\/\/)?(?:127\.0\.0\.1|localhost):\d+(?:\/?\?ns=[a-z0-9-]+)?$/i.test(url)
    && ["127.0.0.1", "localhost"].includes(window.location.hostname);
  if (!isFirebase && !isLocalTest) {
    throw new Error("Adresse Firebase Realtime Database invalide.");
  }
  return url;
}

function normalizeLiveRoom(value) {
  const room = String(value || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 28);
  if (room.length < 6) throw new Error("Le code de séance doit contenir au moins 6 caractères.");
  return room;
}

function createLiveRoomCode() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = crypto.getRandomValues(new Uint8Array(7));
  return `ILI-${[...bytes].map((byte) => alphabet[byte % alphabet.length]).join("")}`;
}

function encodeLiveValue(value) {
  const bytes = new TextEncoder().encode(String(value));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeLiveValue(value) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function liveEndpoint(path, token = "") {
  const [base, query = ""] = liveSync.dbUrl.split("?");
  const params = new URLSearchParams(query);
  if (token) params.set("auth", token);
  const search = params.toString();
  return `${base.replace(/\/+$/, "")}/${path}.json${search ? `?${search}` : ""}`;
}

function liveRoomEndpoint(path = "", token = "") {
  const suffix = path ? `/${path}` : "";
  return liveEndpoint(`rooms/${encodeURIComponent(liveSync.room)}${suffix}`, token);
}

function liveErrorMessage(status) {
  if (status === 401 || status === 403) {
    return `Écriture refusée (${status}). Vérifiez que l'identifiant enseignant ${liveAuth.uid || ""} est déclaré dans teachers et que la séance vous appartient.`;
  }
  return `Connexion refusée (${status}). Vérifiez l'adresse et les règles Firebase.`;
}

async function liveFetch(url, options = {}) {
  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(liveErrorMessage(response.status));
  if (response.status === 204) return null;
  return response.json();
}

async function liveRequest(path = "", options = {}) {
  if (!liveSync.dbUrl || !liveSync.room) throw new Error("Séance non configurée.");
  const { auth, ...fetchOptions } = options;
  const token = auth ? await ensureLiveAuth() : "";
  return liveFetch(liveRoomEndpoint(path, token), fetchOptions);
}

function authServiceUrl(service, path) {
  const emulator = directConfig().authEmulator;
  const base = emulator ? `${emulator}/${service}` : `https://${service}`;
  return `${base}${path}?key=${encodeURIComponent(liveSync.apiKey)}`;
}

async function authRequest(service, path, body) {
  const response = await fetch(authServiceUrl(service, path), {
    method: "POST",
    headers: {
      "Content-Type": body instanceof URLSearchParams ? "application/x-www-form-urlencoded" : "application/json"
    },
    body
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const code = data?.error?.message || String(response.status);
    const error = new Error(code === "OPERATION_NOT_ALLOWED" || code === "ADMIN_ONLY_OPERATION"
      ? "Activez la connexion anonyme dans Firebase Authentication."
      : `Authentification Firebase refusée (${code}).`);
    error.authRejected = true;
    throw error;
  }
  return data;
}

function readSavedLiveAuth() {
  try {
    return JSON.parse(localStorage.getItem("veille-ili:live-auth") || "{}");
  } catch (error) {
    return {};
  }
}

function rememberLiveAuth(uid, idToken, refreshToken, expiresIn) {
  liveAuth.apiKey = liveSync.apiKey;
  liveAuth.uid = uid;
  liveAuth.idToken = idToken;
  liveAuth.expiresAt = Date.now() + (Number(expiresIn) || 3600) * 1000;
  try {
    localStorage.setItem("veille-ili:live-auth", JSON.stringify({ apiKey: liveSync.apiKey, uid, refreshToken }));
  } catch (error) {
    console.warn("Identifiant enseignant non mémorisé sur cet ordinateur.", error);
  }
}

// Le refreshToken conserve le même uid d'un chargement à l'autre : cet uid est celui déclaré dans /teachers.
async function ensureLiveAuth() {
  if (!liveSync.apiKey) throw new Error("Clé API Web Firebase manquante.");
  if (liveAuth.idToken && liveAuth.apiKey === liveSync.apiKey && liveAuth.expiresAt - 120000 > Date.now()) {
    return liveAuth.idToken;
  }
  const saved = readSavedLiveAuth();
  if (saved.apiKey === liveSync.apiKey && saved.refreshToken) {
    try {
      const refreshed = await authRequest("securetoken.googleapis.com", "/v1/token", new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: saved.refreshToken
      }));
      rememberLiveAuth(refreshed.user_id, refreshed.id_token, refreshed.refresh_token, refreshed.expires_in);
      return liveAuth.idToken;
    } catch (error) {
      if (!error.authRejected) throw error;
    }
  }
  const created = await authRequest("identitytoolkit.googleapis.com", "/v1/accounts:signUp", JSON.stringify({ returnSecureToken: true }));
  rememberLiveAuth(created.localId, created.idToken, created.refreshToken, created.expiresIn);
  return liveAuth.idToken;
}

function showLiveTeacherId() {
  if (els.liveTeacherId) els.liveTeacherId.value = liveAuth.uid || "";
}

function buildStudentLiveUrl() {
  if (!liveSync.dbUrl || !liveSync.room) return "";
  const url = new URL("./eleve.html", window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("live", liveSync.room);
  url.searchParams.set("db", encodeLiveValue(liveSync.dbUrl));
  url.searchParams.set("scenario", state.scenario?.id || "");
  return url.toString();
}

function setLiveStatus(kind, label) {
  const status = els.liveClassStatus;
  if (status) {
    status.hidden = false;
    status.dataset.kind = kind;
    const text = status.querySelector("strong");
    if (text) text.textContent = label;
  }
  if (els.liveDialogStatus) {
    els.liveDialogStatus.dataset.kind = kind;
    els.liveDialogStatus.textContent = label;
  }
  if (els.composeLiveHint) {
    els.composeLiveHint.textContent = liveSync.enabled
      ? `Diffusion immédiate dans la séance ${liveSync.room}`
      : "Publication locale : démarrez une séance en direct pour la diffuser aux élèves.";
  }
}

function saveLiveConfig(active = liveSync.enabled) {
  if (!isTeacherPage()) return;
  localStorage.setItem("veille-ili:live-config", JSON.stringify({
    dbUrl: liveSync.dbUrl,
    apiKey: liveSync.apiKey,
    room: liveSync.room,
    expiresAt: liveSync.expiresAt,
    active
  }));
}

function liveText(value, maxLength) {
  return typeof value === "string" ? value.slice(0, maxLength) : "";
}

function liveCount(value) {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function deserializeLiveMedia(raw) {
  if (!raw || typeof raw !== "object") return null;
  const media = {
    kind: liveText(raw.kind, 40) || "photo",
    title: liveText(raw.title, 160),
    caption: liveText(raw.caption, 240),
    trace: liveText(raw.trace, 20)
  };
  if (typeof raw.asset === "string" && Object.hasOwn(evidenceAssets, raw.asset)) return { ...media, asset: raw.asset };
  if (typeof raw.dataUrl === "string" && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(raw.dataUrl)) {
    return { ...media, dataUrl: raw.dataUrl };
  }
  return null;
}

function deserializeLiveComments(rawComments, scenario, postId) {
  const list = Array.isArray(rawComments) ? rawComments : Object.values(rawComments || {});
  return list.slice(0, 20).map((comment, index) => {
    const handle = typeof comment?.actor === "string" ? comment.actor : comment?.actor?.handle;
    return {
      id: `${postId}-comment-${index}`,
      actor: actorByHandle(scenario, handle),
      content: liveText(comment?.content, 520),
      likes: liveCount(comment?.likes)
    };
  }).filter((comment) => comment.actor && comment.content);
}

function serializeLiveComments(comments) {
  return (comments || []).map((comment) => ({
    id: comment.id,
    actor: comment.actor?.handle || comment.actor,
    content: comment.content,
    likes: Number(comment.likes) || 0
  }));
}

function deserializeLivePost(raw, scenario) {
  if (!raw || typeof raw !== "object" || raw.scenarioId !== scenario.id) return null;
  const actor = actorByHandle(scenario, raw.actor);
  if (!actor) return null;
  const id = liveText(raw.id, 120).replace(/[^A-Za-z0-9_-]/g, "");
  if (!id) return null;
  const now = parisNow();
  const parsedDate = new Date(raw.liveDate);
  const liveDate = Number.isNaN(parsedDate.getTime()) ? now : parsedDate;
  return normalizePostEngagement({
    id,
    scenarioId: scenario.id,
    actor,
    content: liveText(raw.content, 520),
    language: /^[a-z]{2}$/.test(raw.language) ? raw.language : actor.language || "fr",
    translation: liveText(raw.translation, 1200),
    likes: liveCount(raw.likes),
    reposts: liveCount(raw.reposts),
    replies: liveCount(raw.replies),
    media: deserializeLiveMedia(raw.media),
    liveDate,
    time: formatTime(liveDate),
    relativeTime: formatRelativeTime(liveDate, now),
    teacherCreated: true,
    liveRemote: true,
    comments: deserializeLiveComments(raw.comments, scenario, id)
  }, now);
}

function mergeLivePosts(posts, scenario) {
  const remote = liveSync.remotePosts.map((post) => deserializeLivePost(post, scenario)).filter(Boolean);
  const unique = new Map([...posts, ...remote].map((post) => [post.id, post]));
  return [...unique.values()].sort((a, b) => b.liveDate - a.liveDate);
}

function connectLiveStream() {
  if (!liveSync.enabled || !liveSync.dbUrl || !liveSync.room) return;
  if (liveSync.stream) liveSync.stream.close();
  window.clearTimeout(liveSync.reconnectTimer);
  try {
    const stream = new EventSource(liveRoomEndpoint());
    liveSync.stream = stream;
    const refresh = () => {
      liveSync.signature = "";
      pollLiveRoom();
    };
    stream.addEventListener("put", refresh);
    stream.addEventListener("patch", refresh);
    stream.addEventListener("cancel", () => setLiveStatus("error", "Accès au direct refusé"));
    stream.addEventListener("auth_revoked", () => setLiveStatus("error", "Accès au direct expiré"));
    stream.onopen = () => setLiveStatus("connected", `Direct ${liveSync.room}`);
    stream.onerror = () => {
      stream.close();
      if (liveSync.stream === stream) liveSync.stream = null;
      if (liveSync.enabled) {
        setLiveStatus("connecting", "Reconnexion au direct");
        liveSync.reconnectTimer = window.setTimeout(connectLiveStream, 3500);
      }
    };
  } catch (error) {
    scheduleLivePoll(1800);
  }
}

function scheduleLivePoll(delay = liveSync.pollDelay) {
  window.clearTimeout(liveSync.timer);
  if (liveSync.enabled) liveSync.timer = window.setTimeout(pollLiveRoom, delay);
}

async function pollLiveRoom() {
  if (!liveSync.enabled || liveSync.inFlight) return;
  liveSync.inFlight = true;
  try {
    const snapshot = await liveRequest();
    const meta = snapshot?.meta || {};
    if (meta.active === false) {
      setLiveStatus("waiting", "Séance terminée");
      scheduleLivePoll(4000);
      return;
    }
    const remotePosts = Object.values(snapshot?.posts || {});
    const signature = JSON.stringify({
      scenarioId: meta.scenarioId || "",
      ids: remotePosts.map((post) => `${post.id}:${post.liveDate}`).sort()
    });
    liveSync.remotePosts = remotePosts;
    if (signature !== liveSync.signature) {
      liveSync.signature = signature;
      const nextScenario = state.scenarios.find((item) => item.id === meta.scenarioId);
      if (nextScenario && state.scenario?.id !== nextScenario.id) {
        if (els.scenarioSelect) els.scenarioSelect.value = nextScenario.id;
        await loadScenario(nextScenario.id);
      } else if (state.scenario) {
        const localPosts = state.posts.filter((post) => !post.liveRemote);
        state.posts = mergeLivePosts(localPosts, state.scenario);
        renderScenarioInfo();
        renderFeed();
      }
    }
    setLiveStatus("connected", `Direct ${liveSync.room}`);
  } catch (error) {
    setLiveStatus("error", "Direct déconnecté");
  } finally {
    liveSync.inFlight = false;
    scheduleLivePoll();
  }
}

async function publishCurrentSession(active) {
  if (!isTeacherPage() || !liveSync.dbUrl || !liveSync.room) return false;
  try {
    const token = await ensureLiveAuth();
    await liveFetch(liveEndpoint("current", token), {
      method: "PUT",
      body: JSON.stringify({
        room: liveSync.room,
        scenarioId: state.scenario?.id || "",
        owner: liveAuth.uid,
        expiresAt: liveSync.expiresAt,
        active,
        updatedAt: new Date().toISOString()
      })
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function announceLiveScenario() {
  if (!isTeacherPage() || !liveSync.enabled || !state.scenario) return;
  try {
    await liveRequest("meta", {
      method: "PATCH",
      auth: true,
      body: JSON.stringify({
        scenarioId: state.scenario.id,
        scenarioTitle: state.scenario.title,
        updatedAt: new Date().toISOString(),
        active: true
      })
    });
    await publishCurrentSession(true);
  } catch (error) {
    setLiveStatus("error", "Direct déconnecté");
  }
}

async function publishLivePost(post) {
  if (!isTeacherPage() || !liveSync.enabled) return;
  const { suspect, reason, ...shared } = serializeTeacherPost(post);
  const payload = { ...shared, comments: serializeLiveComments(post.comments) };
  try {
    await liveRequest(`posts/${post.id}`, { method: "PUT", auth: true, body: JSON.stringify(payload) });
    await announceLiveScenario();
    setLiveStatus("connected", `Publié dans ${liveSync.room}`);
  } catch (error) {
    setLiveStatus("error", "Publication locale uniquement");
    alert(`Le post est conservé localement, mais sa diffusion en direct a échoué : ${error.message}`);
  }
}

async function deleteLivePost(postId) {
  if (!isTeacherPage() || !liveSync.enabled) return;
  try {
    await liveRequest(`posts/${postId}`, { method: "DELETE", auth: true });
  } catch (error) {
    setLiveStatus("error", "Suppression distante impossible");
  }
}

function fillLiveDialog() {
  if (!els.liveDialog) return;
  if (!liveSync.room) liveSync.room = createLiveRoomCode();
  els.liveDbUrl.value = liveSync.dbUrl;
  if (els.liveApiKey) els.liveApiKey.value = liveSync.apiKey;
  els.liveRoomCode.value = liveSync.room;
  els.liveStudentLink.value = buildStudentLiveUrl();
  showLiveTeacherId();
  setLiveStatus(liveSync.enabled ? "connected" : "waiting", liveSync.enabled ? `Direct ${liveSync.room}` : "Séance hors ligne");
  if (liveSync.apiKey && !liveAuth.uid) {
    ensureLiveAuth().then(showLiveTeacherId).catch((error) => setLiveStatus("error", error.message));
  }
}

function openLiveDialog() {
  fillLiveDialog();
  els.liveDialog?.showModal();
}

async function startLiveSession() {
  try {
    liveSync.dbUrl = normalizeLiveDbUrl(els.liveDbUrl?.value);
    liveSync.apiKey = String(els.liveApiKey?.value || "").trim();
    liveSync.room = normalizeLiveRoom(els.liveRoomCode?.value || createLiveRoomCode());
    await ensureLiveAuth();
    showLiveTeacherId();
    liveSync.enabled = true;
    const meta = {
      active: true,
      owner: liveAuth.uid,
      scenarioId: state.scenario?.id || "",
      scenarioTitle: state.scenario?.title || "",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: Date.now() + 12 * 60 * 60 * 1000
    };
    liveSync.expiresAt = meta.expiresAt;
    await liveRequest("meta", { method: "PUT", auth: true, body: JSON.stringify(meta) });
    saveLiveConfig(true);
    liveSync.signature = "";
    els.liveStudentLink.value = buildStudentLiveUrl();
    const announced = await publishCurrentSession(true);
    setLiveStatus("connected", announced ? `Direct ${liveSync.room}` : `Direct ${liveSync.room} · lien élève requis`);
    connectLiveStream();
    scheduleLivePoll(0);
  } catch (error) {
    liveSync.enabled = false;
    setLiveStatus("error", "Connexion impossible");
    alert(error.message);
  }
}

async function stopLiveSession() {
  if (liveSync.enabled) {
    try {
      await liveRequest("meta", { method: "PATCH", auth: true, body: JSON.stringify({ active: false, updatedAt: new Date().toISOString() }) });
      const current = await liveFetch(liveEndpoint("current"));
      if (current?.room === liveSync.room) await publishCurrentSession(false);
    } catch (error) {
      // La séance locale doit pouvoir être arrêtée même si le réseau est indisponible.
    }
  }
  liveSync.enabled = false;
  window.clearTimeout(liveSync.timer);
  window.clearTimeout(liveSync.reconnectTimer);
  if (liveSync.stream) liveSync.stream.close();
  liveSync.stream = null;
  saveLiveConfig(false);
  setLiveStatus("waiting", "Séance hors ligne");
}

async function copyStudentLiveLink() {
  const link = buildStudentLiveUrl();
  if (!link) return;
  els.liveStudentLink.value = link;
  await navigator.clipboard.writeText(link);
  setLiveStatus("connected", "Lien élève copié");
}

function joinLiveRoom(room) {
  liveSync.room = room;
  liveSync.enabled = true;
  liveSync.signature = "";
  liveSync.remotePosts = [];
  setLiveStatus("connecting", "Connexion au direct");
  connectLiveStream();
  scheduleLivePoll(0);
}

function scheduleCurrentPoll(delay = liveSync.pollDelay) {
  window.clearTimeout(liveSync.currentTimer);
  liveSync.currentTimer = window.setTimeout(checkCurrentSession, delay);
}

async function checkCurrentSession() {
  try {
    const current = await liveFetch(liveEndpoint("current"));
    if (current?.active && Number(current.expiresAt) > Date.now()) {
      const room = normalizeLiveRoom(current.room);
      if (room !== liveSync.room || !liveSync.enabled) joinLiveRoom(room);
    } else if (!liveSync.enabled) {
      setLiveStatus("waiting", "En attente de la séance");
    }
  } catch (error) {
    if (!liveSync.enabled) setLiveStatus("error", "Direct indisponible");
  } finally {
    scheduleCurrentPoll();
  }
}

function connectCurrentStream() {
  if (liveSync.currentStream) liveSync.currentStream.close();
  window.clearTimeout(liveSync.currentReconnectTimer);
  try {
    const stream = new EventSource(liveEndpoint("current"));
    liveSync.currentStream = stream;
    stream.addEventListener("put", checkCurrentSession);
    stream.addEventListener("patch", checkCurrentSession);
    stream.onerror = () => {
      stream.close();
      if (liveSync.currentStream === stream) liveSync.currentStream = null;
      liveSync.currentReconnectTimer = window.setTimeout(connectCurrentStream, 3500);
    };
  } catch (error) {
    scheduleCurrentPoll(1800);
  }
}

function followCurrentSession() {
  setLiveStatus("waiting", "En attente de la séance");
  connectCurrentStream();
  scheduleCurrentPoll(0);
}

function initializeLiveSync() {
  const params = new URLSearchParams(window.location.search);
  const config = directConfig();
  if (isTeacherPage()) {
    try {
      const saved = JSON.parse(localStorage.getItem("veille-ili:live-config") || "{}");
      liveSync.dbUrl = saved.dbUrl || config.dbUrl;
      liveSync.apiKey = saved.apiKey || config.apiKey;
      liveSync.expiresAt = Number(saved.expiresAt || 0);
      liveSync.room = liveSync.expiresAt > Date.now() ? (saved.room || "") : "";
      liveSync.enabled = Boolean(saved.active && liveSync.dbUrl && liveSync.room && liveSync.expiresAt > Date.now());
    } catch (error) {
      liveSync.enabled = false;
    }
  } else if (params.get("live") && params.get("db")) {
    try {
      liveSync.room = normalizeLiveRoom(params.get("live"));
      liveSync.dbUrl = normalizeLiveDbUrl(decodeLiveValue(params.get("db")));
      liveSync.enabled = true;
    } catch (error) {
      liveSync.enabled = false;
    }
  } else if (config.dbUrl) {
    try {
      liveSync.dbUrl = normalizeLiveDbUrl(config.dbUrl);
      followCurrentSession();
    } catch (error) {
      setLiveStatus("error", "Direct mal configuré");
    }
  }
  if (liveSync.enabled) {
    setLiveStatus("connecting", "Connexion au direct");
    connectLiveStream();
    scheduleLivePoll(0);
  } else if (isTeacherPage()) {
    setLiveStatus("waiting", "Séance hors ligne");
  }
}
// VEILLE-ILI LIVE SYNC END

function selectedComposeActor() {
  return actorByHandle(state.scenario, els.composeActorSelect?.value);
}

function composeSuspect(actor) {
  return actor?.trust === "low" || actor?.stance === "amplifier";
}

function composeSelectedMedia() {
  const asset = els.composeMediaSelect?.value || "";
  return (state.scenario?.mediaLabels || []).find((media) => media.asset === asset) || null;
}

function updateComposePreview(src = "") {
  if (!els.composePreview) return;
  if (!src) {
    els.composePreview.hidden = true;
    els.composePreview.innerHTML = "";
    return;
  }
  els.composePreview.hidden = false;
  els.composePreview.innerHTML = `<img src="${escapeHtml(src)}" alt="Aperçu du visuel" />`;
}

function openPostComposer() {
  if (!state.scenario || !els.composeDialog) return;
  els.composeActorSelect.innerHTML = state.scenario.actors
    .map((actor) => `<option value="${escapeHtml(actor.handle)}">${escapeHtml(actor.name)} · ${escapeHtml(actor.handle)}</option>`)
    .join("");
  els.composeMediaSelect.innerHTML = `<option value="">Sans illustration</option>${(state.scenario.mediaLabels || [])
    .map((media) => `<option value="${escapeHtml(media.asset || "")}">${escapeHtml(media.title || media.asset || "Illustration")}</option>`)
    .join("")}`;
  els.composeText.value = "";
  els.composeUpload.value = "";
  state.composeVisual = null;
  updateComposePreview();
  if (els.composeLiveHint) {
    els.composeLiveHint.textContent = liveSync.enabled
      ? `Diffusion immédiate dans la séance ${liveSync.room}`
      : "Publication locale : démarrez une séance en direct pour la diffuser aux élèves.";
  }
  els.composeDialog.showModal();
}

function generateComposeText() {
  const actor = selectedComposeActor();
  if (!actor) return;
  const random = mulberry32(hashSeed(`${state.scenario.id}:${actor.handle}:${Date.now()}`));
  const suspect = composeSuspect(actor);
  const media = composeSelectedMedia();
  let content = "";
  if (isTeacherOnlyActor(actor)) {
    content = officialMilitaryPostContent(state.scenario, random);
  } else if (isPoliticalActor(actor)) {
    content = politicalPostContent(actor, state.scenario, random);
  } else if (isAdversarialActor(actor)) {
    content = adversarialPostMessage(actor, state.scenario, random).content;
  } else if (isNgoActor(actor)) {
    content = ngoPostMessage(actor, state.scenario, random).content;
  } else if (isFieldSourceActor(actor)) {
    content = fieldSourcePostMessage(actor, state.scenario, random).content;
  } else if (isMediaNetworkActor(actor)) {
    content = mediaPostMessage(actor, state.scenario, random).content;
  } else if (isBotRelayActor(actor)) {
    content = botRelayMessage(actor, state.scenario, random);
  } else if (isChinaMediaActor(actor)) {
    content = chinaPostMessage(actor, state.scenario, random).content;
  } else if (media) {
    content = contentForSelectedMedia(state.scenario, media, suspect, random);
  } else if (isDistractorActor(actor)) {
    content = distractorPostContent(actor, random);
  } else {
    const templates = suspect ? state.scenario.suspectTemplates : state.scenario.normalTemplates;
    content = pick(templates, random);
  }
  els.composeText.value = content;
}

function previewSelectedComposeMedia() {
  state.composeVisual = null;
  const media = composeSelectedMedia();
  updateComposePreview(media?.asset ? evidenceAssets[media.asset] : "");
}

function drawImageCover(context, image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((item, index) => {
    const suffix = index === maxLines - 1 && lines.length > maxLines ? "…" : "";
    context.fillText(`${item}${suffix}`, x, y + index * lineHeight);
  });
}

async function generateComposeVisual() {
  const actor = selectedComposeActor();
  if (!actor) return;
  if (!els.composeText.value.trim()) generateComposeText();
  let media = composeSelectedMedia();
  if (!media) {
    const random = mulberry32(hashSeed(`${state.scenario.id}:compose-media:${Date.now()}`));
    media = coherentMediaForPost(state.scenario.mediaLabels || [], els.composeText.value, actor, random, 2);
    if (!media && (state.scenario.mediaLabels || []).length) media = structuredClone(state.scenario.mediaLabels[0]);
    if (media?.asset) els.composeMediaSelect.value = media.asset;
  }
  if (media
      && !isPoliticalActor(actor)
      && !isAdversarialActor(actor)
      && !isNgoActor(actor)
      && !isFieldSourceActor(actor)
      && !isMediaNetworkActor(actor)
      && !isTeacherOnlyActor(actor)
      && !isChinaMediaActor(actor)
      && mediaMatchScore(media, els.composeText.value, actor) < 4) {
    const random = mulberry32(hashSeed(`${state.scenario.id}:${actor.handle}:compose-copy:${Date.now()}`));
    els.composeText.value = contentForSelectedMedia(state.scenario, media, composeSuspect(actor), random);
  }
  const src = media?.asset ? evidenceAssets[media.asset] : "";
  if (!src) return;
  const image = new Image();
  image.src = src;
  await image.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const context = canvas.getContext("2d");
  drawImageCover(context, image, canvas.width, canvas.height);
  const gradient = context.createLinearGradient(0, 300, 0, 675);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,.9)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.font = "700 34px Arial";
  context.fillText(actor.name, 56, 500);
  context.font = "24px Arial";
  context.fillStyle = "rgba(255,255,255,.82)";
  context.fillText(actor.handle, 56, 538);
  context.font = "700 31px Arial";
  context.fillStyle = "#ffffff";
  wrapCanvasText(context, els.composeText.value.trim(), 56, 588, 1088, 38, 2);
  state.composeVisual = canvas.toDataURL("image/jpeg", 0.86);
  updateComposePreview(state.composeVisual);
}

// Les règles Firebase limitent media.dataUrl à 1 000 000 caractères.
async function downscaleComposeImage(src, maxSide = 1200) {
  const image = new Image();
  image.src = src;
  await image.decode();
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.86);
}

function importComposeImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", async () => {
    const original = String(reader.result || "");
    try {
      state.composeVisual = await downscaleComposeImage(original);
    } catch (error) {
      state.composeVisual = original;
    }
    els.composeMediaSelect.value = "";
    updateComposePreview(state.composeVisual);
  });
  reader.readAsDataURL(file);
}

async function publishComposePost() {
  const actor = selectedComposeActor();
  if (!actor) return;
  if (!els.composeText?.value.trim()) generateComposeText();
  const content = els.composeText?.value.trim();
  if (!content) {
    if (els.composeLiveHint) els.composeLiveHint.textContent = "Ajoutez un message avant de publier.";
    els.composeText?.focus();
    return;
  }
  const publishButton = els.publishComposePost;
  const originalLabel = publishButton?.textContent || "Publier maintenant";
  if (publishButton) {
    publishButton.disabled = true;
    publishButton.textContent = "Publication…";
  }
  try {
    const liveDate = parisNow();
    const suspect = composeSuspect(actor);
    const selectedMedia = composeSelectedMedia();
    const media = state.composeVisual
      ? { kind: "photo", title: "Visuel créé par l'enseignant", caption: "", dataUrl: state.composeVisual, trace: "fr" }
      : selectedMedia ? structuredClone(selectedMedia) : null;
    let post = {
      id: `${state.scenario.id}-teacher-${Date.now()}`,
      actor,
      content,
      language: actor.language || "fr",
      suspect,
      reason: "Publication créée en direct par l'enseignant.",
      likes: 4 + Math.floor(Math.random() * 15),
      reposts: Math.floor(Math.random() * 5),
      replies: Math.floor(Math.random() * 4),
      media,
      liveDate,
      time: formatTime(liveDate),
      relativeTime: "à l'instant",
      teacherCreated: true,
      comments: []
    };
    post = normalizePostEngagement(post, liveDate);
    state.posts = [post, ...state.posts];
    persistTeacherPosts();
    renderScenarioInfo();
    renderFeed();
    els.composeDialog.close();
    publishLivePost(post).catch((error) => {
      console.warn("Publication locale réussie, diffusion en direct indisponible.", error);
      setLiveStatus("error", "Publication locale uniquement");
    });
  } catch (error) {
    console.error("Impossible de publier", error);
    if (els.composeLiveHint) els.composeLiveHint.textContent = "La publication a échoué. Réessayez sans image ou actualisez la page.";
  } finally {
    if (publishButton) {
      publishButton.disabled = false;
      publishButton.textContent = originalLabel;
    }
  }
}

function deleteTeacherPost(postId) {
  deleteLivePost(postId);
  state.posts = state.posts.filter((post) => post.id !== postId || !post.teacherCreated);
  persistTeacherPosts();
  renderScenarioInfo();
  renderFeed();
}

const adminAccountLabels = {
  political: "Compte politique",
  distractor: "Bruit hors sujet",
  ngo: "ONG",
  adversarial: "Média d'influence étatique",
  field_source: "Source terrain",
  media_network: "Média",
  teacher_only: "Compte officiel des armées",
  bot_relay: "Bot ou relais coordonné",
  china_media: "Média d'État chinois",
  official: "Compte officiel",
  fact_checker: "Vérificateur",
  citizen: "Citoyen",
  alternative_media: "Média alternatif",
  analyst: "Analyste"
};
const adminStanceLabels = {
  official: "Compte officiel",
  media: "Média",
  analyst: "Analyste OSINT",
  citizen: "Citoyen",
  amplifier: "Amplificateur",
  news: "Actualité",
  source: "Source",
  journalist: "Journaliste",
  ngo: "ONG",
  political: "Compte politique"
};
const adminTrustLabels = { high: "fiabilité élevée", medium: "fiabilité moyenne", low: "fiabilité faible" };
const adminPasswordKey = "veille-ili:admin-password";
const decryptionKeys = new Map();

function base64Bytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

// Mirrors encrypt in tools/build.js.
async function decryptPayload(payload, password) {
  const subtle = window.crypto?.subtle;
  if (!subtle) throw new Error("Déchiffrement indisponible dans ce navigateur.");
  const cacheKey = `${payload.salt}:${payload.iterations}:${password}`;
  if (!decryptionKeys.has(cacheKey)) {
    decryptionKeys.set(cacheKey, subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"])
      .then((baseKey) => subtle.deriveKey(
        { name: "PBKDF2", salt: base64Bytes(payload.salt), iterations: payload.iterations, hash: "SHA-256" },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      )));
  }
  try {
    const plaintext = await subtle.decrypt({ name: "AES-GCM", iv: base64Bytes(payload.iv) }, await decryptionKeys.get(cacheKey), base64Bytes(payload.data));
    return new TextDecoder().decode(plaintext);
  } catch (error) {
    throw new Error("Mot de passe incorrect.");
  }
}

function rememberAdminPassword(password) {
  try {
    sessionStorage.setItem(adminPasswordKey, password);
  } catch (error) {
    // Sans stockage de session, le mot de passe sera redemandé au prochain chargement.
  }
}

function storedAdminPassword() {
  try {
    return sessionStorage.getItem(adminPasswordKey) || "";
  } catch (error) {
    return "";
  }
}

async function unlockAnswerSheet(password) {
  const scenarioId = state.scenario?.id;
  if (!scenarioId) return;
  const payload = await loadRegistryScript(`data/corrige/${encodeURIComponent(scenarioId)}.js`, "veilleIliAnswerSheets", scenarioId);
  const sheet = JSON.parse(await decryptPayload(payload, password));
  if (state.scenario?.id !== scenarioId) return;
  state.answerSheet = sheet;
  rememberAdminPassword(password);
}

async function unlockTeacherPage(password) {
  const payload = await loadRegistryScript("data/enseignant/engine.js", "veilleIliTeacherBundle", "engine");
  const engine = document.createElement("script");
  engine.textContent = await decryptPayload(payload, password);
  document.head.append(engine);
  state.teacherPassword = password;
  rememberAdminPassword(password);
}

function ensureTeacherUnlocked() {
  return unlockTeacherPage(storedAdminPassword()).catch(() => new Promise((resolve) => {
    els.unlockForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      els.unlockSubmit.disabled = true;
      try {
        await unlockTeacherPage(els.unlockPassword.value);
        els.unlockDialog.close();
        resolve();
      } catch (error) {
        els.unlockError.textContent = error.message;
        els.unlockError.hidden = false;
      } finally {
        els.unlockSubmit.disabled = false;
      }
    });
    els.unlockDialog.addEventListener("cancel", (event) => event.preventDefault());
    els.unlockDialog.showModal();
    els.unlockPassword.focus();
  }));
}

function postVerdict(post) {
  if (state.answerSheet) return state.answerSheet.posts[post.sourceId || post.id] || null;
  return typeof post.suspect === "boolean" ? { suspect: post.suspect, reason: post.reason || "" } : null;
}

function accountVerdict(actor) {
  const data = state.answerSheet ? state.answerSheet.actors[actor.handle] || {} : actor;
  const kind = adminAccountLabels[data.accountType] || adminStanceLabels[data.stance] || "Compte non classé";
  const trust = adminTrustLabels[data.trust];
  return trust ? `${kind}, ${trust}` : kind;
}

function renderAdminFlag(post) {
  if (!state.adminMode) return "";
  const verdict = postVerdict(post);
  const label = post.teacherCreated ? "Publication enseignant" : !verdict ? "Non classé" : verdict.suspect ? "Suspect" : "Non signalé";
  const kind = verdict?.suspect ? "suspect" : verdict ? "clear" : "unknown";
  return `
        <div class="admin-flag" data-kind="${kind}">
          <strong>${escapeHtml(label)}</strong>
          ${verdict?.reason ? `<span>${escapeHtml(verdict.reason)}</span>` : ""}
          <small>${escapeHtml(accountVerdict(post.actor))}</small>
        </div>`;
}

function renderAdminPanel() {
  if (!els.adminPanel) return;
  const clues = state.answerSheet?.clues || state.scenario?.clues || [];
  els.adminPanel.hidden = !state.adminMode;
  els.adminClues.innerHTML = clues.length
    ? clues.map((clue) => `<li>${escapeHtml(clue)}</li>`).join("")
    : "<li>Aucun indice renseigné pour ce scénario.</li>";
}

function setAdminMode(enabled) {
  state.adminMode = enabled;
  if (els.adminToggle) {
    els.adminToggle.setAttribute("aria-pressed", String(enabled));
    els.adminToggle.textContent = enabled ? "Quitter le mode admin" : "Mode admin";
  }
  renderAdminPanel();
  renderFeed();
}

async function refreshAdminMode() {
  state.answerSheet = null;
  if (!state.adminMode || isTeacherPage()) {
    renderAdminPanel();
    return;
  }
  try {
    await unlockAnswerSheet(storedAdminPassword());
  } catch (error) {
    setAdminMode(false);
    return;
  }
  renderAdminPanel();
  renderFeed();
}

function forgetAdminPassword() {
  try {
    sessionStorage.removeItem(adminPasswordKey);
  } catch (error) {
    // Rien à effacer si le stockage de session est indisponible.
  }
}

function toggleAdminMode() {
  if (state.adminMode) {
    state.answerSheet = null;
    if (!isTeacherPage()) forgetAdminPassword();
    setAdminMode(false);
    return;
  }
  if (isTeacherPage()) {
    setAdminMode(true);
    return;
  }
  els.adminPassword.value = "";
  els.adminError.hidden = true;
  els.adminDialog.showModal();
}

async function submitAdminPassword(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const password = els.adminPassword.value;
  if (!password) return;
  els.adminUnlock.disabled = true;
  try {
    await unlockAnswerSheet(password);
    els.adminDialog.close();
    setAdminMode(true);
  } catch (error) {
    els.adminError.textContent = error.message;
    els.adminError.hidden = false;
  } finally {
    els.adminUnlock.disabled = false;
  }
}

function bindEvents() {
  if (els.scenarioSelect) els.scenarioSelect.addEventListener("change", (event) => { loadScenario(event.target.value).then(announceLiveScenario); });
  if (els.searchInput) els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderFeed();
  });
  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".segment").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      state.filter = button.dataset.filter;
      renderFeed();
    });
  });
  if (els.refreshFeedBtn) els.refreshFeedBtn.addEventListener("click", refreshFeedManually);
  if (els.composePostBtn) els.composePostBtn.addEventListener("click", openPostComposer);
  if (els.generateComposeText) els.generateComposeText.addEventListener("click", generateComposeText);
  if (els.generateComposeVisual) els.generateComposeVisual.addEventListener("click", generateComposeVisual);
  if (els.composeMediaSelect) els.composeMediaSelect.addEventListener("change", previewSelectedComposeMedia);
  if (els.composeUpload) els.composeUpload.addEventListener("change", (event) => importComposeImage(event.target.files[0]));
  if (els.publishComposePost) els.publishComposePost.addEventListener("click", publishComposePost);
  if (els.liveSessionBtn) els.liveSessionBtn.addEventListener("click", openLiveDialog);
  if (els.startLiveSession) els.startLiveSession.addEventListener("click", startLiveSession);
  if (els.stopLiveSession) els.stopLiveSession.addEventListener("click", stopLiveSession);
  if (els.copyStudentLiveLink) els.copyStudentLiveLink.addEventListener("click", copyStudentLiveLink);
  if (els.feed) els.feed.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const post = event.target.closest(".post");
    if (!post) return;
    if (button.dataset.action === "profile") openProfile(button.dataset.handle);
    if (button.dataset.action === "flag") toggleFlag(post.dataset.postId);
    if (button.dataset.action === "annotate") openAnnotation(post.dataset.postId);
    if (button.dataset.action === "delete-teacher") deleteTeacherPost(post.dataset.postId);
    if (button.dataset.action === "translate-post") {
      const translation = post.querySelector(".post-translation");
      if (translation) {
        translation.hidden = !translation.hidden;
        button.setAttribute("aria-expanded", String(!translation.hidden));
        button.textContent = translation.hidden ? "Traduire le post" : "Masquer la traduction";
      }
    }
  });
  if (els.clearFlags) els.clearFlags.addEventListener("click", () => {
    state.flags.clear();
    renderFeed();
    renderFlags();
  });
  if (els.saveAnnotation) els.saveAnnotation.addEventListener("click", saveAnnotation);
  if (els.importBtn) els.importBtn.addEventListener("click", () => els.fileInput.click());
  if (els.fileInput) els.fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await importScenario(file);
    } catch (error) {
      alert(`Import impossible : ${error.message}`);
    } finally {
      event.target.value = "";
    }
  });
  if (els.exportBtn) els.exportBtn.addEventListener("click", exportScenario);
  if (els.adminToggle) els.adminToggle.addEventListener("click", toggleAdminMode);
  if (els.adminForm) els.adminForm.addEventListener("submit", submitAdminPassword);
  if (els.teacherToggle) els.teacherToggle.addEventListener("click", () => {
    if (els.scenarioEditor) els.scenarioEditor.value = JSON.stringify(state.scenario, null, 2);
    renderAnswerKey();
    els.teacherDialog.showModal();
  });
  if (els.applyScenario) els.applyScenario.addEventListener("click", applyScenarioJson);
  if (els.copyTemplate) els.copyTemplate.addEventListener("click", () => {
    els.scenarioEditor.value = JSON.stringify(emptyTemplate(), null, 2);
  });
}

renderScenarioOptions();
bindEvents();
// VEILLE-ILI BOOTSTRAP START
const requestedScenario = new URLSearchParams(window.location.search).get("scenario");

async function startPage() {
  if (isTeacherPage()) await ensureTeacherUnlocked();
  await loadScenario(state.scenarios.some((item) => item.id === requestedScenario) ? requestedScenario : state.scenarios[0].id);
}

// tools/build.js evaluates this file with data-mode="build" to reuse its helpers without starting the page.
if (document.body.dataset.mode !== "build") {
  startPage()
    .catch((error) => console.error(error))
    .finally(initializeLiveSync);
}
// VEILLE-ILI BOOTSTRAP END
