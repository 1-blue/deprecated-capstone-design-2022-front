"use strict";
exports.id = 8620;
exports.ids = [8620];
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

/***/ 2032:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Info = ({ text  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: "inline-block w-full my-4 text-center sm:text-xl font-bold text-black dark:text-white",
        children: [
            "** ",
            text,
            " **"
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Info);


/***/ })

};
;