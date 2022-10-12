"use strict";
exports.id = 9243;
exports.ids = [9243];
exports.modules = {

/***/ 9243:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Spinner = ({ kinds: kinds1  })=>{
    const getSpinner = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((kinds)=>{
        switch(kinds){
            case "button":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "w-6 h-6 mx-auto text-xs border-[5px] border-solid border-white/40 border-t-white rounded-full bg-transparent animate-spin"
                });
            case "page":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("aside", {
                    className: "fixed bg-black/60 top-0 left-0 w-full h-full z-20 flex justify-center items-center animate-fade-in",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                        version: "1.1",
                        id: "layer",
                        xmlns: "http://www.w3.org/2000/svg",
                        x: "0px",
                        y: "0px",
                        viewBox: "0 0 40 40",
                        xmlSpace: "preserve",
                        fill: "#8A39E1",
                        width: "200px",
                        height: "200px",
                        className: "animate-spin-y mx-auto",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                    d: "M14.8,5.1L8.8,33C5.8,29.9,4,25.5,4,21C4,13.6,8.5,7.3,14.8,5.1 M20,0C9,0,0,9.4,0,21c0,8.4,4.7,15.5,11.4,19L20,0L20,0z"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                    d: "M25.2,5.1C31.5,7.3,36,13.6,36,21c0,4.5-1.8,8.9-4.8,12L25.2,5.1 M20,0l8.6,40C35.3,36.5,40,29.4,40,21C40,9.4,31,0,20,0L20,0z"
                                })
                            ]
                        })
                    })
                });
            default:
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "w-6 h-6 mx-auto text-xs border-[5px] border-solid border-white/40 border-t-white rounded-full animate-spin bg-transparent"
                });
        }
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: getSpinner(kinds1)
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);


/***/ })

};
;