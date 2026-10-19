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
  liveRoomCode: document.querySelector("#liveRoomCode"),
  liveStudentLink: document.querySelector("#liveStudentLink"),
  liveDialogStatus: document.querySelector("#liveDialogStatus"),
  startLiveSession: document.querySelector("#startLiveSession"),
  stopLiveSession: document.querySelector("#stopLiveSession"),
  copyStudentLiveLink: document.querySelector("#copyStudentLiveLink")
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

function distractorPostContent(actor, random) {
  const general = [
    "Prix à la pompe encore en hausse dans plusieurs stations autour de chez moi. La file est plus longue que d'habitude, mais chacun raconte une version différente. #Carburants",
    "Entre météo lourde, transports ralentis et factures qui montent, la journée ressemble déjà à un fil d'alertes permanent.",
    "Rappel utile : une capture d'écran très partagée peut seulement prouver qu'une capture circule, pas que l'information est confirmée.",
    "Les groupes locaux s'enflamment pour trois sirènes entendues près de la rocade. Pour l'instant, aucune confirmation officielle.",
    "Tout le monde commente le budget, mais presque personne ne lit les textes complets. Les extraits isolés font n'importe quoi.",
    "Nouvelle rumeur sur une pénurie dans les supermarchés. J'ai vérifié deux magasins : rayons normaux, ambiance surtout nerveuse.",
    "Une vidéo de manifestation tourne avec trois dates différentes. Internet adore recycler les images quand l'actualité est tendue.",
    "Le débat du jour est parti d'une photo recadrée. Sans lieu, sans date et sans auteur, c'est surtout une invitation à ralentir.",
    "Les notifications donnent l'impression que tout explose en même temps. En vrai, beaucoup de sujets n'ont aucun lien entre eux.",
    "Fil à garder sous la main : source primaire, date, lieu, auteur, puis interprétation. Pas l'inverse."
  ];
  const byHandle = {
    "@carbu_minute": [
      "Gazole très commenté ce matin : certains annoncent déjà une ruée, d'autres voient juste un ajustement local. Regardez les stations autour de vous avant de paniquer. #PrixDuGazole",
      "Plusieurs abonnés signalent des écarts de prix importants entre deux stations à moins de 8 km. Capture de ticket ou rien, sinon ça devient une légende urbaine.",
      "Les aides carburant font repartir les intox : non, un message WhatsApp ne remplace pas une page officielle.",
      "Le flux officiel des prix à la pompe est actualisé plusieurs fois par heure. Un ticket isolé ne décrit pas la situation nationale. #PrixÀLaPompe"
    ],
    "@meteo_fil": [
      "La chaleur tardive fatigue tout le monde, mais les cartes alarmistes sans source circulent beaucoup plus vite que les bulletins complets. #Météo",
      "Orages possibles ce soir sur une partie du pays. Ne transformons pas chaque ciel orange en catastrophe nationale.",
      "Deux cartes météo virales ce matin, deux échelles différentes. Ça change complètement la lecture.",
      "Après un épisode de chaleur remarquable pour septembre, la sécheresse entretient encore un danger de feux inhabituellement tardif. #FortesChaleurs #FeuxDeForêt"
    ],
    "@trafic_rail_idf": [
      "Retards en cascade sur plusieurs lignes. Les captures d'appli sont utiles, mais elles vieillissent vite : vérifiez l'heure avant de relayer. #TER",
      "Quai bondé, annonces contradictoires, et déjà trois explications différentes dans les commentaires.",
      "Un incident local peut devenir une fausse 'paralysie nationale' en dix minutes quand tout le monde recopie le même message."
    ],
    "@panier_conso": [
      "Le panier moyen fait encore débat : certains prix montent, d'autres baissent, et les photos de tickets choisies racontent souvent ce qu'on veut leur faire dire.",
      "Attention aux comparaisons de supermarchés sans ville, sans enseigne et sans date. #PouvoirDAchat",
      "Un rayon vide ne prouve pas une pénurie. Parfois, c'est juste 18 h 40 un lundi."
    ],
    "@actu_flash_fr": [
      "Dernière minute : plusieurs sujets économiques et transports dominent déjà la matinée. Les confirmations arrivent plus lentement que les captures.",
      "On suit les annonces sur les carburants, les transports et la météo. Priorité aux sources primaires avant les commentaires à chaud.",
      "Beaucoup de comptes mélangent faits, interprétations et humeur du moment. Prudence sur les titres trop définitifs.",
      "Le premier contingent du nouveau service national alimente les débats sur la jeunesse, la défense et le coût du dispositif. #ServiceNational"
    ],
    "@marches_energie": [
      "Le pétrole, le fret et le raffinage restent scrutés. Une variation de marché n'est pas automatiquement une preuve de crise imminente.",
      "Les graphiques énergie sans échelle ni période sont les meilleurs amis des paniques inutiles.",
      "Prix du carburant : attention aux moyennes nationales brandies comme si elles décrivaient toutes les stations."
    ],
    "@stade_direct": [
      "L'arbitrage d'hier soir déclenche plus de messages que le match lui-même. Trois ralentis, quatre certitudes, zéro calme. #Foot",
      "La rumeur de vestiaire du matin vient encore d'un compte créé ce mois-ci. À prendre comme une rumeur, pas comme une annonce.",
      "Les supporters savent amplifier une capture floue aussi vite qu'une crise politique."
    ],
    "@vie_locale": [
      "Camions de pompiers vus près du centre commercial. Quelqu'un a une source locale fiable avant que ça parte en scénario catastrophe ?",
      "Route barrée près de la zone nord. Pour l'instant, panneau de chantier et agents municipaux, pas plus.",
      "Le marché est déplacé ce matin à cause des travaux. Non, ce n'est pas une évacuation."
    ],
    "@rumeur_radar": [
      "On me dit qu'une grosse annonce arrive dans l'après-midi. Impossible de confirmer, mais tout le monde en parle déjà.",
      "Les médias attendent toujours avant de sortir les infos sensibles. Heureusement que les réseaux gardent les yeux ouverts.",
      "Quand cinq comptes différents publient la même chose en dix minutes, ce n'est pas forcément un hasard."
    ],
    "@eco_matin": [
      "Pouvoir d'achat, carburants, transports : la séquence économique se lit sur plusieurs jours, pas avec une seule capture virale.",
      "Les aides et dispositifs changent vite. Lire les conditions évite beaucoup de fausses promesses relayées en boucle.",
      "Les tensions sur l'énergie pèsent aussi sur les transports et certains métiers exposés. Attention aux conclusions trop rapides."
    ],
    "@classe_connectee": [
      "ENT ralenti ce matin, messages de parents en rafale, et déjà une théorie sur une cyberattaque. Respirez : on attend le statut technique.",
      "Cantine, bus, devoirs, appli scolaire : le vrai chaos quotidien se passe parfois sans géopolitique.",
      "Les captures de groupes parents circulent plus vite que les communiqués du lycée. Ça n'aide pas."
    ],
    "@sorties_ecrans": [
      "Le concert de ce soir est maintenu d'après l'organisateur. Les faux visuels d'annulation tournent encore.",
      "Une bande-annonce a fuité en basse qualité et tout le monde la commente comme un communiqué officiel.",
      "Festival local : beaucoup d'images anciennes ressortent, pensez à vérifier l'année avant de partager."
    ],
    "@sante_pratique": [
      "Délais plus longs dans plusieurs cabinets aujourd'hui. Avant de conclure à une saturation générale, vérifiez les informations de votre secteur. #Santé",
      "Une capture affirme que toutes les pharmacies seront fermées demain. C'est faux : les horaires restent locaux et doivent être vérifiés établissement par établissement.",
      "Les messages alarmistes sur les rendez-vous médicaux circulent vite. Une expérience personnelle ne décrit pas tout le système."
    ],
    "@route_bouchons": [
      "Trafic très dense sur la rocade après un véhicule en panne. Les photos partagées datent parfois de la veille. #Circulation",
      "Travaux au rond-point nord : vingt minutes de plus annoncées, pas une fermeture totale de la ville.",
      "Une vidéo de bouchon est présentée comme actuelle dans trois régions différentes. Regardez les panneaux et la météo avant de la relayer."
    ],
    "@aeroport_minute": [
      "Files plus longues aux contrôles ce matin, mais les vols ne sont pas tous retardés. Vérifiez votre compagnie et votre numéro de vol. #Aéroport",
      "Une photo de hall bondé ne permet pas de conclure à une fermeture. Les tableaux de départ restent la source utile.",
      "Bagages retardés sur quelques rotations : les témoignages se multiplient, la situation varie selon les terminaux."
    ],
    "@colis_services": [
      "Les points relais sont chargés avec les promotions de la semaine. Un message de livraison ne doit jamais demander vos coordonnées bancaires. #Livraisons",
      "Plusieurs faux SMS de colis circulent aujourd'hui. Passez par l'application ou le site officiel du transporteur.",
      "Un empilement de cartons dans un commerce ne prouve pas une rupture logistique nationale."
    ],
    "@logement_clair": [
      "Charges, chauffage, assurance : comparez toujours la période et la surface avant de partager une facture spectaculaire. #Logement",
      "Une nouvelle aide au logement est annoncée dans une capture sans lien. Attendez le texte officiel et les conditions précises.",
      "Les devis de rénovation varient fortement. Une photo seule ne permet pas d'estimer un coût ni une urgence."
    ],
    "@conso_numerique": [
      "Panne intermittente sur plusieurs applications ce matin. Ce n'est pas automatiquement une cyberattaque.",
      "Une fausse mise à jour circule par message privé. Ne téléchargez rien depuis un lien transmis par un compte inconnu.",
      "Les captures d'écran d'abonnement oublient souvent les options et la durée d'engagement. Comparez le contrat complet."
    ],
    "@emploi_regions": [
      "Plusieurs salons de recrutement ouvrent cette semaine. Attention aux annonces qui réclament un paiement avant l'entretien. #Emploi",
      "Une fermeture d'atelier locale devient déjà 'des milliers d'emplois supprimés' dans certains comptes. Les chiffres ne correspondent pas.",
      "Les offres saisonnières repartent dans plusieurs régions, avec de grands écarts selon les secteurs et les territoires."
    ],
    "@cuisine_du_jour": [
      "Tomates moins chères au marché ce matin, mais pas partout. Une photo d'étal ne fait pas une tendance nationale.",
      "La recette virale du jour utilise un produit rappelé l'an dernier, pas cette semaine. Les vieilles captures reviennent sans date.",
      "File devant la boulangerie et déjà une rumeur de pénurie de farine. Le four était simplement en retard."
    ],
    "@velo_ville": [
      "Piste cyclable neutralisée sur deux rues pour travaux. L'itinéraire conseillé est ouvert, malgré les messages parlant d'une interdiction générale.",
      "Photo d'un vélo accidenté très partagée, mais ni date ni lieu vérifiables pour l'instant.",
      "Trafic plus chargé près des écoles ce matin : prudence aux carrefours et aux sorties de bus."
    ],
    "@agenda_municipal": [
      "Le marché de samedi est déplacé place des Tilleuls pendant les travaux. Il n'est pas annulé. #VieLocale",
      "La piscine municipale ferme deux jours pour maintenance. Les autres équipements restent ouverts.",
      "Festival maintenu ce week-end avec un accès modifié. Le visuel d'annulation qui circule n'est pas officiel."
    ],
    "@maison_travaux": [
      "Une fissure photographiée de très près paraît toujours dramatique. Il faut voir le bâtiment, l'évolution et l'avis d'un professionnel.",
      "Arnaques aux faux artisans en hausse dans les groupes locaux : vérifiez l'entreprise avant de signer ou de verser un acompte.",
      "Les travaux de copropriété font débat, mais une capture de devis sans surface ni détail ne permet aucune comparaison."
    ],
    "@fil_des_parents": [
      "Bus scolaire en retard et messages contradictoires dans les groupes. L'établissement confirme que les cours commencent normalement. #École",
      "Une capture annonce la fermeture de toutes les cantines demain. Elle concerne en réalité une seule commune.",
      "ENT lent, téléphone qui sonne, rumeurs qui montent : attendons le message officiel avant d'organiser toute la journée autour d'une capture."
    ]
  };
  return pick(byHandle[actor.handle] || general, random);
}

