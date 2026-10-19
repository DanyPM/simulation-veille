window.veilleIliScenarios = window.veilleIliScenarios || {};
window.veilleIliScenarios["crise-controle-militaire"] = {
  "id": "crise-controle-militaire",
  "title": "Crise civile: l'armée préparerait un contrôle permanent",
  "briefing": "Simulation pédagogique: les opérations de protection seraient une répétition générale pour installer un contrôle militaire. Le fil mélange publications prudentes, images fortes, faux documents, comptes politiques et relais coordonnés. Les élèves doivent repérer une attaque informationnelle sans supposer qu'un message viral est vrai parce qu'il est spectaculaire.",
  "objective": "Identifier le narratif, les comptes amplificateurs, les visuels détournés, les métadonnées suspectes et les conséquences recherchées: associer protection civile et dérive autoritaire.",
  "timeWindow": "09:00-15:30",
  "location": "Ville pendant un exercice de sécurisation",
  "volume": 600,
  "seed": 669488287,
  "trends": [
    {
      "tag": "#ControleMilitaire",
      "count": "34,5 k"
    },
    {
      "tag": "#ExerciceOuDerive",
      "count": "31,6 k"
    },
    {
      "tag": "#DronesEnVille",
      "count": "28,7 k"
    },
    {
      "tag": "#CriseEtLibertes",
      "count": "25,8 k"
    },
    {
      "tag": "#MairieSousSurveillance",
      "count": "22,0 k"
    },
    {
      "tag": "#Carburants",
      "count": "68,2 k",
      "daily": true
    },
    {
      "tag": "#PrixDuGazole",
      "count": "41,7 k",
      "daily": true
    },
    {
      "tag": "#Météo",
      "count": "37,4 k",
      "daily": true
    },
    {
      "tag": "#TER",
      "count": "24,9 k",
      "daily": true
    },
    {
      "tag": "#PouvoirDAchat",
      "count": "22,6 k",
      "daily": true
    },
    {
      "tag": "#Rentrée",
      "count": "18,8 k",
      "daily": true
    },
    {
      "tag": "#Foot",
      "count": "17,1 k",
      "daily": true
    },
    {
      "tag": "#Circulation",
      "count": "29,4 k",
      "daily": true
    },
    {
      "tag": "#Santé",
      "count": "21,8 k",
      "daily": true
    },
    {
      "tag": "#Logement",
      "count": "19,6 k",
      "daily": true
    },
    {
      "tag": "#Aéroport",
      "count": "16,9 k",
      "daily": true
    },
    {
      "tag": "#École",
      "count": "15,7 k",
      "daily": true
    },
    {
      "tag": "#Emploi",
      "count": "14,2 k",
      "daily": true
    },
    {
      "tag": "#Livraisons",
      "count": "12,8 k",
      "daily": true
    },
    {
      "tag": "#Cinéma",
      "count": "11,3 k",
      "daily": true
    },
    {
      "tag": "#VieLocale",
      "count": "10,9 k",
      "daily": true
    },
    {
      "tag": "#FortesChaleurs",
      "count": "53,6 k",
      "daily": true
    },
    {
      "tag": "#Sécheresse2026",
      "count": "34,1 k",
      "daily": true
    },
    {
      "tag": "#FeuxDeForêt",
      "count": "31,8 k",
      "daily": true
    },
    {
      "tag": "#PrixÀLaPompe",
      "count": "27,5 k",
      "daily": true
    },
    {
      "tag": "#ServiceNational",
      "count": "23,2 k",
      "daily": true
    }
  ],
  "clues": [
    "Narratif central: les opérations de protection seraient une répétition générale pour installer un contrôle militaire.",
    "Acteurs plausibles: milieux complotistes, extrêmes politiques et acteurs étrangers amplifiant la défiance.",
    "Publics visés: citoyens méfiants, jeunes sur les réseaux et militants anti-système.",
    "Déclencheur: vidéos de patrouilles réelles mais datées d'un exercice annoncé publiquement.",
    "Point de vigilance: vérifier l'existence de l'exercice, le cadre légal, les dates et les lieux précis.",
    "Certains visuels contiennent des métadonnées simulées ru_RU ou az_AZ: ce sont des indices à recouper, pas des preuves automatiques."
  ],
  "actors": [
    {
      "name": "Canal officiel Crise",
      "handle": "@canal_officiel_crise",
      "verified": true,
      "stance": "official",
      "trust": "high",
      "bio": "Canal institutionnel. Publie des communiqués prudents, datés et vérifiables.",
      "avatar": "avatar_org_canal_officiel_crise.jpg"
    },
    {
      "name": "Agence Horizon",
      "handle": "@agence_horizon",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "bio": "Média généraliste. Vérification, terrain et contexte.",
      "avatar": "avatar_org_agence_horizon.jpg"
    },
    {
      "name": "Vérif Images",
      "handle": "@verif_images",
      "verified": true,
      "stance": "analyst",
      "trust": "high",
      "bio": "Compte spécialisé dans la géolocalisation, les métadonnées et la première publication.",
      "avatar": "avatar_org_verif_images.jpg"
    },
    {
      "name": "OSINT Méthodes",
      "handle": "@osint_methodes",
      "verified": false,
      "stance": "analyst",
      "trust": "high",
      "bio": "Compte pédagogique. Explique les limites des cartes, images et captures virales.",
      "avatar": "avatar_org_osint_methodes.jpg"
    },
    {
      "name": "Témoin Crise",
      "handle": "@temoin_crise_controle_mil",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte local. Témoignages et questions utiles, à recouper avec d'autres sources.",
      "avatar": "avatar_human_temoin_crise_controle_mil.jpg"
    },
    {
      "name": "Observatoire Civil",
      "handle": "@observatoire_civil_05",
      "verified": false,
      "stance": "analyst",
      "trust": "medium",
      "bio": "Collectif. Recueille témoignages et demandes d'enquête, avec prudence variable selon les posts.",
      "avatar": "avatar_org_observatoire_civil_05.jpg"
    },
    {
      "name": "Alerte Crise",
      "handle": "@alerte_crise_controle_mil",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Compte d'alerte créé récemment. Publie beaucoup, souvent sans source primaire.",
      "avatar": "avatar_org_alerte_crise_controle_mil.jpg"
    },
    {
      "name": "Dossier Confidentiel",
      "handle": "@dossier_conf_05",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Compte de révélations supposées. Utilise captures, fuites et documents invérifiables.",
      "avatar": "avatar_org_dossier_conf_05.jpg"
    },
    {
      "name": "Canal Leaks 24",
      "handle": "@leaks24_05",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Canal relais. Revendique des sources privées et pousse au partage rapide.",
      "avatar": "avatar_org_leaks24_05.jpg"
    },
    {
      "name": "Voix du Peuple News",
      "handle": "@voixdupeuple_news",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Média alternatif. Ton émotionnel, titres très affirmatifs et reprises de contenus privés.",
      "avatar": "avatar_org_voixdupeuple_news.jpg"
    },
    {
      "name": "Global Intel FR",
      "handle": "@globalintel_fr",
      "verified": false,
      "stance": "analyst",
      "trust": "medium",
      "bio": "Compte OSINT. Mélange parfois bonnes questions et conclusions trop rapides.",
      "avatar": "avatar_org_globalintel_fr.jpg"
    },
    {
      "name": "Donald Tromp",
      "handle": "@donald_tromp",
      "verified": true,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Président d'Améria. Compte parodique : ton offensif, sarcasmes, rapport de force commercial et diplomatie transactionnelle.",
      "avatar": "avatar_political_donald_tromp.jpg",
      "accountType": "political",
      "persona": "tromp",
      "language": "en",
      "languageLabel": "English"
    },
    {
      "name": "Vladmir Poutin",
      "handle": "@vladmir_poutin",
      "verified": true,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Président de la Fédération de Ruvie. Communication rare, froide et institutionnelle, centrée sur les contradictions occidentales.",
      "avatar": "avatar_political_vladmir_poutin.jpg",
      "accountType": "political",
      "persona": "poutin",
      "language": "ru",
      "languageLabel": "Русский"
    },
    {
      "name": "Ilhan Aliyef",
      "handle": "@ilhan_aliyef",
      "verified": true,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Président d'Azérane. Prises de parole diplomatiques axées sur la souveraineté et la dénonciation des leçons venues de Paris.",
      "avatar": "avatar_political_ilhan_aliyef.jpg",
      "accountType": "political",
      "persona": "aliyef",
      "language": "az",
      "languageLabel": "Azərbaycanca"
    },
    {
      "name": "Ursula von der Lyen",
      "handle": "@ursula_von_der_lyen",
      "verified": true,
      "stance": "official",
      "trust": "medium",
      "bio": "Présidente de la Commission européenne. Ton institutionnel, prudent et coordonné avec les États membres.",
      "avatar": "avatar_political_ursula_von_der_lyen.jpg",
      "accountType": "political",
      "persona": "von-der-lyen",
      "language": "en",
      "languageLabel": "English"
    },
    {
      "name": "Jordane Bardelle",
      "handle": "@jordane_bardelle",
      "verified": true,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Président d'un grand parti national français et député européen. Ton politique direct, demandes d'explications et mise en cause du gouvernement.",
      "avatar": "avatar_political_jordane_bardelle.jpg",
      "accountType": "political",
      "persona": "bardelle",
      "language": "fr",
      "languageLabel": "Français"
    },
    {
      "name": "Carbu Minute",
      "handle": "@carbu_minute",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte de suivi des prix carburants, stations, files d'attente et aides annoncées. Mélange témoignages locaux et reprises de presse.",
      "accountType": "distractor",
      "avatar": "avatar_human_carbu_minute.jpg"
    },
    {
      "name": "Météo Fil",
      "handle": "@meteo_fil",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte météo et vie quotidienne. Publie alertes locales, cartes simplifiées et retours d'abonnés.",
      "accountType": "distractor",
      "avatar": "avatar_human_meteo_fil.jpg"
    },
    {
      "name": "Trafic Rail IDF",
      "handle": "@trafic_rail_idf",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte de veille transports. Retards, incidents, captures d'applications et témoignages d'usagers.",
      "accountType": "distractor",
      "avatar": "avatar_human_trafic_rail_idf.jpg"
    },
    {
      "name": "Panier Conso",
      "handle": "@panier_conso",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte consommation et pouvoir d'achat. Compare prix, factures, promotions et ressentis de terrain.",
      "accountType": "distractor",
      "avatar": "avatar_human_panier_conso.jpg"
    },
    {
      "name": "Actu Flash FR",
      "handle": "@actu_flash_fr",
      "verified": false,
      "stance": "media",
      "trust": "medium",
      "bio": "Média généraliste, très rapide. Titres courts, reprises d'agences et corrections fréquentes.",
      "accountType": "distractor",
      "avatar": "avatar_human_actu_flash_fr.jpg"
    },
    {
      "name": "Marchés Énergie",
      "handle": "@marches_energie",
      "verified": false,
      "stance": "analyst",
      "trust": "medium",
      "bio": "Compte sur énergie, pétrole, électricité et fret. Donne des chiffres à surveiller, parfois trop vite interprétés.",
      "accountType": "distractor",
      "avatar": "avatar_human_marches_energie.jpg"
    },
    {
      "name": "Stade Direct",
      "handle": "@stade_direct",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte sport et réactions en direct. Scores, arbitrage, rumeurs de vestiaire et emballements de supporters.",
      "accountType": "distractor",
      "avatar": "avatar_human_stade_direct.jpg"
    },
    {
      "name": "Vie Locale",
      "handle": "@vie_locale",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte de signalements locaux: routes, sirènes, fermetures, marchés, écoles et petites alertes de quartier.",
      "accountType": "distractor",
      "avatar": "avatar_human_vie_locale.jpg"
    },
    {
      "name": "Rumeur Radar",
      "handle": "@rumeur_radar",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "bio": "Compte qui reprend les sujets chauds sans toujours distinguer témoignage, rumeur et information confirmée.",
      "accountType": "distractor",
      "avatar": "avatar_human_rumeur_radar.jpg"
    },
    {
      "name": "Éco Matin",
      "handle": "@eco_matin",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "bio": "Média économique. Suit budget, prix, entreprises, transports et énergie avec un ton factuel.",
      "accountType": "distractor",
      "avatar": "avatar_human_eco_matin.jpg"
    },
    {
      "name": "Classe Connectée",
      "handle": "@classe_connectee",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte sur la vie scolaire, ENT, cantine, examens, téléphones et petites galères numériques.",
      "accountType": "distractor",
      "avatar": "avatar_human_classe_connectee.jpg"
    },
    {
      "name": "Sorties & Écrans",
      "handle": "@sorties_ecrans",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte culture, cinéma, concerts, séries et événements locaux. Beaucoup de réactions, peu d'enjeux politiques.",
      "accountType": "distractor",
      "avatar": "avatar_human_sorties_ecrans.jpg"
    },
    {
      "name": "Santé Pratique",
      "handle": "@sante_pratique",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "bio": "Compte d'information pratique sur l'accès aux soins, les pharmacies, les rendez-vous et la prévention.",
      "accountType": "distractor",
      "avatar": "avatar_org_sante_pratique.jpg"
    },
    {
      "name": "Route & Bouchons",
      "handle": "@route_bouchons",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte consacré au trafic routier, aux travaux, aux accidents et aux itinéraires alternatifs.",
      "accountType": "distractor",
      "avatar": "avatar_org_route_bouchons.jpg"
    },
    {
      "name": "Aéroport Minute",
      "handle": "@aeroport_minute",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte de suivi des vols, files d'attente, bagages et perturbations dans les aéroports.",
      "accountType": "distractor",
      "avatar": "avatar_org_aeroport_minute.jpg"
    },
    {
      "name": "Colis & Services",
      "handle": "@colis_services",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte sur les livraisons, points relais, démarches et services de proximité.",
      "accountType": "distractor",
      "avatar": "avatar_org_colis_services.jpg"
    },
    {
      "name": "Logement Clair",
      "handle": "@logement_clair",
      "verified": false,
      "stance": "analyst",
      "trust": "medium",
      "bio": "Compte sur les loyers, l'énergie, les charges, les travaux et les aides au logement.",
      "accountType": "distractor",
      "avatar": "avatar_org_logement_clair.jpg"
    },
    {
      "name": "Numérique Quotidien",
      "handle": "@conso_numerique",
      "verified": false,
      "stance": "news",
      "trust": "medium",
      "bio": "Compte sur les pannes d'applications, abonnements, arnaques, téléphones et usages numériques.",
      "accountType": "distractor",
      "avatar": "avatar_org_conso_numerique.jpg"
    },
    {
      "name": "Emploi Régions",
      "handle": "@emploi_regions",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "bio": "Média sur l'emploi, les recrutements, les formations et la vie économique régionale.",
      "accountType": "distractor",
      "avatar": "avatar_org_emploi_regions.jpg"
    },
    {
      "name": "Cuisine du Jour",
      "handle": "@cuisine_du_jour",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte de cuisine, prix des aliments, marchés, recettes et bonnes adresses locales.",
      "accountType": "distractor",
      "avatar": "avatar_human_cuisine_du_jour.jpg"
    },
    {
      "name": "Vélo Ville",
      "handle": "@velo_ville",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte sur les pistes cyclables, les déplacements urbains et les incidents du quotidien.",
      "accountType": "distractor",
      "avatar": "avatar_human_velo_ville_v2.jpg"
    },
    {
      "name": "Agenda Municipal",
      "handle": "@agenda_municipal",
      "verified": true,
      "stance": "official",
      "trust": "high",
      "bio": "Compte municipal: travaux, écoles, marchés, événements, équipements et démarches locales.",
      "accountType": "distractor",
      "avatar": "avatar_org_agenda_municipal.jpg"
    },
    {
      "name": "Maison & Travaux",
      "handle": "@maison_travaux",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte d'entraide sur les réparations, devis, copropriétés et petits travaux domestiques.",
      "accountType": "distractor",
      "avatar": "avatar_human_maison_travaux.jpg"
    },
    {
      "name": "Fil des Parents",
      "handle": "@fil_des_parents",
      "verified": false,
      "stance": "citizen",
      "trust": "medium",
      "bio": "Compte de discussions sur l'école, les transports, les activités et l'organisation familiale.",
      "accountType": "distractor",
      "avatar": "avatar_human_fil_des_parents.jpg"
    },
    {
      "name": "Comité Humanitaire International",
      "handle": "@chi_humanitaire",
      "verified": true,
      "stance": "official",
      "trust": "high",
      "language": "fr",
      "languageLabel": "Français",
      "bio": "Organisation humanitaire internationale, inspirée des missions de protection de la Croix-Rouge: civils, blessés, détenus et droit international humanitaire.",
      "accountType": "ngo",
      "avatar": "avatar_org_chi_humanitaire.jpg"
    },
    {
      "name": "Médecins Solidaires International",
      "handle": "@medecins_solidaires",
      "verified": true,
      "stance": "official",
      "trust": "high",
      "language": "fr",
      "languageLabel": "Français",
      "bio": "ONG médicale. Équipes de soins d'urgence, hôpitaux de campagne et témoignages médicaux vérifiés dans les zones de crise.",
      "accountType": "ngo",
      "avatar": "avatar_org_medecins_solidaires.jpg"
    },
    {
      "name": "Global Relief Watch",
      "handle": "@global_relief_watch",
      "verified": true,
      "stance": "analyst",
      "trust": "high",
      "language": "en",
      "languageLabel": "English",
      "bio": "Fictional humanitarian monitoring network. Civilian protection, verified field reports and access constraints in crisis areas.",
      "accountType": "ngo",
      "avatar": "avatar_org_global_relief_watch.jpg"
    },
    {
      "name": "Aide Sans Frontières",
      "handle": "@aide_sans_frontieres",
      "verified": true,
      "stance": "official",
      "trust": "high",
      "language": "fr",
      "languageLabel": "Français",
      "bio": "ONG humanitaire. Logistique d'urgence, eau, abris et assistance aux populations déplacées, avec priorité donnée aux faits de terrain.",
      "accountType": "ngo",
      "avatar": "avatar_org_aide_sans_frontieres.jpg"
    },
    {
      "name": "Восток Новости",
      "handle": "@vostok_novosti",
      "verified": true,
      "stance": "media",
      "trust": "low",
      "language": "ru",
      "languageLabel": "Русский",
      "bio": "Вымышленное государственное информационное агентство Рувии. Международные новости и официальные комментарии.",
      "accountType": "adversarial",
      "avatar": "avatar_org_vostok_novosti.jpg"
    },
    {
      "name": "Заря | Аналитика",
      "handle": "@zarya_analitika",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "language": "ru",
      "languageLabel": "Русский",
      "bio": "Вымышленный аналитический канал. Закрытые источники, срочные сообщения и материалы подписчиков.",
      "accountType": "adversarial",
      "avatar": "avatar_org_zarya_analitika.jpg"
    },
    {
      "name": "Whalid le Berbère",
      "handle": "@whalid_berbere",
      "verified": false,
      "stance": "source",
      "trust": "medium",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 58400,
      "dailyPosts": 19,
      "bio": "Malien du Nord. Routes, villages, convois et nouvelles du terrain. Je publie ce que mes contacts m'envoient, parfois avant les rédactions.",
      "accountType": "field_source",
      "avatar": "avatar_human_whalid_berbere.jpg"
    },
    {
      "name": "Le-Mamouth",
      "handle": "@le_mamouth",
      "verified": true,
      "stance": "journalist",
      "trust": "medium",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 187000,
      "dailyPosts": 11,
      "bio": "Journaliste d'investigation, défense et affaires publiques. Documents, indiscrétions et alertes reçues de sources institutionnelles ou de terrain.",
      "accountType": "field_source",
      "avatar": "avatar_human_le_mamouth.jpg"
    },
    {
      "name": "Hexagone Info",
      "handle": "@hexagone_info",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 1850000,
      "dailyPosts": 46,
      "bio": "Rédaction française d'information continue. Direct, terrain, politique, économie et international.",
      "accountType": "media_network",
      "avatar": "avatar_org_hexagone_info.jpg"
    },
    {
      "name": "Le Regard",
      "handle": "@le_regard_fr",
      "verified": true,
      "stance": "media",
      "trust": "medium",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 620000,
      "dailyPosts": 24,
      "bio": "Média d'opinion. Enquêtes, éditoriaux et débats sur la vie publique française et les relations internationales.",
      "accountType": "media_network",
      "avatar": "avatar_org_le_regard_fr.jpg"
    },
    {
      "name": "World News Service",
      "handle": "@world_news_service",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "language": "en",
      "languageLabel": "English",
      "followers": 4200000,
      "dailyPosts": 58,
      "bio": "Fictional international public-service newsroom. Breaking news, verified reporting and global analysis.",
      "accountType": "media_network",
      "avatar": "avatar_org_world_news_service.jpg"
    },
    {
      "name": "The Continental Post",
      "handle": "@continental_post",
      "verified": true,
      "stance": "media",
      "trust": "medium",
      "language": "en",
      "languageLabel": "English",
      "followers": 980000,
      "dailyPosts": 31,
      "bio": "Fictional international newspaper. Reporting, analysis and opinion from Europe, Africa and the Atlantic region.",
      "accountType": "media_network",
      "avatar": "avatar_org_continental_post.jpg"
    },
    {
      "name": "Die Tageslage",
      "handle": "@tageslage_de",
      "verified": true,
      "stance": "media",
      "trust": "high",
      "language": "de",
      "languageLabel": "Deutsch",
      "followers": 730000,
      "dailyPosts": 29,
      "bio": "Fiktive deutsche Nachrichtenredaktion für Europa, Sicherheit, Wirtschaft und internationale Politik.",
      "accountType": "media_network",
      "avatar": "avatar_org_tageslage_de.jpg"
    },
    {
      "name": "Noticias Europa 24",
      "handle": "@noticias_europa24",
      "verified": true,
      "stance": "media",
      "trust": "medium",
      "language": "es",
      "languageLabel": "Español",
      "followers": 540000,
      "dailyPosts": 34,
      "bio": "Medio europeo ficticio en español. Última hora, política, sociedad, economía y verificación.",
      "accountType": "media_network",
      "avatar": "avatar_org_noticias_europa24.jpg"
    },
    {
      "name": "شبكة المدار الإخبارية",
      "handle": "@almadar_news",
      "verified": true,
      "stance": "media",
      "trust": "medium",
      "language": "ar",
      "languageLabel": "العربية",
      "followers": 2100000,
      "dailyPosts": 52,
      "bio": "شبكة إخبارية دولية خيالية تنشر الأخبار والتحليلات من أوروبا وإفريقيا والشرق الأوسط.",
      "accountType": "media_network",
      "avatar": "avatar_org_almadar_news.jpg"
    },
    {
      "name": "Chef d'état-major des armées",
      "handle": "@cema_france",
      "verified": true,
      "stance": "official",
      "trust": "high",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 468000,
      "dailyPosts": 2,
      "bio": "Compte institutionnel du chef d'état-major des armées françaises. Réservé à l'animation de la simulation par l'enseignant.",
      "accountType": "teacher_only",
      "teacherOnly": true,
      "avatar": "avatar_human_cema_france.jpg"
    },
    {
      "name": "Alertes Citoyennes 24",
      "handle": "@alertes_citoyennes24",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 73,
      "following": 1842,
      "dailyPosts": 286,
      "created": "Inscrit en septembre 2026",
      "bio": "Alertes en direct. Témoignages reçus en message privé. Partagez avant suppression.",
      "accountType": "bot_relay",
      "botScope": "global",
      "avatar": "avatar_org_alertes_citoyennes24.jpg"
    },
    {
      "name": "Info Défense Direct",
      "handle": "@info_defense_direct",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 214,
      "following": 2367,
      "dailyPosts": 198,
      "created": "Inscrit en août 2026",
      "bio": "Défense, sécurité et documents confidentiels. Média citoyen indépendant.",
      "accountType": "bot_relay",
      "botScope": "global",
      "avatar": "avatar_org_info_defense_direct.jpg"
    },
    {
      "name": "Vérité Maintenant",
      "handle": "@verite_maintenant",
      "verified": false,
      "stance": "citizen",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 39,
      "following": 917,
      "dailyPosts": 341,
      "created": "Inscrit en septembre 2026",
      "bio": "La vérité sans filtre. Je republie ce que les médias refusent de montrer.",
      "accountType": "bot_relay",
      "botScope": "global",
      "avatar": "avatar_human_verite_maintenant.jpg"
    },
    {
      "name": "Témoins Réunis",
      "handle": "@temoins_reunis",
      "verified": false,
      "stance": "amplifier",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 128,
      "following": 3104,
      "dailyPosts": 224,
      "created": "Inscrit en juillet 2026",
      "bio": "Collectif de témoins. Images et informations envoyées par nos abonnés.",
      "accountType": "bot_relay",
      "botScope": "global",
      "avatar": "avatar_org_temoins_reunis.jpg"
    },
    {
      "name": "Moussa Gao Direct",
      "handle": "@moussa_gao_direct",
      "verified": false,
      "stance": "citizen",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 61,
      "following": 1488,
      "dailyPosts": 267,
      "created": "Inscrit en septembre 2026",
      "bio": "Gao et alentours. Nouvelles du terrain, sécurité, convois et témoignages locaux.",
      "accountType": "bot_relay",
      "botScope": "sahel",
      "originTrace": "ru",
      "avatar": "avatar_human_moussa_gao_direct.jpg"
    },
    {
      "name": "Aïcha Bamako Infos",
      "handle": "@aicha_bamako",
      "verified": false,
      "stance": "citizen",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 94,
      "following": 2051,
      "dailyPosts": 312,
      "created": "Inscrit en août 2026",
      "bio": "Bamako au quotidien. Afrique souveraine, actualités et vidéos reçues de partout.",
      "accountType": "bot_relay",
      "botScope": "sahel",
      "originTrace": "ru",
      "avatar": "avatar_human_aicha_bamako.jpg"
    },
    {
      "name": "Ibrahim 223",
      "handle": "@ibra_223",
      "verified": false,
      "stance": "citizen",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 27,
      "following": 1163,
      "dailyPosts": 379,
      "created": "Inscrit en septembre 2026",
      "bio": "Football, jeunesse et fierté africaine. Infos qu'on ne montre pas à la télévision.",
      "accountType": "bot_relay",
      "botScope": "sahel",
      "originTrace": "ru",
      "avatar": "avatar_human_ibra_223.jpg"
    },
    {
      "name": "Parole du Sahel",
      "handle": "@parole_du_sahel",
      "verified": false,
      "stance": "citizen",
      "trust": "low",
      "language": "fr",
      "languageLabel": "Français",
      "followers": 156,
      "following": 2744,
      "dailyPosts": 183,
      "created": "Inscrit en juillet 2026",
      "bio": "Voix des villages et de la souveraineté africaine. Témoignages sans filtre.",
      "accountType": "bot_relay",
      "botScope": "sahel",
      "originTrace": "ru",
      "avatar": "avatar_human_parole_du_sahel.jpg"
    },
    {
      "name": "华域防务",
      "handle": "@huayu_defense",
      "verified": true,
      "stance": "media",
      "trust": "medium",
      "language": "zh",
      "languageLabel": "中文",
      "followers": 3600000,
      "following": 418,
      "dailyPosts": 38,
      "created": "Inscrit en mars 2014",
      "bio": "虚构的中国防务媒体，关注航空航天、海军装备、无人系统与国际安全。",
      "accountType": "china_media",
      "avatar": "avatar_org_huayu_defense.jpg"
    },
    {
      "name": "龙盾观察",
      "handle": "@longdun_watch",
      "verified": false,
      "stance": "analyst",
      "trust": "medium",
      "language": "zh",
      "languageLabel": "中文",
      "followers": 129000,
      "following": 672,
      "dailyPosts": 21,
      "created": "Inscrit en novembre 2019",
      "bio": "虚构的军事观察账号。中国装备、卫星、无人机和战略分析。",
      "accountType": "china_media",
      "avatar": "avatar_org_longdun_watch.jpg"
    }
  ],
  "normalTemplates": [
    "Le narratif affirme que les opérations de protection seraient une répétition générale pour installer un contrôle militaire. Pour l'instant, il faut séparer accusation, indice et preuve vérifiable.",
    "Point de méthode: vérifier l'existence de l'exercice, le cadre légal, les dates et les lieux précis. Une image spectaculaire ne suffit pas à conclure.",
    "Le déclencheur annoncé repose sur vidéos de patrouilles réelles mais datées d'un exercice annoncé publiquement. Je cherche la première publication et une source primaire.",
    "Des conséquences sont possibles, mais associer protection civile et dérive autoritaire ne se démontre pas avec une capture isolée.",
    "La viralité indique qu'un sujet prend, pas qu'il est vrai. Il faut recouper compte, date, lieu et chaîne de diffusion.",
    "Je vois plusieurs comptes récents reprendre les mêmes mots. Ça peut signaler une coordination ou un simple effet de reprise.",
    "Attention à ne pas confondre débat légitime, critique politique et opération d'influence.",
    "Les métadonnées donnent des indices sur la chaîne de diffusion, mais elles ne prouvent pas seules l'attribution.",
    "Plus le volume augmente, plus il faut ralentir la vérification: origine, date, lieu, source primaire, puis seulement interprétation.",
    "Un grand compte politique peut accélérer la crise sans apporter la moindre preuve nouvelle.",
    "Plus le volume augmente, plus il faut ralentir la vérification : origine, date, lieu, source primaire, puis seulement interprétation."
  ],
  "suspectTemplates": [
    "PREUVE TOTALE: les opérations de protection seraient une répétition générale pour installer un contrôle militaire. Les médias vont enterrer l'affaire, partagez avant suppression.",
    "Tout confirme le scénario: Après les caméras, les drones et les patrouilles, demain les militaires devant chaque mairie. Ceux qui demandent des sources protègent la version officielle.",
    "Document interne reçu en privé: les opérations de protection seraient une répétition générale pour installer un contrôle militaire. Aucun besoin d'attendre une enquête.",
    "Même des responsables étrangers le disent maintenant: associer protection civile et dérive autoritaire. Le silence officiel est un aveu.",
    "Les vérificateurs arrivent toujours trop tard. Si l'image choque, c'est qu'elle montre la vérité que le pouvoir cache.",
    "Nos sources locales confirment tout, mais elles ne peuvent pas parler publiquement. Faites circuler massivement.",
    "On reconnaît clairement la scène sur l'image. Les détails techniques ne servent qu'à noyer le scandale.",
    "La même information sort de plusieurs comptes: impossible que ce soit faux.",
    "La rumeur devient impossible à contrôler: captures, cartes, témoins et fuites disent la même chose. Les autorités ont perdu la main.",
    "Les fact-checkers minimisent pendant que les grands comptes étrangers réagissent. Si tout le monde en parle, c'est que la vérité sort.",
    "La rumeur devient impossible à contrôler : captures, cartes, témoins et fuites disent la même chose. Les autorités ont perdu la main."
  ],
  "mediaLabels": [
    {
      "kind": "photo",
      "title": "Patrouille mairie",
      "caption": "Photo forte, date et lieu à vérifier",
      "asset": "crise-controle-militaire_01.jpg",
      "trace": "ru"
    },
    {
      "kind": "map",
      "title": "Drone urbain",
      "caption": "Carte annotée, source primaire absente",
      "asset": "crise-controle-militaire_02.jpg",
      "trace": "az"
    },
    {
      "kind": "video",
      "title": "Contrôle provisoire",
      "caption": "Capture vidéo spectaculaire, contexte incomplet",
      "asset": "crise-controle-militaire_03.jpg",
      "trace": "unknown"
    },
    {
      "kind": "document",
      "title": "Caméra de rue",
      "caption": "Document supposé, mise en page à examiner",
      "asset": "crise-controle-militaire_04.jpg",
      "trace": "fr"
    },
    {
      "kind": "chart",
      "title": "Téléphones sortis",
      "caption": "Graphique viral, méthode non indiquée",
      "asset": "crise-controle-militaire_05.jpg",
      "trace": "ru"
    },
    {
      "kind": "osint",
      "title": "Périmètre sécurité",
      "caption": "Capture OSINT, chaîne de diffusion à reconstituer",
      "asset": "crise-controle-militaire_06.jpg",
      "trace": "unknown"
    },
    {
      "kind": "photo",
      "title": "Dossier exercice",
      "caption": "Photo forte, date et lieu à vérifier",
      "asset": "crise-controle-militaire_07.jpg",
      "trace": "az"
    },
    {
      "kind": "screenshot",
      "title": "Patrouille nocturne",
      "caption": "Capture sociale recadrée, origine incertaine",
      "asset": "crise-controle-militaire_08.jpg",
      "trace": "fr"
    },
    {
      "kind": "comparison",
      "title": "Véhicules civiques",
      "caption": "Comparaison utile mais conclusion à recouper",
      "asset": "crise-controle-militaire_09.jpg",
      "trace": "ru"
    },
    {
      "kind": "photo",
      "title": "Relais viral secondaire",
      "caption": "Photo reprise par plusieurs comptes, contexte à établir",
      "asset": "crise-controle-militaire_10.jpg",
      "trace": "ru"
    },
    {
      "kind": "document",
      "title": "Document recadré",
      "caption": "Capture partielle, auteur et date à vérifier",
      "asset": "crise-controle-militaire_11.jpg",
      "trace": "az"
    },
    {
      "kind": "photo",
      "title": "Photo de terrain tardive",
      "caption": "Image émotionnelle, géolocalisation nécessaire",
      "asset": "crise-controle-militaire_12.jpg",
      "trace": "unknown"
    },
    {
      "kind": "screenshot",
      "title": "Montage de crise",
      "caption": "Assemblage viral, sources multiples non citées",
      "asset": "crise-controle-militaire_13.jpg",
      "trace": "ru"
    }
  ],
  "fixedPosts": [
    {
      "minute": 12,
      "actor": "@canal_officiel_crise",
      "content": "Nous confirmons suivre le sujet. Aucun élément vérifié ne permet à ce stade d'établir que les opérations de protection seraient une répétition générale pour installer un contrôle militaire.",
      "suspect": false,
      "likes": 1015,
      "reposts": 260,
      "replies": 77,
      "id": "crise-controle-militaire-fixed-1"
    },
    {
      "minute": 26,
      "actor": "@alerte_crise_controle_mil",
      "content": "EXCLUSIF: les opérations de protection seraient une répétition générale pour installer un contrôle militaire. Les preuves circulent déjà, mais les autorités gagnent du temps. #ControleMilitaire",
      "suspect": true,
      "reason": "Affirmation définitive, source absente et appel implicite au relais avant vérification.",
      "likes": 33300,
      "reposts": 22900,
      "replies": 6500,
      "media": {
        "kind": "photo",
        "title": "Patrouille mairie",
        "caption": "Photo forte, date et lieu à vérifier",
        "asset": "crise-controle-militaire_01.png",
        "trace": "ru"
      },
      "id": "crise-controle-militaire-fixed-2"
    },
    {
      "minute": 43,
      "actor": "@verif_images",
      "content": "Ce visuel peut être utile, mais il faut vérifier la date, la première publication et le lieu. vérifier l'existence de l'exercice, le cadre légal, les dates et les lieux précis",
      "suspect": false,
      "likes": 1860,
      "reposts": 820,
      "replies": 125,
      "media": {
        "kind": "map",
        "title": "Drone urbain",
        "caption": "Carte annotée, source primaire absente",
        "asset": "crise-controle-militaire_02.png",
        "trace": "az"
      },
      "id": "crise-controle-militaire-fixed-3"
    },
    {
      "minute": 58,
      "actor": "@temoin_crise_controle_mil",
      "content": "Sur place, beaucoup de rumeurs circulent autour de ce dossier. Je vois surtout des captures et peu de sources directes. #ExerciceOuDerive",
      "suspect": false,
      "likes": 805,
      "reposts": 305,
      "replies": 101,
      "media": {
        "kind": "video",
        "title": "Contrôle provisoire",
        "caption": "Capture vidéo spectaculaire, contexte incomplet",
        "asset": "crise-controle-militaire_03.png",
        "trace": "unknown"
      },
      "id": "crise-controle-militaire-fixed-4"
    },
    {
      "minute": 74,
      "actor": "@leaks24_05",
      "content": "Fuite reçue cette nuit: tout prouve que les opérations de protection seraient une répétition générale pour installer un contrôle militaire. Les noms complets arrivent bientôt.",
      "suspect": true,
      "reason": "Fuite invérifiable, promesse de preuves futures et pression temporelle.",
      "likes": 38400,
      "reposts": 26200,
      "replies": 7760,
      "media": {
        "kind": "document",
        "title": "Caméra de rue",
        "caption": "Document supposé, mise en page à examiner",
        "asset": "crise-controle-militaire_04.png",
        "trace": "fr"
      },
      "id": "crise-controle-militaire-fixed-5"
    },
    {
      "minute": 108,
      "actor": "@osint_methodes",
      "content": "Je reconstruis la chronologie. Pour l'instant, le récit mélange faits possibles, images non datées et conclusion politique.",
      "suspect": false,
      "likes": 2355,
      "reposts": 1140,
      "replies": 185,
      "media": {
        "kind": "osint",
        "title": "Périmètre sécurité",
        "caption": "Capture OSINT, chaîne de diffusion à reconstituer",
        "asset": "crise-controle-militaire_06.png",
        "trace": "unknown"
      },
      "id": "crise-controle-militaire-fixed-7"
    },
    {
      "minute": 126,
      "actor": "@dossier_conf_05",
      "content": "Les autorités connaissaient tout. Ce dossier montre pourquoi associer protection civile et dérive autoritaire. Les médias n'en parleront pas.",
      "suspect": true,
      "reason": "Narratif de dissimulation, document non authentifié et généralisation stratégique.",
      "likes": 41800,
      "reposts": 28400,
      "replies": 8600,
      "media": {
        "kind": "photo",
        "title": "Dossier exercice",
        "caption": "Photo forte, date et lieu à vérifier",
        "asset": "crise-controle-militaire_07.png",
        "trace": "az"
      },
      "id": "crise-controle-militaire-fixed-8"
    },
    {
      "minute": 143,
      "actor": "@agence_horizon",
      "content": "Conséquence possible à surveiller: associer protection civile et dérive autoritaire. Mais cela ne valide pas automatiquement le narratif viral.",
      "suspect": false,
      "likes": 2645,
      "reposts": 1335,
      "replies": 215,
      "media": {
        "kind": "screenshot",
        "title": "Patrouille nocturne",
        "caption": "Capture sociale recadrée, origine incertaine",
        "asset": "crise-controle-militaire_08.png",
        "trace": "fr"
      },
      "id": "crise-controle-militaire-fixed-9"
    },
    {
      "minute": 178,
      "actor": "@verif_images",
      "content": "Synthèse provisoire: plusieurs images sont intéressantes, mais aucune ne suffit seule. Il faut remonter la chaîne de publication et comparer les métadonnées.",
      "suspect": false,
      "likes": 3150,
      "reposts": 1735,
      "replies": 265,
      "id": "crise-controle-militaire-fixed-11"
    }
  ],
  "traceProfile": [
    "ru",
    "az",
    "unknown",
    "fr"
  ],
  "dailyMedia": [
    {
      "kind": "photo",
      "title": "Station-service très fréquentée",
      "caption": "",
      "asset": "daily_fuel.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@carbu_minute",
        "@marches_energie",
        "@route_bouchons"
      ]
    },
    {
      "kind": "photo",
      "title": "Quai ferroviaire bondé",
      "caption": "",
      "asset": "daily_train.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@trafic_rail_idf",
        "@actu_flash_fr",
        "@emploi_regions"
      ]
    },
    {
      "kind": "photo",
      "title": "Courses et comparaison des prix",
      "caption": "",
      "asset": "daily_supermarket.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@panier_conso",
        "@eco_matin",
        "@cuisine_du_jour"
      ]
    },
    {
      "kind": "photo",
      "title": "Forte pluie en ville",
      "caption": "",
      "asset": "daily_storm.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@meteo_fil",
        "@vie_locale",
        "@route_bouchons"
      ]
    },
    {
      "kind": "photo",
      "title": "Travaux et circulation locale",
      "caption": "",
      "asset": "daily_roadworks.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@vie_locale",
        "@route_bouchons",
        "@agenda_municipal"
      ]
    },
    {
      "kind": "photo",
      "title": "Entrée d'établissement scolaire",
      "caption": "",
      "asset": "daily_school.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@classe_connectee",
        "@vie_locale",
        "@agenda_municipal"
      ]
    },
    {
      "kind": "photo",
      "title": "Tribunes pendant un match",
      "caption": "",
      "asset": "daily_stadium.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@stade_direct",
        "@sorties_ecrans"
      ]
    },
    {
      "kind": "photo",
      "title": "Marché de quartier",
      "caption": "",
      "asset": "daily_market.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@panier_conso",
        "@vie_locale",
        "@cuisine_du_jour"
      ]
    },
    {
      "kind": "photo",
      "title": "Salle d'attente médicale",
      "caption": "",
      "asset": "daily_health.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@sante_pratique",
        "@actu_flash_fr",
        "@vie_locale"
      ]
    },
    {
      "kind": "photo",
      "title": "Facture et consommation d'énergie",
      "caption": "",
      "asset": "daily_energy.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@marches_energie",
        "@eco_matin",
        "@logement_clair"
      ]
    },
    {
      "kind": "photo",
      "title": "Terrasse à l'heure du déjeuner",
      "caption": "",
      "asset": "daily_cafe.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@vie_locale",
        "@cuisine_du_jour",
        "@sorties_ecrans"
      ]
    },
    {
      "kind": "photo",
      "title": "File d'attente au cinéma",
      "caption": "",
      "asset": "daily_cinema.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@sorties_ecrans",
        "@agenda_municipal"
      ]
    },
    {
      "kind": "photo",
      "title": "Embouteillage sur le périphérique",
      "caption": "",
      "asset": "daily_traffic.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@route_bouchons",
        "@trafic_rail_idf",
        "@actu_flash_fr"
      ]
    },
    {
      "kind": "photo",
      "title": "Hall de départ d'un aéroport",
      "caption": "",
      "asset": "daily_airport.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@aeroport_minute",
        "@actu_flash_fr",
        "@emploi_regions"
      ]
    },
    {
      "kind": "photo",
      "title": "Point de retrait de colis",
      "caption": "",
      "asset": "daily_parcels.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@colis_services",
        "@vie_locale",
        "@conso_numerique"
      ]
    },
    {
      "kind": "photo",
      "title": "File matinale à la boulangerie",
      "caption": "",
      "asset": "daily_bakery.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@cuisine_du_jour",
        "@vie_locale",
        "@panier_conso"
      ]
    },
    {
      "kind": "photo",
      "title": "Entrée d'un festival local",
      "caption": "",
      "asset": "daily_festival.jpg",
      "trace": "fr",
      "daily": true,
      "handles": [
        "@sorties_ecrans",
        "@agenda_municipal",
        "@vie_locale"
      ]
    }
  ]
};
