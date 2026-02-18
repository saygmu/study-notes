const CACHE_NAME = 'mono-v2';
const OFFLINE_URL = '/study-notes/';

// Files to cache immediately
const PRECACHE_FILES = [
  '/study-notes/',
  '/study-notes/index.html',
  '/study-notes/manifest.json'
];

// Install: cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_FILES);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: always network first for HTML, cache for assets
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  const isHTML = event.request.headers.get('accept')?.includes('text/html') || 
                 url.pathname.endsWith('.html') || 
                 url.pathname.endsWith('/');

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Only cache non-HTML assets
        if (response.ok && !isHTML) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline: try cache
        return caches.match(event.request).then(cached => {
          return cached || caches.match(OFFLINE_URL);
        });
      })
  );
});
