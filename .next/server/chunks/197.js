"use strict";
exports.id = 197;
exports.ids = [197];
exports.modules = {

/***/ 197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_libs_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8915);

// util

// 2022/05/06 - useSWRInfinite() + 무한 스크롤링을 적용하는 훅 - by 1-blue
const useInfiniteScroll = ({ condition , setSize  })=>{
    // 2022/05/06 - 인피니티 스크롤링 함수 - by 1-blue
    const infiniteScrollEvent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        if (!condition) return;
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400) {
            setSize((prev)=>prev + 1
            );
        }
    }, [
        condition,
        setSize
    ]);
    // 2022/05/11 - 인피니티 스크롤링에 스토틀링 적용 - by 1-blue
    const throttleInfiniteScrollEvent = (0,_src_libs_util__WEBPACK_IMPORTED_MODULE_1__/* .throttleHelper */ .NC)(infiniteScrollEvent, 50);
    // 2022/05/06 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        window.addEventListener("scroll", throttleInfiniteScrollEvent);
        return ()=>window.removeEventListener("scroll", throttleInfiniteScrollEvent)
        ;
    }, [
        throttleInfiniteScrollEvent
    ]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useInfiniteScroll);


/***/ })

};
;