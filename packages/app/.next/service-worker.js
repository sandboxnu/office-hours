try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class c extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const i=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class a{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:c}=this.findMatchingRoute({url:s,request:e,event:t});let i,a=c&&c.handler;if(!a&&this.s&&(a=this.s),a){try{i=a.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this.i&&(i=i.catch(n=>this.i.handle({url:s,request:e,event:t}))),i}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const c of n){let n;const i=c.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:c,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new a,r.addFetchListener(),r.addCacheListener()),r);const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[f.prefix,e,f.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||u(f.precache),d=e=>e||u(f.runtime);function l(e){e.then(()=>{})}const b=new Set;class w{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:c,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(a,r)=>{const o=a.objectStore(e),f=t?o.index(t):o,u=[],h=f.openCursor(s,n);h.onsuccess=()=>{const e=h.result;e?(u.push(i?e:e.value),c&&u.length>=c?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,c)=>{const i=this.o.transaction(e,t);i.onabort=()=>c(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,c)=>{const i=s.objectStore(t),a=i[e].apply(i,n);a.onsuccess=()=>c(a.result)})}close(){this.o&&(this.o.close(),this.o=null)}}w.prototype.OPEN_TIMEOUT=2e3;const p={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(p))for(const s of t)s in IDBObjectStore.prototype&&(w.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.m=e,this.o=new w("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.m,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const c=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let a=0;c.onsuccess=()=>{const s=c.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&a>=t?i.push(s.value):a++),s.continue()}else n(i)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.m+"|"+y(e)}}class m{constructor(e,t={}){this._=!1,this.R=!1,this.j=t.maxEntries,this.U=t.maxAgeSeconds,this.m=e,this.k=new g(e)}async expireEntries(){if(this._)return void(this.R=!0);this._=!0;const e=this.U?Date.now()-1e3*this.U:0,t=await this.k.expireEntries(e,this.j),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this._=!1,this.R&&(this.R=!1,l(this.expireEntries()))}async updateTimestamp(e){await this.k.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.U){return await this.k.getTimestamp(e)<Date.now()-1e3*this.U}return!1}async delete(){this.R=!1,await this.k.expireEntries(1/0)}}const v=(e,t)=>e.filter(e=>t in e),q=async({request:e,mode:t,plugins:s=[]})=>{const n=v(s,"cacheKeyWillBeUsed");let c=e;for(const e of n)c=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:c}),"string"==typeof c&&(c=new Request(c));return c},x=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:c=[]})=>{const i=await self.caches.open(e),a=await q({plugins:c,request:t,mode:"read"});let r=await i.match(a,n);for(const t of c)if("cachedResponseWillBeUsed"in t){const c=t.cachedResponseWillBeUsed;r=await c.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:a})}return r},R=async({cacheName:e,request:s,response:n,event:c,plugins:a=[],matchOptions:r})=>{const o=await q({plugins:a,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:i(o.url)});const f=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let c=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(c=await n.call(t,{request:e,response:c,event:s}),!c)break}return i||(c=c&&200===c.status?c:void 0),c||null})({event:c,plugins:a,response:n,request:o});if(!f)return;const u=await self.caches.open(e),h=v(a,"cacheDidUpdate"),d=h.length>0?await x({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,f)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:c,oldResponse:d,newResponse:f,request:o})},j=x,U=async({request:e,fetchOptions:s,event:n,plugins:c=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=v(c,"fetchDidFail"),a=i.length>0?e.clone():null;try{for(const t of c)if("requestWillFetch"in t){const s=t.requestWillFetch,c=e.clone();e=await s.call(t,{request:c,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of c)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const k={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let L;async function N(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},c=t?t(n):n,i=function(){if(void 0===L){const e=new Response("");if("body"in e)try{new Response(e.body),L=!0}catch(e){L=!1}L=!1}return L}()?s.body:await s.blob();return new Response(i,c)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function S(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const c=new URL(n,location.href),i=new URL(n,location.href);return c.searchParams.set("__WB_REVISION__",s),{cacheKey:c.href,url:i.href}}class E{constructor(e){this.m=h(e),this.L=new Map,this.N=new Map,this.S=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:c}=S(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.L.has(c)&&this.L.get(c)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.L.get(c),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.S.has(e)&&this.S.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:c});this.S.set(e,n.integrity)}if(this.L.set(c,e),this.N.set(c,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],c=await self.caches.open(this.m),i=await c.keys(),a=new Set(i.map(e=>e.url));for(const[e,t]of this.L)a.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const c=this.S.get(s),i=this.N.get(n);return this.H({cacheKey:s,cacheMode:i,event:e,integrity:c,plugins:t,url:n})});await Promise.all(r);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.L.values()),n=[];for(const c of t)s.has(c.url)||(await e.delete(c),n.push(c.url));return{deletedURLs:n}}async H({cacheKey:e,url:s,cacheMode:n,event:c,plugins:i,integrity:a}){const r=new Request(s,{integrity:a,cache:n,credentials:"same-origin"});let o,f=await U({event:c,plugins:i,request:r});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:c,request:r,response:f}):f.status<400))throw new t("bad-precaching-response",{url:s,status:f.status});f.redirected&&(f=await N(f)),await R({event:c,plugins:i,response:f,request:e===s?r:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.L}getCachedURLs(){return[...this.L.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.L.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),c=new Request(e);return()=>n({request:c})}}let H;const M=()=>(H||(H=new E),H);const T=(e,t)=>{const s=M().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:c}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(c){const e=c({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let K=!1;function P(e){K||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const c=h();self.addEventListener("fetch",i=>{const a=T(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!a)return;let r=self.caches.open(c).then(e=>e.match(a)).then(e=>e||fetch(a));i.respondWith(r)})})(e),K=!0)}const O=[],D={get:()=>O,add(e){O.push(...e)}},C=e=>{const t=M(),s=D.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},X=e=>{const t=M();e.waitUntil(t.activate())};var I;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),I={},function(e){M().addToCacheList(e),e.length>0&&(self.addEventListener("install",C),self.addEventListener("activate",X))}([{url:"_next/static/9obh9iwm0vqsqqH27XxSl/_buildManifest.js",revision:"0ee2bf4fea78cbf60f684defdc2a3182"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/_app.js",revision:"05ccd6187ca8722e443dbb6f59a6c10a"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/_error.js",revision:"0827f6428561a9d28eb8c9497af9f2b9"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/course/[cid]/course_overrides.js",revision:"5ef24a9d65f5efa514c8f884af12f48d"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/course/[cid]/queue/[qid].js",revision:"927664a02b8478e4f6630266eee659e4"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/course/[cid]/schedule.js",revision:"20bd04c796917dcfed0122d4e5455a23"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/course/[cid]/today.js",revision:"d1243983542f3da4ceb4e7464faf88d1"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/dev.js",revision:"6b758658c47c211283deb3c4370efb32"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/index.js",revision:"b8d327a25664392e91930ea43f630dcd"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/login.js",revision:"4126eafdbe4a8758fc378f738a821777"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/nocourses.js",revision:"ff9975a858d13c0222fb50443fee3935"},{url:"_next/static/9obh9iwm0vqsqqH27XxSl/pages/settings.js",revision:"28d298dcd7cbb56d7e7df00d7fe9b6f8"},{url:"_next/static/chunks/055a5a3405f58efedc31247fbec85008403a6c35.4510b3294598f6c468e6.js",revision:"1429345b60825a6ed46e04c5394709e1"},{url:"_next/static/chunks/0b871d67e95ec3db9eba3fb38774f567ed6381f3.4ae2f80475f31f8e810b.js",revision:"9afedcd6a296ae28579db0b9c2eccdd6"},{url:"_next/static/chunks/0d5239dd176263538ecb8c7cb5cdf89cece4bf0e.4acb59e514b3055ef48e.js",revision:"22efbe157388df33a423f1ac59ea2d8a"},{url:"_next/static/chunks/0e583d1ea3078256ae3081e366ec252279d7c7c3.9708f84493aff45b242d.js",revision:"9baded533952053b325a029c0ee9d04e"},{url:"_next/static/chunks/2045b919d4bd950b03a49b1c0af8943d037d4d05.1a9d9513fcf8cdc8345f.js",revision:"266993e7a391f2550bdd4b3548e2455c"},{url:"_next/static/chunks/29107295.8007f4499acc1bea4d2b.js",revision:"cbfd6cc2bfe1dd2859ce6257974dd068"},{url:"_next/static/chunks/6c6176e701ec5109748f145cc377b2dfc4ea72a9.81e59ff1061f4a0b4d7b.js",revision:"c4a22c689d0eba1cb26e752b41cdf3e5"},{url:"_next/static/chunks/6e84825cf1132ada73f1f5add88091a16e74cc89.7e14e97ad48a91a1b140.js",revision:"8b78cc7d46645baf0942b4efe37d4974"},{url:"_next/static/chunks/74ba67877efac03f7f3ca828a99e70db42ee7ad5.41e4fab920dac320d39a.js",revision:"17f3bca3a7f11dde36c3c7842bd4122f"},{url:"_next/static/chunks/762f8e485896d7f97b37a5edfe321e20e19fcd1c.6206e494bfea86d771b0.js",revision:"6a8f4e254334e0f9ff62c05ed2fc92a8"},{url:"_next/static/chunks/7cff1f3cdebd54b1146c6ff4aea31ff1535007ea.68abebd9e3f253757b1e.js",revision:"00631d22d31e84b5341a94e3ebfcec3a"},{url:"_next/static/chunks/84ab1da5a2118080c572905ea37c37fbf1aa1147.3c5929ab2f1e932be03a.js",revision:"9400889ec3b670c1288a042857d108db"},{url:"_next/static/chunks/a250c979df8089b38201fc969636f6607cef870e.475aa6618c25f93d0df1.js",revision:"0af45520e4cf6718275de2e5bfc886ec"},{url:"_next/static/chunks/a29ae703.42bd497555d899daf3d4.js",revision:"d9b24a664a7b32dc0e464367e545693e"},{url:"_next/static/chunks/c5f3fffcc9767a167ef1be49b05c3bff15750742.1d48f3c55aa8e2c6c8c7.js",revision:"8e2a19d8cc4ac993f5a2fbf669bcc90d"},{url:"_next/static/chunks/c96b4d7e.f4afce0e74c846e46773.js",revision:"291cbf6757f16c9b94c9084805b69a6d"},{url:"_next/static/chunks/cac137dec048897a556688648aeeeb56dc4ccffc.a19e18f911bef145edcd.js",revision:"eab0879935561ad59265d90a2968afdc"},{url:"_next/static/chunks/ce415fc9a05cb4ce8d0f55bc35126341b41aa91e.c0b14c81c4d07adadaec.js",revision:"0b4f8b14dda469533b9999f0c06c78b3"},{url:"_next/static/chunks/commons.e82be5f27c6ddb6c6bfb.js",revision:"aac1c5198b6c26323e1ca53e5f84ac58"},{url:"_next/static/chunks/e59de6286c36a56030ac38466de3f1c9098940f0.f321554b80098c6b6362.js",revision:"a35e02fc6f90ac0f1f64b4b8c75ade1d"},{url:"_next/static/chunks/fc8d00fd.158594bfc26fc793d03b.js",revision:"718970d88a7e977d8c1fe92cb6b7c698"},{url:"_next/static/chunks/framework.ecbd939e3f22c21530d6.js",revision:"f1f44d4b846ef72b49ca7ba18b1f46ed"},{url:"_next/static/css/0b10e9f32b7d87c5b5ed.css",revision:"9b6bf2b0849057358aaaeb0dd19e37db"},{url:"_next/static/css/20de8917c44a516a459d.css",revision:"9a8cd95b5f951cd1c4dfc2843aaa0909"},{url:"_next/static/runtime/main-e3d3bfc2aa5306ba04a6.js",revision:"8acf0016fc4df14d7c70bdef2f30f7e9"},{url:"_next/static/runtime/polyfills-129b8641b84b21697221.js",revision:"5f0b0318c90f1e0cdedbb1097ad94f47"},{url:"_next/static/runtime/webpack-1c5199ff66550d26e499.js",revision:"029ee2e7063b1566925082c49e4afc45"}]),P(I),function(e,s,i){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n(({url:e})=>e.href===t.href,s,i)}else if(e instanceof RegExp)a=new c(e,s,i);else if("function"==typeof e)a=new n(e,s,i);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}o().registerRoute(a)}(/^https?.*/,new class{constructor(e={}){if(this.m=d(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.M=t?e.plugins:[k,...e.plugins]}else this.M=[k];this.T=e.networkTimeoutSeconds||0,this.K=e.fetchOptions,this.P=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const c=[];let i;if(this.T){const{id:t,promise:a}=this.O({request:s,event:e,logs:n});i=t,c.push(a)}const a=this.D({timeoutId:i,request:s,event:e,logs:n});c.push(a);let r=await Promise.race(c);if(r||(r=await a),!r)throw new t("no-response",{url:s.url});return r}O({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.C({request:e,event:s}))},1e3*this.T)}),id:n}}async D({timeoutId:e,request:t,logs:s,event:n}){let c,i;try{i=await U({request:t,event:n,fetchOptions:this.K,plugins:this.M})}catch(e){c=e}if(e&&clearTimeout(e),c||!i)i=await this.C({request:t,event:n});else{const e=i.clone(),s=R({cacheName:this.m,request:t,response:e,event:n,plugins:this.M});if(n)try{n.waitUntil(s)}catch(e){}}return i}C({event:e,request:t}){return j({cacheName:this.m,request:t,event:e,matchOptions:this.P,plugins:this.M})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const c=this.X(n),i=this.I(s);l(i.expireEntries());const a=i.updateTimestamp(t.url);if(e)try{e.waitUntil(a)}catch(e){}return c?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.I(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.A=e,this.U=e.maxAgeSeconds,this.W=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),b.add(t))}I(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.W.get(e);return s||(s=new m(e,this.A),this.W.set(e,s)),s}X(e){if(!this.U)return!0;const t=this.B(e);if(null===t)return!0;return t>=Date.now()-1e3*this.U}B(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.W)await self.caches.delete(e),await t.delete();this.W=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
