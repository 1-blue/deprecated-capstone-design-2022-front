"use strict";
exports.id = 7655;
exports.ids = [7655];
exports.modules = {

/***/ 7655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_common_Spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9243);
/* harmony import */ var _src_libs_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8915);

// common-component

// util

const Button = ({ type , contents , className , loading , loadingText ="\uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4..." , ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        type: type,
        className: (0,_src_libs_util__WEBPACK_IMPORTED_MODULE_1__/* .combineClassNames */ .Nn)(className ? className : "", loading ? "cursor-not-allowed" : ""),
        disabled: loading,
        ...props,
        children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex space-x-2 justify-center",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    children: loadingText
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Spinner__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    kinds: "button"
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: contents
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ })

};
;