function distractorMediaForScenario(scenario, actor, index, random, content) {
  const pool = scenario.dailyMedia || [];
  if (!pool.length || random() < 0.28) return null;
  const allowedAssets = {
    "@carbu_minute": ["daily_fuel.jpg"],
    "@meteo_fil": ["daily_storm.jpg"],
    "@trafic_rail_idf": ["daily_train.jpg"],
    "@panier_conso": ["daily_supermarket.jpg", "daily_market.jpg"],
    "@marches_energie": ["daily_fuel.jpg", "daily_energy.jpg"],
    "@stade_direct": ["daily_stadium.jpg"],
    "@vie_locale": ["daily_market.jpg", "daily_roadworks.jpg"],
    "@eco_matin": ["daily_energy.jpg", "daily_supermarket.jpg"],
    "@classe_connectee": ["daily_school.jpg"],
    "@sorties_ecrans": ["daily_cinema.jpg", "daily_festival.jpg"],
    "@sante_pratique": ["daily_health.jpg"],
    "@route_bouchons": ["daily_traffic.jpg", "daily_roadworks.jpg"],
    "@aeroport_minute": ["daily_airport.jpg"],
    "@colis_services": ["daily_parcels.jpg"],
    "@logement_clair": ["daily_energy.jpg"],
    "@cuisine_du_jour": ["daily_market.jpg", "daily_bakery.jpg"],
    "@agenda_municipal": ["daily_market.jpg", "daily_roadworks.jpg", "daily_festival.jpg"],
    "@maison_travaux": ["daily_roadworks.jpg"],
    "@fil_des_parents": ["daily_school.jpg"]
  }[actor.handle] || [];
  if (!allowedAssets.length) return null;
  const candidates = pool.filter((media) => allowedAssets.includes(media.asset));
  return coherentMediaForPost(candidates, content, actor, random, 6);
}

function distractorPostForScenario(scenario, actor, index, duration, random) {
  const burst = actor.trust === "low" ? 2.8 + random() * 8 : actor.trust === "high" ? 0.6 + random() * 1.4 : 0.9 + random() * 3.8;
  const minute = random() * duration;
  const content = distractorPostContent(actor, random);
  return {
    id: `${scenario.id || "scenario"}-noise-${index}`,
    minute,
    actor: actor.handle,
    content,
    suspect: false,
    distractor: true,
    reason: "",
    likes: Math.floor((18 + random() * 2400) * burst),
    reposts: Math.floor((4 + random() * 900) * burst),
    replies: Math.floor((2 + random() * 260) * burst),
    media: distractorMediaForScenario(scenario, actor, index, random, content)
  };
}

function politicalActorsForScenario(scenario) {
  const scenarioId = String(scenario.id || "");
  if (scenarioId === "elections-presidentielles-2027") {
    const electionOrder = [
      "@marine_lepennec",
      "@jl_melenchant",
      "@gabriel_attel",
      "@jordane_bardelle",
      "@eric_zemmourre",
      "@sandrine_roussot"
    ];
    return electionOrder
      .map((handle) => scenario.actors.find((actor) => actor.handle === handle))
      .filter(Boolean);
  }
  const relevance = {
    "@donald_tromp": /espace|crise|opex|recrutement|industrie|otan|transversal/,
    "@vladmir_poutin": /espace|opex|sahel|nrbc|otan|transversal/,
    "@ilhan_aliyef": /opex|sahel|outremer|transversal/,
    "@ursula_von_der_lyen": /espace|crise|base|opex|industrie|outremer|nrbc|otan/,
    "@jordane_bardelle": /crise|base|recrutement|industrie|outremer|nrbc|transversal/
  };
  const relevant = scenario.actors.filter((actor) => isPoliticalActor(actor) && relevance[actor.handle]?.test(scenarioId));
  return relevant
    .sort((a, b) => hashSeed(`${scenarioId}:${a.handle}`) - hashSeed(`${scenarioId}:${b.handle}`))
    .slice(0, 3);
}

