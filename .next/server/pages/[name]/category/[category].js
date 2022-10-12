"use strict";
(() => {
var exports = {};
exports.id = 5059;
exports.ids = [5059,2197];
exports.modules = {

/***/ 576:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8915);


// util

const Photo = ({ photo , className , alt ="\uC774\uBBF8\uC9C0" , $scale , $cover , $rouneded , priority  })=>{
    const src = photo ? photo.includes("http") ? photo : (0,_src_libs__WEBPACK_IMPORTED_MODULE_2__/* .combinePhotoUrl */ .eV)(photo) : "/temporary.jpg";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("figure", {
            className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_2__/* .combineClassNames */ .Nn)("relative", className),
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                src: src,
                layout: "fill",
                alt: alt,
                className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_2__/* .combineClassNames */ .Nn)($scale ? "group-hover:scale-110 duration-500" : "", $cover ? "object-cover" : "object-contain", $rouneded ? "rounded-full" : "", photo ? "" : "blur"),
                priority: priority
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Photo);


/***/ }),

/***/ 8692:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);
swr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// 2022/04/08 - 로그인한 유저 정보 - by 1-blue
const useMe = ()=>{
    var ref1;
    const { data , error , mutate  } = (0,swr__WEBPACK_IMPORTED_MODULE_1__["default"])("/api/user/me");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        var ref;
        if (!(data === null || data === void 0 ? void 0 : (ref = data.status) === null || ref === void 0 ? void 0 : ref.ok)) return;
        console.log("\uBE44\uB85C\uADF8\uC778 \uC0C1\uD0DC by useMe");
    }, [
        data
    ]);
    return {
        me: data === null || data === void 0 ? void 0 : (ref1 = data.data) === null || ref1 === void 0 ? void 0 : ref1.user,
        isLoading: !data && !error,
        meMutate: mutate
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useMe);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5967:
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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5941);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4448);
/* harmony import */ var _src_libs_dateFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6055);
/* harmony import */ var _src_hooks_useMe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8692);
/* harmony import */ var _src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7603);
/* harmony import */ var _src_components_common_Photo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(576);
/* harmony import */ var _src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(897);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_4__, _src_hooks_useMe__WEBPACK_IMPORTED_MODULE_7__]);
([swr__WEBPACK_IMPORTED_MODULE_4__, _src_hooks_useMe__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





// api

// util

// hook

// component



const Post = ({ post , user , i  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                className: "font-semibold text-xl",
                children: [
                    i + 1,
                    ". ",
                    post.title
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_3__["default"], {
                href: `/${user.name}/${post.title}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    className: "flex space-x-4",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "max-w-[240px] min-w-[200px] w-full h-[140px]",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Photo__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                photo: post.photo,
                                className: "w-full h-full",
                                $cover: true
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col justify-between",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "whitespace-pre-line text-sm",
                                    children: post.summary
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                                    className: "text-xs",
                                    children: (0,_src_libs_dateFormat__WEBPACK_IMPORTED_MODULE_6__/* .dateOrTimeFormat */ .ie)(post.updatedAt, "YYYY\uB144MM\uC6D4DD\uC77C")
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
const CategoryPost = ({ user  })=>{
    var ref, ref1, ref2;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { me  } = (0,_src_hooks_useMe__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)();
    // 2022/05/16 - 특정 유저의 해당 카테고리를 가진 게시글들 요청 - by 1-blue
    const { data: responseOfPosts  } = (0,swr__WEBPACK_IMPORTED_MODULE_4__["default"])(((ref = router.query) === null || ref === void 0 ? void 0 : ref.category) ? `/api/user/category?userIdx=${user.idx}&category=${router.query.category}` : null);
    // 2022/05/16 - 게시글 정렬 기준 - by 1-blue
    const { 0: isLatest , 1: setIsLatest  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    if (!responseOfPosts) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    if (responseOfPosts.posts.length === 0) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                title: "Jslog | " + ((ref1 = router.query) === null || ref1 === void 0 ? void 0 : ref1.category),
                description: "Jslog\uC758 \uCE74\uD14C\uACE0\uB9AC \uD398\uC774\uC9C0"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                avatar: user.photo,
                name: user.name,
                introduction: user.introduction
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("article", {
                className: "md:mx-auto md:w-3/5 my-8 space-y-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: "text-center font-bold text-3xl border-b pb-4",
                        children: (ref2 = router.query) === null || ref2 === void 0 ? void 0 : ref2.category
                    }),
                    (me === null || me === void 0 ? void 0 : me.idx) === user.idx && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "button",
                        className: "block ml-auto text-gray-300 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline underline-offset-2",
                        children: "\uC0AD\uC81C"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "button",
                        className: "block ml-auto",
                        onClick: ()=>setIsLatest((prev)=>!prev
                            )
                        ,
                        children: isLatest ? "\u25BC \uB0B4\uB9BC\uCC28\uC21C" : "\u25B2 \uC624\uB984\uCC28\uC21C"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                        className: "space-y-12",
                        children: responseOfPosts.posts && isLatest ? [
                            ...responseOfPosts.posts
                        ].reverse().map((post, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Post, {
                                post: post,
                                user: user,
                                i: i
                            }, post.idx)
                        ) : responseOfPosts.posts.map((post, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Post, {
                                post: post,
                                user: user,
                                i: i
                            }, post.idx)
                        )
                    })
                ]
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
        const { data: { user  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_10__/* ["default"].userService.apiGetUser */ .Z.userService.apiGetUser({
            name: context.params.name
        });
        return {
            props: {
                user: JSON.parse(JSON.stringify(user))
            }
        };
    } catch (error) {
        console.error("/category/[category].tsx getServerSideProps >> ", error);
    }
    return {
        props: {
            user: null
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryPost);

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,897,4448,5421,6055,7603], () => (__webpack_exec__(5967)));
module.exports = __webpack_exports__;

})();