const CACHE_NAME = 'tokyo-itinerary-v1';
const PRECACHE_URLS = [
  '/tokyo-itinerary-visuals/index.html',
  '/tokyo-itinerary-visuals/manifest.json',
  '/tokyo-itinerary-visuals/icon-192.svg',
  '/tokyo-itinerary-visuals/icon-512.svg'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  // try cache first for local assets, then network, then cache
  e.respondWith(
    caches.match(e.request).then(resp => {
      if(resp) return resp;
      return fetch(e.request).then(r=>{
        // optionally cache new GET requests for same-origin resources
        try{
          if(e.request.url.startsWith(self.location.origin)){
            const copy = r.clone();
            caches.open(CACHE_NAME).then(c=>c.put(e.request, copy));
          }
        }catch(err){}
        return r;
      }).catch(()=>caches.match('/tokyo-itinerary-visuals/index.html'));
    })
  );
});
