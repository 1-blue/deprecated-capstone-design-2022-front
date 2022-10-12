"use strict";
exports.id = 8169;
exports.ids = [8169];
exports.modules = {

/***/ 8169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2460);
/* harmony import */ var _src_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9033);



// component

// type

const MainNav = ()=>{
    const { asPath  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
        className: "flex space-x-4",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: asPath === "/" ? "border-b-2 border-black dark:border-white pb-1" : "",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    href: "/",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                icon: _src_types__WEBPACK_IMPORTED_MODULE_4__/* .ICON.TRENDING_UP */ .W.TRENDING_UP,
                                className: "w-6 h-6"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "\uD2B8\uB80C\uB529"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: asPath === "/recent" ? "border-b-2 border-black dark:border-white pb-1" : "",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    href: "/recent",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                icon: _src_types__WEBPACK_IMPORTED_MODULE_4__/* .ICON.CLOCK */ .W.CLOCK,
                                className: "w-6 h-6"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "\uCD5C\uC2E0"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "flex-1 text-right"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    type: "button",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        icon: _src_types__WEBPACK_IMPORTED_MODULE_4__/* .ICON.DOT_VERTICAL */ .W.DOT_VERTICAL
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainNav);


/***/ })

};
;