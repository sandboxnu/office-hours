try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const c=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class a{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let c,a=i&&i.handler;if(!a&&this.s&&(a=this.s),a){try{c=a.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this.i&&(c=c.catch(n=>this.i.handle({url:s,request:e,event:t}))),c}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const c=i.match({url:e,request:t,event:s});if(c)return n=c,(Array.isArray(c)&&0===c.length||c.constructor===Object&&0===Object.keys(c).length||"boolean"==typeof c)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new a,r.addFetchListener(),r.addCacheListener()),r);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||f(u.precache),d=e=>e||f(u.runtime);function l(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:c=!1}={}){return await this.transaction([e],"readonly",(a,r)=>{const o=a.objectStore(e),u=t?o.index(t):o,f=[],h=u.openCursor(s,n);h.onsuccess=()=>{const e=h.result;e?(f.push(c?e:e.value),i&&f.length>=i?r(f):e.continue()):r(f)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const c=this.o.transaction(e,t);c.onabort=()=>i(c.error),c.oncomplete=()=>n(),s(c,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const c=s.objectStore(t),a=c[e].apply(c,n);a.onsuccess=()=>i(a.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(b))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class g{constructor(e){this.m=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.v(e)})}v(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.m)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.m,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),c=[];let a=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.m&&(e&&n.timestamp<e||t&&a>=t?c.push(s.value):a++),s.continue()}else n(c)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.m+"|"+y(e)}}class m{constructor(e,t={}){this._=!1,this.R=!1,this.L=t.maxEntries,this.k=t.maxAgeSeconds,this.m=e,this.K=new g(e)}async expireEntries(){if(this._)return void(this.R=!0);this._=!0;const e=this.k?Date.now()-1e3*this.k:0,t=await this.K.expireEntries(e,this.L),s=await self.caches.open(this.m);for(const e of t)await s.delete(e);this._=!1,this.R&&(this.R=!1,l(this.expireEntries()))}async updateTimestamp(e){await this.K.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.k){return await this.K.getTimestamp(e)<Date.now()-1e3*this.k}return!1}async delete(){this.R=!1,await this.K.expireEntries(1/0)}}const v=(e,t)=>e.filter(e=>t in e),q=async({request:e,mode:t,plugins:s=[]})=>{const n=v(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},x=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const c=await self.caches.open(e),a=await q({plugins:i,request:t,mode:"read"});let r=await c.match(a,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:a})}return r},R=async({cacheName:e,request:s,response:n,event:i,plugins:a=[],matchOptions:r})=>{const o=await q({plugins:a,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:c(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,c=!1;for(const t of n)if("cacheWillUpdate"in t){c=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return c||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:a,response:n,request:o});if(!u)return;const f=await self.caches.open(e),h=v(a,"cacheDidUpdate"),d=h.length>0?await x({cacheName:e,matchOptions:r,request:o}):null;try{await f.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:d,newResponse:u,request:o})},L=x,k=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const c=v(i,"fetchDidFail"),a=c.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of c)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const K={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let j;async function N(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,c=function(){if(void 0===j){const e=new Response("");if("body"in e)try{new Response(e.body),j=!0}catch(e){j=!1}j=!1}return j}()?s.body:await s.blob();return new Response(c,i)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function U(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),c=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:c.href}}class A{constructor(e){this.m=h(e),this.j=new Map,this.N=new Map,this.U=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=U(n),c="string"!=typeof n&&n.revision?"reload":"default";if(this.j.has(i)&&this.j.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.j.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.U.has(e)&&this.U.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.U.set(e,n.integrity)}if(this.j.set(i,e),this.N.set(i,c),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.m),c=await i.keys(),a=new Set(c.map(e=>e.url));for(const[e,t]of this.j)a.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.U.get(s),c=this.N.get(n);return this.A({cacheKey:s,cacheMode:c,event:e,integrity:i,plugins:t,url:n})});await Promise.all(r);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.m),t=await e.keys(),s=new Set(this.j.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async A({cacheKey:e,url:s,cacheMode:n,event:i,plugins:c,integrity:a}){const r=new Request(s,{integrity:a,cache:n,credentials:"same-origin"});let o,u=await k({event:i,plugins:c,request:r});for(const e of c||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await N(u)),await R({event:i,plugins:c,response:u,request:e===s?r:new Request(e),cacheName:this.m,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.j}getCachedURLs(){return[...this.j.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.j.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.m)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.m,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let E;const W=()=>(E||(E=new A),E);const F=(e,t)=>{const s=W().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(c,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:c});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let H=!1;function M(e){H||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=h();self.addEventListener("fetch",c=>{const a=F(c.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!a)return;let r=self.caches.open(i).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(r)})})(e),H=!0)}const T=[],P={get:()=>T,add(e){T.push(...e)}},O=e=>{const t=W(),s=P.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},D=e=>{const t=W();e.waitUntil(t.activate())};var G;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),G={},function(e){W().addToCacheList(e),e.length>0&&(self.addEventListener("install",O),self.addEventListener("activate",D))}([{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/_buildManifest.js",revision:"9344e856be92e977716809be58c66f4c"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/_app.js",revision:"41ed4d104cc1ee96a50cd8d86a9368c5"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/_error.js",revision:"876e3b29962aee2dd66636de64fa4fbe"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/course/[cid]/queue/[qid].js",revision:"a7f477d626bac82c1cb98c262b73ba97"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/course/[cid]/schedule.js",revision:"9f51d752b9df014ffb3a703d2503638c"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/course/[cid]/today.js",revision:"6b644266f1d82e1ad0e5bdfecf68111d"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/dev.js",revision:"39d96904c116fc097171d652ec9af1e5"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/index.js",revision:"ac35a28a2db6bb283eca008a53a395c5"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/login.js",revision:"95d10c6af18885280e56c86af92a63ca"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/nocourses.js",revision:"65924e98b420e54c77cb413609af198e"},{url:"_next/static/1HFoWN2KoJKLA9oGqk08y/pages/settings.js",revision:"f6183e326263d9624aed796196389b66"},{url:"_next/static/chunks/03969afe528cd0e224d3686bb81167e4c804484a.79086e524dc173daf3a8.js",revision:"379197f39dd68747271bd99dbd0e6967"},{url:"_next/static/chunks/05eeb3a91a2651a9d57a05fec482fc96f101be2f.f0b53fd959560d09a358.js",revision:"ae1ff6bfb5fb38884dd8d7d7fa6720d5"},{url:"_next/static/chunks/2301a54ed34affa19d5be45284862819807f688f.b09fc25801849a336383.js",revision:"698a0434051de63a392241174ca094ba"},{url:"_next/static/chunks/2471252b15c821c5c3ebbf4a06cafc7312801730.4510b3294598f6c468e6.js",revision:"3eb115e0a60d0ab5f7792f3cc21e3a01"},{url:"_next/static/chunks/29107295.57c205444afd2d06740a.js",revision:"b95ffe42c5645e40ee6c4857c15e0e4d"},{url:"_next/static/chunks/2b00743d3dee3eaaa98c72e21fe7a33898fe1134.979e67ea41b45e863d2a.js",revision:"0d16a56c9514c9fa77989beb36a887d4"},{url:"_next/static/chunks/54b7814bbf4d3f16004cf2c0bcc2da7d875d5cef.9708f84493aff45b242d.js",revision:"f25ec0b791520627acd35800e35e6329"},{url:"_next/static/chunks/66f5e449bf77f82b1d9a2fb97d6dec00d9069ebc.96e54de04c15d71ed2ef.js",revision:"dd420d32bbb20846fb83f8c1b855c4a3"},{url:"_next/static/chunks/8ac1541fec93e7348af5365d2bb4e1ca49d5d1c7.b990028738d317dba5be.js",revision:"5cb61de56c2f1b4cd729517e00382b7d"},{url:"_next/static/chunks/93769074e304ee77a7ea58aba0beadbc6cd8a45b.8ec4bedee65af08c1c6f.js",revision:"303d66cc7bbe6e5c09bce16289d9522c"},{url:"_next/static/chunks/963a80ccaa3379c53f6134b5c18a3e648fae05e9.475aa6618c25f93d0df1.js",revision:"53cf4e362017a93c0ca702c8f77f32c0"},{url:"_next/static/chunks/a29ae703.42bd497555d899daf3d4.js",revision:"d9b24a664a7b32dc0e464367e545693e"},{url:"_next/static/chunks/af7908b5d05e4a9a65e61bf3e0c38913c5a41f25.6aafbe998de7c270fe19.js",revision:"342e93995045d2e7f43d72ef0bed84d2"},{url:"_next/static/chunks/c96b4d7e.ff4871388b9ad0566c3b.js",revision:"e7b125b8347adb4ed17b666bc76685ff"},{url:"_next/static/chunks/commons.d207e9baa9df58f53439.js",revision:"eae6bdefc4b4c1bad3f734dc3193e3b1"},{url:"_next/static/chunks/e9ce25521817717d4950a04ab5a1d75e7ee58e1a.aa647899fc4071839a87.js",revision:"f8034a53d7e16663298349cc8c336c30"},{url:"_next/static/chunks/fc45a33d0cc9245c55f028cb5a72a899de5aefd1.167929e68f1804d70beb.js",revision:"3a4aef1ab5ce2522b39eaf568d754d10"},{url:"_next/static/chunks/fc8d00fd.afd2d8f4015a50040cc7.js",revision:"034a5909526fbfd8b9f907ec8a52d5df"},{url:"_next/static/chunks/framework.ecbd939e3f22c21530d6.js",revision:"f1f44d4b846ef72b49ca7ba18b1f46ed"},{url:"_next/static/css/0b10e9f32b7d87c5b5ed.css",revision:"9b6bf2b0849057358aaaeb0dd19e37db"},{url:"_next/static/css/82cdff9d095f5d7a12bb.css",revision:"6b687fd5afb07213a49206ef2e8317af"},{url:"_next/static/runtime/main-2f06fd375e806878add2.js",revision:"5ce29919cf1d9cf39ffa0198b474ee42"},{url:"_next/static/runtime/polyfills-88871e34227556d9543c.js",revision:"995b69e71e342d3d3dcf095cf274c27c"},{url:"_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"cd00a63b218fd15ffccf530cd57d5a5e"}]),M(G),function(e,s,c){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n(({url:e})=>e.href===t.href,s,c)}else if(e instanceof RegExp)a=new i(e,s,c);else if("function"==typeof e)a=new n(e,s,c);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}o().registerRoute(a)}(/^https?.*/,new class{constructor(e={}){if(this.m=d(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.W=t?e.plugins:[K,...e.plugins]}else this.W=[K];this.F=e.networkTimeoutSeconds||0,this.H=e.fetchOptions,this.M=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let c;if(this.F){const{id:t,promise:a}=this.T({request:s,event:e,logs:n});c=t,i.push(a)}const a=this.P({timeoutId:c,request:s,event:e,logs:n});i.push(a);let r=await Promise.race(i);if(r||(r=await a),!r)throw new t("no-response",{url:s.url});return r}T({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.O({request:e,event:s}))},1e3*this.F)}),id:n}}async P({timeoutId:e,request:t,logs:s,event:n}){let i,c;try{c=await k({request:t,event:n,fetchOptions:this.H,plugins:this.W})}catch(e){i=e}if(e&&clearTimeout(e),i||!c)c=await this.O({request:t,event:n});else{const e=c.clone(),s=R({cacheName:this.m,request:t,response:e,event:n,plugins:this.W});if(n)try{n.waitUntil(s)}catch(e){}}return c}O({event:e,request:t}){return L({cacheName:this.m,request:t,event:e,matchOptions:this.M,plugins:this.W})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.D(n),c=this.G(s);l(c.expireEntries());const a=c.updateTimestamp(t.url);if(e)try{e.waitUntil(a)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.G(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.C=e,this.k=e.maxAgeSeconds,this.J=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}G(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.J.get(e);return s||(s=new m(e,this.C),this.J.set(e,s)),s}D(e){if(!this.k)return!0;const t=this.I(e);if(null===t)return!0;return t>=Date.now()-1e3*this.k}I(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.J)await self.caches.delete(e),await t.delete();this.J=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
