// Service Worker — voyage Slovénie 2026
// - Network-first pour le shell (HTML, JSON) → toujours frais quand en ligne
// - Cache-first pour assets stables (photos, polices) → instantané + offline
// - Bypass Firebase (Firestore en réseau direct)

const CACHE = 'voyage-slovenie-v33';
const SHELL = [
  './',
  './index.html',
  './data/days.json',
  './data/stays.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
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

  // Assets stables (photos, polices) : cache-first
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
