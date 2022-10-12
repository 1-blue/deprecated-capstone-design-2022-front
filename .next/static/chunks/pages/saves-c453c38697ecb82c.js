(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[216],{3104:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/saves",function(){return n(5476)}])},9634:function(t,e,n){"use strict";n.d(e,{b:function(){return x},Z:function(){return g}});var r=n(9669),o=n.n(r),a=n(4051),c=n.n(a);function i(t,e,n,r,o,a,c){try{var i=t[a](c),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,o)}var s=function(){var t,e=(t=c().mark((function t(e){var n,a,i,s,u,l,p,d,f,m,h,g;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.file,a=e.kinds,t.prev=1,t.next=4,x.get("/photo?name=".concat(n.name,"&kinds=").concat(a));case 4:if(i=t.sent,s=i.data,u=s.preSignedURL,l=s.photoURL,p=s.message,u&&l){t.next=11;break}return t.abrupt("return",{photoURL:l,preSignedURL:u,message:"\uc54c \uc218 \uc5c6\ub294 \uc5d0\ub7ec\uc785\ub2c8\ub2e4. \uc7a0\uc2dc\ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!"});case 11:return t.next=13,o().put(u,n,{headers:{"Content-Type":n.type}});case 13:return t.abrupt("return",{photoURL:l,preSignedURL:u,message:p});case 16:if(t.prev=16,t.t0=t.catch(1),console.error("apiCreatePhoto() >> ",t.t0),c=t.t0,!(null!=(v=r.AxiosError)&&"undefined"!==typeof Symbol&&v[Symbol.hasInstance]?v[Symbol.hasInstance](c):c instanceof v)){t.next=23;break}return f=null===(d=t.t0.response)||void 0===d?void 0:d.data,m=f.preSignedURL,h=f.photoURL,g=f.message,t.abrupt("return",{photoURL:h,preSignedURL:m,message:g});case 23:return t.abrupt("return",{photoURL:null,preSignedURL:null,message:"\uc774\ubbf8\uc9c0 \uc5c5\ub85c\ub4dc\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \uc7a0\uc2dc\ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694!"});case 24:case"end":return t.stop()}var c,v}),t,null,[[1,16]])})),function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function c(t){i(a,r,o,c,s,"next",t)}function s(t){i(a,r,o,c,s,"throw",t)}c(void 0)}))});return function(t){return e.apply(this,arguments)}}(),u={apiCreatePhoto:s},l={apiSignUp:function(t){return x.post("/signup",t)}},p={apiGetPosts:function(t){var e=t.lastIdx,n=t.limit,r=t.kinds;return x.get("/posts?lastIdx=".concat(e,"&limit=").concat(n,"&kinds=").concat(r))},apiGetPost:function(t){var e=t.name,n=t.title;return x.get(encodeURI("/post?name=".concat(e,"&title=").concat(n)))},apiDeletePost:function(t){var e=t.postIdx;return x.delete("/post?postIdx=".concat(e))},apiCreateFavorite:function(t){var e=t.postIdx;return x.post("/post/favorite?postIdx=".concat(e))},apiDeleteFavorite:function(t){var e=t.postIdx;return x.delete("/post/favorite?postIdx=".concat(e))},apiCreatePost:function(t){return x.post("/post",t)},apiCreateTemporaryPost:function(t){return x.post("/post/temporary",t)},apiGetPostsByCategory:function(t){var e=t.postIdx,n=t.userIdx;return x.get("/post/category?postIdx=".concat(e,"&userIdx=").concat(n))},apiDeleteTemporaryPost:function(t){var e=t.postIdx;return x.delete("/post/temporary?postIdx=".concat(e))}},d={apiCreateComment:function(t){return x.post("/comment",t)},apiDeleteComment:function(t){var e=t.commentIdx;return x.delete("/comment?commentIdx=".concat(e))}},f={apiCreateReply:function(t){return x.post("/reply",t)},apiDeleteReply:function(t){var e=t.replyIdx;return x.delete("/reply?replyIdx=".concat(e))}},m={apiGetCategories:function(){return x.get("/category")},apiCreateCategory:function(t){return x.post("/category",t)}},h={apiGetUser:function(t){var e=t.name;return x.get(encodeURI("/user?name=".concat(e)))},apiUpdateUser:function(t){return x.patch("/user",t)},apiDeleteUser:function(){return x.delete("/user")}},x=o().create({baseURL:"https://jslog.co.kr/api",withCredentials:!0,timeout:1e4}),g={photoService:u,authService:l,postService:p,commentService:d,replyService:f,categoryService:m,userService:h}},897:function(t,e,n){"use strict";var r=n(5893),o=n(9008),a=n(1163),c=n(8915);e.Z=function(t){var e=t.title,n=t.description,i=t.photo,s=(0,a.useRouter)().asPath,u=i?(0,c.eV)(i):"https://".concat("https://jslog.co.kr","/logo.jpg");return(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:e}),(0,r.jsx)("meta",{name:"description",content:n}),(0,r.jsx)("meta",{property:"og:url",content:"https://".concat("https://jslog.co.kr").concat(s)}),(0,r.jsx)("meta",{property:"og:title",content:"".concat(e)}),(0,r.jsx)("meta",{property:"og:description",content:n}),(0,r.jsx)("meta",{property:"og:image",content:u}),(0,r.jsx)("meta",{name:"twitter:card",content:"".concat(e,"\n").concat(n)}),(0,r.jsx)("meta",{name:"twitter:title",content:"".concat(e)}),(0,r.jsx)("meta",{name:"twitter:description",content:n}),(0,r.jsx)("meta",{name:"twitter:image",content:u})]})}},9243:function(t,e,n){"use strict";var r=n(5893),o=n(7294);e.Z=function(t){var e=t.kinds,n=(0,o.useCallback)((function(t){switch(t){case"button":return(0,r.jsx)("div",{className:"w-6 h-6 mx-auto text-xs border-[5px] border-solid border-white/40 border-t-white rounded-full bg-transparent animate-spin"});case"page":return(0,r.jsx)("aside",{className:"fixed bg-black/60 top-0 left-0 w-full h-full z-20 flex justify-center items-center animate-fade-in",children:(0,r.jsx)("svg",{version:"1.1",id:"layer",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 40 40",xmlSpace:"preserve",fill:"#8A39E1",width:"200px",height:"200px",className:"animate-spin-y mx-auto",children:(0,r.jsxs)("g",{children:[(0,r.jsx)("path",{d:"M14.8,5.1L8.8,33C5.8,29.9,4,25.5,4,21C4,13.6,8.5,7.3,14.8,5.1 M20,0C9,0,0,9.4,0,21c0,8.4,4.7,15.5,11.4,19L20,0L20,0z"}),(0,r.jsx)("path",{d:"M25.2,5.1C31.5,7.3,36,13.6,36,21c0,4.5-1.8,8.9-4.8,12L25.2,5.1 M20,0l8.6,40C35.3,36.5,40,29.4,40,21C40,9.4,31,0,20,0L20,0z"})]})})});default:return(0,r.jsx)("div",{className:"w-6 h-6 mx-auto text-xs border-[5px] border-solid border-white/40 border-t-white rounded-full animate-spin bg-transparent"})}}),[]);return(0,r.jsx)(r.Fragment,{children:n(e)})}},6055:function(t,e,n){"use strict";n.d(e,{vc:function(){return r},i$:function(){return o},ie:function(){return a}});var r=function(t,e,n){var r=new Date(t),o=[],a="",c=e.match(/[^YMDhms]/g),f=0;return o.push(i(r,e)),o.push(s(r,e)),o.push(u(r,e)),o.push(l(r,e)),o.push(p(r,e)),o.push(d(r,e)),o.forEach((function(t){if(t){if(n)return a+="".concat(t).concat(n);var e="";c?e=c[f]||"":n="",f++,a+="".concat(t).concat(e)}})),a},o=function(t){var e=new Date(t),n=(new Date).getTime()-e.getTime();return n/1e3<60?"".concat(Math.floor(n/1e3),"\ucd08\uc804"):n/1e3/60<60?"".concat(Math.floor(n/1e3/60),"\ubd84\uc804"):n/1e3/60/60<24?"".concat(Math.floor(n/1e3/60/60),"\uc2dc\uac04\uc804"):n/1e3/60/60/24<30?"".concat(Math.floor(n/1e3/60/60/24),"\uc77c\uc804"):n/1e3/60/60/24/30<12?"".concat(Math.floor(n/1e3/60/60/24/30),"\uac1c\uc6d4\uc804"):"".concat(Math.floor(n/1e3/60/60/24/30/12),"\ub144\uc804")},a=function(t,e){return Date.now()-new Date(t).getTime()>6048e5?r(t,e):o(t)},c=function(t){switch(t){case"year":return/Y{2}/g;case"month":return/M/g;case"day":return/D/g;case"hour":return/h/g;case"minute":return/m/g;case"second":return/s/g}},i=function(t,e){var n=e.match(c("year"));if(null!==n)return 1===n.length?+String(t.getFullYear()).slice(2):2===n.length?t.getFullYear():void 0},s=function(t,e){var n=null,r=e.match(c("month"));if(null!==r)return n=t.getMonth()+1,2===r.length&&n<10&&(n="0".concat(n)),n},u=function(t,e){var n=null,r=e.match(c("day"));if(null!==r)return n=t.getDate(),2===r.length&&n<10&&(n="0".concat(n)),n},l=function(t,e){var n=null,r=e.match(c("hour"));if(null!==r)return n=t.getHours(),2===r.length&&n<10&&(n="0".concat(n)),n},p=function(t,e){var n=null,r=e.match(c("minute"));if(null!==r)return n=t.getMinutes(),2===(null===r||void 0===r?void 0:r.length)&&n<10&&(n="0".concat(n)),n},d=function(t,e){var n=null,r=e.match(c("second"));if(null!==r)return n=t.getSeconds(),2===(null===r||void 0===r?void 0:r.length)&&n<10&&(n="0".concat(n)),n}},5476:function(t,e,n){"use strict";n.r(e);var r=n(4051),o=n.n(r),a=n(5893),c=n(7294),i=n(1664),s=n(8100),u=n(782),l=n(9634),p=n(6055),d=n(6481),f=n(897),m=n(2555),h=n(9243),x=n(9669);function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function v(t,e,n,r,o,a,c){try{var i=t[a](c),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,o)}function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){y(t,e,n[e])}))}return t}function w(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(a.push(r.value),!e||a.length!==e);c=!0);}catch(s){i=!0,o=s}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return g(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.default=function(){var t,e,n=w((0,d.Z)(),3),r=n[0],g=n[1],y=n[2],j=(0,c.useState)(-1),S=j[0],C=j[1],I=(0,c.useState)(!1),k=I[0],N=I[1],P=(0,s.ZP)("/api/posts/temporary"),U=P.data,L=P.mutate,R=(0,c.useCallback)((e=o().mark((function t(){var e,n,r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return N(!0),t.prev=1,t.next=4,l.Z.postService.apiDeleteTemporaryPost({postIdx:S});case 4:e=t.sent,n=e.data.message,L((function(t){return t&&b({},t,{posts:t.posts.filter((function(t){return t.idx!==S}))})}),!1),u.Am.success(n),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(1),console.error(t.t0),o=t.t0,(null!=(a=x.AxiosError)&&"undefined"!==typeof Symbol&&a[Symbol.hasInstance]?a[Symbol.hasInstance](o):o instanceof a)?u.Am.error(null===(r=t.t0.response)||void 0===r?void 0:r.data.message):u.Am.error("\uc11c\ubc84 \ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \n\uc7a0\uc2dc\ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694");case 14:N(!1);case 15:case"end":return t.stop()}var o,a}),t,null,[[1,10]])})),function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function c(t){v(a,r,o,c,i,"next",t)}function i(t){v(a,r,o,c,i,"throw",t)}c(void 0)}))}),[L,S,N]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(f.Z,{title:"JSlog | \uc784\uc2dc \uc800\uc7a5 \uac8c\uc2dc\uae00",description:"Jslog\uc758 \uc784\uc2dc \uc800\uc7a5 \uac8c\uc2dc\uae00 \ubaa9\ub85d \ud398\uc774\uc9c0\uc785\ub2c8\ub2e4."}),(0,a.jsx)("h1",{className:"text-center font-bold text-4xl mb-16",children:"\uc784\uc2dc \uae00 \ubaa9\ub85d"}),(0,a.jsx)("ul",{className:"md:mx-auto md:w-3/5 space-y-4 divide-y",children:null===U||void 0===U||null===(t=U.posts)||void 0===t?void 0:t.map((function(t){return(0,a.jsxs)("li",{className:"pt-4",children:[(0,a.jsx)(i.default,{href:"/write?title=".concat(t.title),children:(0,a.jsxs)("a",{className:"space-y-4",children:[(0,a.jsx)("h3",{className:"text-2xl font-bold",children:t.title}),(0,a.jsx)("p",{className:"text-gray-300 paragraph",children:t.contents})]})}),(0,a.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,a.jsx)("time",{className:"block text-sm text-gray-400",children:(0,p.i$)(t.updatedAt)}),(0,a.jsx)("button",{type:"button",className:"text-sm hover:underline",onClick:function(){y(!0),C(t.idx)},children:"\uc0ad\uc81c"})]})]},t.idx)}))}),g&&(0,a.jsx)(m.Z,{ref:r,primary:!0,noScroll:!0,children:(0,a.jsxs)("div",{className:"w-[400px] p-6 rounded-sm space-y-4 bg-zinc-200 dark:bg-zinc-800",children:[(0,a.jsx)("h4",{className:"text-xl font-bold",children:"\uc784\uc2dc \uac8c\uc2dc\uae00 \uc0ad\uc81c"}),(0,a.jsx)("p",{className:"whitespace-pre text-sm text-gray-600 dark:text-gray-300",children:"\uc784\uc2dc \uc800\uc7a5\ud55c \uac8c\uc2dc\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\n\uc0ad\uc81c\ud55c \uac8c\uc2dc\uae00\uc740 \ubcf5\uad6c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,a.jsxs)("div",{className:"text-right space-x-4 pt-4",children:[(0,a.jsx)("button",{type:"button",className:"py-2 px-4 text-white bg-indigo-400 hover:bg-indigo-500 rounded-lg",children:"\ucde8\uc18c"}),(0,a.jsx)("button",{type:"button",className:"py-2 px-4 text-white bg-indigo-400 hover:bg-indigo-500 rounded-lg",onClick:R,children:"\ud655\uc778"})]})]})}),k&&(0,a.jsx)(h.Z,{kinds:"page"})]})}},9008:function(t,e,n){t.exports=n(3121)}},function(t){t.O(0,[669,774,888,179],(function(){return e=3104,t(t.s=e);var e}));var e=t.O();_N_E=e}]);