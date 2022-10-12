"use strict";
exports.id = 5697;
exports.ids = [5697];
exports.modules = {

/***/ 5697:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4448);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);


// api


// 2022/09/25 - 이미지 업로드하는 함수를 반환하는 훅 - by 1-blue
const usePhoto = ({ kinds  })=>{
    // "클릭"으로 이미지 업로드
    const onUploadPhotoByClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (e)=>{
        var ref;
        e.preventDefault();
        if (!e.target.files) return false;
        if (((ref = e.target.files) === null || ref === void 0 ? void 0 : ref.length) === 0) return false;
        const file = e.target.files[0];
        try {
            const { photoURL  } = await _src_api__WEBPACK_IMPORTED_MODULE_3__/* ["default"].photoService.apiCreatePhoto */ .Z.photoService.apiCreatePhoto({
                file,
                kinds
            });
            // 알 수 없는 이유로 이미지 업로드 실패
            if (!photoURL) {
                react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.warning("\uC774\uBBF8\uC9C0\uB97C \uC5C5\uB85C\uB4DC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
                return false;
            }
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("\uC774\uBBF8\uC9C0\uB97C \uC5C5\uB85C\uB4DC\uD588\uC2B5\uB2C8\uB2E4.");
            return photoURL;
        } catch (error) {
            console.error("error >> ", error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_2__.AxiosError) {
                var ref1;
                react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((ref1 = error.response) === null || ref1 === void 0 ? void 0 : ref1.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.");
            }
            return false;
        }
    }, [
        kinds
    ]);
    // "드래그 & 드랍"으로 이미지 업로드
    const onUploadPhotoByDrop = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (e)=>{
        var ref;
        e.preventDefault();
        if (!e.dataTransfer.files) return false;
        if (((ref = e.dataTransfer.files) === null || ref === void 0 ? void 0 : ref.length) === 0) return false;
        const file = e.dataTransfer.files[0];
        try {
            const { photoURL  } = await _src_api__WEBPACK_IMPORTED_MODULE_3__/* ["default"].photoService.apiCreatePhoto */ .Z.photoService.apiCreatePhoto({
                file,
                kinds
            });
            // 알 수 없는 이유로 이미지 업로드 실패
            if (!photoURL) {
                react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.warning("\uC774\uBBF8\uC9C0\uB97C \uC5C5\uB85C\uB4DC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
                return false;
            }
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("\uC774\uBBF8\uC9C0\uB97C \uC5C5\uB85C\uB4DC\uD588\uC2B5\uB2C8\uB2E4.");
            return photoURL;
        } catch (error) {
            console.error("error >> ", error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_2__.AxiosError) {
                var ref2;
                react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((ref2 = error.response) === null || ref2 === void 0 ? void 0 : ref2.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.");
            }
            return false;
        }
    }, [
        kinds
    ]);
    return [
        onUploadPhotoByClick,
        onUploadPhotoByDrop
    ];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePhoto);


/***/ })

};
;