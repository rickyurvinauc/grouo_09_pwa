const staticAssets = [
    './',
    './pages/',
    './css/output.css',
    './js/main.js',
    './js/edit_transaction.js',
    './js/event.js',
    './js/new_event.js',
    './images/pie.jpg',
    '../node_modules/flowbite/dist/flowbite.min.css '
]
self.addEventListener('install', async event => {
    const cache = await caches.open('static-meme');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const {request} = event;
    const url = new URL(request.url);
    console.log({request})
    console.log({url})
    if (url.origin === location.origin) {
        event.respondWith(cacheData(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

async function cacheData(request) {
    try {
        const cachedResponse = await caches.match(request);
        console.log({cachedResponse})
        return cachedResponse || fetch(request);
    } catch (error) {
        console.error('Fetch failed:', error);
        // Return the cached response if available, otherwise return undefined
        return await caches.match(request);
    }
}

async function networkFirst(request) {
    const cache = await caches.open('dynamic-meme');

    try {
        const response = await fetch(request);
        console.log({response})
        if (request.url.startsWith('http') || request.url.startsWith('https')) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return await cache.match(request);
    }

}