"use strict";
(() => {
var exports = {};
exports.id = 3795;
exports.ids = [3795,2197];
exports.modules = {

/***/ 4946:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4448);
/* harmony import */ var _src_components_common_Photo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(576);
/* harmony import */ var _src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7603);
/* harmony import */ var _src_components_common_Support_Info__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2032);
/* harmony import */ var _src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(897);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);
swr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



// api

// component




const Category = ({ user  })=>{
    const { data: responseOfCategorys  } = (0,swr__WEBPACK_IMPORTED_MODULE_1__["default"])(`/api/user/categories?userIdx=${user.idx}`);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                title: "Jslog | \uCE74\uD14C\uACE0\uB9AC",
                description: "Jslog\uC758 \uCE74\uD14C\uACE0\uB9AC \uD398\uC774\uC9C0"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                avatar: user.photo,
                name: user.name,
                introduction: user.introduction
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                className: "md:mx-auto md:w-3/5 my-8 grid grid-cols-1 md:grid-cols-2 gap-8",
                children: responseOfCategorys && responseOfCategorys.categories.length !== 0 ? responseOfCategorys.categories.map(({ category , posts , _count  })=>{
                    var ref;
                    /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                            href: `/${user.name}/category/${category}`,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                className: "group space-y-1",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Photo__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                        photo: (ref = posts.find((post)=>post.photo
                                        )) === null || ref === void 0 ? void 0 : ref.photo,
                                        className: "w-full pt-[70%]",
                                        $cover: true,
                                        $scale: true
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "font-bold",
                                        children: category
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                        className: "text-sm",
                                        children: [
                                            _count.posts,
                                            "\uAC1C\uC758 \uD3EC\uC2A4\uD2B8"
                                        ]
                                    })
                                ]
                            })
                        })
                    }, category);
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Support_Info__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    text: "\uB0B4 \uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
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
        const { data: { user  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_7__/* ["default"].userService.apiGetUser */ .Z.userService.apiGetUser({
            name: context.params.name
        });
        return {
            props: {
                user: JSON.parse(JSON.stringify(user))
            }
        };
    } catch (error) {
        console.error("/category/index.tsx getServerSideProps >> ", error);
    }
    return {
        props: {
            user: null
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Category);

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

/***/ 5941:
/***/ ((module) => {

module.exports = import("swr");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,897,4448,5421,8620,7603], () => (__webpack_exec__(4946)));
module.exports = __webpack_exports__;

})();