// Service Worker — voyage Slovénie 2026
// - Network-first pour le shell (HTML, JSON) → toujours frais quand en ligne
// - Cache-first pour assets stables (photos, polices) → instantané + offline
// - Photos pré-cachées dès l'installation (cache séparé stable) → hors-ligne complet
// - Bypass Firebase (Firestore gère sa propre persistance côté app)

const CACHE = 'voyage-slovenie-v80';     // shell + données JSON, versionné
const PHOTO_CACHE = 'voyage-photos-v1';  // photos, stable entre versions du shell
const SHELL = [
  './',
  './index.html',
  './data/days.json',
  './data/stays.json',
  './data/activities.json',
];
const PHOTOS = [
  './photos/cover-hero.jpg',
  './photos/cover-mobile.jpg',
  './photos/cover-thumb.jpg',
  './photos/j01-nice-hero.jpg',
  './photos/j01-nice-mobile.jpg',
  './photos/j01-nice-thumb.jpg',
  './photos/j02-venise-arrivee-hero.jpg',
  './photos/j02-venise-arrivee-mobile.jpg',
  './photos/j02-venise-arrivee-thumb.jpg',
  './photos/j03-venise-canal-hero.jpg',
  './photos/j03-venise-canal-mobile.jpg',
  './photos/j03-venise-canal-thumb.jpg',
  './photos/j04-piran-hero.jpg',
  './photos/j04-piran-mobile.jpg',
  './photos/j04-piran-thumb.jpg',
  './photos/j05-parenzana-hero.jpg',
  './photos/j05-parenzana-mobile.jpg',
  './photos/j05-parenzana-thumb.jpg',
  './photos/j06-predjama-hero.jpg',
  './photos/j06-predjama-mobile.jpg',
  './photos/j06-predjama-thumb.jpg',
  './photos/j07-skocjan-hero.jpg',
  './photos/j07-skocjan-mobile.jpg',
  './photos/j07-skocjan-thumb.jpg',
  './photos/j08-ljubljana-hero.jpg',
  './photos/j08-ljubljana-mobile.jpg',
  './photos/j08-ljubljana-thumb.jpg',
  './photos/j09-bled-hero.jpg',
  './photos/j09-bled-mobile.jpg',
  './photos/j09-bled-thumb.jpg',
  './photos/j10-vintgar-hero.jpg',
  './photos/j10-vintgar-mobile.jpg',
  './photos/j10-vintgar-thumb.jpg',
  './photos/j11-bohinj-hero.jpg',
  './photos/j11-bohinj-mobile.jpg',
  './photos/j11-bohinj-thumb.jpg',
  './photos/j12-mostnica-hero.jpg',
  './photos/j12-mostnica-mobile.jpg',
  './photos/j12-mostnica-thumb.jpg',
  './photos/j13-vrsic-hero.jpg',
  './photos/j13-vrsic-mobile.jpg',
  './photos/j13-vrsic-thumb.jpg',
  './photos/j14-rafting-hero.jpg',
  './photos/j14-rafting-mobile.jpg',
  './photos/j14-rafting-thumb.jpg',
  './photos/j15-canyoning-hero.jpg',
  './photos/j15-canyoning-mobile.jpg',
  './photos/j15-canyoning-thumb.jpg',
  './photos/j16-laigueglia-hero.jpg',
  './photos/j16-laigueglia-mobile.jpg',
  './photos/j16-laigueglia-thumb.jpg',
  './photos/j17-ligurie-hero.jpg',
  './photos/j17-ligurie-mobile.jpg',
  './photos/j17-ligurie-thumb.jpg',
  './photos/j18-retour-hero.jpg',
  './photos/j18-retour-mobile.jpg',
  './photos/j18-retour-thumb.jpg',
  './photos/stay-bled-hero.jpg',
  './photos/stay-bled-mobile.jpg',
  './photos/stay-bled-thumb.jpg',
  './photos/stay-ljubljana-hero.jpg',
  './photos/stay-ljubljana-mobile.jpg',
  './photos/stay-ljubljana-thumb.jpg',
  './photos/stay-piran-hero.jpg',
  './photos/stay-piran-mobile.jpg',
  './photos/stay-piran-thumb.jpg',
  './photos/stay-postojna-hero.jpg',
  './photos/stay-postojna-mobile.jpg',
  './photos/stay-postojna-thumb.jpg',
  './photos/stay-tolmin-hero.jpg',
  './photos/stay-tolmin-mobile.jpg',
  './photos/stay-tolmin-thumb.jpg',
  './photos/stay-venise-hero.jpg',
  './photos/stay-venise-mobile.jpg',
  './photos/stay-venise-thumb.jpg',
  './photos/stay-zelenci-hero.jpg',
  './photos/stay-zelenci-mobile.jpg',
  './photos/stay-zelenci-thumb.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL);          // critique → atomique
    await self.skipWaiting();           // shell prêt : on peut prendre la main tout de suite

    // Photos : pré-chargées en arrière-plan, best-effort.
    // Une photo manquante n'échoue jamais l'installation, et on ne re-télécharge
    // pas celles déjà présentes (le cache photos survit aux bumps du shell).
    const photoCache = await caches.open(PHOTO_CACHE);
    const have = new Set((await photoCache.keys()).map(r => new URL(r.url).pathname));
    const todo = PHOTOS.filter(p => !have.has(new URL(p, self.location).pathname));
    await Promise.allSettled(todo.map(p => photoCache.add(p)));
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k !== CACHE && k !== PHOTO_CACHE).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

function isShellRequest(url) {
  if (url.origin !== self.location.origin) return false;
  const p = url.pathname;
  if (p === '/' || p.endsWith('/')) return true;
  if (p.endsWith('.html')) return true;
  if (p.endsWith('.json')) return true;
  return false;
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Firebase / Firestore : toujours réseau, jamais cache
  if (url.host.includes('firestore.googleapis.com') ||
      url.host.includes('firebase') ||
      url.host.includes('firebaseio.com')) return;

  // Shell (HTML + JSON) : network-first, fallback cache pour offline
  if (isShellRequest(url)) {
    e.respondWith(
      fetch(e.request)
        .then((resp) => {
          if (resp && resp.status === 200) {
            const clone = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return resp;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Assets stables (photos, polices) : cache-first (cherche dans tous les caches)
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((resp) => {
        if (!resp || resp.status !== 200) return resp;
        const cacheable =
          url.origin === self.location.origin ||
          url.host.includes('fonts.gstatic.com') ||
          url.host.includes('fonts.googleapis.com') ||
          url.host.includes('gstatic.com') ||
          url.host.includes('unpkg.com') ||
          url.host.includes('tile.openstreetmap.org');
        if (cacheable) {
          const clone = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
