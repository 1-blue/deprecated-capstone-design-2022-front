"use strict";
exports.id = 6776;
exports.ids = [6776];
exports.modules = {

/***/ 2555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8915);


// util

// eslint-disable-next-line react/display-name
const Modal = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({ children , className , noScroll , primary  }, ref)=>{
    // 2022/05/01 - 모달창 open 시 스크롤 금지 - by 1-blue
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!noScroll) return;
        document.body.style.overflow = "hidden";
        return ()=>{
            document.body.style.overflow = "auto";
        };
    }, [
        noScroll
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("aside", {
        className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_2__/* .combineClassNames */ .Nn)("z-10", primary ? "fixed -top-4 left-0 bottom-0 right-0 z-10 bg-black/80 flex justify-center items-center" : "", className ? className : ""),
        ref: ref,
        children: children
    });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);


/***/ }),

/***/ 6481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useModal = ()=>{
    const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const { 0: isOpen , 1: setIsOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    // 2022/05/01 - 영역외 클릭 시 모달 닫기 이벤트 - by 1-blue
    const handleCloseModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (isOpen) setIsOpen(false);
    }, [
        isOpen
    ]);
    // 2022/05/01 - 모달 닫기 이벤트 등록 - by 1-blue
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setTimeout(()=>window.addEventListener("click", handleCloseModal)
        , 0);
        return ()=>window.removeEventListener("click", handleCloseModal)
        ;
    }, [
        handleCloseModal
    ]);
    return [
        modalRef,
        isOpen,
        setIsOpen
    ];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useModal);


/***/ })

};
;