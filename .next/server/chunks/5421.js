"use strict";
exports.id = 5421;
exports.ids = [5421];
exports.modules = {

/***/ 5421:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8915);


// util

const Avatar = ({ photo , className , alt ="\uD504\uB85C\uD544 \uC774\uBBF8\uC9C0" , priority  })=>{
    const src = photo ? photo.includes("http") ? photo : (0,_src_libs__WEBPACK_IMPORTED_MODULE_2__/* .combinePhotoUrl */ .eV)(photo) : "/avatar.png";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("figure", {
        className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_2__/* .combineClassNames */ .Nn)("relative", className),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
            src: src,
            layout: "fill",
            alt: alt,
            className: "object-cover rounded-full",
            priority: priority
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Avatar);


/***/ })

};
;