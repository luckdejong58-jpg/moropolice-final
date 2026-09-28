self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('moropolice-v1').then(cache => {
      return cache.match(e.request).then(res => {
        return res || fetch(e.request).then(r => {
          if(e.request.url.startsWith('http')) cache.put(e.request, r.clone());
          return r;
        });
      });
    })
  );
});
