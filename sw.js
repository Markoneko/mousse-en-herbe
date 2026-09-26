/* Mousse en herbe — service worker
   Stratégie : cache d'abord pour la coque de l'application, réseau en secours.
   L'appli doit fonctionner entièrement hors ligne : au port, sur un ponton,
   la 4G est une denrée rare. */

const CACHE = "mousse-en-herbe-v4";

const COQUE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icone-192.png",
  "./icons/icone-512.png",
  "./icons/icone-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

/* Les polices viennent de Google Fonts : on les met en cache au vol,
   et l'appli reste lisible sans elles si le premier chargement s'est
   fait hors ligne. */

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(COQUE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  e.respondWith(
    caches.match(req).then(cache => {
      if (cache) return cache;
      return fetch(req).then(rep => {
        // on ne met en cache que ce qui a été servi correctement
        if (rep && rep.status === 200 && (rep.type === "basic" || rep.type === "cors")) {
          const copie = rep.clone();
          caches.open(CACHE).then(c => c.put(req, copie));
        }
        return rep;
      }).catch(() => {
        // hors ligne et pas en cache : on renvoie la page d'accueil
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
