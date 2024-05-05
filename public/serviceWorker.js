const staticAssets = [
    './',
    './public/css/output.css',
    './public/js/main.js',
    './public/js/edit_transaction.js',
    './public/js/event.js',
    './public/js/new_event.js',
    './public/images/favicon.png',
]

self.addEventListener('install', async event => {
    const cache = await caches.open('static-meme')
    console.log({cache});
    cache.addAll(staticAssets)
})

self.addEventListener('fetch', event => {
    const {request} = event;
    console.log({request});
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheData(request));
    } else {
        event.respondWith(networkFirst(request));
    }
});

async function cacheData(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('dynamic-meme');
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}