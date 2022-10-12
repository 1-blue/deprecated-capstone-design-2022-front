"use strict";
(() => {
var exports = {};
exports.id = 4172;
exports.ids = [4172];
exports.modules = {

/***/ 7356:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5641);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4448);
/* harmony import */ var _src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7603);
/* harmony import */ var _src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7655);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hook_form__WEBPACK_IMPORTED_MODULE_3__]);
react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// api

// component



const Introduction = ({ user  })=>{
    const { status , data  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();
    // 2022/05/17 - 소개글 수정 관련 메서드들 - by 1-blue
    const { register , handleSubmit  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
        defaultValues: {
            introduction: user.introduction || ""
        }
    });
    // 2022/05/17 - 소개글 수정 토글 - by 1-blue
    const { 0: toggleIntroduction , 1: setToggleIntroduction  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // 2022/05/17 - input ref 분리 - by 1-blue
    const introductionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { ref: ref1 , ...rest } = register("introduction");
    // 2022/09/26 - textarea 리사이징 - by 1-blue
    const handleResizeHeight = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        var ref;
        if (!introductionRef.current) return;
        introductionRef.current.style.height = "auto";
        introductionRef.current.style.height = ((ref = introductionRef.current) === null || ref === void 0 ? void 0 : ref.scrollHeight) + 4 + "px";
    }, []);
    // 2022/05/17 - 자기 소개 수정 요청 - by 1-blue
    const onSubmit = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((body)=>{
        _src_api__WEBPACK_IMPORTED_MODULE_5__/* ["default"].userService.apiUpdateUser */ .Z.userService.apiUpdateUser({
            userIdx: user.idx,
            ...body
        }).then(({ data: { message  }  })=>{
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(message);
            handleResizeHeight();
            setToggleIntroduction(false);
        }).catch((error)=>console.error(error)
        );
    }, [
        user,
        handleResizeHeight
    ]);
    // 2022/09/26 - 최초 크기 지정 - by 1-blue
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>handleResizeHeight
    , [
        handleResizeHeight
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_ProfileNav__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                avatar: user.photo,
                name: user.name,
                introduction: user.introduction
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                className: "md:mx-auto md:w-3/5 mt-8 flex flex-col space-y-4",
                onSubmit: handleSubmit(onSubmit),
                children: [
                    status === "authenticated" && data.user.idx === user.idx && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            toggleIntroduction && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                type: "submit",
                                contents: "\uC800\uC7A5\uD558\uAE30",
                                className: "self-end px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500"
                            }),
                            !toggleIntroduction && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                type: "button",
                                contents: "\uC218\uC815\uD558\uAE30",
                                className: "self-end px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500",
                                onClick: ()=>{
                                    setToggleIntroduction((prev)=>!prev
                                    );
                                    setTimeout(()=>{
                                        var ref;
                                        return (ref = introductionRef.current) === null || ref === void 0 ? void 0 : ref.focus();
                                    }, 0);
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                        disabled: !toggleIntroduction,
                        ...rest,
                        className: "resize-none p-4 rounded-md",
                        ref: (e)=>{
                            ref1(e);
                            introductionRef.current = e;
                        },
                        onInput: handleResizeHeight
                    })
                ]
            })
        ]
    });
};
const getServerSideProps = async (context)=>{
    if (!context.params) return {
        props: {
            user: null
        }
    };
    if (typeof context.params.name !== "string") return {
        props: {
            user: null
        }
    };
    try {
        const { data: { user  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_5__/* ["default"].userService.apiGetUser */ .Z.userService.apiGetUser({
            name: context.params.name
        });
        return {
            props: {
                user: JSON.parse(JSON.stringify(user))
            }
        };
    } catch (error) {
        console.error("/category/index.tsx getServerSideProps >> ", error);
    }
    return {
        props: {
            user: null
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Introduction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 4241:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/routing-items.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 1187:
/***/ ((module) => {

module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 5641:
/***/ ((module) => {

module.exports = import("react-hook-form");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,4448,5421,9243,7603,7655], () => (__webpack_exec__(7356)));
module.exports = __webpack_exports__;

})();