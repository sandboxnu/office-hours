(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{"+UCP":function(n,t,r){"use strict";r.d(t,"a",(function(){return i}));var e=r("zygG"),o=r("7xIC"),c=r.n(o),u=r("Xccw"),a=r("Ogf2");function i(){var n=Object(a.a)(),t=Object(u.a)("defaultCourse",null),r=Object(e.a)(t,1)[0];if(n&&n.courses.length>0){var o=!!r&&n.courses.some((function(n){return n.course.id===(null===r||void 0===r?void 0:r.id)}));return c.a.push("/course/[cid]/today","/course/".concat(o?r.id:n.courses[0].course.id,"/today")),!0}return!1}},11:function(n,t,r){r("w0yH"),n.exports=r("yaYD")},"23aj":function(n,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return f}));var e=r("ERkP"),o=r.n(e),c=r("7xIC"),u=r.n(c),a=r("+UCP"),i=r("Ogf2"),s=o.a.createElement;function f(){var n=Object(i.a)(),t=Object(a.a)();return n&&!t&&u.a.push("/nocourses"),s("div",null)}},Ogf2:function(n,t,r){"use strict";r.d(t,"a",(function(){return f}));var e=r("VtSi"),o=r.n(e),c=r("QsI/"),u=r("JbCn"),a=r("zTld"),i=r("7xIC"),s=r.n(i),f=function(){var n,t=Object(i.useRouter)().pathname,r=Object(u.a)("api/v1/profile",Object(c.a)(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.a.profile.index();case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))),e=r.data,f=r.error;if(401===(null===f||void 0===f?void 0:null===(n=f.response)||void 0===n?void 0:n.status)&&"/login"!==t)s.a.push("/login");else if(e)return e}},Xccw:function(n,t,r){"use strict";r.d(t,"a",(function(){return c}));var e=r("ERkP"),o=!0;function c(n,t){var r=Object(e.useState)((function(){try{var r=o&&window.localStorage.getItem(n);return r?JSON.parse(r):t}catch(e){return console.error(e),t}})),c=r[0],u=r[1];return[c,function(t){try{var r=t instanceof Function?t(c):t;u(r),o&&window.localStorage.setItem(n,JSON.stringify(r))}catch(e){console.error(e)}},function(){try{u(null),o&&window.localStorage.removeItem(n)}catch(t){console.error(t)}}]}},yaYD:function(n,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r("23aj")}])}},[[11,1,2,0,3,5,7]]]);
//# sourceMappingURL=index.js.map