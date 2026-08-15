# Mousse en herbe — application installable

Contenu du dossier :

```
index.html               l'application (tout le contenu est dedans)
manifest.webmanifest     nom, icônes, couleurs, mode plein écran
sw.js                    service worker : fonctionnement hors ligne
icons/                   le logo AWA aux différentes tailles
```

## La contrainte à connaître

Une PWA ne s'installe **que depuis une adresse en `https://`**. Un fichier
ouvert depuis une pièce jointe ou depuis le disque (`file://`) s'affichera
parfaitement, mais ne proposera ni l'installation ni le mode hors ligne.

Il faut donc mettre le dossier en ligne une fois. Trois façons, de la plus
simple à la plus durable :

**Netlify Drop** — aller sur `app.netlify.com/drop`, glisser le dossier dans
la page. Une adresse est créée en trente secondes, sans compte. C'est le plus
rapide pour tester.

**GitHub Pages** — créer un dépôt, y déposer les fichiers, activer Pages dans
les réglages. Gratuit et pérenne, adapté si l'association veut garder la main.

**Le site d'AWA**, si vous en avez un : déposer le dossier dans un
sous-répertoire, par exemple `/mousse/`. L'adresse devient
`https://…/mousse/`.

Ensuite, il suffit d'envoyer le lien.

## Ce que voit le nouveau membre

**Android / Chrome** — un bouton « Installer » apparaît dans le bandeau de
l'appli, en haut à droite. Le navigateur propose aussi « Ajouter à l'écran
d'accueil » dans son menu.

**iPhone / Safari** — Apple ne montre pas de bouton. Il faut passer par
Partager → « Sur l'écran d'accueil ». À signaler dans le message
d'accompagnement, sinon personne ne le trouve.

**Ordinateur** — une icône d'installation apparaît dans la barre d'adresse de
Chrome ou d'Edge.

Une fois installée, l'application s'ouvre en plein écran, sans barre de
navigateur, avec le logo AWA en icône. Elle fonctionne sans réseau — utile sur
un ponton, où la 4G est capricieuse.

## Mettre à jour le contenu

Tout le texte est dans `index.html`, dans deux objets JavaScript :

- `G` — le glossaire. Chaque terme a un titre de fiche (`t`), une forme nue
  employée dans le texte (`n`), une catégorie (`c`), un indice d'atelier (`q`),
  une définition (`d`) et une astuce (`a`).
- `CHAP` — les cinq chapitres, avec leurs passages, leurs choix, leurs
  questions d'épreuve et leur badge.

Après chaque modification, **incrémenter le numéro de version** en tête de
`sw.js` :

```js
const CACHE = "mousse-en-herbe-v3";
```

Sans ça, les personnes ayant déjà installé l'appli continueront de voir
l'ancienne version, servie depuis leur cache.
