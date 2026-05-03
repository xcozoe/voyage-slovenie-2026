// Service Worker — voyage Slovénie 2026
// Cache-first pour les assets statiques (offline-friendly pendant le voyage).
// Network-only pour Firebase (Firestore).

const CACHE = 'voyage-slovenie-v2';
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

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Bypass Firebase (Firestore) — toujours en réseau direct
  if (url.host.includes('firestore.googleapis.com') ||
      url.host.includes('firebase') ||
      url.host.includes('firebaseio.com')) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((resp) => {
        if (!resp || resp.status !== 200) return resp;
        const cacheable =
          url.origin === self.location.origin ||
          url.host.includes('fonts.gstatic.com') ||
          url.host.includes('fonts.googleapis.com') ||
          url.host.includes('gstatic.com');
        if (cacheable) {
          const clone = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
