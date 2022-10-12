"use strict";
exports.id = 897;
exports.ids = [897];
exports.modules = {

/***/ 897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8915);



// util

const HeadInfo = ({ title , description , photo  })=>{
    const { asPath  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const path = photo ? (0,_src_libs__WEBPACK_IMPORTED_MODULE_3__/* .combinePhotoUrl */ .eV)(photo) : `https://${"https://jslog.co.kr"}/logo.jpg`;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:url",
                content: `https://${"https://jslog.co.kr"}${asPath}`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:title",
                content: `${title}`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image",
                content: path
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:card",
                content: `${title}\n${description}`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:title",
                content: `${title}`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:image",
                content: path
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadInfo);


/***/ })

};
;