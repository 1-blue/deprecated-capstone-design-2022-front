(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[99],{780:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/list/liked",function(){return n(2020)}])},8326:function(e,t,n){"use strict";var s=n(5893),r=n(1664),c=n(6055),a=n(2460),l=n(576),o=n(5421),i=n(9033);t.Z=function(e){var t=e.post,n=e.priority;return(0,s.jsxs)("li",{className:"flex flex-col group bg-zinc-300 dark:bg-zinc-700 rounded-md overflow-hidden hover:-translate-y-2 duration-500 min-w-[300px] mb-8",children:[t.photo&&(0,s.jsx)(r.default,{href:"/".concat(t.User.name,"/").concat(t.title),children:(0,s.jsx)("a",{className:"inline-block w-full h-[300px]",children:(0,s.jsx)(l.Z,{photo:t.photo,className:"w-full h-full",alt:"\uc784\uc2dc \uac8c\uc2dc\uae00 \uc774\ubbf8\uc9c0",$scale:!0,$cover:!0,priority:n})})}),(0,s.jsxs)("section",{className:"flex-1 flex flex-col py-4",children:[(0,s.jsx)(r.default,{href:"/".concat(t.User.name,"/").concat(t.title),children:(0,s.jsxs)("a",{className:"flex-1 flex flex-col",children:[(0,s.jsx)("h3",{className:"text-lg font-bold px-4 mb-1",children:t.title}),(0,s.jsx)("p",{className:"flex-1 whitespace-pre text-sm px-4 mb-4",children:t.summary})]})}),(0,s.jsx)("time",{className:"text-xs text-gray-400 px-4 mb-2",children:(0,c.ie)(t.updatedAt,"YYYY/MM/DD-hh:mm:ss")}),(0,s.jsx)("div",{className:"border border-gray-200 dark:border-gray-600 mb-4"}),(0,s.jsxs)("div",{className:"flex items-center px-4",children:[(0,s.jsx)(r.default,{href:"/".concat(t.User.name),children:(0,s.jsxs)("a",{className:"flex space-x-2 items-center",children:[(0,s.jsx)(o.Z,{photo:t.User.photo,className:"w-6 h-6",alt:"\uc720\uc800 \uc774\ubbf8\uc9c0"}),(0,s.jsx)("span",{className:"hover:underline underline-offset-4 text-sm",children:t.User.name})]})}),(0,s.jsx)("div",{className:"flex-1"}),(0,s.jsxs)("div",{className:"flex space-x-2 text-sm",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,s.jsx)(a.Z,{icon:i.W.COMMENTS,className:"w-5 h-5"}),(0,s.jsx)("span",{children:t._count.comments})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,s.jsx)(a.Z,{icon:i.W.HEART,className:"w-5 h-5"}),(0,s.jsx)("span",{children:t._count.favorites})]})]})]})]})]})}},897:function(e,t,n){"use strict";var s=n(5893),r=n(9008),c=n(1163),a=n(8915);t.Z=function(e){var t=e.title,n=e.description,l=e.photo,o=(0,c.useRouter)().asPath,i=l?(0,a.eV)(l):"https://".concat("https://jslog.co.kr","/logo.jpg");return(0,s.jsxs)(r.default,{children:[(0,s.jsx)("title",{children:t}),(0,s.jsx)("meta",{name:"description",content:n}),(0,s.jsx)("meta",{property:"og:url",content:"https://".concat("https://jslog.co.kr").concat(o)}),(0,s.jsx)("meta",{property:"og:title",content:"".concat(t)}),(0,s.jsx)("meta",{property:"og:description",content:n}),(0,s.jsx)("meta",{property:"og:image",content:i}),(0,s.jsx)("meta",{name:"twitter:card",content:"".concat(t,"\n").concat(n)}),(0,s.jsx)("meta",{name:"twitter:title",content:"".concat(t)}),(0,s.jsx)("meta",{name:"twitter:description",content:n}),(0,s.jsx)("meta",{name:"twitter:image",content:i})]})}},576:function(e,t,n){"use strict";var s=n(5893),r=n(5675),c=n(8915);t.Z=function(e){var t=e.photo,n=e.className,a=e.alt,l=void 0===a?"\uc774\ubbf8\uc9c0":a,o=e.$scale,i=e.$cover,x=e.$rouneded,u=e.priority,h=t?t.includes("http")?t:(0,c.eV)(t):"/temporary.jpg";return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("figure",{className:(0,c.Nn)("relative",n),children:(0,s.jsx)(r.default,{src:h,layout:"fill",alt:l,className:(0,c.Nn)(o?"group-hover:scale-110 duration-500":"",i?"object-cover":"object-contain",x?"rounded-full":"",t?"":"blur"),priority:u})})})}},6055:function(e,t,n){"use strict";n.d(t,{vc:function(){return s},i$:function(){return r},ie:function(){return c}});var s=function(e,t,n){var s=new Date(e),r=[],c="",a=t.match(/[^YMDhms]/g),d=0;return r.push(l(s,t)),r.push(o(s,t)),r.push(i(s,t)),r.push(x(s,t)),r.push(u(s,t)),r.push(h(s,t)),r.forEach((function(e){if(e){if(n)return c+="".concat(e).concat(n);var t="";a?t=a[d]||"":n="",d++,c+="".concat(e).concat(t)}})),c},r=function(e){var t=new Date(e),n=(new Date).getTime()-t.getTime();return n/1e3<60?"".concat(Math.floor(n/1e3),"\ucd08\uc804"):n/1e3/60<60?"".concat(Math.floor(n/1e3/60),"\ubd84\uc804"):n/1e3/60/60<24?"".concat(Math.floor(n/1e3/60/60),"\uc2dc\uac04\uc804"):n/1e3/60/60/24<30?"".concat(Math.floor(n/1e3/60/60/24),"\uc77c\uc804"):n/1e3/60/60/24/30<12?"".concat(Math.floor(n/1e3/60/60/24/30),"\uac1c\uc6d4\uc804"):"".concat(Math.floor(n/1e3/60/60/24/30/12),"\ub144\uc804")},c=function(e,t){return Date.now()-new Date(e).getTime()>6048e5?s(e,t):r(e)},a=function(e){switch(e){case"year":return/Y{2}/g;case"month":return/M/g;case"day":return/D/g;case"hour":return/h/g;case"minute":return/m/g;case"second":return/s/g}},l=function(e,t){var n=t.match(a("year"));if(null!==n)return 1===n.length?+String(e.getFullYear()).slice(2):2===n.length?e.getFullYear():void 0},o=function(e,t){var n=null,s=t.match(a("month"));if(null!==s)return n=e.getMonth()+1,2===s.length&&n<10&&(n="0".concat(n)),n},i=function(e,t){var n=null,s=t.match(a("day"));if(null!==s)return n=e.getDate(),2===s.length&&n<10&&(n="0".concat(n)),n},x=function(e,t){var n=null,s=t.match(a("hour"));if(null!==s)return n=e.getHours(),2===s.length&&n<10&&(n="0".concat(n)),n},u=function(e,t){var n=null,s=t.match(a("minute"));if(null!==s)return n=e.getMinutes(),2===(null===s||void 0===s?void 0:s.length)&&n<10&&(n="0".concat(n)),n},h=function(e,t){var n=null,s=t.match(a("second"));if(null!==s)return n=e.getSeconds(),2===(null===s||void 0===s?void 0:s.length)&&n<10&&(n="0".concat(n)),n}},680:function(e,t,n){"use strict";n.r(t);var s=n(5893),r=n(1664),c=n(897),a=n(2460),l=n(9033);t.default=function(e){var t=e.text;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.Z,{title:"Jslog - \uc798\ubabb\ub41c \uacbd\ub85c",description:"\uc874\uc7ac\ud558\uc9c0 \uc54a\ub294 \ud398\uc774\uc9c0\uc785\ub2c8\ub2e4."}),(0,s.jsxs)("article",{children:[(0,s.jsxs)("section",{className:"flex justify-center items-center text-[#FF0000] text-[120px] xs:text-[140px] sm:text-[180px] space-x-2",children:[(0,s.jsx)("span",{children:"4"}),(0,s.jsx)("svg",{version:"1.1",id:"layer",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",viewBox:"0 0 40 40",xmlSpace:"preserve",fill:"#FF0000",className:"w-[90px] h-[90px] xs:w-[110px] xs:h-[110px] sm:w-[140px] sm:h-[140px]",children:(0,s.jsxs)("g",{children:[(0,s.jsx)("path",{d:"M14.8,5.1L8.8,33C5.8,29.9,4,25.5,4,21C4,13.6,8.5,7.3,14.8,5.1 M20,0C9,0,0,9.4,0,21c0,8.4,4.7,15.5,11.4,19L20,0L20,0z"}),(0,s.jsx)("path",{d:"M25.2,5.1C31.5,7.3,36,13.6,36,21c0,4.5-1.8,8.9-4.8,12L25.2,5.1 M20,0l8.6,40C35.3,36.5,40,29.4,40,21C40,9.4,31,0,20,0L20,0z"})]})}),(0,s.jsx)("span",{children:"4"})]}),(0,s.jsx)("section",{children:(0,s.jsx)("h1",{className:"whitespace-pre-line text-center text-xl xs:text-2xl font-bolder",children:t||"\ucc3e\uc744 \uc218 \uc5c6\ub294 \ud398\uc774\uc9c0 \uc785\ub2c8\ub2e4.\n\uacbd\ub85c\ub97c \ud655\uc778\ud558\uace0 \ub2e4\uc2dc \uc785\ub825\ud574\uc8fc\uc138\uc694!"})}),(0,s.jsxs)("section",{className:"flex flex-col mt-10 text-red-400",children:[(0,s.jsx)(a.Z,{icon:l.W.CHEVRON_DOWN,className:"w-10 h-10 xs:w-14 xs:h-14 animate-bounce mx-auto"}),(0,s.jsx)(r.default,{href:"/",children:(0,s.jsx)("a",{className:"mx-auto px-6 py-2 xs:px-8 xs:py-4 text-lg xs:text-xl font-bolder border-2 border-red-400 rounded-md transition-colors hover:bg-red-400 hover:text-white",children:"\ud648 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9"})})]})]})]})}},2020:function(e,t,n){"use strict";n.r(t);var s=n(5893),r=n(8100),c=n(8326),a=n(680),l=n(897);t.default=function(){var e=(0,r.ZP)("/api/posts?kinds=favorite").data;return e?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.Z,{title:"JSlog | \uc88b\uc544\uc694 \ub204\ub978 \uac8c\uc2dc\uae00",description:"Jslog\uc758 \uc88b\uc544\uc694 \ub204\ub978 \uac8c\uc2dc\uae00 \ud398\uc774\uc9c0\uc785\ub2c8\ub2e4."}),(0,s.jsx)("h1",{className:"mb-4 font-bold text-2xl",children:"\uc88b\uc544\uc694\ub97c \ub204\ub978 \uac8c\uc2dc\uae00\ub4e4"}),(0,s.jsx)("ul",{className:"grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",children:e.posts.map((function(e,t){return(0,s.jsx)(c.Z,{post:e,priority:t<4},e.idx)}))})]}):(0,s.jsx)(a.default,{text:"\ub85c\uadf8\uc778\ud6c4\uc5d0 \uc811\uadfc\ud574\uc8fc\uc138\uc694"})}},9008:function(e,t,n){e.exports=n(3121)}},function(e){e.O(0,[774,888,179],(function(){return t=780,e(e.s=t);var t}));var t=e.O();_N_E=t}]);