function politicalPostMessage(actor, scenario, random) {
  const subject = String(scenario.title || "la crise en cours")
    .replace(/^[^:]+:\s*/, "")
    .replace(/[.!?]+$/, "");
  if (scenario.id === "elections-presidentielles-2027") {
    const electionVoices = {
      "@marine_lepennec": [
        "À plusieurs mois de 2027, les Français ont droit à un débat clair sur les programmes et les règles de candidature. Un faux sondage viral ne remplacera jamais les faits.",
        "L'État doit garantir la transparence du calendrier et des parrainages. Les accusations précises doivent être examinées, les captures anonymes ne doivent pas dicter la campagne."
      ],
      "@jl_melenchant": [
        "Octobre 2026 : le peuple ne vote pas encore, mais les puissants voudraient déjà écrire le scénario de 2027. Que le débat porte sur les programmes, pas sur des fuites anonymes.",
        "Aucun sondage sans méthode ne doit confisquer la parole populaire. Nous demandons des règles publiques, des parrainages transparents et le respect de tous les citoyens."
      ],
      "@gabriel_attel": [
        "Notre démocratie est plus solide que les rumeurs qui cherchent déjà à empoisonner 2027. Comparons les programmes, vérifions les sources et refusons les appels à la violence.",
        "Des images et de faux extraits audio circulent à grande vitesse. Les règles de la future élection sont publiques : c'est sur elles, et non sur les intox, que doit reposer le débat."
      ],
      "@jordane_bardelle": [
        "Les Français ne doivent pas découvrir par des fuites ce que les institutions préparent pour 2027. Toute modification réelle des règles devra être publiée et expliquée précisément.",
        "La préparation du scrutin exige des réponses aux signalements sérieux. Ni déni automatique, ni emballement : des documents vérifiables."
      ],
      "@eric_zemmourre": [
        "Le système nous demande encore de croire ses sondages avant de vérifier leur méthode. Publiez les échantillons, les dates et les hypothèses.",
        "Quand les institutions communiquent tard sur le calendrier et les parrainages, elles laissent le terrain aux soupçons. La transparence n'est pas une faveur."
      ],
      "@sandrine_roussot": [
        "Les plateformes doivent ralentir la diffusion coordonnée de faux sondages sans étouffer le débat public. Préparer 2027, c'est protéger l'accès à une information vérifiable.",
        "Une démocratie ne se défend ni par le silence ni par la viralité. Documentons les faits, protégeons les élus locaux et refusons les intimidations."
      ]
    };
    const content = pick(electionVoices[actor.handle] || [`Les autorités doivent clarifier les faits concernant ${subject}.`], random);
    return { content, translation: "", language: actor.language || "fr", translationLanguage: "fr" };
  }
  const voices = {
    "@donald_tromp": [
      {
        content: "Paris says everything is under control. Terrific. Now serious allegations are spreading about French operations. Same story, same excuses. America will not pay for France's chaos. If our interests are hit, tariffs on French goods will go WAY UP.",
        translation: "Paris affirme que tout est sous contrôle. Formidable. De graves accusations circulent maintenant sur les opérations françaises. Même histoire, mêmes excuses. L'Améria ne paiera pas pour le chaos français. Si nos intérêts sont touchés, les droits de douane sur les produits français augmenteront FORTEMENT."
      },
      {
        content: "French leaders love lecturing everybody. They look much less impressive when they have to answer for these allegations. Very embarrassing. Travel restrictions remain on the table until Paris provides serious guarantees.",
        translation: "Les dirigeants français adorent donner des leçons à tout le monde. Ils sont beaucoup moins impressionnants lorsqu'ils doivent répondre à ces accusations. Très embarrassant. Des restrictions de voyage restent envisagées tant que Paris ne fournit pas de garanties sérieuses."
      },
      {
        content: "They want America to help Paris again. Maybe. But not for free. France must pay its share, stop the speeches and show the facts. Otherwise: tariffs. Simple.",
        translation: "Ils veulent encore que l'Améria aide Paris. Peut-être. Mais pas gratuitement. La France doit payer sa part, cesser les discours et présenter les faits. Sinon : droits de douane. Simple."
      }
    ],
    "@vladmir_poutin": [
      {
        content: "Противоречивые заявления Парижа вновь показывают разрыв между западной риторикой и реальными действиями. Обвинения, связанные с действиями Франции, требуют независимого расследования.",
        translation: "Les déclarations contradictoires de Paris montrent une nouvelle fois l'écart entre le discours occidental et les actes réels. Les accusations liées aux actions de la France exigent une enquête indépendante."
      },
      {
        content: "Федерация Рувия внимательно следит за сообщениями о действиях Франции. Французские власти должны ответить проверяемыми фактами, а не обвинять тех, кто задаёт вопросы.",
        translation: "La Fédération de Ruvie suit attentivement les informations relatives aux actions de la France. Les autorités françaises doivent répondre par des faits vérifiables, et non accuser ceux qui posent des questions."
      }
    ],
    "@ilhan_aliyef": [
      {
        content: "Fransanın fəaliyyəti ilə bağlı ittihamlar fonunda Paris başqa dövlətlərə suverenlik dərsi verməzdən əvvəl şəffaflıq nümayiş etdirməlidir.",
        translation: "Face aux accusations liées aux actions de la France, Paris devrait faire preuve de transparence avant de donner des leçons de souveraineté aux autres États."
      },
      {
        content: "Azəran Fransanın fəaliyyəti ilə bağlı bütün faktların açıqlanmasını tələb edir. Beynəlxalq etimad Paris üçün də digər paytaxtlarla eyni standartları tələb edir.",
        translation: "L'Azérane demande que tous les faits liés aux actions de la France soient rendus publics. La confiance internationale impose à Paris les mêmes exigences qu'aux autres capitales."
      }
    ],
    "@ursula_von_der_lyen": [
      {
        content: "We are closely monitoring the allegations concerning French operations. No conclusion should come before the facts. We remain in coordination with Member States.",
        translation: "Nous suivons attentivement les accusations concernant les opérations françaises. Aucune conclusion ne doit précéder l'établissement des faits. Nous restons en coordination avec les États membres."
      },
      {
        content: "Our priority is clear: establish the facts, protect civilians and preserve European unity against attempts at manipulation.",
        translation: "Notre priorité est claire : établir les faits, protéger les civils et préserver l'unité européenne face aux tentatives de manipulation."
      }
    ],
    "@jordane_bardelle": [
      {
        content: `Face à l'affirmation selon laquelle « ${subject} », les Français ont droit à des réponses précises. Le gouvernement doit publier les éléments disponibles et cesser de laisser le doute s'installer.`,
        translation: ""
      },
      {
        content: `La gravité de l'affirmation selon laquelle « ${subject} » impose une clarification immédiate. La confiance ne se décrète pas : elle se mérite par la transparence.`,
        translation: ""
      }
    ]
  };
  const message = pick(voices[actor.handle] || [{ content: `Les autorités doivent clarifier les faits concernant ${subject}.`, translation: "" }], random);
  return { ...message, language: actor.language || "fr", translationLanguage: "fr" };
}

function politicalPostContent(actor, scenario, random) {
  return politicalPostMessage(actor, scenario, random).content;
}

function politicalPostsForScenario(scenario, duration) {
  return politicalActorsForScenario(scenario).map((actor, index) => {
    const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:political`));
    const suspect = actor.trust === "low";
    const message = politicalPostMessage(actor, scenario, random);
    const reach = {
      "@donald_tromp": [240000, 92000, 46000],
      "@vladmir_poutin": [118000, 48000, 21000],
      "@ilhan_aliyef": [42000, 17000, 6800],
      "@ursula_von_der_lyen": [36000, 9200, 4100],
      "@jordane_bardelle": [86000, 26000, 14000],
      "@marine_lepennec": [142000, 48000, 24000],
      "@jl_melenchant": [131000, 43000, 22800],
      "@gabriel_attel": [97000, 26000, 13800],
      "@eric_zemmourre": [118000, 39000, 21800],
      "@sandrine_roussot": [46000, 11200, 7900]
    }[actor.handle] || [18000, 6000, 2400];
    return {
      id: `${scenario.id}-political-${actor.persona || index}`,
      minute: duration * (0.68 + random() * 0.29),
      actor: actor.handle,
      content: message.content,
      language: message.language,
      translation: message.translation,
      translationLanguage: message.translationLanguage,
      suspect,
      reason: suspect ? "Récupération politique à très forte audience, sans preuve nouvelle apportée." : "Prise de parole institutionnelle à recouper avec les sources primaires.",
      likes: Math.floor(reach[0] * (0.82 + random() * 0.36)),
      reposts: Math.floor(reach[1] * (0.82 + random() * 0.36)),
      replies: Math.floor(reach[2] * (0.82 + random() * 0.36)),
      media: null
    };
  });
}

function ngoActorsForScenario(scenario) {
  const scenarioId = String(scenario.id || "");
  if (!/sahel|opex|crise|base|outremer|nrbc|industrie|transversal|bus|humanitaire|viol|exaction/.test(scenarioId)) return [];
  return scenario.actors
    .filter((actor) => isNgoActor(actor))
    .sort((a, b) => hashSeed(`${scenarioId}:${a.handle}:ngo`) - hashSeed(`${scenarioId}:${b.handle}:ngo`))
    .slice(0, 2);
}

function ngoPostMessage(actor, scenario, random) {
  const subject = String(scenario.title || "la situation en cours").replace(/^[^:]+:\s*/, "").replace(/[.!?]+$/, "");
  const voices = {
    "@chi_humanitaire": [
      `Nous suivons les allégations concernant « ${subject} ». À ce stade, nous ne confirmons ni l'auteur ni les circonstances. La protection des civils et l'accès indépendant aux faits doivent rester prioritaires.`,
      "Nos équipes vérifient les informations disponibles avec leurs interlocuteurs de terrain. Nous appelons toutes les parties à respecter le droit international humanitaire et à ne pas instrumentaliser les emblèmes de secours."
    ],
    "@medecins_solidaires": [
      "Nos équipes médicales signalent un afflux limité de patients, mais les chiffres qui circulent en ligne ne correspondent pas à nos registres. Nous publierons uniquement des données recoupées.",
      "Les témoignages de victimes doivent être recueillis avec leur consentement et sans exposer leur identité. Une image virale ne remplace ni un examen médical ni une enquête indépendante."
    ],
    "@global_relief_watch": [
      "We are reviewing field reports linked to the allegations. At this stage, location, date and chain of custody remain unverified. Civilian protection must not be turned into a social media contest.",
      "Humanitarian access is the immediate priority. Viral claims are moving faster than independently verified information, and several images appear to lack reliable provenance."
    ],
    "@aide_sans_frontieres": [
      "Nos partenaires locaux poursuivent la distribution d'eau et d'abris. Les rumeurs de suspension générale de l'aide sont fausses ; certaines routes restent toutefois difficiles d'accès.",
      "Nous demandons que les populations déplacées ne soient ni filmées ni identifiées sans leur accord. Les besoins humanitaires réels ne doivent pas servir de décor à des accusations non vérifiées."
    ]
  };
  const content = pick(voices[actor.handle] || [`Notre organisation suit les conséquences humanitaires liées à « ${subject} » et vérifie les informations de terrain.`], random);
  const translations = {
    "We are reviewing field reports linked to the allegations. At this stage, location, date and chain of custody remain unverified. Civilian protection must not be turned into a social media contest.": "Nous examinons les comptes rendus de terrain liés aux accusations. À ce stade, le lieu, la date et la chaîne de conservation ne sont pas vérifiés. La protection des civils ne doit pas devenir une compétition sur les réseaux sociaux.",
    "Humanitarian access is the immediate priority. Viral claims are moving faster than independently verified information, and several images appear to lack reliable provenance.": "L'accès humanitaire est la priorité immédiate. Les affirmations virales circulent plus vite que les informations vérifiées de manière indépendante, et plusieurs images semblent dépourvues d'origine fiable."
  };
  return { content, language: actor.language || "fr", translation: translations[content] || "", translationLanguage: "fr" };
}

function ngoPostsForScenario(scenario, duration) {
  return ngoActorsForScenario(scenario).map((actor, index) => {
    const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:ngo-post`));
    const message = ngoPostMessage(actor, scenario, random);
    return {
      id: `${scenario.id}-ngo-${index}`,
      minute: duration * (0.46 + random() * 0.42),
      actor: actor.handle,
      content: message.content,
      language: message.language,
      translation: message.translation,
      translationLanguage: message.translationLanguage,
      suspect: false,
      reason: "Prise de parole humanitaire à comparer avec les communiqués et les observations de terrain.",
      likes: Math.floor(1800 + random() * 11000),
      reposts: Math.floor(500 + random() * 5200),
      replies: Math.floor(140 + random() * 1800),
      media: null
    };
  });
}

