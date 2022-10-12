"use strict";
exports.id = 2694;
exports.ids = [2694];
exports.modules = {

/***/ 2694:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3135);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6809);
/* harmony import */ var _src_components_common_Photo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(576);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_markdown__WEBPACK_IMPORTED_MODULE_1__, remark_gfm__WEBPACK_IMPORTED_MODULE_2__]);
([react_markdown__WEBPACK_IMPORTED_MODULE_1__, remark_gfm__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



// common-component

const Markdown = ({ markdown  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_markdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "py-4 px-8 prose dark:prose-invert whitespace-normal max-w-full",
        remarkPlugins: [
            remark_gfm__WEBPACK_IMPORTED_MODULE_2__["default"]
        ],
        components: {
            p: ({ node , ...props })=>{
                // <img />를 렌더링 하는 경우에 <p>내부에서 렌더링 되지 않도록 하기 위함
                if (typeof props.children[0] === "object") {
                    const element = props.children[0];
                    return element.type.name === "img" ? {
                        ...element
                    } : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        ...props
                    });
                }
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    ...props,
                    className: "whitespace-pre-line"
                });
            },
            code: ({ node , inline , ...props })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("code", {
                    ...props,
                    className: "bg-indigo-700 px-2 py-1 rounded-sm text-white after:contents before:contents group-odd:p-0 group-even:p-0 group-odd:bg-transparent group-even:bg-transparent"
                })
            ,
            pre: ({ node , ...props })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("pre", {
                    ...props,
                    className: "group bg-indigo-500 p-3 rounded-sm"
                })
            ,
            a: ({ node , ...props })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    ...props,
                    className: "text-indigo-500 no-underline"
                })
            ,
            blockquote: ({ node , ...props })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("blockquote", {
                    ...props,
                    className: "bg-zinc-300 dark:bg-zinc-800 border-l-indigo-500"
                })
            ,
            img: ({ node , ...props })=>{
                var ref;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: ((ref = props.src) === null || ref === void 0 ? void 0 : ref.includes("https://blelog.s3.ap-northeast-2.amazonaws.com")) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Photo__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            ...props,
                            photo: props.src,
                            className: "mx-auto my-4 h-[200px] md:h-[300px] lg:h-[400px]"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            ...props,
                            className: "mx-auto my-4 h-[200px] md:h-[300px] lg:h-[400px]"
                        })
                    })
                });
            },
            h1: ({ node , ...props })=>{
                var ref, ref1;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    id: (ref = props.children) === null || ref === void 0 ? void 0 : (ref1 = ref[0]) === null || ref1 === void 0 ? void 0 : ref1.toString(),
                    ...props
                });
            },
            h2: ({ node , ...props })=>{
                var ref, ref2;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    id: (ref = props.children) === null || ref === void 0 ? void 0 : (ref2 = ref[0]) === null || ref2 === void 0 ? void 0 : ref2.toString(),
                    ...props
                });
            },
            h3: ({ node , ...props })=>{
                var ref, ref3;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    id: (ref = props.children) === null || ref === void 0 ? void 0 : (ref3 = ref[0]) === null || ref3 === void 0 ? void 0 : ref3.toString(),
                    ...props
                });
            },
            h4: ({ node , ...props })=>{
                var ref, ref4;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                    id: (ref = props.children) === null || ref === void 0 ? void 0 : (ref4 = ref[0]) === null || ref4 === void 0 ? void 0 : ref4.toString(),
                    ...props
                });
            },
            h5: ({ node , ...props })=>{
                var ref, ref5;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                    id: (ref = props.children) === null || ref === void 0 ? void 0 : (ref5 = ref[0]) === null || ref5 === void 0 ? void 0 : ref5.toString(),
                    ...props
                });
            },
            h6: ({ node , ...props })=>{
                var ref, ref6;
                /*#__PURE__*/ return react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                    id: (ref = props.children) === null || ref === void 0 ? void 0 : (ref6 = ref[0]) === null || ref6 === void 0 ? void 0 : ref6.toString(),
                    ...props
                });
            }
        },
        children: markdown
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Markdown);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

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


/***/ })

};
;