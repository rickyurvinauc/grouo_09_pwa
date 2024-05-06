const cacheName = `static-v4`

const precacheResources = [
    '/',
    '/index.html',
    '/pages/edit_event.html',
    '/pages/edit_transaction.html',
    '/pages/event_page.html',
    '/pages/new_event.html',
    '/css/output.css',
    '/js/main.js',
    '/images/pie.jpg',
    '/images/mobile.png',
    '/images/favicon.ico',
    '/node_modules/flowbite/dist/flowbite.min.css ',
    '/node_modules/flowbite/dist/flowbite.min.js',
]
self.addEventListener('install', (event) => {
    // console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    return caches.delete(key);
                }),
            );
        }),
    );
});


self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            // console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            // console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});