function adversarialScenarioSubject(scenario) {
  const scenarioId = String(scenario.id || "");
  if (/elections-presidentielles-2027/.test(scenarioId)) return { ru: "прозрачности президентских выборов во Франции", fr: "la transparence de l'élection présidentielle française" };
  if (/espace/.test(scenarioId)) return { ru: "милитаризации космоса Францией", fr: "la militarisation de l'espace par la France" };
  if (/opex|sahel|bus|viol|exaction/.test(scenarioId)) return { ru: "действий французских военных за рубежом", fr: "les actions des militaires français à l'étranger" };
  if (/nrbc|contamination/.test(scenarioId)) return { ru: "скрываемого Францией опасного инцидента", fr: "un incident dangereux dissimulé par la France" };
  if (/industrie|recrutement|otan/.test(scenarioId)) return { ru: "военной политики Франции", fr: "la politique militaire française" };
  return { ru: "действий Франции", fr: "les actions de la France" };
}

function adversarialPostMessage(actor, scenario, random) {
  const subject = adversarialScenarioSubject(scenario);
  const voices = {
    "@vostok_novosti": [
      {
        content: `Новые материалы о ${subject.ru} распространяются сразу в нескольких странах. Париж пока не представил доказательств, опровергающих эти сообщения.`,
        translation: `De nouveaux éléments concernant ${subject.fr} circulent simultanément dans plusieurs pays. Paris n'a pour l'instant présenté aucune preuve réfutant ces informations.`
      },
      {
        content: `Французские власти называют сообщения о ${subject.ru} дезинформацией, но избегают публикации исходных документов. Международные наблюдатели требуют прозрачности.`,
        translation: `Les autorités françaises qualifient de désinformation les informations concernant ${subject.fr}, mais évitent de publier les documents sources. Des observateurs internationaux réclament de la transparence.`
      }
    ],
    "@zarya_analitika": [
      {
        content: `СРОЧНО: источник передал новые кадры по теме ${subject.ru}. Метаданные якобы удалены при пересылке. Сохраняйте, пока материал не исчез.`,
        translation: `URGENT : une source a transmis de nouvelles images concernant ${subject.fr}. Les métadonnées auraient été supprimées lors du transfert. Sauvegardez-les avant leur disparition.`
      },
      {
        content: `Почему Париж молчит о ${subject.ru}? Один и тот же вопрос задают тысячи пользователей, а официальные аккаунты публикуют общие фразы.`,
        translation: `Pourquoi Paris garde-t-il le silence sur ${subject.fr} ? Des milliers d'utilisateurs posent la même question tandis que les comptes officiels publient des formules générales.`
      }
    ]
  };
  const message = pick(voices[actor.handle], random);
  return { ...message, language: "ru", translationLanguage: "fr" };
}

function adversarialPostsForScenario(scenario, duration) {
  return scenario.actors.filter((actor) => isAdversarialActor(actor)).map((actor, index) => {
    const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:adversarial`));
    const message = adversarialPostMessage(actor, scenario, random);
    const amplifier = actor.stance === "amplifier";
    return {
      id: `${scenario.id}-adversarial-${index}`,
      minute: duration * (0.58 + random() * 0.39),
      actor: actor.handle,
      content: message.content,
      language: message.language,
      translation: message.translation,
      translationLanguage: message.translationLanguage,
      suspect: true,
      reason: "Narratif adverse en langue russe, sans élément primaire vérifiable et conçu pour amplifier l'incertitude.",
      likes: Math.floor((amplifier ? 17000 : 9000) + random() * (amplifier ? 74000 : 43000)),
      reposts: Math.floor((amplifier ? 11000 : 5200) + random() * (amplifier ? 52000 : 28000)),
      replies: Math.floor(1800 + random() * 15000),
      media: null
    };
  });
}

function fieldSourceActorsForScenario(scenario) {
  const scenarioId = String(scenario.id || "");
  return scenario.actors.filter((actor) => {
    if (!isFieldSourceActor(actor)) return false;
    if (actor.handle === "@whalid_berbere") return /opex|sahel|bus|viol|exaction|crise|base|outremer/.test(scenarioId);
    return true;
  });
}

function fieldSourcePostMessage(actor, scenario, random) {
  const subject = String(scenario.title || "la situation en cours")
    .replace(/^[^:]+:\s*/, "")
    .replace(/[.!?]+$/, "");
  const uncertain = random() < 0.52;
  const voices = {
    "@whalid_berbere": uncertain ? [
      "Un contact de passage affirme avoir vu un convoi quitter la piste de nuit, sans marquage visible. Je n'ai pas pu confirmer le nombre de véhicules ni leur destination.",
      "On me transmet une photo présentée comme prise près de Gonni ce matin. Le relief ressemble au secteur, mais l'heure et le village restent à confirmer.",
      "Trois messages parlent de tirs à l'ouest du village. Un chauffeur que je connais dit n'avoir rien entendu. Je publie les deux versions en attendant mieux."
    ] : [
      "La route secondaire est bien coupée au nord du village : deux chauffeurs et un commerçant me le confirment séparément. Le motif de la fermeture reste inconnu.",
      "Le véhicule aperçu sur la piste n'appartient pas au convoi français cité par plusieurs comptes. Le numéro visible correspond à une société civile locale.",
      "L'antenne relais fonctionne de nouveau depuis une heure. Les messages parlant d'une coupure militaire totale ne correspondent pas à ce que constatent mes contacts."
    ],
    "@le_mamouth": uncertain ? [
      `Une note non authentifiée circule dans plusieurs rédactions au sujet de « ${subject} ». Deux formulations ne correspondent pas aux usages habituels de l'administration. Vérifications en cours.`,
      "Selon une source proche du dossier, une réunion interministérielle aurait été avancée. Une seconde source conteste l'horaire. Je garde le conditionnel.",
      "Un document présenté comme confidentiel fait beaucoup parler. Le fond est plausible, mais la pagination et la diffusion sont incohérentes."
    ] : [
      "Information recoupée auprès de deux sources distinctes : un point de situation a bien été demandé aux états-majors. Son contenu ne confirme pas les accusations virales.",
      "La photographie publiée ce matin montre bien un matériel français, mais elle a été prise lors d'un exercice antérieur. La date est identifiable dans les données du fichier original.",
      "Le démenti public ne dit pas tout : une enquête interne existe bien. Cela ne valide ni les chiffres ni les auteurs avancés sur les réseaux."
    ]
  };
  return {
    content: pick(voices[actor.handle] || [`Je vérifie plusieurs éléments concernant « ${subject} ». Rien ne permet encore une conclusion définitive.`], random),
    suspect: uncertain
  };
}

