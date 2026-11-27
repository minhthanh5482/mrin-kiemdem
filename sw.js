const V='mrin-kd-v4',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='mrin-tiles').map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=e.request.url;
 if(u.includes('/tile/')||u.includes('tile.openstreetmap')){e.respondWith(caches.open('mrin-tiles').then(async c=>{const m=await c.match(u);if(m)return m;try{const r=await fetch(e.request);if(r.ok)c.put(u,r.clone());return r}catch(x){return new Response('',{status:504})}}));return}
 if(e.request.method!=='GET'||new URL(u).origin!==location.origin||u.includes('/data/'))return;
 e.respondWith(fetch(e.request).then(r=>{const cl=r.clone();caches.open(V).then(c=>c.put(e.request,cl));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))))});
