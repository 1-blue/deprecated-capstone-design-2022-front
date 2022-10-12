"use strict";
(() => {
var exports = {};
exports.id = 2854;
exports.ids = [2854,2197];
exports.modules = {

/***/ 3442:
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
/* harmony import */ var swr_infinite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1448);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4448);
/* harmony import */ var _src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(897);
/* harmony import */ var _src_components_common_Support_Info__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2032);
/* harmony import */ var _src_components_Post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8326);
/* harmony import */ var _src_components_MainNav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8169);
/* harmony import */ var _src_hooks_useInfiniteScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr_infinite__WEBPACK_IMPORTED_MODULE_2__]);
swr_infinite__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



// api

// component




// hook

const limit = 10;
const Recent = (initialPosts)=>{
    // 2022/05/06 - 게시글 추가 패치 가능 여부 - by 1-blue
    const { 0: hasMorePost , 1: setHasMorePost  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // 2022/09/23 - 게시글 패치 관련 데이터 - by 1-blue
    const { data: arrayOfPosts , setSize , isValidating: isFetchPosts ,  } = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_2__["default"])((pageIndex, prevData)=>{
        var ref;
        // 모든 게시글을 불러온 경우 ( 총 요청 개수 !== 응답 개수 || 응답 개수 === 0 )
        if (prevData && prevData.posts.length !== limit) {
            setHasMorePost(false);
            return null;
        }
        if (prevData && prevData.posts.length === 0) {
            setHasMorePost(false);
            return null;
        }
        const lastIdx = (prevData === null || prevData === void 0 ? void 0 : (ref = prevData.posts) === null || ref === void 0 ? void 0 : ref[prevData.posts.length - 1].idx) || -1;
        return `/api/posts?lastIdx=${lastIdx}&limit=${limit}&kinds=recent`;
    }, null, {
        fallbackData: [
            initialPosts
        ]
    });
    // 2022/05/06 - 게시글 스크롤링 시 패치하는 이벤트 등록 - by 1-blue
    (0,_src_hooks_useInfiniteScroll__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)({
        condition: hasMorePost && !isFetchPosts,
        setSize
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                title: "Jslog | \uCD5C\uC2E0 \uAC8C\uC2DC\uAE00",
                description: "Jslog\uC758 \uAC8C\uC2DC\uAE00\uB4E4 ( \uCD5C\uC2E0\uC21C )",
                photo: arrayOfPosts === null || arrayOfPosts === void 0 ? void 0 : arrayOfPosts[0].posts[0].photo
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                className: "mb-4",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_MainNav__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {})
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                children: arrayOfPosts ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                    className: "grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
                    children: arrayOfPosts.map(({ posts  })=>posts.map((post)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Post__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                post: post
                            }, post.idx)
                        )
                    )
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Support_Info__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    text: "\uAC8C\uC2DC\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                })
            })
        ]
    });
};
const getServerSideProps = async ()=>{
    try {
        const { data  } = await _src_api__WEBPACK_IMPORTED_MODULE_8__/* ["default"].postService.apiGetPosts */ .Z.postService.apiGetPosts({
            lastIdx: -1,
            limit: 10,
            kinds: "recent"
        });
        return {
            props: {
                ...JSON.parse(JSON.stringify(data))
            }
        };
    } catch (error) {
        console.error("recent.tsx getServerSideProps >> ", error);
    }
    return {
        props: {
            posts: [],
            message: ""
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recent);

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
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,897,2460,4448,5421,6055,8620,8326,197,8169], () => (__webpack_exec__(3442)));
module.exports = __webpack_exports__;

})();