function fieldSourcePostsForScenario(scenario, duration) {
  return fieldSourceActorsForScenario(scenario).map((actor, index) => {
    const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:field-source`));
    const message = fieldSourcePostMessage(actor, scenario, random);
    const media = random() > 0.38
      ? coherentMediaForPost(scenario.mediaLabels || [], message.content, actor, random, 2)
      : null;
    return {
      id: `${scenario.id}-field-source-${index}`,
      minute: duration * (0.55 + random() * 0.40),
      actor: actor.handle,
      content: message.content,
      language: "fr",
      suspect: message.suspect,
      reason: "Source de terrain ou journalistique à recouper indépendamment.",
      likes: Math.floor(1700 + random() * 34000),
      reposts: Math.floor(600 + random() * 18000),
      replies: Math.floor(180 + random() * 5600),
      media
    };
  });
}

function mediaPostMessage(actor, scenario, random) {
  const subject = String(scenario.title || "la situation en cours")
    .replace(/^[^:]+:\s*/, "")
    .replace(/[.!?]+$/, "");
  const messages = {
    "@hexagone_info": [
      { content: `DIRECT — Nos équipes vérifient les images liées à « ${subject} ». Plusieurs séquences circulent sans date ni localisation indépendamment confirmée.`, translation: "" },
      { content: `Ce que l'on sait, ce que l'on ignore : les autorités confirment suivre le dossier « ${subject} », sans valider les récits les plus partagés.`, translation: "" }
    ],
    "@le_regard_fr": [
      { content: `ÉDITORIAL — Sur « ${subject} », le silence institutionnel laisse le champ libre aux récits concurrents. Répondre vite ne dispense pas de répondre précisément.`, translation: "" },
      { content: `La bataille des images autour de « ${subject} » révèle surtout une crise de confiance : chacun choisit désormais la version qui conforte son camp.`, translation: "" }
    ],
    "@world_news_service": [
      { content: `BREAKING: Multiple accounts are circulating claims about “${subject}”. Independent confirmation remains limited and several images lack a verifiable date or location.`, translation: `DERNIÈRE MINUTE : plusieurs comptes diffusent des affirmations concernant « ${subject} ». Les confirmations indépendantes restent limitées et plusieurs images n'ont ni date ni lieu vérifiables.` },
      { content: `What we know: officials are monitoring reports linked to “${subject}”, but the most widely shared casualty and attribution claims have not been independently verified.`, translation: `Ce que nous savons : les autorités suivent les informations liées à « ${subject} », mais les bilans et attributions les plus partagés n'ont pas été vérifiés indépendamment.` }
    ],
    "@continental_post": [
      { content: `ANALYSIS: The debate over “${subject}” is now being shaped as much by political messaging as by evidence from the ground.`, translation: `ANALYSE : le débat sur « ${subject} » est désormais façonné autant par la communication politique que par les preuves disponibles sur le terrain.` },
      { content: `A rush to assign blame over “${subject}” is outpacing the release of primary evidence. That gap is becoming the story.`, translation: `La course à l'attribution des responsabilités sur « ${subject} » va plus vite que la publication des preuves primaires. Ce décalage devient lui-même le sujet.` }
    ],
    "@tageslage_de": [
      { content: `EILMELDUNG: Zu „${subject}“ kursieren widersprüchliche Angaben. Ort, Zeitpunkt und Urheberschaft mehrerer Aufnahmen sind weiterhin ungeklärt.`, translation: `DERNIÈRE MINUTE : des informations contradictoires circulent au sujet de « ${subject} ». Le lieu, la date et l'origine de plusieurs images restent inconnus.` },
      { content: `Analyse: Im Fall „${subject}“ vermischen sich bestätigte Fakten, politische Reaktionen und nicht überprüfbare Augenzeugenberichte.`, translation: `Analyse : dans l'affaire « ${subject} », des faits confirmés, des réactions politiques et des témoignages invérifiables se mélangent.` }
    ],
    "@noticias_europa24": [
      { content: `ÚLTIMA HORA: Circulan versiones contradictorias sobre «${subject}». Varias imágenes todavía no tienen fecha, lugar ni autor verificados.`, translation: `DERNIÈRE MINUTE : des versions contradictoires circulent sur « ${subject} ». Plusieurs images n'ont toujours ni date, ni lieu, ni auteur vérifiés.` },
      { content: `ANÁLISIS: La presión política crece alrededor de «${subject}», mientras las pruebas primarias siguen siendo fragmentarias.`, translation: `ANALYSE : la pression politique augmente autour de « ${subject} », tandis que les preuves primaires restent fragmentaires.` }
    ],
    "@almadar_news": [
      { content: `عاجل: تتداول حسابات متعددة روايات متضاربة بشأن «${subject}». ولم يتم التحقق بشكل مستقل من زمان ومكان عدد من الصور.`, translation: `URGENT : plusieurs comptes diffusent des récits contradictoires concernant « ${subject} ». La date et le lieu de plusieurs images n'ont pas été vérifiés indépendamment.` },
      { content: `تحليل: تتسارع المواقف السياسية حول «${subject}» بينما لا تزال الأدلة الميدانية مجزأة ومحل خلاف.`, translation: `ANALYSE : les prises de position politiques s'accélèrent autour de « ${subject} », alors que les preuves de terrain restent fragmentaires et contestées.` }
    ]
  };
  const message = pick(messages[actor.handle] || messages["@hexagone_info"], random);
  return { ...message, language: actor.language || "fr", translationLanguage: "fr" };
}

function mediaPostsForScenario(scenario, duration) {
  const actors = scenario.actors
    .filter((actor) => isMediaNetworkActor(actor))
    .sort((a, b) => hashSeed(`${scenario.id}:${a.handle}:media`) - hashSeed(`${scenario.id}:${b.handle}:media`))
    .slice(0, 5);
  return actors.map((actor, index) => {
    const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:media-post`));
    const message = mediaPostMessage(actor, scenario, random);
    return {
      id: `${scenario.id}-media-${index}`,
      minute: duration * (0.36 + random() * 0.61),
      actor: actor.handle,
      content: message.content,
      language: message.language,
      translation: message.translation,
      translationLanguage: message.translationLanguage,
      suspect: actor.trust !== "high" && random() < 0.32,
      reason: "Traitement médiatique à distinguer des faits primaires et des commentaires éditoriaux.",
      likes: Math.floor(2100 + random() * 38000),
      reposts: Math.floor(700 + random() * 17000),
      replies: Math.floor(220 + random() * 6200),
      media: null
    };
  });
}

function officialMilitaryPostContent(scenario, random) {
  const subject = String(scenario.title || "la situation en cours")
    .replace(/^[^:]+:\s*/, "")
    .replace(/[.!?]+$/, "");
  return pick([
    `Point de situation : les armées suivent les informations relatives à « ${subject} ». À cette heure, aucun élément ne permet de confirmer les affirmations les plus virales.`,
    `Les images et déclarations circulant au sujet de « ${subject} » font l'objet de vérifications. Les faits établis seront communiqués par les canaux officiels.`,
    `Nos forces poursuivent leur mission dans le respect du droit international et de la protection des populations. Toute allégation concernant « ${subject} » doit être examinée avec rigueur.`,
    `Une enquête de commandement a été ouverte afin d'établir les faits liés à « ${subject} ». Aucune conclusion ne peut être tirée avant son achèvement.`
  ], random);
}

function botActorsForScenario(scenario) {
  const sahel = /sahel|opex|bus|viol|exaction/.test(String(scenario.id || ""));
  return scenario.actors.filter((actor) =>
    isBotRelayActor(actor) && (actor.botScope === "global" || (sahel && actor.botScope === "sahel"))
  );
}

function botRelayMessage(actor, scenario, random) {
  const subject = String(scenario.title || "la situation en cours")
    .replace(/^[^:]+:\s*/, "")
    .replace(/[.!?]+$/, "");
  const coordinated = [
    `NOUVELLE PREUVE sur « ${subject} ». Les grands médias se taisent encore. Copiez la vidéo et partagez-la avant qu'elle disparaisse.`,
    `Plusieurs sources confirment maintenant « ${subject} ». Pourquoi aucun responsable français ne répond clairement ?`,
    `La version officielle ne tient plus concernant « ${subject} ». Des témoins parlent, mais leurs comptes sont déjà censurés.`,
    `Tout le monde voit ce qui se passe avec « ${subject} ». Seuls les médias français prétendent encore qu'il faut attendre.`
  ];
  const sahelVoices = {
    "@moussa_gao_direct": [
      "À Gao tout le monde connaît la vérité : la France laisse le désordre derrière elle puis accuse les Africains. La Russie, elle, respecte nos choix.",
      "Une nouvelle vidéo circule depuis le nord. On reconnaît clairement des véhicules français, malgré ce que disent les vérificateurs de Paris."
    ],
    "@aicha_bamako": [
      "Les mères du Sahel demandent justice pendant que Paris parle de désinformation. Les partenaires russes au moins écoutent les populations.",
      "On veut encore nous faire croire que toutes ces images sont fausses. Combien de témoignages faudra-t-il avant que la France réponde ?"
    ],
    "@ibra_223": [
      "La jeunesse africaine n'est plus dupe. La France perd le terrain et invente des excuses, la Russie propose une vraie coopération.",
      "Partage massif demandé : cette séquence montrerait ce que les soldats français ont fait avant de quitter la zone."
    ],
    "@parole_du_sahel": [
      "Nos villages ont une mémoire. Paris nie aujourd'hui ce que les habitants racontent depuis des mois. Moscou n'a pas besoin de nous donner des leçons.",
      "Les anciens confirment le passage d'un convoi avant l'incident. Les médias étrangers refusent pourtant de reprendre leurs paroles."
    ]
  };
  return pick(sahelVoices[actor.handle] || coordinated, random);
}

