/* Cambia VERSION al publicar cualquier modificación del HTML, CSS, JS o iconos.
   La versión nueva espera confirmación; la caché anterior se elimina al activar. */
const VERSION='v2.0.1';
const PREFIX='mi-horario:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const ASSETS=['./','./index.html','./styles.css','./script.js','./js/data.js','./js/storage.js','./js/calendar.js','./manifest.json','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];
const assetURLs=new Set(ASSETS.map(path=>new URL(path,self.registration.scope).href));
self.addEventListener('install',event=>{
  // addAll falla de forma atómica si falta algún recurso: conserva la versión anterior.
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(path=>new Request(new URL(path,self.registration.scope),{cache:'reload'})))));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  // Un único conjunto de archivos por versión evita mezclar scripts nuevos y antiguos.
  if(event.request.mode==='navigate'||assetURLs.has(url.href))event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request.mode==='navigate'?new URL('./index.html',self.registration.scope).href:event.request);
    return cached||fetch(event.request);
  })());
});
