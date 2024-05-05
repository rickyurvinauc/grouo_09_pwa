const cacheName = `static-v1-${new Date().getTime()}`

const precacheResources = [
    '/',
    '/index.html',
    '/pages/new_event.html',
    '/modals/quick-add-modal.html',
    '/modals/settle-up-modal.html',
    '/modals/share-modal.html',
    '/partials/events_page/overview.html',
    '/partials/events_page/transactions.html',
    '/manifest.json',
    '/layout/footer.html',
    '/css/output.css',
    '/js/main.js',
    '/images/pie.jpg',
    '/images/mobile.png',
    '/images/favicon.ico',
    '/node_modules/flowbite/dist/flowbite.min.css ',
    '/node_modules/flowbite/dist/flowbite.min.js'
]
self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            console.log({cachedResponse})

            if (cachedResponse) {
                return cachedResponse;
            }
            console.log("event request", event.request)
            return fetch(event.request);
        }),
    );
});
