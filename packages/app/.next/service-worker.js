try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class c{constructor(e,t,c="GET"){this.handler=s(t),this.match=e,this.method=c}}class n extends c{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class i{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:c,route:n}=this.findMatchingRoute({url:s,request:e,event:t});let a,i=n&&n.handler;if(!i&&this.s&&(i=this.s),i){try{a=i.handle({url:s,request:e,event:t,params:c})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(c=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const c=this.t.get(t.method)||[];for(const n of c){let c;const a=n.match({url:e,request:t,event:s});if(a)return c=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(c=void 0),{route:n,params:c}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new i,r.addFetchListener(),r.addCacheListener()),r);const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[f.prefix,e,f.suffix].filter(e=>e&&e.length>0).join("-"),d=e=>e||u(f.precache),h=e=>e||u(f.runtime);function l(e){e.then(()=>{})}const b=new Set;class w{constructor(e,t,{onupgradeneeded:s,onversionchange:c}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=c||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const c=indexedDB.open(this.u,this.h);c.onerror=()=>t(c.error),c.onupgradeneeded=e=>{s?(c.transaction.abort(),c.result.close()):"function"==typeof this.l&&this.l(e)},c.onsuccess=()=>{const t=c.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:c="next",count:n,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(i,r)=>{const o=i.objectStore(e),f=t?o.index(t):o,u=[],d=f.openCursor(s,c);d.onsuccess=()=>{const e=d.result;e?(u.push(a?e:e.value),n&&u.length>=n?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((c,n)=>{const a=this.o.transaction(e,t);a.onabort=()=>n(a.error),a.oncomplete=()=>c(),s(a,e=>c(e))})}async g(e,t,s,...c){return await this.transaction([t],s,(s,n)=>{const a=s.objectStore(t),i=a[e].apply(a,c);i.onsuccess=()=>n(i.result)})}close(){this.o&&(this.o.close(),this.o=null)}}w.prototype.OPEN_TIMEOUT=2e3;const p={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(p))for(const s of t)s in IDBObjectStore.prototype&&(w.prototype[s]=async function(t,...c){return await this.g(s,t,e,...c)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.v=e,this.o=new w("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const c=indexedDB.deleteDatabase(e);c.onerror=()=>{s(c.error)},c.onblocked=()=>{s(new Error("Delete blocked"))},c.onsuccess=()=>{t()}})})(this.v)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.v,id:this._(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this._(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,c)=>{const n=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let i=0;n.onsuccess=()=>{const s=n.result;if(s){const c=s.value;c.cacheName===this.v&&(e&&c.timestamp<e||t&&i>=t?a.push(s.value):i++),s.continue()}else c(a)}}),c=[];for(const e of s)await this.o.delete("cache-entries",e.id),c.push(e.url);return c}_(e){return this.v+"|"+y(e)}}class v{constructor(e,t={}){this.j=!1,this.q=!1,this.R=t.maxEntries,this.k=t.maxAgeSeconds,this.v=e,this.U=new g(e)}async expireEntries(){if(this.j)return void(this.q=!0);this.j=!0;const e=this.k?Date.now()-1e3*this.k:0,t=await this.U.expireEntries(e,this.R),s=await self.caches.open(this.v);for(const e of t)await s.delete(e);this.j=!1,this.q&&(this.q=!1,l(this.expireEntries()))}async updateTimestamp(e){await this.U.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.k){return await this.U.getTimestamp(e)<Date.now()-1e3*this.k}return!1}async delete(){this.q=!1,await this.U.expireEntries(1/0)}}const m=(e,t)=>e.filter(e=>t in e),x=async({request:e,mode:t,plugins:s=[]})=>{const c=m(s,"cacheKeyWillBeUsed");let n=e;for(const e of c)n=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:n}),"string"==typeof n&&(n=new Request(n));return n},j=async({cacheName:e,request:t,event:s,matchOptions:c,plugins:n=[]})=>{const a=await self.caches.open(e),i=await x({plugins:n,request:t,mode:"read"});let r=await a.match(i,c);for(const t of n)if("cachedResponseWillBeUsed"in t){const n=t.cachedResponseWillBeUsed;r=await n.call(t,{cacheName:e,event:s,matchOptions:c,cachedResponse:r,request:i})}return r},q=async({cacheName:e,request:s,response:c,event:n,plugins:i=[],matchOptions:r})=>{const o=await x({plugins:i,request:s,mode:"write"});if(!c)throw new t("cache-put-with-no-response",{url:a(o.url)});const f=await(async({request:e,response:t,event:s,plugins:c=[]})=>{let n=t,a=!1;for(const t of c)if("cacheWillUpdate"in t){a=!0;const c=t.cacheWillUpdate;if(n=await c.call(t,{request:e,response:n,event:s}),!n)break}return a||(n=n&&200===n.status?n:void 0),n||null})({event:n,plugins:i,response:c,request:o});if(!f)return;const u=await self.caches.open(e),d=m(i,"cacheDidUpdate"),h=d.length>0?await j({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,f)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const t of d)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:h,newResponse:f,request:o})},R=j,k=async({request:e,fetchOptions:s,event:c,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),c instanceof FetchEvent&&c.preloadResponse){const e=await c.preloadResponse;if(e)return e}const a=m(n,"fetchDidFail"),i=a.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const s=t.requestWillFetch,n=e.clone();e=await s.call(t,{request:n,event:c})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of n)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:c,request:r,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:c,originalRequest:i.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const U={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let O;async function H(e,t){const s=e.clone(),c={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},n=t?t(c):c,a=function(){if(void 0===O){const e=new Response("");if("body"in e)try{new Response(e.body),O=!0}catch(e){O=!1}O=!1}return O}()?s.body:await s.blob();return new Response(a,n)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function L(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:c}=e;if(!c)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(c,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(c,location.href),a=new URL(c,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:a.href}}class D{constructor(e){this.v=d(e),this.O=new Map,this.H=new Map,this.L=new Map}addToCacheList(e){const s=[];for(const c of e){"string"==typeof c?s.push(c):c&&void 0===c.revision&&s.push(c.url);const{cacheKey:e,url:n}=L(c),a="string"!=typeof c&&c.revision?"reload":"default";if(this.O.has(n)&&this.O.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.O.get(n),secondEntry:e});if("string"!=typeof c&&c.integrity){if(this.L.has(e)&&this.L.get(e)!==c.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this.L.set(e,c.integrity)}if(this.O.set(n,e),this.H.set(n,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],c=[],n=await self.caches.open(this.v),a=await n.keys(),i=new Set(a.map(e=>e.url));for(const[e,t]of this.O)i.has(t)?c.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:c})=>{const n=this.L.get(s),a=this.H.get(c);return this.D({cacheKey:s,cacheMode:a,event:e,integrity:n,plugins:t,url:c})});await Promise.all(r);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:c}}async activate(){const e=await self.caches.open(this.v),t=await e.keys(),s=new Set(this.O.values()),c=[];for(const n of t)s.has(n.url)||(await e.delete(n),c.push(n.url));return{deletedURLs:c}}async D({cacheKey:e,url:s,cacheMode:c,event:n,plugins:a,integrity:i}){const r=new Request(s,{integrity:i,cache:c,credentials:"same-origin"});let o,f=await k({event:n,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:n,request:r,response:f}):f.status<400))throw new t("bad-precaching-response",{url:s,status:f.status});f.redirected&&(f=await H(f)),await q({event:n,plugins:a,response:f,request:e===s?r:new Request(e),cacheName:this.v,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.O}getCachedURLs(){return[...this.O.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.O.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.v)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.v,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const c=this.createHandler(s),n=new Request(e);return()=>c({request:n})}}let C;const N=()=>(C||(C=new D),C);const W=(e,t)=>{const s=N().getURLsToCacheKeys();for(const c of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:c,urlManipulation:n}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(c){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(c);if(e)return e}};let E=!1;function G(e){E||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:c}={})=>{const n=d();self.addEventListener("fetch",a=>{const i=W(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:c});if(!i)return;let r=self.caches.open(n).then(e=>e.match(i)).then(e=>e||fetch(i));a.respondWith(r)})})(e),E=!0)}const M=[],T={get:()=>M,add(e){M.push(...e)}},K=e=>{const t=N(),s=T.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},J=e=>{const t=N();e.waitUntil(t.activate())};var P;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),P={},function(e){N().addToCacheList(e),e.length>0&&(self.addEventListener("install",K),self.addEventListener("activate",J))}([{url:"_next/static/HGeOcUOJD30jHx_37WC6k/_buildManifest.js",revision:"26fafd84e41440792d1df05ba1875195"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/_app.js",revision:"2af3269e9a8386944cf40a3d8994e49c"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/_error.js",revision:"deaaf37cf1654301b5eb7c1daa4700bd"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/about.js",revision:"3111f204955edd144239eff8f49fad59"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/apply.js",revision:"bbe94642a59cff797384f5ba214d45c1"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/course/[cid]/course_admin_panel.js",revision:"cda556edfc8c0bc846cafbfb3f6e5d4d"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/course/[cid]/insights.js",revision:"a01c5c09cb40a93efcc8c1963e92727e"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/course/[cid]/queue/[qid].js",revision:"3fc174b5c7d610dc65be0a64a49934d2"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/course/[cid]/schedule.js",revision:"41af512ef274501d85297aa8a3fb00b9"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/course/[cid]/today.js",revision:"b890d724c00c01a274811dcc586b0012"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/dev.js",revision:"eb74cadef1931f47aa597275ca2a12ab"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/index.js",revision:"f2d9e7dc8f66c39bd6c97bdf6d410fcb"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/login.js",revision:"0af039dac28c5a03bd9ab2eace271336"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/nocourses.js",revision:"5033c6a82667afbb8ca3c89298967c9c"},{url:"_next/static/HGeOcUOJD30jHx_37WC6k/pages/settings.js",revision:"b13473c629607f7f3cffd383802d17b2"},{url:"_next/static/chunks/093342b82dfe20ecead8ae3d29bf287ce1369a06.2af696ca5ad6db29a8ce.js",revision:"68b7f0413218f9cacaff06072d0b2819"},{url:"_next/static/chunks/0f9bd0aef80d8009e2a60536ae89e94e6ca80867.c43266ddd0bf3153790b.js",revision:"1699a1d155c92e0acfbb5e0b8ccef4d7"},{url:"_next/static/chunks/156f06b02021ee5a8a6d2fa05824eadbe3c8dcb4.9708f84493aff45b242d.js",revision:"896341b18224f3ae6b4708825f65c7ca"},{url:"_next/static/chunks/16e494175cb49be3e5039fd85032e53929958bec.9cdb943f907196f0f593.js",revision:"ed62d3db91248314f99d59b7a579ce4a"},{url:"_next/static/chunks/172782d0940057cd3461d75ada76bbbc32bd5799.82020d1b5340219a0212.js",revision:"689ae9954ef784b614679e15dd54a11c"},{url:"_next/static/chunks/2001e9a0fcec4c3833d4a7548462d4071b40a46a.96e54de04c15d71ed2ef.js",revision:"b6694587db4660840b39e3ac952fa2fb"},{url:"_next/static/chunks/2166fd3ee2c401e7d3cc09b7f72fced59421bb00.5e59cf5e9df393188132.js",revision:"78e42a7dcca1f7482417739e1fe89a4a"},{url:"_next/static/chunks/2803c891b49e93effb208b7292a8fc0d22930587.475aa6618c25f93d0df1.js",revision:"adf3d5a86af2873888fbb3e7d8730c66"},{url:"_next/static/chunks/29107295.3bf4740c3bcb2c58071a.js",revision:"dc3a81ecbefb3586fc4f0cd6ef65638a"},{url:"_next/static/chunks/32f6112fe5f75b0978b4be3b6f8fbc3afe570308.e72d8341144a4f1b646c.js",revision:"e67d288ffb091f8056ce7d470f46c45a"},{url:"_next/static/chunks/43.27f3bc2aff30a03d3c59.js",revision:"ed5685a21267d687cbd307f362f429e4"},{url:"_next/static/chunks/45b35b31279fd9c966020ee3593d5a4cc9dd4b63.45b8c504f5ac84592115.js",revision:"9dc2ea5a194fbca2baded52fe1cea41b"},{url:"_next/static/chunks/518dad82da6b4416ba1be591855f0a41fca352b9.e1c860f377f2c2b68bfe.js",revision:"8d5e17b240d06ef9bed233b51ab92ffa"},{url:"_next/static/chunks/85d3f88f7850914c1c7b020933a5137b7b056e79.bd9ec2720446f07d5129.js",revision:"da52163a4afbd8a40a40e79cea172449"},{url:"_next/static/chunks/91083b5d452b56f5797bcc7a35ffe6d7f7d8c647.b866732210734c5fced8.js",revision:"f137d0353976844d846dff411f936a7d"},{url:"_next/static/chunks/956eb3de12ba7f8753f077644d6d5bacb7e95425.23d51aface78fcc42c95.js",revision:"8805fd59973a230ab1a21e2c9c304fac"},{url:"_next/static/chunks/a29ae703.0a12156631b79073b1ae.js",revision:"ecacaa763d428e9e519cb65fbedd43e2"},{url:"_next/static/chunks/af41044821e96e1f7989b9a2595be5f2d68c234b.13b213cc13db2021044b.js",revision:"bc2a1276fe0934322c58aa66189b5c1a"},{url:"_next/static/chunks/bcc56fc972ffd285a7c73b23cf1062621047b4ec.e7d531a848468435321e.js",revision:"a6adb533d73881db29d38a235abc5d70"},{url:"_next/static/chunks/c96b4d7e.b720d53f6f3a486c2eeb.js",revision:"f922772383c85d7ea812d2108c70beb7"},{url:"_next/static/chunks/commons.0b64cfc552e34328c46b.js",revision:"b4bf09b5bd2e5f428e33cd4515efac3b"},{url:"_next/static/chunks/d3ada92238994601e833870de14f475effc63ee4.2ca2b9f7e27bb333e674.js",revision:"fdb5ab3bfac1c8df86fc199860b61556"},{url:"_next/static/chunks/dbd615813728d70cebb842333afb406f3bfbe7d0.14d6add48235ffcdb7fa.js",revision:"aafb28d22190d4f8908b4cddbe9d8680"},{url:"_next/static/chunks/f67f2816db2a913556cc8bf10dc0c7848b25834a.d4b52e1765bfafe724cd.js",revision:"e835e616c21dce44fce42be5017bffd8"},{url:"_next/static/chunks/fa50b87005d31b49c5b71bd7adccaed17bd29e0a.b6a5dedb291557e7bf98.js",revision:"a2fab3c9af527382b06d10cf6cf5784d"},{url:"_next/static/chunks/fc8d00fd.fa9fcfd4da2f820ee427.js",revision:"dbb7edca6b05b0fadd49ddd9320b555d"},{url:"_next/static/chunks/framework.c06ceb3f90185a0b4876.js",revision:"768f6e3921275b08d5e9b59c13c72111"},{url:"_next/static/css/0b10e9f32b7d87c5b5ed.css",revision:"9b6bf2b0849057358aaaeb0dd19e37db"},{url:"_next/static/css/20de8917c44a516a459d.css",revision:"9a8cd95b5f951cd1c4dfc2843aaa0909"},{url:"_next/static/runtime/main-b1b4712e33b9ff7044eb.js",revision:"093d7fd2cf995224675c4fa4c23bf1e3"},{url:"_next/static/runtime/polyfills-bf92a078ca839563e521.js",revision:"7e419fe263cbbf4b98792e68b2116ae6"},{url:"_next/static/runtime/webpack-e55fc2d365506f448fa9.js",revision:"4745b21fbb5809efe46937e00a968b47"}]),G(P),function(e,s,a){let i;if("string"==typeof e){const t=new URL(e,location.href);i=new c(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)i=new n(e,s,a);else if("function"==typeof e)i=new c(e,s,a);else{if(!(e instanceof c))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});i=e}o().registerRoute(i)}(/^https?.*/,new class{constructor(e={}){if(this.v=h(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.C=t?e.plugins:[U,...e.plugins]}else this.C=[U];this.N=e.networkTimeoutSeconds||0,this.W=e.fetchOptions,this.G=e.matchOptions}async handle({event:e,request:s}){const c=[];"string"==typeof s&&(s=new Request(s));const n=[];let a;if(this.N){const{id:t,promise:i}=this.M({request:s,event:e,logs:c});a=t,n.push(i)}const i=this.T({timeoutId:a,request:s,event:e,logs:c});n.push(i);let r=await Promise.race(n);if(r||(r=await i),!r)throw new t("no-response",{url:s.url});return r}M({request:e,logs:t,event:s}){let c;return{promise:new Promise(t=>{c=setTimeout(async()=>{t(await this.K({request:e,event:s}))},1e3*this.N)}),id:c}}async T({timeoutId:e,request:t,logs:s,event:c}){let n,a;try{a=await k({request:t,event:c,fetchOptions:this.W,plugins:this.C})}catch(e){n=e}if(e&&clearTimeout(e),n||!a)a=await this.K({request:t,event:c});else{const e=a.clone(),s=q({cacheName:this.v,request:t,response:e,event:c,plugins:this.C});if(c)try{c.waitUntil(s)}catch(e){}}return a}K({event:e,request:t}){return R({cacheName:this.v,request:t,event:e,matchOptions:this.G,plugins:this.C})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:c})=>{if(!c)return null;const n=this.J(c),a=this.P(s);l(a.expireEntries());const i=a.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){}return n?c:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.P(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.I=e,this.k=e.maxAgeSeconds,this.A=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),b.add(t))}P(e){if(e===h())throw new t("expire-custom-caches-only");let s=this.A.get(e);return s||(s=new v(e,this.I),this.A.set(e,s)),s}J(e){if(!this.k)return!0;const t=this.S(e);if(null===t)return!0;return t>=Date.now()-1e3*this.k}S(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.A)await self.caches.delete(e),await t.delete();this.A=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