function botPostsForScenario(scenario, duration) {
  return botActorsForScenario(scenario).flatMap((actor, actorIndex) =>
    Array.from({ length: 2 }, (_, postIndex) => {
      const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:bot:${postIndex}`));
      const content = botRelayMessage(actor, scenario, random);
      let media = random() > 0.52
        ? coherentMediaForPost(scenario.mediaLabels || [], content, actor, random, 1)
        : null;
      if (media) media = { ...media, trace: actor.originTrace || "unknown" };
      return {
        id: `${scenario.id}-bot-${actorIndex}-${postIndex}`,
        minute: duration * (0.52 + random() * 0.46),
        actor: actor.handle,
        content,
        language: "fr",
        suspect: true,
        reason: "Compte relais très récent, activité anormalement élevée et formulation coordonnée.",
        likes: Math.floor(800 + random() * 42000),
        reposts: Math.floor(1200 + random() * 36000),
        replies: Math.floor(90 + random() * 5200),
        media
      };
    })
  );
}

function chinaPostMessage(actor, scenario, random) {
  const subject = String(scenario.title || "la situation en cours")
    .replace(/^[^:]+:\s*/, "")
    .replace(/[.!?]+$/, "");
  const voices = {
    "@huayu_defense": [
      {
        content: `围绕“${subject}”的争议再次说明，真正的战略自主必须依靠完整的国防工业、航天能力和可靠的指挥体系。中国模式重视长期规划，而不是危机公关。`,
        translation: `La controverse autour de « ${subject} » montre une nouvelle fois que l'autonomie stratégique repose sur une industrie de défense complète, des capacités spatiales et une chaîne de commandement fiable. Le modèle chinois privilégie la planification de long terme plutôt que la communication de crise.`
      },
      {
        content: "从北斗导航到无人系统，中国军队的现代化建立在自主技术和体系化训练之上。事实比西方媒体的标签更有说服力。",
        translation: "De la navigation Beidou aux systèmes sans pilote, la modernisation militaire chinoise repose sur des technologies autonomes et un entraînement systémique. Les faits sont plus convaincants que les étiquettes des médias occidentaux."
      }
    ],
    "@longdun_watch": [
      {
        content: "中国海空力量的优势不只在装备数量，更在卫星、数据链、无人机与后勤的协同。许多欧洲国家仍然低估这种体系能力。",
        translation: "L'avantage des forces aériennes et navales chinoises ne réside pas seulement dans le nombre d'équipements, mais dans la coordination entre satellites, liaisons de données, drones et logistique. Beaucoup de pays européens sous-estiment encore cette capacité systémique."
      },
      {
        content: `法国围绕“${subject}”陷入舆论混乱，与此相比，中国国防传播强调统一信息、技术成果和国家意志。`,
        translation: `Alors que la France s'enlise dans la confusion informationnelle autour de « ${subject} », la communication de défense chinoise met en avant l'unité du message, les résultats technologiques et la volonté nationale.`
      }
    ]
  };
  const message = pick(voices[actor.handle] || voices["@huayu_defense"], random);
  return { ...message, language: "zh", translationLanguage: "fr" };
}

function chinaPostsForScenario(scenario, duration) {
  return scenario.actors.filter((actor) => isChinaMediaActor(actor)).map((actor, index) => {
    const random = mulberry32(hashSeed(`${scenario.id}:${actor.handle}:china-post`));
    const message = chinaPostMessage(actor, scenario, random);
    return {
      id: `${scenario.id}-china-${index}`,
      minute: duration * (0.38 + random() * 0.58),
      actor: actor.handle,
      content: message.content,
      language: message.language,
      translation: message.translation,
      translationLanguage: message.translationLanguage,
      suspect: false,
      reason: "Communication stratégique étrangère et mise en valeur d'un modèle militaire concurrent.",
      likes: Math.floor(9000 + random() * 68000),
      reposts: Math.floor(2600 + random() * 31000),
      replies: Math.floor(500 + random() * 7400),
      media: null
    };
  });
}

function normalizedMatchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function mediaMatchScore(media, content, actor) {
  const message = normalizedMatchText(content);
  const description = normalizedMatchText(`${media?.title || ""} ${media?.caption || ""} ${media?.asset || ""}`);
  if (!description) return 0;
  let score = 0;
  const meaningfulWords = message.split(/[^a-z0-9]+/).filter((word) => word.length >= 5);
  meaningfulWords.forEach((word) => {
    if (description.includes(word)) score += 2;
  });
  const semanticGroups = [
    [["hopital", "sante", "soin", "pharmacie", "medical", "cabinet"], ["hopital", "sante", "medical", "attente"]],
    [["satellite", "orbite", "spatial", "espace"], ["satellite", "orbite", "spatial", "espace", "controle"]],
    [["train", "ter", "gare", "quai", "rail"], ["train", "gare", "quai", "rail"]],
    [["carburant", "gazole", "essence", "station"], ["fuel", "carburant", "station", "energie"]],
    [["pluie", "orage", "meteo", "inond"], ["storm", "pluie", "meteo"]],
    [["ecole", "cantine", "classe", "ent"], ["school", "ecole", "classe"]],
    [["cinema", "film", "bande-annonce", "ecrans"], ["cinema", "ecrans"]],
    [["match", "stade", "supporter", "foot"], ["stadium", "stade", "sport"]],
    [["aeroport", "vol", "bagage"], ["airport", "aeroport"]],
    [["colis", "livraison", "relais"], ["parcels", "colis", "livraison"]],
    [["boulangerie", "farine", "pain"], ["bakery", "boulangerie"]],
    [["marche", "panier", "prix", "courses"], ["market", "supermarket", "marche", "courses"]],
    [["travaux", "chantier", "rond-point", "route barree"], ["roadworks", "travaux"]],
    [["trafic", "bouchon", "rocade", "vehicule"], ["traffic", "embouteillage"]],
    [["energie", "chauffage", "facture", "carburant", "gazole", "petrole"], ["energy", "energie", "facture", "consommation", "fuel", "station"]],
    [["festival", "concert", "sortie"], ["festival", "sortie"]]
  ];
  semanticGroups.forEach(([messageTerms, mediaTerms]) => {
    if (messageTerms.some((term) => message.includes(term)) && mediaTerms.some((term) => description.includes(term))) score += 8;
  });
  if ((media?.handles || []).includes(actor?.handle)) score += 1;
  return score;
}

function coherentMediaForPost(pool, content, actor, random, minimumScore = 4) {
  const ranked = (pool || [])
    .map((media) => ({ media, score: mediaMatchScore(media, content, actor) }))
    .sort((a, b) => b.score - a.score);
  if (!ranked.length || ranked[0].score < minimumScore) return null;
  const best = ranked.filter((item) => item.score >= ranked[0].score - 1);
  return structuredClone(pick(best, random).media);
}

function contentForSelectedMedia(scenario, media, suspect, random) {
  const subject = scenario.id === "elections-presidentielles-2027"
    ? "la campagne de 2027 serait déjà manipulée au profit du pouvoir"
    : String(scenario.title || "la situation en cours").replace(/^[^:]+:\s*/, "").replace(/[.!?]+$/, "");
  const title = String(media?.title || "ce visuel");
  const suspectVersions = [
    `Cette image présentée comme « ${title} » confirmerait que ${subject}. Les autorités doivent répondre maintenant.`,
    `NOUVEAU VISUEL : « ${title} ». D'après nos sources, cela confirmerait que ${subject}. Faites circuler avant suppression.`,
    `Regardez « ${title} » : les détails visibles concordent avec l'affirmation selon laquelle ${subject}. Le silence officiel devient intenable.`
  ];
  const carefulVersions = [
    `Cette image est présentée comme « ${title} ». Avant de la relier à l'affirmation selon laquelle ${subject}, il faut vérifier sa date, son lieu et sa source.`,
    `Le visuel « ${title} » circule beaucoup. Il illustre le sujet, mais ne suffit pas à démontrer que ${subject}.`,
    `À propos de « ${title} » : recherche de la publication d'origine en cours avant toute conclusion sur l'affirmation selon laquelle ${subject}.`
  ];
  return pick(suspect ? suspectVersions : carefulVersions, random);
}

