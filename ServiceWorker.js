const cacheName = 'gizappv1';

self.addEventListener("install", (event) => {
  cachePaths = new URL(location).searchParams.get('cachePaths').split(';')
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(cachePaths)))
});
self.addEventListener("activate" , e => {
  e.waitUntil(clients.claim())
});
self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) return r
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});
