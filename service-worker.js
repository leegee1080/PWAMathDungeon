self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('math-dungeon-v1').then(cache => {
            return cache.addAll([
                'index.html',
                'styles.css',
                'manifest.json',
                'graphics/icon.png',
                'jshelpers/game.js',
                'json/monsters.json',
                'json/items.json'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});