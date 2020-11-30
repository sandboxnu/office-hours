try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{a=c.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new c,r.addFetchListener(),r.addCacheListener()),r);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||f(u.precache),d=e=>e||f(u.runtime);function l(e){e.then(()=>{})}const w=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(c,r)=>{const o=c.objectStore(e),u=t?o.index(t):o,f=[],h=u.openCursor(s,n);h.onsuccess=()=>{const e=h.result;e?(f.push(a?e:e.value),i&&f.length>=i?r(f):e.continue()):r(f)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async v(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),c=a[e].apply(a,n);c.onsuccess=()=>i(c.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const b={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(b))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.v(s,t,e,...n)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const y=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class v{constructor(e){this.g=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=y(e),timestamp:t,cacheName:this.g,id:this._(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this._(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let c=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.g&&(e&&n.timestamp<e||t&&c>=t?a.push(s.value):c++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}_(e){return this.g+"|"+y(e)}}class g{constructor(e,t={}){this.q=!1,this.R=!1,this.j=t.maxEntries,this.U=t.maxAgeSeconds,this.g=e,this.L=new v(e)}async expireEntries(){if(this.q)return void(this.R=!0);this.q=!0;const e=this.U?Date.now()-1e3*this.U:0,t=await this.L.expireEntries(e,this.j),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.q=!1,this.R&&(this.R=!1,l(this.expireEntries()))}async updateTimestamp(e){await this.L.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.U){return await this.L.getTimestamp(e)<Date.now()-1e3*this.U}return!1}async delete(){this.R=!1,await this.L.expireEntries(1/0)}}const m=(e,t)=>e.filter(e=>t in e),x=async({request:e,mode:t,plugins:s=[]})=>{const n=m(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),c=await x({plugins:i,request:t,mode:"read"});let r=await a.match(c,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:c})}return r},R=async({cacheName:e,request:s,response:n,event:i,plugins:c=[],matchOptions:r})=>{const o=await x({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:c,response:n,request:o});if(!u)return;const f=await self.caches.open(e),h=m(c,"cacheDidUpdate"),d=h.length>0?await q({cacheName:e,matchOptions:r,request:o}):null;try{await f.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of w)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:d,newResponse:u,request:o})},j=q,U=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=m(i,"fetchDidFail"),c=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const L={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let k;async function P(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===k){const e=new Response("");if("body"in e)try{new Response(e.body),k=!0}catch(e){k=!1}k=!1}return k}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function N(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class E{constructor(e){this.g=h(e),this.k=new Map,this.P=new Map,this.N=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=N(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.k.has(i)&&this.k.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.k.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.N.has(e)&&this.N.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.N.set(e,n.integrity)}if(this.k.set(i,e),this.P.set(i,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.g),a=await i.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this.k)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.N.get(s),a=this.P.get(n);return this.F({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});await Promise.all(r);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this.k.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async F({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:c}){const r=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,u=await U({event:i,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await P(u)),await R({event:i,plugins:a,response:u,request:e===s?r:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.k}getCachedURLs(){return[...this.k.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.k.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let F;const H=()=>(F||(F=new E),F);const M=(e,t)=>{const s=H().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let T=!1;function K(e){T||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=h();self.addEventListener("fetch",a=>{const c=M(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let r=self.caches.open(i).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(r)})})(e),T=!0)}const O=[],D={get:()=>O,add(e){O.push(...e)}},C=e=>{const t=H(),s=D.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},I=e=>{const t=H();e.waitUntil(t.activate())};var Y;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),Y={},function(e){H().addToCacheList(e),e.length>0&&(self.addEventListener("install",C),self.addEventListener("activate",I))}([{url:"_next/static/chunks/2bd35c7cfab82db22aef41a33082654e2f3ab0c8.4510b3294598f6c468e6.js",revision:"5dd6d7f6be89dea14f0ace43ab418c00"},{url:"_next/static/chunks/2edb282b.e5345897b24b64ef28b4.js",revision:"b7772cbdba7ee273f8c4e0dec5fbf7fa"},{url:"_next/static/chunks/2eee75ae4135f9a67a01a4f11e373535dc6b9c2a.7e02b68300e2fd166e12.js",revision:"7477800f814cb94d5f71813ab986808b"},{url:"_next/static/chunks/3f762568d235cf8e398c22bbfb7f9054839e6479.2d8a84b9272ef3705ae7.js",revision:"66df37b06ac995a354608e9539a14844"},{url:"_next/static/chunks/4c7f0397255c0535cab30cbde769c79fb4472649.772f35a82498f7b19b0c.js",revision:"3a761a6cee03443fff3eef5c2d49a8fb"},{url:"_next/static/chunks/4d3ec0d718373c9bf7a0da1432bf7b2d8350c032.1e204dee18d9405421f4.js",revision:"ea79f83edfd2600a73af8520fd5642f3"},{url:"_next/static/chunks/6112f5b743526c4bdd733fa2f5e54e31f1a2e46c.a19e18f911bef145edcd.js",revision:"88ff414ea57478c9d00f5d5025016c75"},{url:"_next/static/chunks/8a2d7608f6ec9ba206a8b0d04993bedbf25f11f6.475aa6618c25f93d0df1.js",revision:"4a4f4072688e469874d6ed8d0138b1ae"},{url:"_next/static/chunks/919f5e791e771708df153ede0f9351b9d6ead417.68baa54cf7d10a08f054.js",revision:"1844a18f2745a2ce0b1c6cd2c1713023"},{url:"_next/static/chunks/9fbd770ccefa01412495b9a3fdb37d80f5595ead.c12bd4c058d808ecce7b.js",revision:"a5a4b0b129ab9909856b4522883602f0"},{url:"_next/static/chunks/a29ae703.42bd497555d899daf3d4.js",revision:"d9b24a664a7b32dc0e464367e545693e"},{url:"_next/static/chunks/aa8b263ff1b78fd2aa622a2fd856a61027a32cb3.9ce607cf4728896ae47e.js",revision:"ab29a253768b140e32a17580bf0abb26"},{url:"_next/static/chunks/ae1473e8d8a3fffbc1074b6b1c2119ff3fa327bc.9708f84493aff45b242d.js",revision:"ad1ee2c038cd9f28634d772a46a24c5e"},{url:"_next/static/chunks/b81d57913698e6e9cdca83d171524f9c2d07a314.16669457d80c7ebd86b2.js",revision:"44d56ec78963ba0dd7e6c6184205675c"},{url:"_next/static/chunks/c30c927f5a95de862738c2117edd1e061665a3ce.04e52eae15f25a31aa27.js",revision:"5374bdb901f174b6da4076f24f8243ae"},{url:"_next/static/chunks/c96b4d7e.ff4871388b9ad0566c3b.js",revision:"e7b125b8347adb4ed17b666bc76685ff"},{url:"_next/static/chunks/commons.d207e9baa9df58f53439.js",revision:"eae6bdefc4b4c1bad3f734dc3193e3b1"},{url:"_next/static/chunks/fc8d00fd.afd2d8f4015a50040cc7.js",revision:"034a5909526fbfd8b9f907ec8a52d5df"},{url:"_next/static/chunks/framework.ecbd939e3f22c21530d6.js",revision:"f1f44d4b846ef72b49ca7ba18b1f46ed"},{url:"_next/static/css/0b10e9f32b7d87c5b5ed.css",revision:"9b6bf2b0849057358aaaeb0dd19e37db"},{url:"_next/static/css/82cdff9d095f5d7a12bb.css",revision:"6b687fd5afb07213a49206ef2e8317af"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/_buildManifest.js",revision:"1009054e7f548459c4a9a931f90f6b15"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/_app.js",revision:"be0aa8896520f17d60c531fc55cb855c"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/_error.js",revision:"876e3b29962aee2dd66636de64fa4fbe"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/course/[cid]/queue/[qid].js",revision:"fd638fb2d0d6f9bd9e37271757267fe6"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/course/[cid]/schedule.js",revision:"a8d3b3641d3138b486d65dcd526c0495"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/course/[cid]/today.js",revision:"7f93a7a3d19bb523dbbae7d1a8420bed"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/dev.js",revision:"e06991cc5f0fecc0aee333fd79fa43f0"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/index.js",revision:"861d3980656653ee7223682fabdff60b"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/login.js",revision:"47b18626385e3cc377a7dfaedff740e4"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/nocourses.js",revision:"fe886d04fe16c02d36a876fa9a0e17df"},{url:"_next/static/jFvps_3aiHxw2s6iuvPY7/pages/settings.js",revision:"8a85bdfcc3cc53724fa3ace460d5ee92"},{url:"_next/static/runtime/main-2f06fd375e806878add2.js",revision:"5ce29919cf1d9cf39ffa0198b474ee42"},{url:"_next/static/runtime/polyfills-88871e34227556d9543c.js",revision:"995b69e71e342d3d3dcf095cf274c27c"},{url:"_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"cd00a63b218fd15ffccf530cd57d5a5e"}]),K(Y),function(e,s,a){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)c=new i(e,s,a);else if("function"==typeof e)c=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/^https?.*/,new class{constructor(e={}){if(this.g=d(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.H=t?e.plugins:[L,...e.plugins]}else this.H=[L];this.M=e.networkTimeoutSeconds||0,this.T=e.fetchOptions,this.K=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let a;if(this.M){const{id:t,promise:c}=this.O({request:s,event:e,logs:n});a=t,i.push(c)}const c=this.D({timeoutId:a,request:s,event:e,logs:n});i.push(c);let r=await Promise.race(i);if(r||(r=await c),!r)throw new t("no-response",{url:s.url});return r}O({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.C({request:e,event:s}))},1e3*this.M)}),id:n}}async D({timeoutId:e,request:t,logs:s,event:n}){let i,a;try{a=await U({request:t,event:n,fetchOptions:this.T,plugins:this.H})}catch(e){i=e}if(e&&clearTimeout(e),i||!a)a=await this.C({request:t,event:n});else{const e=a.clone(),s=R({cacheName:this.g,request:t,response:e,event:n,plugins:this.H});if(n)try{n.waitUntil(s)}catch(e){}}return a}C({event:e,request:t}){return j({cacheName:this.g,request:t,event:e,matchOptions:this.K,plugins:this.H})}}({cacheName:"offlineCache",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.I(n),a=this.Y(s);l(a.expireEntries());const c=a.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.Y(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.A=e,this.U=e.maxAgeSeconds,this.S=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),w.add(t))}Y(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.S.get(e);return s||(s=new g(e,this.A),this.S.set(e,s)),s}I(e){if(!this.U)return!0;const t=this.W(e);if(null===t)return!0;return t>=Date.now()-1e3*this.U}W(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.S)await self.caches.delete(e),await t.delete();this.S=new Map}}({maxEntries:200,purgeOnQuotaError:!0})]}),"GET");
//# sourceMappingURL=service-worker.js.map
