const CACHE_NAME = 'mono-v4';

// Minimal caching - only for offline fallback
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Always fetch from network, no caching
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
