(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"+UCP":function(n,t,e){"use strict";e.d(t,"a",(function(){return c}));var r=e("zygG"),o=e("7xIC"),i=e.n(o),u=e("Xccw"),a=e("Ogf2");function c(){var n=Object(a.a)(),t=Object(u.a)("defaultCourse",null),e=Object(r.a)(t,1)[0];if(n&&n.courses.length>0){var o=!!e&&n.courses.some((function(n){return n.course.id===(null===e||void 0===e?void 0:e.id)}));return i.a.push("/course/[cid]/today","/course/".concat(o?e.id:n.courses[0].course.id,"/today")),!0}return!1}},"11/B":function(n,t,e){"use strict";e.r(t),e.d(t,"default",(function(){return g}));var r=e("ERkP"),o=e.n(r),i=e("SCaQ"),u=e("j/s1"),a=e("+UCP"),c=e("7xIC"),s=e.n(c),l=e("Ogf2"),d=o.a.createElement,f=u.a.div.withConfig({displayName:"login__Container",componentId:"t5dl6u-0"})(["height:80vh;display:flex;justify-content:center;align-items:center;"]),p=u.a.div.withConfig({displayName:"login__ContentContainer",componentId:"t5dl6u-1"})(["text-align:center;"]);function g(){var n=Object(l.a)(),t=Object(a.a)();return n&&!t&&s.a.push("/nocourses"),d(f,null,d(p,null,d("h1",null,"You are currently not logged in"),d("p",null,"Click the button below to login via Khoury Admin"),d(i.a,{href:"https://admin.khoury.northeastern.edu/teaching/officehourslogin/"},"Log in via Khoury Admin")))}},12:function(n,t,e){e("w0yH"),n.exports=e("yI1a")},Ogf2:function(n,t,e){"use strict";e.d(t,"a",(function(){return l}));var r=e("VtSi"),o=e.n(r),i=e("QsI/"),u=e("JbCn"),a=e("zTld"),c=e("7xIC"),s=e.n(c),l=function(){var n,t=Object(c.useRouter)().pathname,e=Object(u.a)("api/v1/profile",Object(i.a)(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.profile.index();case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))),r=e.data,l=e.error;if(401===(null===l||void 0===l?void 0:null===(n=l.response)||void 0===n?void 0:n.status)&&"/login"!==t)s.a.push("/login");else if(r)return r}},Xccw:function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e("ERkP"),o=!0;function i(n,t){var e=Object(r.useState)((function(){try{var e=o&&window.localStorage.getItem(n);return e?JSON.parse(e):t}catch(r){return console.error(r),t}})),i=e[0],u=e[1];return[i,function(t){try{var e=t instanceof Function?t(i):t;u(e),o&&window.localStorage.setItem(n,JSON.stringify(e))}catch(r){console.error(r)}},function(){try{u(null),o&&window.localStorage.removeItem(n)}catch(t){console.error(t)}}]}},yI1a:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return e("11/B")}])}},[[12,1,2,0,3,5,4,8,7,6]]]);
//# sourceMappingURL=login.js.map