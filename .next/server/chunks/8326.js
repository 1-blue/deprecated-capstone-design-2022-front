"use strict";
exports.id = 8326;
exports.ids = [8326];
exports.modules = {

/***/ 8326:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6055);
/* harmony import */ var _src_components_common_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2460);
/* harmony import */ var _src_components_common_Photo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(576);
/* harmony import */ var _src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5421);
/* harmony import */ var _src_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9033);


// util

// component




const Post = ({ post , priority  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
        className: "flex flex-col group bg-zinc-300 dark:bg-zinc-700 rounded-md overflow-hidden hover:-translate-y-2 duration-500 min-w-[300px] mb-8",
        children: [
            post.photo && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                href: `/${post.User.name}/${post.title}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: "inline-block w-full h-[300px]",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Photo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        photo: post.photo,
                        className: "w-full h-full",
                        alt: "\uC784\uC2DC \uAC8C\uC2DC\uAE00 \uC774\uBBF8\uC9C0",
                        $scale: true,
                        $cover: true,
                        priority: priority
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "flex-1 flex flex-col py-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                        href: `/${post.User.name}/${post.title}`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            className: "flex-1 flex flex-col",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    className: "text-lg font-bold px-4 mb-1",
                                    children: post.title
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "flex-1 whitespace-pre text-sm px-4 mb-4",
                                    children: post.summary
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                        className: "text-xs text-gray-400 px-4 mb-2",
                        children: (0,_src_libs__WEBPACK_IMPORTED_MODULE_3__/* .dateOrTimeFormat */ .ie)(post.updatedAt, "YYYY/MM/DD-hh:mm:ss")
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "border border-gray-200 dark:border-gray-600 mb-4"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center px-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                href: `/${post.User.name}`,
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                    className: "flex space-x-2 items-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                            photo: post.User.photo,
                                            className: "w-6 h-6",
                                            alt: "\uC720\uC800 \uC774\uBBF8\uC9C0"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "hover:underline underline-offset-4 text-sm",
                                            children: post.User.name
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex-1"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex space-x-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center space-x-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                icon: _src_types__WEBPACK_IMPORTED_MODULE_6__/* .ICON.COMMENTS */ .W.COMMENTS,
                                                className: "w-5 h-5"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: post._count.comments
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center space-x-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                icon: _src_types__WEBPACK_IMPORTED_MODULE_6__/* .ICON.HEART */ .W.HEART,
                                                className: "w-5 h-5"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: post._count.favorites
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Post);


/***/ })

};
;