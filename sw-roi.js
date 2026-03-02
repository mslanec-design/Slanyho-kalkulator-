const CACHE = 'roi-automate-v1';

self.addEventListener('install', function(e) {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(function(cache) {
            return cache.addAll(['/ROI.CSAutomate.html']);
        })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(cached) {
            return cached || fetch(e.request).catch(function() {
                return caches.match('/ROI.CSAutomate.html');
            });
        })
    );
});
