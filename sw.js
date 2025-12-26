const CACHE_NAME = 'infinity-tkd-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './app.js',
  './icons/Infinity-TKD-logo-256.ico',
  './icons/Infinity-TKD-logo-64.png'
];

// Install Event: Cache shell assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Network first for iframe content, Cache fallback for shell
self.addEventListener('fetch', (e) => {
  // We generally just let the browser handle the iframe requests naturally
  // Only intercept requests for our shell files
  if (e.request.url.includes('script.google.com')) {
      return; // Let GAS handle its own caching/network
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});