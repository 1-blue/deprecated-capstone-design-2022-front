(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 7416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/libs/util.ts
var util = __webpack_require__(8915);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next-themes"
var external_next_themes_ = __webpack_require__(1162);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./src/hooks/useModal.tsx
var useModal = __webpack_require__(6481);
// EXTERNAL MODULE: ./src/components/common/Icon.tsx
var Icon = __webpack_require__(2460);
// EXTERNAL MODULE: ./src/components/common/Modal.tsx
var Modal = __webpack_require__(2555);
// EXTERNAL MODULE: ./src/components/common/Avatar.tsx
var Avatar = __webpack_require__(5421);
// EXTERNAL MODULE: ./src/types/index.ts
var types = __webpack_require__(9033);
;// CONCATENATED MODULE: ./src/components/Header.tsx





// util

// hook

// component



// type

const Header = ()=>{
    const { data , status  } = (0,react_.useSession)();
    const { theme , setTheme  } = (0,external_next_themes_.useTheme)();
    const [modalRef, isOpen, setIsOpen] = (0,useModal/* default */.Z)();
    // 2022/05/11 - 헤더 숨김 여부 변수 - by 1-blue
    const { 0: hide1 , 1: setHide  } = (0,external_react_.useState)(false);
    // 2022/05/11 - 현재 스크롤 위치값 저장할 변수 - by 1-blue
    const { 0: pageY , 1: setPageY  } = (0,external_react_.useState)(0);
    // 2022/05/11 - 현재 스크롤을 내렸는지 올렸는지 확인할 스크롤 이벤트 함수 - by 1-blue
    const handleScroll = (0,external_react_.useCallback)(()=>{
        const { pageYOffset  } = window;
        const deltaY = pageYOffset - pageY;
        const hide = pageYOffset !== 0 && deltaY >= 0;
        setHide(hide);
        setPageY(pageYOffset);
    }, [
        pageY
    ]);
    // 2022/05/11 - 스크롤 이벤트에 스로틀링 적용 - by 1-blue
    const throttleScroll = (0,util/* throttleHelper */.NC)(handleScroll, 50);
    // 2022/05/11 - 스크롤 이벤트 등록 - by 1-blue
    (0,external_react_.useEffect)(()=>{
        document.addEventListener("scroll", throttleScroll);
        return ()=>document.removeEventListener("scroll", throttleScroll)
        ;
    }, [
        throttleScroll
    ]);
    // 2022/05/11 - SSR + localstorage 경고 해결하기 위한 변수 - by 1-blue
    const { 0: loaded , 1: setLoaded  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>window.addEventListener("load", ()=>setLoaded(true)
        )
    , [
        setLoaded
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("header", {
        className: (0,util/* combineClassNames */.Nn)("sticky top-0 w-full bg-zinc-200 dark:bg-zinc-900 z-10 transition-transform duration-300", hide1 ? "-translate-y-20" : "translate-y-0"),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
            className: "w-full mx-auto flex justify-between items-center dark:text-white py-2 mb-12 px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: "py-4 font-bold",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Blelog"
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                    className: "space-x-4 flex",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            type: "button",
                            onClick: ()=>setTheme(theme === "dark" ? "light" : "dark")
                            ,
                            className: "w-10 h-10 rounded-full hover:bg-zinc-400 dark:hover:bg-slate-200 inline-flex justify-center items-center dark:hover:text-black",
                            children: loaded ? /*#__PURE__*/ jsx_runtime_.jsx(Icon/* default */.Z, {
                                icon: theme === "dark" ? types/* ICON.SUN */.W.SUN : types/* ICON.MOON */.W.MOON,
                                $fill: true,
                                className: "w-6 h-6 sm:w-7 sm:h-7"
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(Icon/* default */.Z, {
                                icon: types/* ICON.MOON */.W.MOON,
                                $fill: true,
                                className: "w-6 h-6 sm:w-7 sm:h-"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: "/search",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: "w-10 h-10 rounded-full hover:bg-zinc-400 dark:hover:bg-slate-200 inline-flex justify-center items-center dark:hover:text-black",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(Icon/* default */.Z, {
                                    icon: types/* ICON.SEARCH */.W.SEARCH,
                                    className: "w-6 h-6 sm:w-7 sm:h-"
                                })
                            })
                        }),
                        status === "authenticated" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/write",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        className: "flex justify-center items-center h-10 rounded-r-full rounded-l-full px-3 sm:px-4 border-2 border-black dark:border-white hover:bg-black dark:hover:bg-slate-200 hover:text-white dark:hover:text-black leading-10",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "text-sm sm:text-base",
                                            children: "\uC0C8 \uAE00 \uC791\uC131"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                    type: "button",
                                    className: "flex items-center space-x-1 relative",
                                    onClick: ()=>setIsOpen((prev)=>!prev
                                        )
                                    ,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(Avatar/* default */.Z, {
                                            photo: data.user.photo,
                                            className: "w-10 h-10",
                                            alt: "\uC720\uC800 \uD504\uB85C\uD544 \uC774\uBBF8\uC9C0",
                                            priority: true
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(Icon/* default */.Z, {
                                            icon: types/* ICON.CHEVRON_DOWN */.W.CHEVRON_DOWN,
                                            className: "w-4 h-4 text-gray-400"
                                        }),
                                        isOpen && /*#__PURE__*/ jsx_runtime_.jsx(Modal/* default */.Z, {
                                            className: "absolute top-14 right-2 flex flex-col w-52 rounded-md list-none bg-zinc-200 dark:bg-zinc-700 overflow-hidden",
                                            ref: modalRef,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: `/${data.user.name}`,
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            className: "px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors",
                                                            children: "\uB0B4 \uC815\uBCF4"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/saves",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            className: "px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors",
                                                            children: "\uC784\uC2DC \uAE00"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/list/liked",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            className: "px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors",
                                                            children: "\uC77D\uAE30 \uBAA9\uB85D"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                        href: "/setting",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            className: "px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors",
                                                            children: "\uC124\uC815"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "px-4 py-3 w-full text-left hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors cursor-pointer",
                                                        onClick: ()=>(0,react_.signOut)({
                                                                callbackUrl: "https://jslog.co.kr"
                                                            })
                                                        ,
                                                        children: "\uB85C\uADF8\uC544\uC6C3"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/login",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        className: "h-10 rounded-r-full rounded-l-full px-4 hover:bg-zinc-400 dark:hover:bg-slate-200 dark:hover:text-black flex justify-center items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                            children: "\uB85C\uADF8\uC778"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                    href: "/register",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                        className: "h-10 rounded-r-full rounded-l-full px-4 hover:bg-zinc-400 dark:hover:bg-slate-200 dark:hover:text-black flex justify-center items-center",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                            children: "\uD68C\uC6D0\uAC00\uC785"
                                        })
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const components_Header = (Header);

;// CONCATENATED MODULE: ./src/components/Layout.tsx


// util

// component

const Layout = ({ children  })=>{
    const { asPath  } = (0,router_.useRouter)();
    const hasHeader = asPath.includes("/write");
    const isResposive = asPath.includes("/write");
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            hasHeader || /*#__PURE__*/ jsx_runtime_.jsx(components_Header, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: (0,util/* combineClassNames */.Nn)("w-full mx-auto dark:text-white", isResposive ? "" : "px-4 sm:max-w-[540px] md:max-w-[868px] lg:max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px]"),
                children: children
            }),
            hasHeader || /*#__PURE__*/ jsx_runtime_.jsx("footer", {
                className: "mb-[10vh]"
            })
        ]
    });
};
/* harmony default export */ const components_Layout = (Layout);


/***/ }),

/***/ 6505:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1162);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_themes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _src_components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7416);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);
swr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





// css



// component

const fetcher = (url)=>fetch(url).then((res)=>res.json()
    )
;
function MyApp({ Component , pageProps  }) {
    return(//@ts-ignore
    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swr__WEBPACK_IMPORTED_MODULE_1__.SWRConfig, {
        value: {
            fetcher
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_auth_react__WEBPACK_IMPORTED_MODULE_2__.SessionProvider, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_themes__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {
                attribute: "class",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Layout__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_4__.ToastContainer, {
                        position: "top-center",
                        autoClose: 1500,
                        theme: "dark",
                        closeOnClick: true,
                        limit: 3
                    })
                ]
            })
        })
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8819:
/***/ (() => {



/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 1162:
/***/ ((module) => {

"use strict";
module.exports = require("next-themes");

/***/ }),

/***/ 562:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 4241:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/routing-items.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 1187:
/***/ ((module) => {

"use strict";
module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5941:
/***/ ((module) => {

"use strict";
module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,2460,5421,6776], () => (__webpack_exec__(6505)));
module.exports = __webpack_exports__;

})();