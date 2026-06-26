const CACHE_NAME = 'my-notes-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg'
];

// Install the Service Worker and save the core files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// Serve the cached files when offline
self.addEventListener('fetch', event => {
    // Ignore GitHub API calls (the app handles offline logic for these)
    if (event.request.url.includes('api.github.com')) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});