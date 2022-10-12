"use strict";
exports.id = 7603;
exports.ids = [7603];
exports.modules = {

/***/ 7603:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var _src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5421);
/* harmony import */ var _src_libs_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8915);



// common-component

// util

const ProfileNav = ({ avatar , name , introduction  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "md:mx-auto md:w-3/5 flex items-center space-x-4",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        photo: avatar,
                        className: "w-20 h-20 md:w-28 md:h-28"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col space-y-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "font-bold text-xl md:text-2xl",
                                children: name
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "whitespace-pre-line text-sm md:text-base",
                                children: introduction
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                className: "md:mx-auto md:w-3/5 my-8"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                className: "md:mx-auto md:w-3/5 flex justify-between mx-auto space-x-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        href: `/${name}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: (0,_src_libs_util__WEBPACK_IMPORTED_MODULE_4__/* .combineClassNames */ .Nn)("flex-1 text-center text-lg font-semibold", router.pathname === "/[name]" ? "border-b-2 border-indigo-400 text-indigo-400" : ""),
                            children: "\uAE00"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        href: `/${name}/category`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: (0,_src_libs_util__WEBPACK_IMPORTED_MODULE_4__/* .combineClassNames */ .Nn)("flex-1 text-center text-lg font-semibold", router.pathname.includes("/category") ? "border-b-2  border-indigo-400 text-indigo-400" : ""),
                            children: "\uCE74\uD14C\uACE0\uB9AC"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        href: `/${name}/introduction`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: (0,_src_libs_util__WEBPACK_IMPORTED_MODULE_4__/* .combineClassNames */ .Nn)("flex-1 text-center text-lg font-semibold", router.pathname.includes("/introduction") ? "border-b-2  border-indigo-400 text-indigo-400" : ""),
                            children: "\uC18C\uAC1C"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileNav);


/***/ })

};
;