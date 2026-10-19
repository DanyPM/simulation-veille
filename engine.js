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

function buildComments(post) {
  return pooledComments({ ...post, commentPool: buildCommentPool(post) });
}

function buildCommentPool(post) {
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
  return Array.from({ length: desiredCount }, () => {
    const actor = pool.length ? pool[Math.floor(random() * pool.length)] : allEligibleActors[0] || post.actor;
    const actorTemplates = actor.trust === "low"
      ? (post.distractor ? everydayComments : suspectComments)
      : (post.distractor ? everydayComments : carefulComments);
    return {
      actor,
      content: actorTemplates[Math.floor(random() * actorTemplates.length)],
      likeShare: random()
    };
  });
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
