# VEILLE-ILI

**VEILLE-ILI** est une simulation pédagogique de réseau social destinée à l'entraînement à la veille informationnelle et à l'analyse de l'information.

L'interface reproduit les principaux usages d'un fil d'actualité : publications, profils, commentaires, tendances, images, niveaux d'engagement et arrivée de nouveaux messages. Les contenus mélangent informations utiles, prises de position, rumeurs, réactions émotionnelles et sujets sans rapport direct avec le scénario. L'objectif est de placer les élèves dans un environnement dense, proche des conditions réelles de veille.

> Tous les scénarios, comptes, publications, chiffres et documents présentés dans l'outil sont fictifs et créés exclusivement à des fins pédagogiques. Les personnalités parodiques ne s'expriment pas réellement dans la simulation et les propos qui leur sont attribués sont inventés.

## Accéder à la simulation

- **Page élève :** [ouvrir VEILLE-ILI](https://agathematu.github.io/simulation-veille/eleve.html)
- **Espace enseignant :** accès réservé à la préparation et à l'animation de l'exercice.

La version élève ne présente ni corrigé, ni niveau de suspicion, ni grille d'analyse. Le fil se renouvelle uniquement lorsque l'utilisateur le demande.

## Objectifs pédagogiques

La simulation permet notamment de travailler :

- la recherche et la qualification des sources ;
- l'analyse d'un compte et de son historique ;
- le recoupement de publications contradictoires ;
- la vérification d'images et de documents numériques ;
- l'identification de narratifs coordonnés et de phénomènes d'amplification ;
- la distinction entre un fait établi, une hypothèse, une opinion et une manipulation ;
- la gestion de la surcharge informationnelle et des biais cognitifs ;
- la formulation d'une synthèse de veille argumentée.

## Déroulement conseillé

1. Communiquer uniquement le lien de la page élève.
2. Donner une mission, une durée et un format de restitution.
3. Laisser les élèves explorer librement le fil, les profils et les conversations.
4. Leur demander de conserver les éléments sur lesquels ils fondent leur analyse.
5. Organiser une restitution distinguant les faits vérifiés, les incertitudes et les hypothèses.
6. Terminer par un débriefing collectif sur les méthodes de vérification et les biais rencontrés.

## Utilisation

- Cliquer sur un nom ou un avatar pour consulter le profil du compte.
- Ouvrir une publication pour lire sa conversation.
- Utiliser la recherche et les filtres pour isoler certains contenus.
- Cliquer sur **Actualiser** pour faire apparaître de nouvelles publications.
- Examiner les fichiers et les images avec les outils de vérification adaptés au niveau de la classe.

## Séance en direct

Après la configuration unique décrite dans `CONFIGURATION-DIRECT.txt`, l'enseignant peut lancer une séance, partager son lien élève puis publier autant de messages qu'il le souhaite depuis n'importe quel compte du scénario. Les nouvelles publications sont transmises aux appareils connectés par un flux temps réel, sans modification des fichiers et sans redéploiement GitHub Pages.

## Données élèves et mode admin

La page élève ne charge ni le moteur de génération (`engine.js`) ni les scénarios complets : elle lit des fils précalculés dans `data/eleve`, qui ne contiennent que ce que l'interface affiche (pas de corrigé, pas de classification des posts ou des comptes).

Le bouton **Mode admin** de la page élève affiche, après saisie du mot de passe enseignant, la classification de chaque post (suspect ou non, motif) et de chaque compte, ainsi que les indices du corrigé. Ces informations sont stockées chiffrées dans `data/corrige` (AES-256-GCM, clé dérivée du mot de passe) : sans le mot de passe, elles restent illisibles, même en inspectant la page. Sur la page enseignant, le même bouton s'active sans mot de passe.

Après toute modification d'un scénario (`data/scenarios`) ou du moteur (`engine.js`), régénérer ces fichiers avec Node.js en choisissant le mot de passe :

```
VEILLE_ILI_MDP="mot de passe" node tools/build-eleve.js
```

`node tools/build-eleve.js --check` (avec la même variable) vérifie que les fichiers déposés sont à jour.

## Mise en ligne avec GitHub Pages

Les fichiers doivent être déposés **à la racine** du dépôt GitHub, et non dans un dossier supplémentaire. Le dépôt doit notamment contenir :

- `index.html`
- `eleve.html`
- `app.js`
- `engine.js`
- `styles.css`
- `.nojekyll`
- le dossier `assets`
- le dossier `data` (un fichier par scénario, chargé à la demande, ainsi que les fils élèves `data/eleve` et les corrigés chiffrés `data/corrige`)

Dans GitHub, ouvrir **Settings**, puis **Pages**. Choisir **Deploy from a branch**, sélectionner la branche `main` et le dossier `/ (root)`, puis enregistrer. Le déploiement peut demander quelques minutes.

## Mettre à jour la simulation

1. Décompresser le nouveau paquet VEILLE-ILI.
2. Dans le dépôt GitHub, choisir **Add file**, puis **Upload files**.
3. Envoyer le contenu du paquet en plusieurs lots si GitHub limite le nombre de fichiers.
4. Valider avec **Commit changes**.
5. Attendre la fin du déploiement GitHub Pages, puis actualiser la page sans utiliser le cache du navigateur.

Les fichiers portant le même nom remplacent l'ancienne version. Il n'est normalement pas nécessaire de supprimer tout le dépôt avant une mise à jour.

## Précautions d'emploi

VEILLE-ILI met volontairement en scène des contenus trompeurs, polarisants ou émotionnels. L'enseignant doit présenter clairement le caractère fictif de l'exercice avant et après la séance, adapter les scénarios au public et prévoir un temps de débriefing. Les contenus ne doivent pas être rediffusés hors de leur contexte pédagogique.

---

Projet pédagogique expérimental. Usage réservé à la formation et à la sensibilisation à la veille informationnelle.
