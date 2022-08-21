const cacheName = 'gizappv1';

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
  console.log('sw installed')
};

self.addEventListener("install", (event) => {
  cachePaths = new URL(location).searchParams.get('cachePaths').split(';')
  console.log(cachePaths)
  event.waitUntil(
    addResourcesToCache(cachePaths)
  );
  console.log('sw installed')
});
self.addEventListener("activate" , e => {
  e.waitUntil(clients.claim())
});
self.addEventListener('fetch', e => {
  console.log(e.request)
  e.respondWith((async () => {
    console.log(e.request)
    const r = await caches.match(e.request);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});