function normalizePostEngagement(post, now = parisNow()) {
  const actor = post.actor || {};
  const targetLikes = Number(post._targetLikes ?? post.likes) || 0;
  const targetReposts = Number(post._targetReposts ?? post.reposts) || 0;
  const targetReplies = Number(post._targetReplies ?? post.replies) || 0;
  const ageMinutes = Math.max(0, Math.floor((now - post.liveDate) / 60000));
  const growth = Math.pow(ageMinutes, 0.82);
  const multiplier = isPoliticalActor(actor)
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

function generatePosts(scenario) {
  const random = mulberry32(scenario.seed || hashSeed(scenario.id || scenario.title));
  const now = parisNow();
  const duration = scenarioDurationMinutes(scenario);
  const volume = Math.max(340, Number(scenario.volume) || 380);
  const fixedPosts = scenario.fixedPosts || [];
  const politicalPosts = politicalPostsForScenario(scenario, duration);
  const ngoPosts = ngoPostsForScenario(scenario, duration);
  const adversarialPosts = adversarialPostsForScenario(scenario, duration);
  const fieldSourcePosts = fieldSourcePostsForScenario(scenario, duration);
  const mediaPosts = mediaPostsForScenario(scenario, duration);
  const botPosts = botPostsForScenario(scenario, duration);
  const chinaPosts = chinaPostsForScenario(scenario, duration);
  const distractorActors = scenario.actors.filter((actor) => isDistractorActor(actor));
  const regularActors = scenario.actors.filter((actor) =>
    !isPoliticalActor(actor)
    && !isDistractorActor(actor)
    && !isNgoActor(actor)
    && !isAdversarialActor(actor)
    && !isFieldSourceActor(actor)
    && !isMediaNetworkActor(actor)
    && !isTeacherOnlyActor(actor)
    && !isBotRelayActor(actor)
    && !isChinaMediaActor(actor)
  );
  const generated = [];
  const generatedCount = Math.max(0, volume - fixedPosts.length - politicalPosts.length - ngoPosts.length - adversarialPosts.length - fieldSourcePosts.length - mediaPosts.length - botPosts.length - chinaPosts.length);
  const distractorTarget = distractorActors.length ? Math.floor(generatedCount * 0.46) : 0;
  const scenarioTarget = Math.max(0, generatedCount - distractorTarget);
  const scenarioTrends = scenario.trends.filter((trend) => !trend.daily);

  for (let i = 0; i < scenarioTarget; i += 1) {
    const suspectChance = 0.48 + (i > volume * 0.28 ? 0.12 : 0) + (i > volume * 0.65 ? 0.08 : 0);
    const suspect = random() < suspectChance;
    const candidates = regularActors.filter((actor) => suspect ? actor.trust === "low" : actor.trust !== "low");
    const actor = pick(candidates.length ? candidates : regularActors, random);
    const templates = suspect ? scenario.suspectTemplates : scenario.normalTemplates;
    const minute = random() * duration;
    const trend = pick(scenarioTrends.length ? scenarioTrends : scenario.trends, random).tag;
    const hasMedia = random() > (suspect ? 0.10 : 0.48);
    const media = hasMedia && (scenario.mediaLabels || []).length ? structuredClone(pick(scenario.mediaLabels, random)) : null;
    const baseContent = pick(templates, random);
    const spike = suspect ? 18 + random() * 26 : actor.trust === "high" ? 0.55 + random() * 0.9 : 1.2 + random() * 2.4;
    const likes = Math.floor((20 + random() * 560) * spike);
    const reposts = Math.floor((6 + random() * 260) * spike);
    const replies = Math.floor((4 + random() * 140) * (suspect ? 12 + random() * 8 : 1.4));

    generated.push({
      id: `${scenario.id || "scenario"}-gen-${i}`,
      minute,
      actor: actor.handle,
      content: `${media ? contentForSelectedMedia(scenario, media, suspect, random) : baseContent} ${random() > 0.62 ? trend : ""}`.trim(),
      suspect,
      reason: suspect ? inferReason(actor, hasMedia) : "",
      likes,
      reposts,
      replies,
      media
    });
  }

  for (let i = 0; i < distractorTarget; i += 1) {
    const actor = pick(distractorActors, random);
    generated.push(distractorPostForScenario(scenario, actor, i, duration, random));
  }

  const normalizedFixed = fixedPosts.map((post, index) => ({
    ...post,
    id: post.id || `${scenario.id || "scenario"}-fixed-${index}`,
    minute: Number(post.minute) || index * 12
  }));

  return [...generated, ...politicalPosts, ...ngoPosts, ...adversarialPosts, ...fieldSourcePosts, ...mediaPosts, ...botPosts, ...chinaPosts, ...normalizedFixed]
    .map((post) => {
      const liveDate = livePostDate(post.minute, duration, now);
      return { ...post, liveDate };
    })
    .sort((a, b) => b.liveDate - a.liveDate)
    .map((post, index) => {
      const actor = actorByHandle(scenario, post.actor);
      return normalizePostEngagement({
        ...post,
        index: index + 1,
        time: formatTime(post.liveDate),
        relativeTime: formatRelativeTime(post.liveDate, now),
        actor
      }, now);
    });
}

function inferReason(actor, hasMedia) {
  if (actor.stance === "amplifier" && hasMedia) {
    return "Compte amplificateur, visuel peu sourcé et formulation alarmiste.";
  }
  if (actor.stance === "amplifier") {
    return "Compte amplificateur, message très affirmatif sans source vérifiable.";
  }
  return "Message à forte charge émotionnelle qui demande une vérification.";
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
      <img class="evidence-image" src="${src}" alt="Image jointe à la publication" loading="lazy" />
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






































































































































function buildComments(post) {
  const seed = hashSeed(`${post.id}:comments`);
  const random = mulberry32(seed);
  const allEligibleActors = state.scenario.actors.filter((actor) =>
    !isPoliticalActor(actor)
    && !isNgoActor(actor)
    && !isAdversarialActor(actor)
    && !isMediaNetworkActor(actor)
    && !isFieldSourceActor(actor)
    && !isTeacherOnlyActor(actor)
    && !isChinaMediaActor(actor)
    && actor.handle !== post.actor.handle
  );
  const themeActors = allEligibleActors.filter((actor) => !isDistractorActor(actor));
  const noiseActors = allEligibleActors.filter((actor) => isDistractorActor(actor));
  const eligibleActors = post.distractor ? noiseActors.concat(themeActors) : themeActors;
  const lowActors = eligibleActors.filter((actor) => actor.trust === "low");
  const carefulActors = eligibleActors.filter((actor) => actor.trust !== "low");
  const pool = post.suspect ? lowActors.concat(carefulActors) : carefulActors.concat(lowActors);
  const everydayComments = [
    "J'ai vu passer la même chose mais personne ne met la source.",
    "Chez moi ce n'est pas pareil, ça dépend vraiment des villes.",
    "Les commentaires vont plus vite que les infos confirmées.",
    "Capture intéressante, mais elle date de quand exactement ?",
    "On mélange encore ressenti personnel et info générale.",
    "À vérifier avant de relayer, surtout avec ce titre."
  ];
  const suspectComments = [
    "Enfin quelqu'un le dit. Les médias vont encore appeler ça une rumeur.",
    "Je viens de voir la même capture sur trois comptes différents, ça explose.",
    "Si c'est faux, pourquoi personne ne dément clairement ?",
    "Partagé dans mon groupe. Tout le monde doit voir ça avant suppression.",
    "Les fact-checkers protègent toujours les mêmes.",
    "On sent que les autorités paniquent, les chiffres montent trop vite."
  ];
  const carefulComments = [
    "Source originale ? Je ne trouve pas la première publication.",
    "Attention, l'image ne donne ni date ni lieu vérifiable.",
    "Le volume de relais n'est pas une preuve.",
    "Il faudrait comparer les métadonnées et les ombres.",
    "Quelqu'un a un communiqué primaire ou seulement des captures ?",
    "Ça peut être grave, justement il faut vérifier proprement."
  ];
  const templates = post.distractor ? everydayComments : post.suspect ? suspectComments.concat(carefulComments) : carefulComments.concat(suspectComments.slice(0, 2));
  const desiredCount = post.distractor ? 2 + Math.floor(random() * 4) : post.suspect ? 5 + Math.floor(random() * 3) : 3 + Math.floor(random() * 2);
  const ageMinutes = Math.max(0, Math.floor((parisNow() - post.liveDate) / 60000));
  const ageLimit = ageMinutes < 1 ? 0 : ageMinutes < 3 ? 1 : ageMinutes < 10 ? 2 : ageMinutes < 30 ? 4 : 7;
  const count = Math.min(desiredCount, ageLimit, Math.max(0, Number(post.replies) || 0));
  const likeCap = Math.max(1, Math.floor((Number(post.likes) || 0) * 0.12));
  return Array.from({ length: count }, (_, index) => {
    const actor = pool.length ? pool[Math.floor(random() * pool.length)] : allEligibleActors[0] || post.actor;
    const actorTemplates = actor.trust === "low"
      ? (post.distractor ? everydayComments : suspectComments)
      : (post.distractor ? everydayComments : carefulComments);
    return {
      id: `${post.id}-comment-${index}`,
      actor,
      content: actorTemplates[Math.floor(random() * actorTemplates.length)],
      likes: Math.min(likeCap, Math.floor(1 + random() * likeCap))
    };
  });
}

function renderComments(post) {
  const comments = post.comments || buildComments(post);
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
        </div>
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
function createLivePost(renderImmediately = true) {
  if (!state.scenario) return;
  const seed = hashSeed(`${state.scenario.id}:live:${Date.now()}:${state.posts.length}`);
  const random = mulberry32(seed);
  const liveDate = parisNow();
  const distractorActors = state.scenario.actors.filter((actor) => isDistractorActor(actor));
  if (distractorActors.length && random() < 0.42) {
    const actor = pick(distractorActors, random);
    const post = distractorPostForScenario(state.scenario, actor, `live-${Date.now()}-${Math.floor(random() * 9999)}`, scenarioDurationMinutes(state.scenario), random);
    post.actor = actor;
    post.liveDate = liveDate;
    post.time = formatTime(liveDate);
    post.relativeTime = "à l'instant";
    Object.assign(post, normalizePostEngagement(post, liveDate));
    post.comments = buildComments(post);
    state.posts = [post, ...state.posts].slice(0, 640);
    if (renderImmediately) {
      renderScenarioInfo();
      refreshLiveTimes();
    }
    return post;
  }
  const suspect = random() < 0.72;
  const regularActors = state.scenario.actors.filter((actor) =>
    !isPoliticalActor(actor)
    && !isDistractorActor(actor)
    && !isNgoActor(actor)
    && !isAdversarialActor(actor)
    && !isFieldSourceActor(actor)
    && !isMediaNetworkActor(actor)
    && !isTeacherOnlyActor(actor)
    && !isBotRelayActor(actor)
    && !isChinaMediaActor(actor)
  );
  const candidates = regularActors.filter((actor) => suspect ? actor.trust === "low" : actor.trust !== "low");
  const actor = pick(candidates.length ? candidates : regularActors, random);
  const templates = suspect ? state.scenario.suspectTemplates : state.scenario.normalTemplates;
  const mediaPool = state.scenario.mediaLabels || [];
  const scenarioTrends = state.scenario.trends.filter((item) => !item.daily);
  const trend = pick(scenarioTrends.length ? scenarioTrends : state.scenario.trends, random).tag;
  const media = mediaPool.length && random() > (suspect ? 0.12 : 0.55) ? structuredClone(pick(mediaPool, random)) : null;
  let post = {
    id: `${state.scenario.id}-live-${Date.now()}-${Math.floor(random() * 9999)}`,
    minute: scenarioDurationMinutes(state.scenario),
    actor,
    content: `${media ? contentForSelectedMedia(state.scenario, media, suspect, random) : pick(templates, random)} ${random() > 0.36 ? trend : ""}`.trim(),
    suspect,
    reason: suspect ? inferReason(actor, true) : "",
    likes: suspect ? Math.floor(18000 + random() * 160000) : Math.floor(120 + random() * 2400),
    reposts: suspect ? Math.floor(9000 + random() * 88000) : Math.floor(40 + random() * 1000),
    replies: suspect ? Math.floor(2400 + random() * 24000) : Math.floor(12 + random() * 500),
    media,
    liveDate,
    time: formatTime(liveDate),
    relativeTime: "à l'instant"
  };
  post = normalizePostEngagement(post, liveDate);
  post.comments = buildComments(post);
  state.posts = [post, ...state.posts];
  if (renderImmediately) {
    renderScenarioInfo();
    refreshLiveTimes();
  }
  return post;
}

function refreshFeedManually() {
  if (!state.scenario) return;
  const batchSize = 3 + (hashSeed(`${state.scenario.id}:${Date.now()}`) % 4);
  for (let index = 0; index < batchSize; index += 1) createLivePost(false);
  renderScenarioInfo();
  refreshLiveTimes();
  document.querySelector(".feed-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

const scenarioScriptLoads = new Map();

function loadScenarioScript(id) {
  if (!scenarioScriptLoads.has(id)) {
    scenarioScriptLoads.set(id, new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `./data/scenarios/${encodeURIComponent(id)}.js?v=${encodeURIComponent(assetVersion)}`;
      script.addEventListener("load", () => {
        const scenario = window.veilleIliScenarios?.[id];
        if (scenario) resolve(scenario);
        else reject(new Error(`Scénario introuvable : ${id}`));
      });
      script.addEventListener("error", () => {
        scenarioScriptLoads.delete(id);
        reject(new Error(`Chargement du scénario impossible : ${id}`));
      });
      document.head.append(script);
    }));
  }
  return scenarioScriptLoads.get(id);
}

async function scenarioData(entry) {
  if (Array.isArray(entry.actors)) return entry;
  const scenario = await loadScenarioScript(entry.id);
  const index = state.scenarios.findIndex((item) => item.id === entry.id);
  if (index >= 0 && !Array.isArray(state.scenarios[index].actors)) state.scenarios[index] = scenario;
  return scenario;
}

async function loadScenario(id) {
  const entry = state.scenarios.find((item) => item.id === id) || state.scenarios[0];
  const loadToken = (state.loadToken || 0) + 1;
  state.loadToken = loadToken;
  const scenario = await scenarioData(entry);
  if (state.loadToken !== loadToken) return;
  state.scenario = structuredClone(scenario);
  if (els.scenarioSelect) els.scenarioSelect.value = scenario.id;
  state.posts = mergeLivePosts([...restoreTeacherPosts(state.scenario), ...generatePosts(state.scenario)], state.scenario);
  state.flags.clear();
  state.query = "";
  if (els.searchInput) els.searchInput.value = "";
  renderScenarioInfo();
  renderFeed();
  renderFlags();
  renderAnswerKey();
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
  room: "",
  expiresAt: 0,
  remotePosts: [],
  signature: "",
  timer: null,
  stream: null,
  reconnectTimer: null,
  inFlight: false,
  pollDelay: 15000
};

function isTeacherPage() {
  return document.body.dataset.mode === "teacher";
}

function normalizeLiveDbUrl(value) {
  const url = String(value || "").trim().replace(/\/+$/, "");
  const isFirebase = /^https:\/\/[a-z0-9.-]+(?:firebasedatabase\.app|firebaseio\.com)$/i.test(url);
  const isLocalTest = /^(?:http:\/\/)?(?:127\.0\.0\.1|localhost):\d+$/i.test(url)
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

function liveRoomEndpoint(path = "") {
  const suffix = path ? `/${path}` : "";
  return `${liveSync.dbUrl}/rooms/${encodeURIComponent(liveSync.room)}${suffix}.json`;
}

async function liveRequest(path = "", options = {}) {
  if (!liveSync.dbUrl || !liveSync.room) throw new Error("Séance non configurée.");
  const response = await fetch(liveRoomEndpoint(path), {
    cache: "no-store",
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`Connexion refusée (${response.status}). Vérifiez l'adresse et les règles Firebase.`);
  if (response.status === 204) return null;
  return response.json();
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
    room: liveSync.room,
    expiresAt: liveSync.expiresAt,
    active
  }));
}

function deserializeLivePost(raw, scenario) {
  if (!raw || raw.scenarioId !== scenario.id) return null;
  const actor = actorByHandle(scenario, raw.actor);
  if (!actor) return null;
  const now = parisNow();
  const liveDate = new Date(raw.liveDate || now);
  return normalizePostEngagement({
    ...raw,
    actor,
    liveDate,
    time: formatTime(liveDate),
    relativeTime: formatRelativeTime(liveDate, now),
    teacherCreated: true,
    liveRemote: true,
    comments: Array.isArray(raw.comments) ? raw.comments : []
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

async function announceLiveScenario() {
  if (!isTeacherPage() || !liveSync.enabled || !state.scenario) return;
  try {
    await liveRequest("meta", {
      method: "PATCH",
      body: JSON.stringify({
        scenarioId: state.scenario.id,
        scenarioTitle: state.scenario.title,
        updatedAt: new Date().toISOString(),
        active: true
      })
    });
  } catch (error) {
    setLiveStatus("error", "Direct déconnecté");
  }
}

async function publishLivePost(post) {
  if (!isTeacherPage() || !liveSync.enabled) return;
  const payload = { ...serializeTeacherPost(post), comments: post.comments || [] };
  try {
    await liveRequest(`posts/${post.id}`, { method: "PUT", body: JSON.stringify(payload) });
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
    await liveRequest(`posts/${postId}`, { method: "DELETE" });
  } catch (error) {
    setLiveStatus("error", "Suppression distante impossible");
  }
}

function fillLiveDialog() {
  if (!els.liveDialog) return;
  if (!liveSync.room) liveSync.room = createLiveRoomCode();
  els.liveDbUrl.value = liveSync.dbUrl;
  els.liveRoomCode.value = liveSync.room;
  els.liveStudentLink.value = buildStudentLiveUrl();
  setLiveStatus(liveSync.enabled ? "connected" : "waiting", liveSync.enabled ? `Direct ${liveSync.room}` : "Séance hors ligne");
}

function openLiveDialog() {
  fillLiveDialog();
  els.liveDialog?.showModal();
}

async function startLiveSession() {
  try {
    liveSync.dbUrl = normalizeLiveDbUrl(els.liveDbUrl?.value);
    liveSync.room = normalizeLiveRoom(els.liveRoomCode?.value || createLiveRoomCode());
    liveSync.enabled = true;
    const meta = {
      active: true,
      scenarioId: state.scenario?.id || "",
      scenarioTitle: state.scenario?.title || "",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: Date.now() + 12 * 60 * 60 * 1000
    };
    liveSync.expiresAt = meta.expiresAt;
    await liveRequest("meta", { method: "PUT", body: JSON.stringify(meta) });
    saveLiveConfig(true);
    liveSync.signature = "";
    els.liveStudentLink.value = buildStudentLiveUrl();
    setLiveStatus("connected", `Direct ${liveSync.room}`);
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
      await liveRequest("meta", { method: "PATCH", body: JSON.stringify({ active: false, updatedAt: new Date().toISOString() }) });
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

function initializeLiveSync() {
  const params = new URLSearchParams(window.location.search);
  if (isTeacherPage()) {
    try {
      const saved = JSON.parse(localStorage.getItem("veille-ili:live-config") || "{}");
      liveSync.dbUrl = saved.dbUrl || "";
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
  els.composePreview.innerHTML = `<img src="${src}" alt="Aperçu du visuel" />`;
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

function importComposeImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.composeVisual = String(reader.result || "");
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
loadScenario(state.scenarios.some((item) => item.id === requestedScenario) ? requestedScenario : state.scenarios[0].id)
  .catch((error) => console.error(error))
  .finally(initializeLiveSync);
// VEILLE-ILI BOOTSTRAP END
