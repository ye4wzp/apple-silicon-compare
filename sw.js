const CACHE_NAME = 'silicon-compare-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './app-ui.js',
  './app-extra.js',
  './app-advanced.js',
  './app-features.js',
  './app-compare.js',
  './prices.json',
  './manifest.json',
  './og-image.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Stale-while-revalidate for HTML/JS/CSS
  if (e.request.destination === 'document' ||
      e.request.destination === 'script' ||
      e.request.destination === 'style') {
    e.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(e.request).then(cached => {
          const fetchPromise = fetch(e.request).then(response => {
            if (response.ok) cache.put(e.request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
  } else {
    // Network first for other resources (CDN, fonts)
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  }
});
