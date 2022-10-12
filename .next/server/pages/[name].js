"use strict";
(() => {
var exports = {};
exports.id = 9104;
exports.ids = [9104,2197];
exports.modules = {

/***/ 1088:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);


const Keyword = ({ keywords  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
        className: "flex flex-wrap space-x-2",
        children: keywords.map(({ keyword: { keyword  }  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "bg-zinc-200 text-indigo-600 hover:bg-zinc-300 hover:text-indigo-700 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:text-indigo-300 dark:hover:text-indigo-400 font-semibold py-2 px-4 mb-2 rounded-md cursor-pointer text-xs md:text-sm",
                onClick: ()=>router.push(`/search?keyword=${keyword}`)
                ,
                children: keyword
            }, keyword)
        )
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyword);


/***/ }),

/***/ 5521:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var swr_infinite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1448);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4448);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6055);
/* harmony import */ var _src_hooks_useInfiniteScroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(197);
/* harmony import */ var _src_components_common_Photo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(576);
/* harmony import */ var _src_components_common_Keyword__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1088);
/* harmony import */ var _src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(897);
/* harmony import */ var _src_pages_404__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(680);
/* harmony import */ var _src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7603);
/* harmony import */ var _src_components_common_Support_Info__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2032);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr_infinite__WEBPACK_IMPORTED_MODULE_3__]);
swr_infinite__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// api

// util

// hook

// component






const limit = 10;
const Profile = ({ user  })=>{
    // 2022/05/15 - 게시글 추가 패치 가능 여부 - by 1-blue
    const { 0: hasMorePost , 1: setHasMorePost  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // 2022/05/15 - 게시글 패치 관련 데이터 - by 1-blue
    const { data: arrayOfPosts , setSize , isValidating: isFetchPosts ,  } = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_3__["default"])((pageIndex, prevData)=>{
        var ref;
        if (prevData && prevData.posts.length !== limit) {
            setHasMorePost(false);
            return null;
        }
        if (prevData && prevData.posts.length === 0) {
            setHasMorePost(false);
            return null;
        }
        const lastIdx = (prevData === null || prevData === void 0 ? void 0 : (ref = prevData.posts) === null || ref === void 0 ? void 0 : ref[prevData.posts.length - 1].idx) || -1;
        return `/api/posts?lastIdx=${lastIdx}&limit=${limit}&username=${user.name}`;
    });
    // 2022/05/15 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
    (0,_src_hooks_useInfiniteScroll__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)({
        condition: hasMorePost && !isFetchPosts,
        setSize
    });
    if (!user) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_pages_404__WEBPACK_IMPORTED_MODULE_5__["default"], {
        text: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uC720\uC800\uC785\uB2C8\uB2E4."
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                title: user.name,
                description: `${user.name}님의 프로필 페이지\n${user.introduction}`,
                photo: user.photo
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                avatar: user.photo,
                name: user.name,
                introduction: user.introduction
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                className: "md:mx-auto md:w-3/5 mt-8",
                children: arrayOfPosts && (arrayOfPosts === null || arrayOfPosts === void 0 ? void 0 : arrayOfPosts[0].posts.length) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                    className: "space-y-4 divide-y",
                    children: arrayOfPosts === null || arrayOfPosts === void 0 ? void 0 : arrayOfPosts.map(({ posts  })=>posts.map((post)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                className: "space-y-4 pb-4 pt-8",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                                    href: `/${post.User.name}/${post.title}`,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                        className: "group space-y-4",
                                        children: [
                                            post.photo && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Photo__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                                photo: post.photo,
                                                className: "w-full pt-[50%]",
                                                $cover: true,
                                                $scale: true
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                className: "text-xl font-bold",
                                                children: post.title
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "whitespace-pre text-sm text-gray-500 dark:text-gray-400",
                                                children: post.summary
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Keyword__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                                keywords: post.keywords
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "text-xs text-gray-500 dark:text-gray-400",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                                                        children: (0,_src_libs__WEBPACK_IMPORTED_MODULE_10__/* .dateOrTimeFormat */ .ie)(post.updatedAt, "YYYY\uB144MM\uC6D4DD\uC77C")
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        children: "\u318D"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        children: [
                                                            post._count.comments,
                                                            "\uAC1C\uC758 \uB313\uAE00"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        children: "\u318D"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        children: [
                                                            post._count.favorites,
                                                            "\uAC1C\uC758 \uC88B\uC544\uC694"
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            }, post.idx)
                        )
                    )
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Support_Info__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                    text: "\uB0B4 \uAC8C\uC2DC\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                })
            })
        ]
    });
};
const getServerSideProps = async (context)=>{
    if (!context.params) return {
        props: {
            user: null
        }
    };
    if (typeof context.params.name !== "string") return {
        props: {
            user: null
        }
    };
    try {
        const { data: { user  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_12__/* ["default"].userService.apiGetUser */ .Z.userService.apiGetUser({
            name: context.params.name
        });
        return {
            props: {
                user: JSON.parse(JSON.stringify(user))
            }
        };
    } catch (error) {
        console.error("[name]/index.tsx getServerSideProps >> ", error);
    }
    return {
        props: {
            user: null
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 4241:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/routing-items.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1448:
/***/ ((module) => {

module.exports = import("swr/infinite");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,897,2460,4448,5421,6055,680,8620,7603,197], () => (__webpack_exec__(5521)));
module.exports = __webpack_exports__;

})();