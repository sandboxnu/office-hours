(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"3kVu":function(e,t,n){e.exports=n("iQU9")},4:function(e,t,n){n("w0yH"),e.exports=n("SZc8")},"7hYp":function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n("ERkP");var a=e=>{const t=r.useRef(e);return r.useEffect(()=>{t.current=e}),t};const o=(e,t=100,n=!1)=>{const o=a(e),c=r.useRef(),i=[t,n,o];function u(){c.current&&clearTimeout(c.current),c.current=void 0}function l(){c.current=void 0}return r.useEffect(()=>u,i),r.useCallback((function(){const e=arguments,{current:r}=c;if(void 0===r&&n)return c.current=setTimeout(l,t),o.current.apply(null,e);r&&clearTimeout(r),c.current=setTimeout(()=>{c.current=void 0,o.current.apply(null,e)},t)}),i)};var c=n.n(r).a["undefined"!==typeof document&&void 0!==document.createElement?"useLayoutEffect":"useEffect"];var i=function(e,t,n,a){const o=r.useRef(n),i=r.useRef(a);c(()=>{o.current=n,i.current=a}),c(()=>{const n=e&&"current"in e?e.current:e;if(!n)return;let r=0;function a(...e){r||o.current.apply(this,e)}n.addEventListener(t,a);const c=i.current;return()=>{r=1,n.removeEventListener(t,a),c&&c()}},[e,t])};const u={},l="undefined"===typeof window?null:window,s=()=>[document.documentElement.clientWidth,document.documentElement.clientHeight],d=(e=u)=>{const{wait:t,leading:n,initialWidth:a=0,initialHeight:c=0}=e,[d,f]=((e,t,n)=>{const a=r.useState(e);return[a[0],o(a[1],t,n)]})("undefined"===typeof document?[a,c]:s,t,n),p=()=>f(s);return i(l,"resize",p),i(l,"orientationchange",p),d},f=e=>d(e)[0]},CKrD:function(e,t,n){"use strict";var r=n("ERkP"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"}}]},name:"bell",theme:"outlined"},o=n("vspj"),c=function(e,t){return r.createElement(o.a,Object.assign({},e,{ref:t,icon:a}))};c.displayName="BellOutlined";t.a=r.forwardRef(c)},DuHN:function(e,t,n){"use strict";var r,a,o,c,i=n("97Jx"),u=n.n(i),l=n("KEM+"),s=n.n(l),d=n("ERkP"),f=n("O94r"),p=n.n(f),v=n("msMj"),h=n("4RO4"),m=n.n(h),y=n("g+9h"),g=n.n(y),b=n("+O3j"),O=n.n(b),C=n("pKF9"),k=n.n(C),x=n("naMz"),E=3,w=1,j="ant-message",P="move-up",R=!1;var S={info:n.n(x).a,success:k.a,error:O.a,warning:g.a,loading:m.a};var I={open:function(e){var t,n=void 0!==e.duration?e.duration:E,i=S[e.type],u=p()("".concat(j,"-custom-content"),(t={},s()(t,"".concat(j,"-").concat(e.type),e.type),s()(t,"".concat(j,"-rtl"),!0===R),t)),l=e.key||w++,f=new Promise((function(t){var s=function(){return"function"===typeof e.onClose&&e.onClose(),t(!0)};!function(e){a?e(a):v.default.newInstance({prefixCls:j,transitionName:P,style:{top:r},getContainer:o,maxCount:c},(function(t){a?e(a):(a=t,e(t))}))}((function(t){t.notice({key:l,duration:n,style:e.style||{},className:e.className,content:d.createElement("div",{className:u},e.icon||i&&d.createElement(i,null),d.createElement("span",null,e.content)),onClose:s})}))})),h=function(){a&&a.removeNotice(l)};return h.then=function(e,t){return f.then(e,t)},h.promise=f,h},config:function(e){void 0!==e.top&&(r=e.top,a=null),void 0!==e.duration&&(E=e.duration),void 0!==e.prefixCls&&(j=e.prefixCls),void 0!==e.getContainer&&(o=e.getContainer),void 0!==e.transitionName&&(P=e.transitionName,a=null),void 0!==e.maxCount&&(c=e.maxCount,a=null),void 0!==e.rtl&&(R=e.rtl)},destroy:function(){a&&(a.destroy(),a=null)}};["success","info","warning","error","loading"].forEach((function(e){I[e]=function(t,n,r){return function(e){return"[object Object]"===Object.prototype.toString.call(e)&&!!e.content}(t)?I.open(u()(u()({},t),{type:e})):("function"===typeof n&&(r=n,n=void 0),I.open({content:t,duration:n,type:e,onClose:r}))}})),I.warn=I.warning,t.a=I},GhKx:function(e,t,n){"use strict";var r=n("KEM+"),a=n.n(r),o=n("97Jx"),c=n.n(o),i=n("ERkP"),u=n("gRH6"),l=n("O94r"),s=n.n(l),d=n("tb/6"),f=n("pfGA"),p=n("T0aG"),v=n.n(p);function h(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){!function(e,t){"function"===typeof e?e(t):"object"===v()(e)&&e&&"current"in e&&(e.current=t)}(t,e)}))}}var m=n("f8ib"),y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},g=function(e,t){var n,r=i.useContext(f.b),o=i.useContext(d.b),l=o.getPrefixCls,p=o.direction,v=h(t,i.useRef());i.useEffect((function(){Object(m.a)(!("optionType"in e),"Radio","`optionType` is only support in Radio.Group.")}),[]);var g=e.prefixCls,b=e.className,O=e.children,C=e.style,k=y(e,["prefixCls","className","children","style"]),x=l("radio",g),E=c()({},k);r&&(E.name=r.name,E.onChange=function(t){e.onChange&&e.onChange(t),(null===r||void 0===r?void 0:r.onChange)&&r.onChange(t)},E.checked=e.value===r.value,E.disabled=e.disabled||r.disabled);var w=s()(b,(n={},a()(n,"".concat(x,"-wrapper"),!0),a()(n,"".concat(x,"-wrapper-checked"),E.checked),a()(n,"".concat(x,"-wrapper-disabled"),E.disabled),a()(n,"".concat(x,"-wrapper-rtl"),"rtl"===p),n));return(i.createElement("label",{className:w,style:C,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave},i.createElement(u.a,c()({},E,{prefixCls:x,ref:v})),void 0!==O?i.createElement("span",null,O):null))},b=i.forwardRef(g);b.displayName="Radio",b.defaultProps={type:"radio"};t.a=b},HaU7:function(e,t,n){"use strict";var r=n("IebI"),a=n("zQIG"),o=n("8mBC"),c=n("I/kN"),i=n("cMav"),u=n("pSQP"),l=n("4mCN");function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var a=u(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return i(this,n)}}var d=n("Y3ZS");t.__esModule=!0,t.Container=function(e){0;return e.children},t.createUrl=y,t.default=void 0;var f=d(n("ERkP")),p=n("fvxO");function v(e){return h.apply(this,arguments)}function h(){return(h=l(r.mark((function e(t){var n,a,o;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.Component,a=t.ctx,e.next=3,(0,p.loadGetInitialProps)(n,a);case 3:return o=e.sent,e.abrupt("return",{pageProps:o});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.AppInitialProps=p.AppInitialProps;var m=function(e){c(n,e);var t=s(n);function n(){return a(this,n),t.apply(this,arguments)}return o(n,[{key:"componentDidCatch",value:function(e,t){throw e}},{key:"render",value:function(){var e=this.props,t=e.router,n=e.Component,r=e.pageProps,a=e.__N_SSG,o=e.__N_SSP;return(f.default.createElement(n,Object.assign({},r,a||o?{}:{url:y(t)})))}}]),n}(f.default.Component);function y(e){var t=e.pathname,n=e.asPath,r=e.query;return{get query(){return r},get pathname(){return t},get asPath(){return n},back:function(){e.back()},push:function(t,n){return e.push(t,n)},pushTo:function(t,n){var r=n?t:"",a=n||t;return e.push(r,a)},replace:function(t,n){return e.replace(t,n)},replaceTo:function(t,n){var r=n?t:"",a=n||t;return e.replace(r,a)}}}t.default=m,m.origGetInitialProps=v,m.getInitialProps=v},"Khd+":function(e,t,n){e.exports=n("HaU7")},M5Ow:function(e,t,n){"use strict";var r=n("97Jx"),a=n.n(r),o=n("ERkP"),c=n("GhKx"),i=n("tb/6"),u=n("pfGA"),l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},s=function(e,t){var n=o.useContext(u.b),r=o.useContext(i.b).getPrefixCls,s=e.prefixCls,d=l(e,["prefixCls"]),f=r("radio-button",s);return n&&(d.checked=e.value===n.value,d.disabled=e.disabled||n.disabled),o.createElement(c.a,a()({prefixCls:f},d,{type:"radio",ref:t}))};t.a=o.forwardRef(s)},NwOV:function(e,t,n){"use strict";var r=n("GhKx"),a=n("QUVH"),o=n("M5Ow"),c=r.a;c.Button=o.a,c.Group=a.a,t.default=c},QUVH:function(e,t,n){"use strict";var r=n("KEM+"),a=n.n(r),o=n("ddV6"),c=n.n(o),i=n("ERkP"),u=n("O94r"),l=n.n(u),s=n("MSM+"),d=n("GhKx"),f=n("tb/6"),p=n("+HJD"),v=n("pfGA"),h=i.forwardRef((function(e,t){var n=i.useContext(f.b),r=n.getPrefixCls,o=n.direction,u=i.useContext(p.b),h=Object(s.a)(e.defaultValue,{value:e.value}),m=c()(h,2),y=m[0],g=m[1];return i.createElement(v.a,{value:{onChange:function(t){var n=y,r=t.target.value;"value"in e||g(r);var a=e.onChange;a&&r!==n&&a(t)},value:y,disabled:e.disabled,name:e.name}},function(){var n,c=e.prefixCls,s=e.className,f=void 0===s?"":s,p=e.options,v=e.optionType,h=e.buttonStyle,m=e.disabled,g=e.children,b=e.size,O=e.style,C=e.id,k=e.onMouseEnter,x=e.onMouseLeave,E=r("radio",c),w="".concat(E,"-group"),j=g;if(p&&p.length>0){var P="button"===v?"".concat(E,"-button"):E;j=p.map((function(e){return"string"===typeof e?i.createElement(d.a,{ref:t,key:e,prefixCls:P,disabled:m,value:e,checked:y===e},e):i.createElement(d.a,{ref:t,key:"radio-group-value-options-".concat(e.value),prefixCls:P,disabled:e.disabled||m,value:e.value,checked:y===e.value,style:e.style},e.label)}))}var R=b||u,S=l()(w,"".concat(w,"-").concat(h),(n={},a()(n,"".concat(w,"-").concat(R),R),a()(n,"".concat(w,"-rtl"),"rtl"===o),n),f);return i.createElement("div",{className:S,style:O,onMouseEnter:k,onMouseLeave:x,id:C},j)}())}));h.defaultProps={buttonStyle:"outline"},t.a=i.memo(h)},SZc8:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/course/[cid]/course_admin_panel",function(){return n("s59K")}])},UmCv:function(e,t,n){"use strict";var r=n("ERkP"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},o=n("vspj"),c=function(e,t){return r.createElement(o.a,Object.assign({},e,{ref:t,icon:a}))};c.displayName="DeleteOutlined";t.a=r.forwardRef(c)},gRH6:function(e,t,n){"use strict";var r=n("cxan"),a=n("HbGN"),o=n("zjfJ"),c=n("9fIP"),i=n("MMYH"),u=n("8K1b"),l=n("K/z8"),s=n("sRHE"),d=n("ERkP"),f=n.n(d),p=n("O94r"),v=n.n(p);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(s.a)(e);if(t){var a=Object(s.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var g=function(e){Object(u.a)(n,e);var t=y(n);function n(e){var r;Object(c.a)(this,n),(r=t.call(this,e)).handleChange=function(e){var t=r.props,n=t.disabled,a=t.onChange;n||("checked"in r.props||r.setState({checked:e.target.checked}),a&&a({target:m(m({},r.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},r.saveInput=function(e){r.input=e};var a="checked"in e?e.checked:e.defaultChecked;return r.state={checked:a},r}return Object(i.a)(n,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,c=t.className,i=t.style,u=t.name,l=t.id,s=t.type,d=t.disabled,p=t.readOnly,h=t.tabIndex,m=t.onClick,y=t.onFocus,g=t.onBlur,b=t.autoFocus,O=t.value,C=t.required,k=Object(a.a)(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","autoFocus","value","required"]),x=Object.keys(k).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=k[t]),e}),{}),E=this.state.checked,w=v()(n,c,(e={},Object(o.a)(e,"".concat(n,"-checked"),E),Object(o.a)(e,"".concat(n,"-disabled"),d),e));return f.a.createElement("span",{className:w,style:i},f.a.createElement("input",Object(r.a)({name:u,id:l,type:s,required:C,readOnly:p,disabled:d,tabIndex:h,className:"".concat(n,"-input"),checked:!!E,onClick:m,onFocus:y,onBlur:g,onChange:this.handleChange,autoFocus:b,ref:this.saveInput,value:O},x)),f.a.createElement("span",{className:"".concat(n,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"checked"in e?m(m({},t),{},{checked:e.checked}):null}}]),n}(d.Component);g.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){}},t.a=g},iQU9:function(e,t,n){"use strict";var r=n("zQIG"),a=n("8mBC"),o=n("I/kN"),c=n("cMav"),i=n("pSQP");function u(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=i(e);if(t){var a=i(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return c(this,n)}}var l=n("Y3ZS");t.__esModule=!0,t.default=void 0;var s=l(n("ERkP")),d=l(n("ysqo")),f={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function p(e){var t=e.res,n=e.err;return{statusCode:t&&t.statusCode?t.statusCode:n?n.statusCode:404}}var v=function(e){o(n,e);var t=u(n);function n(){return r(this,n),t.apply(this,arguments)}return a(n,[{key:"render",value:function(){var e=this.props.statusCode,t=this.props.title||f[e]||"An unexpected error has occurred";return s.default.createElement("div",{style:h.error},s.default.createElement(d.default,null,s.default.createElement("title",null,e,": ",t)),s.default.createElement("div",null,s.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),e?s.default.createElement("h1",{style:h.h1},e):null,s.default.createElement("div",{style:h.desc},s.default.createElement("h2",{style:h.h2},t,"."))))}}]),n}(s.default.Component);t.default=v,v.displayName="ErrorPage",v.getInitialProps=p,v.origGetInitialProps=p;var h={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}}},pfGA:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("ERkP"),a=r.createContext(null),o=a.Provider;t.b=a},"s+7e":function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n("7hYp"),a=n("ERkP"),o=n.n(a),c=n("FRUG"),i=o.a.createElement;function u(){var e=Object(r.a)()/10;return i(c.b,{size:e,style:{marginTop:e/6,marginBottom:e/12}})}},s59K:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return ce}));var r=n("wPNs"),a=n("Khd+"),o=n("3kVu"),c=n.n(o),i=n("ysqo"),u=n.n(i),l=n("7xIC"),s=n("ERkP"),d=n.n(s),f=n("NabS"),p=n("s9Vj"),v=n("LxhF"),h=n("xdJY"),m=n("CKrD"),y=n("S7b9"),g=n("VKn7"),b=n("9xBf"),O=n("S0yW"),C=n("vVVv"),k=n("j/s1"),x=n("Ogf2"),E=n("zjfJ"),w=n("VtSi"),j=n.n(w),P=n("QsI/"),R=n("UmCv"),S=n("zTld"),I=n("dVZ9"),N=n("SCaQ"),T=n("DuHN"),D=n("JbCn"),_=n("BmDy"),A=n("x2dm"),H=d.a.createElement,M=k.a.div.withConfig({displayName:"AddOverrideInput__OverrideInput",componentId:"wmncc1-0"})(["display:flex;margin-bottom:20px;"]);function z(e){var t=e.courseId,n=e.onAddOverride,a=Object(s.useState)(""),o=a[0],c=a[1],i=Object(s.useState)(r.r.STUDENT),u=i[0],l=i[1],d=function(){var e=Object(P.a)(j.a.mark((function e(){var r,a,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.a.course.addOverride(t,{email:o,role:u});case 3:r=e.sent,n(r),c(""),T.a.success("Successfully added an override for "+r.name),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),T.a.error(null===(a=e.t0.response)||void 0===a?void 0:null===(i=a.data)||void 0===i?void 0:i.message);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return H("div",null,H(M,null,H(_.a,{placeholder:"Email",style:{marginRight:10},value:o,onChange:function(e){return c(e.target.value)}}),H(A.a,{style:{width:120,marginRight:10},value:u,onChange:function(e){return l(e)}},H(A.a.Option,{value:r.r.STUDENT},"Student"),H(A.a.Option,{value:r.r.TA},"TA"),H(A.a.Option,{value:r.r.PROFESSOR},"Professor")),H(N.a,{type:"primary",onClick:d},"Add Override")))}var K=d.a.createElement;function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(Object(n),!0).forEach((function(t){Object(E.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var B=I.a.Column,F=k.a.div.withConfig({displayName:"CourseOverrideSettings__OverrideContents",componentId:"sc-18esdfc-0"})(["width:90%;margin-left:auto;margin-right:auto;padding-top:50px;"]);function L(e){var t=e.courseId,n=Object(D.a)("/api/v1/courses/course_override",Object(P.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",S.a.course.getCourseOverrides(t));case 1:case"end":return e.stop()}}),e)})))),r=n.data,a=n.mutate,o={student:"Student",ta:"TA",professor:"Professor"};return K(F,null,K(z,{courseId:t,onAddOverride:function(){return a()}}),K(I.a,{dataSource:null===r||void 0===r?void 0:r.data.map((function(e,t){return G(G({},e),{},{key:t,role:o[e.role]})}))},K(B,{title:"Name",dataIndex:"name",key:"name"}),K(B,{title:"Email",dataIndex:"email",key:"email"}),K(B,{title:"Role",dataIndex:"role",key:"role"}),K(B,{title:"Delete",key:"delete",render:function(e,n){return K(N.a,{onClick:Object(P.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.a.course.deleteOverride(t,{email:n.email,role:n.role});case 2:T.a.success("Successfully deleted the override for "+n.name),a();case 4:case"end":return e.stop()}}),e)}))),type:"link",style:{textAlign:"center"},icon:K(R.a,{style:{color:"red"}})})}})))}var U=n("s+7e"),q=n("wgY5"),J=n.n(q),Q=n("0ebU"),Y=d.a.createElement,W=Object(k.a)(Q.a).withConfig({displayName:"TACheckInCheckOutTimes__TACheckInCheckOutCalendar",componentId:"q2bv8j-0"})(["height:70vh;padding-top:36px;padding-left:36px;"]),Z=k.a.h1.withConfig({displayName:"TACheckInCheckOutTimes__CheckinHeader",componentId:"q2bv8j-1"})(["margin-top:12px;margin-bottom:0;padding-left:36px;"]);function X(e){var t,n=e.courseId,r=new Date;r.setDate(r.getDate()-r.getDay()),r.setHours(0,0,0,0);var a=new Date;a.setDate(r.getDate()+7),a.setHours(0,0,0,0);var o=Object(s.useState)(r),c=o[0],i=o[1],u=Object(s.useState)(a),l=u[0],d=u[1],f=Object(D.a)(["/api/v1/course/getTACheckinCheckoutTimes",c,l],(function(e,t,r){return S.a.course.getTACheckinTimes(n,t.toISOString(),r.toISOString())})),p=f.data,v=f.mutate,h=null===p||void 0===p?void 0:p.taCheckinTimes.filter((function(e){return e.forced})),m=null===p||void 0===p?void 0:p.taCheckinTimes.filter((function(e){return e.inProgress})),y=null!==(t=null===p||void 0===p?void 0:p.taCheckinTimes.map((function(e){return{start:e.checkinTime,end:e.checkoutTime?e.checkoutTime:new Date,title:e.inProgress?"TA currently holding office hours: ".concat(e.name):e.forced?"TA forgot to check out: ".concat(e.name):e.name,resource:e.numHelped}})))&&void 0!==t?t:[];return Y("div",null,Y(Z,null,"TA Check-In Check-Out Times"),Y(W,{events:y,localizer:Object(Q.b)(J.a),showMultiDayTimes:!0,defaultView:"week",onRangeChange:function(e){Array.isArray(e)?(i(e[0]),d(e[e.length-1])):(i(new Date(e.start)),d(new Date(e.end))),v()},onSelectEvent:function(e){alert("".concat(e.title," helped ").concat(e.resource," students in their office hours"))}}),(null===m||void 0===m?void 0:m.length)?Y("div",null,Y("h3",null,"People currently holding office hours:"),m.map((function(e){return Y("p",{key:e.name},e.name)}))):null,(null===h||void 0===h?void 0:h.length)?Y("div",null,Y("h3",{style:{color:"red"}},"The following course staff forgot to check out:"),h.map((function(e){return Y("p",{key:e.name},e.name)})),Y("p",{style:{width:"800px"}},"Please remind course staff to check out at the end of their office hours. This way students don't join a queue thinking that there are still office hours when the course staff has already left")):null)}var $,ee=d.a.createElement;!function(e){e.CHECK_IN="CHECK_IN",e.OVERRIDES="OVERRIDES"}($||($={}));var te=k.a.div.withConfig({displayName:"CourseAdminPanel__VerticalDivider",componentId:"sc-1e59smu-0"})(["@media (min-width:767px){border-right:1px solid #cfd6de;margin-right:32px;}"]),ne=k.a.p.withConfig({displayName:"CourseAdminPanel__CenteredText",componentId:"sc-1e59smu-1"})(["text-align:center;"]);function re(e){var t=e.defaultPage,n=e.courseId,r=Object(x.a)(),a=Object(s.useState)(t||$.CHECK_IN),o=a[0],c=a[1],i=Object(l.useRouter)();return ee(y.a,null,ee(g.a,{span:4,style:{textAlign:"center"}},ee(U.a,null),ee(ne,null,"Welcome back",ee("br",null),null===r||void 0===r?void 0:r.firstName," ",null===r||void 0===r?void 0:r.lastName,!(null===r||void 0===r?void 0:r.photoURL)&&ee(b.a,{title:"You should consider uploading a profile picture to make yourself more recognizable to students"},ee("span",null,ee(v.a,{style:{marginLeft:"5px"},onClick:function(){i.push("/settings?cid=".concat(n))}})))),ee(O.a,{defaultSelectedKeys:[o],onClick:function(e){return c(e.key)},style:{background:"#f8f9fb",paddingTop:"20px"}},ee(O.a.Item,{key:$.CHECK_IN,icon:ee(h.a,null)},"TA Check In/Out Times"),ee(O.a.Item,{key:$.OVERRIDES,icon:ee(m.a,null)},"Course Overrides"))),ee(te,null),ee(C.a,{direction:"vertical",size:40,style:{flexGrow:1}},ee(g.a,{span:20},o===$.CHECK_IN&&ee(X,{courseId:n}),o===$.OVERRIDES&&ee(L,{courseId:n}))))}var ae=n("nXdl"),oe=d.a.createElement;function ce(){var e=Object(l.useRouter)(),t=e.query.cid,n=Object(ae.a)(Number(t)),o=e.query.defaultPage;return n!==r.r.PROFESSOR?oe(c.a,{statusCode:404}):oe("div",null,oe(f.a,null,oe(a.Container,null,oe(u.a,null,oe("title",null,"Course Admin Panel | Khoury Office Hours")),oe(p.a,{courseId:Number(t)}),t&&oe(re,{courseId:Number(t),defaultPage:o}))))}},xdJY:function(e,t,n){"use strict";var r=n("ERkP"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},o=n("vspj"),c=function(e,t){return r.createElement(o.a,Object.assign({},e,{ref:t,icon:a}))};c.displayName="EditOutlined";t.a=r.forwardRef(c)}},[[4,1,2,13,18,0,3,4,5,6,7,8,9,10,11,14,12,19,22]]]);
//# sourceMappingURL=course_admin_panel.js.map