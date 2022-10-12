"use strict";
(() => {
var exports = {};
exports.id = 8957;
exports.ids = [8957,2197];
exports.modules = {

/***/ 8561:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr_infinite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1448);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4448);
/* harmony import */ var _src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7655);
/* harmony import */ var _src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5992);
/* harmony import */ var _src_components_Comment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(791);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr_infinite__WEBPACK_IMPORTED_MODULE_2__, _src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_7__, _src_components_Comment__WEBPACK_IMPORTED_MODULE_8__]);
([swr_infinite__WEBPACK_IMPORTED_MODULE_2__, _src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_7__, _src_components_Comment__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





// api

// component




const limit = 10;
const CommentContainer = ({ postIdx , allCount  })=>{
    const { data , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();
    // 2022/05/02 - 보여줄 댓글 개수 - by 1-blue
    const { 0: showCount , 1: setShowCount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    // 2022/05/02 - 댓글 추가 패치 가능 여부 - by 1-blue
    const { 0: hasMoreComment , 1: setHasMoreComment  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    // 2022/05/02 - 댓글들 순차적 요청 - by 1-blue
    const { data: commentsResponse , size , setSize , mutate: commentsMutate , isValidating: commentsLoading ,  } = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_2__["default"])((pageIndex, previousPageData)=>{
        var ref;
        if (previousPageData && previousPageData.comments.length !== limit) {
            setHasMoreComment(false);
            return null;
        }
        if (previousPageData && previousPageData.comments.length === 0) {
            setHasMoreComment(false);
            return null;
        }
        const lastIdx = (previousPageData === null || previousPageData === void 0 ? void 0 : (ref = previousPageData.comments) === null || ref === void 0 ? void 0 : ref[previousPageData.comments.length - 1].idx) || -1;
        return `/api/comments?postIdx=${postIdx}&lastIdx=${lastIdx}&limit=${limit}`;
    });
    // 2022/09/24 - 댓글 추가 요청 - by 1-blue
    const createComment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (contents)=>{
        if (status !== "authenticated") return react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!");
        if (contents.trim().length === 0) return react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uB313\uAE00\uC744 \uC785\uB825\uD558\uACE0 \uC81C\uCD9C\uD574\uC8FC\uC138\uC694!");
        try {
            const { data: { message: message1 , commentIdx  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_6__/* ["default"].commentService.apiCreateComment */ .Z.commentService.apiCreateComment({
                postIdx,
                contents
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(message1);
            const replys = [];
            commentsMutate((prev)=>prev && prev.map(({ comments , message  }, index)=>{
                    if (index !== 0) return {
                        comments,
                        message
                    };
                    return {
                        comments: [
                            {
                                idx: commentIdx,
                                contents,
                                createdAt: new Date(Date.now()),
                                updatedAt: new Date(Date.now()),
                                User: {
                                    idx: data.user.idx,
                                    name: data.user.name,
                                    photo: data.user.photo
                                },
                                userIdx: data.user.idx,
                                postIdx: postIdx,
                                commentIdx: null,
                                replys
                            },
                            ...comments, 
                        ],
                        message
                    };
                })
            , false);
        } catch (error) {
            console.error(error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_5__.AxiosError) {
                var ref;
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uC11C\uBC84 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
            }
        }
    }, [
        postIdx,
        data,
        status,
        commentsMutate
    ]);
    // 2022/09/24 - 댓글 제거 요청 - by 1-blue
    const deleteComment = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((commentIdx)=>{
        return async ()=>{
            try {
                const { data: { message: message3  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_6__/* ["default"].commentService.apiDeleteComment */ .Z.commentService.apiDeleteComment({
                    commentIdx
                });
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(message3);
                commentsMutate((prev)=>prev && prev.map(({ comments , message  })=>({
                            comments: comments.filter((comment)=>comment.idx !== commentIdx
                            ),
                            message
                        })
                    )
                , false);
            } catch (error) {
                console.error(error);
                if (error instanceof axios__WEBPACK_IMPORTED_MODULE_5__.AxiosError) {
                    var ref;
                    react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
                } else {
                    react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uC11C\uBC84 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
                }
            }
        };
    }, [
        commentsMutate
    ]);
    // 2022/09/24 - 답글 추가 요청 - by 1-blue
    const createReply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (contents, commentIdx)=>{
        if (status !== "authenticated") return react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!");
        if (contents.trim().length === 0) return react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uB2F5\uAE00\uC744 \uC785\uB825\uD558\uACE0 \uC81C\uCD9C\uD574\uC8FC\uC138\uC694!");
        try {
            const { data: { message: message5  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_6__/* ["default"].replyService.apiCreateReply */ .Z.replyService.apiCreateReply({
                postIdx,
                commentIdx,
                contents
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(message5);
            commentsMutate((prev)=>prev && prev.map(({ comments , message  })=>({
                        message,
                        comments: comments.map((comment)=>{
                            if (comment.idx !== commentIdx) return comment;
                            return {
                                ...comment,
                                replys: comment.replys ? [
                                    ...comment.replys,
                                    {
                                        idx: Date.now(),
                                        contents,
                                        createdAt: new Date(Date.now()),
                                        updatedAt: new Date(Date.now()),
                                        User: {
                                            idx: data.user.idx,
                                            name: data.user.name,
                                            photo: data.user.photo
                                        },
                                        userIdx: data.user.idx,
                                        postIdx: postIdx,
                                        commentIdx
                                    }, 
                                ] : [
                                    {
                                        idx: Date.now(),
                                        contents,
                                        createdAt: new Date(Date.now()),
                                        updatedAt: new Date(Date.now()),
                                        User: {
                                            idx: data.user.idx,
                                            name: data.user.name,
                                            photo: data.user.photo
                                        },
                                        userIdx: data.user.idx,
                                        postIdx: postIdx,
                                        commentIdx
                                    }, 
                                ]
                            };
                        })
                    })
                )
            , false);
        } catch (error) {
            console.error(error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_5__.AxiosError) {
                var ref;
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uC11C\uBC84 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
            }
        }
    }, [
        postIdx,
        data,
        status,
        commentsMutate
    ]);
    // 2022/09/24 - 답글 제거 요청 - by 1-blue
    const deleteReply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((replyIdx)=>{
        return async ()=>{
            try {
                const { data: { message: message7  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_6__/* ["default"].replyService.apiDeleteReply */ .Z.replyService.apiDeleteReply({
                    replyIdx
                });
                react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(message7);
                commentsMutate((prev)=>prev && prev.map(({ comments , message  })=>({
                            message,
                            comments: comments.map((comment)=>{
                                if (comment.replys.length === 0) return comment;
                                return {
                                    ...comment,
                                    replys: comment.replys.filter((reply)=>reply.idx !== replyIdx
                                    )
                                };
                            })
                        })
                    )
                , false);
            } catch (error) {
                console.error(error);
                if (error instanceof axios__WEBPACK_IMPORTED_MODULE_5__.AxiosError) {
                    var ref;
                    react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
                } else {
                    react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("\uC11C\uBC84 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
                }
            }
        };
    }, [
        commentsMutate
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "font-semibold",
                        children: [
                            allCount,
                            "\uAC1C\uC758 \uB313\uAE00"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                        createComment: createComment,
                        createReply: createReply
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "divide-y",
                children: [
                    commentsResponse === null || commentsResponse === void 0 ? void 0 : commentsResponse.map(({ comments  }, index)=>{
                        if (showCount > index) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                            className: "divide-y dark:divide-gray-400",
                            children: comments.map((comment)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Comment__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                    comment: comment,
                                    createComment: createComment,
                                    deleteComment: deleteComment,
                                    createReply: createReply,
                                    deleteReply: deleteReply
                                }, comment.idx)
                            )
                        }, index);
                    }),
                    hasMoreComment ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        type: "button",
                        className: "block mx-auto px-4 py-2 rounded-md font-semibold text-white bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600",
                        contents: "\uB313\uAE00 \uB354 \uBD88\uB7EC\uC624\uAE30",
                        onClick: ()=>setShowCount((prev)=>prev + 1
                            )
                        ,
                        onMouseEnter: ()=>setSize(showCount + 1)
                        ,
                        loading: commentsLoading && size === showCount,
                        loadingText: "\uB313\uAE00\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4..."
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "block text-center text-xl font-semibold pt-4",
                        children: "\uB354 \uC774\uC0C1 \uBD88\uB7EC\uC62C \uB313\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentContainer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5992:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5641);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7655);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8915);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hook_form__WEBPACK_IMPORTED_MODULE_2__]);
react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// component

// util

const CommentForm = ({ createComment , createReply , commentIdx  })=>{
    const { status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();
    // 2022/04/30 - 댓글 입력 관련 메서드들 - by 1-blue
    const { handleSubmit , register , reset  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)();
    // 2022/04/30 - comment Ref - by 1-blue
    const { ref: ref1 , ...rest } = register("contents");
    const commentRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // 2022/04/30 - textarea 자동 높이 조절 - by 1-blue
    const handleResizeHeight = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        var ref;
        if (!commentRef.current) return;
        commentRef.current.style.height = "auto";
        commentRef.current.style.height = ((ref = commentRef.current) === null || ref === void 0 ? void 0 : ref.scrollHeight) + "px";
    }, [
        commentRef
    ]);
    // 2022/09/24 - 댓글 or 답글 생성 - by 1-blue
    const onCreate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(({ contents  })=>{
        if (commentIdx) {
            createReply(contents, commentIdx);
        } else {
            createComment(contents);
        }
        reset();
    }, [
        commentIdx,
        createReply,
        createComment,
        reset
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        className: "space-y-4",
        onSubmit: handleSubmit(onCreate),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                placeholder: status === "authenticated" ? "\uB313\uAE00\uC744 \uC791\uC131\uD558\uC138\uC694" : "\uB85C\uADF8\uC778 \uD6C4\uC5D0 \uB313\uAE00\uC744 \uC785\uB825\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
                ...rest,
                className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_4__/* .combineClassNames */ .Nn)("w-full p-4 focus:outline-none resize-none rounded-sm bg-zinc-200 dark:bg-zinc-600", status === "authenticated" ? "" : "cursor-not-allowed"),
                onInput: handleResizeHeight,
                ref: (e)=>{
                    ref1(e);
                    commentRef.current = e;
                },
                disabled: status !== "authenticated"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Tool_Button__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                type: "submit",
                className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_4__/* .combineClassNames */ .Nn)("block ml-auto font-semibold bg-indigo-400 text-white dark:bg-indigo-500 py-2 px-4 rounded-md", status === "authenticated" ? "" : "cursor-not-allowed"),
                contents: "\uB313\uAE00 \uC791\uC131"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(CommentForm));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4107:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_libs_dateFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6055);
/* harmony import */ var _src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5421);



// util

// component

const Reply = ({ reply , deleteReply  })=>{
    const { data , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
        className: "space-y-4 pt-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex space-x-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        photo: reply.User.photo,
                        className: "w-10 h-10",
                        alt: "\uC720\uC800 \uC774\uBBF8\uC9C0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "font-semibold",
                                children: reply.User.name
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                                className: "text-sm dark:text-gray-400",
                                children: (0,_src_libs_dateFormat__WEBPACK_IMPORTED_MODULE_4__/* .timeFormat */ .i$)(reply.updatedAt)
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex-1"
                    }),
                    status === "authenticated" && reply.User.idx === data.user.idx && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "button",
                        className: "self-start text-gray-400 hover:text-white",
                        onClick: deleteReply(reply.idx),
                        children: "\uC0AD\uC81C"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "whitespace-pre-line p-4 rounded-md bg-zinc-200 dark:bg-zinc-700",
                children: reply.contents
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(Reply));


/***/ }),

/***/ 791:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6055);
/* harmony import */ var _src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5421);
/* harmony import */ var _src_components_Comment_Reply__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4107);
/* harmony import */ var _src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5992);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_6__]);
_src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



// util

// component



const Comment = ({ comment , createComment , deleteComment , createReply , deleteReply  })=>{
    var ref;
    const { data , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();
    // 2022/05/05 - 답글 더 보기 토글 - by 1-blue
    const { 0: toggleReply , 1: setToggleReply  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
        className: "space-y-4 py-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex space-x-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        photo: comment.User.photo,
                        className: "w-12 h-12",
                        alt: "\uC720\uC800 \uC774\uBBF8\uC9C0"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "font-semibold",
                                children: comment.User.name
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                                className: "text-sm dark:text-gray-400",
                                children: (0,_src_libs__WEBPACK_IMPORTED_MODULE_4__/* .timeFormat */ .i$)(comment.updatedAt)
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex-1"
                    }),
                    status === "authenticated" && data.user.idx === comment.User.idx && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "button",
                        className: "self-start text-gray-400 hover:text-white",
                        onClick: deleteComment(comment.idx),
                        children: "\uC0AD\uC81C"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "whitespace-pre-line p-4 rounded-md bg-zinc-200 dark:bg-zinc-700",
                children: comment.contents
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                type: "button",
                onClick: ()=>setToggleReply((prev)=>!prev
                    )
                ,
                children: toggleReply ? "\uC228\uAE30\uAE30" : comment.replys.length !== 0 ? `답글 ${comment.replys.length}개 더 보기` : "\uB2F5\uAE00 \uB2EC\uAE30"
            }),
            toggleReply && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                className: "pl-8",
                children: [
                    (ref = comment.replys) === null || ref === void 0 ? void 0 : ref.map((reply)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Comment_Reply__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            reply: reply,
                            deleteReply: deleteReply
                        }, reply.idx)
                    ),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        className: "pt-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Comment_CommentForm__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            createComment: createComment,
                            createReply: createReply,
                            commentIdx: comment.idx
                        })
                    }, -1)
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(Comment));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _src_components_common_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2460);
/* harmony import */ var _src_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9033);




// compopnent

// type

const Favorite = ({ favorites , onCreateFavorite , onDeleteFavorite  })=>{
    const { data , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();
    // 2022/09/24 - 본인이 좋아요 눌렀는지 여부 - by 1-blue
    const isLiked = data ? favorites.map(({ userIdx  })=>userIdx
    ).includes(data.user.idx) : false;
    // 2022/05/03 - 좋아요 버튼 클릭 이벤트 - by 1-blue
    const onClickLikeButton = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (status !== "authenticated") return react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error("\uB85C\uADF8\uC778 \uD6C4\uC5D0 \uC811\uADFC\uC774 \uAC00\uB2A5\uD569\uB2C8\uB2E4.");
        if (isLiked) onDeleteFavorite();
        else onCreateFavorite();
    }, [
        status,
        isLiked,
        onDeleteFavorite,
        onCreateFavorite
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "button",
        className: "flex items-center bg-gray-300 px-3 py-2 rounded-md space-x-1",
        onClick: onClickLikeButton,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: isLiked ? "text-red-500" : "text-gray-500",
                children: isLiked ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    icon: _src_types__WEBPACK_IMPORTED_MODULE_5__/* .ICON.HEART */ .W.HEART,
                    $fill: true,
                    className: "w-6 h-6 animate-heart-beat"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Icon__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    icon: _src_types__WEBPACK_IMPORTED_MODULE_5__/* .ICON.HEART */ .W.HEART,
                    className: "w-6 h-6"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "font-semibold text-gray-500",
                children: favorites.length
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Favorite);


/***/ }),

/***/ 6138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_libs_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8915);


// util

const TitleNav = ({ contents  })=>{
    // 2022/05/04 - 게시글 제목 목록 - by 1-blue
    const { 0: titleList , 1: setTitleList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    // 2022/05/04 - 게시글의 타이틀들을 텍스트와 크기로 분리 - by 1-blue
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setTitleList((0,_src_libs_util__WEBPACK_IMPORTED_MODULE_2__/* .getTitleList */ .eB)(contents));
    }, [
        setTitleList,
        contents
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
        className: "fixed top-[14%] right-[4%] hidden 2xl:flex flex-col space-y-1 pl-2 border-l border-gray-500 dark:border-gray-400",
        children: titleList === null || titleList === void 0 ? void 0 : titleList.map(({ text , size  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                href: `#${text}`,
                className: (0,_src_libs_util__WEBPACK_IMPORTED_MODULE_2__/* .combineClassNames */ .Nn)("text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", size === 1 ? `pl-[5px]` : "", size === 2 ? `pl-[10px]` : "", size === 3 ? `pl-[15px]` : "", size === 4 ? `pl-[20px]` : "", size === 5 ? `pl-[25px]` : ""),
                children: text
            }, text)
        )
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TitleNav);


/***/ }),

/***/ 1088:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);


const Keyword = ({ keywords  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
        className: "flex flex-wrap space-x-2",
        children: keywords.map(({ keyword: { keyword  }  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                className: "bg-zinc-200 text-indigo-600 hover:bg-zinc-300 hover:text-indigo-700 dark:bg-zinc-700 dark:hover:bg-zinc-800 dark:text-indigo-300 dark:hover:text-indigo-400 font-semibold py-2 px-4 mb-2 rounded-md cursor-pointer text-xs md:text-sm",
                onClick: ()=>router.push(`/search?keyword=${keyword}`)
                ,
                children: keyword
            }, keyword)
        )
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyword);


/***/ }),

/***/ 2117:
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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5941);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4448);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6055);
/* harmony import */ var _src_libs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8915);
/* harmony import */ var _src_hooks_useModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6481);
/* harmony import */ var _src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(897);
/* harmony import */ var _src_components_common_Spinner__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(9243);
/* harmony import */ var _src_components_common_Photo__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(576);
/* harmony import */ var _src_components_common_Markdown__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2694);
/* harmony import */ var _src_components_Post__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(8326);
/* harmony import */ var _src_components_common_Modal__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(2555);
/* harmony import */ var _src_components_common_Keyword__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1088);
/* harmony import */ var _src_components_Comment_CommentContainer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8561);
/* harmony import */ var _src_components_Favorite__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3459);
/* harmony import */ var _src_components_TitleNav__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(6138);
/* harmony import */ var _src_pages_404__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(680);
/* harmony import */ var _src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5421);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_3__, _src_components_common_Markdown__WEBPACK_IMPORTED_MODULE_17__, _src_components_Comment_CommentContainer__WEBPACK_IMPORTED_MODULE_19__]);
([swr__WEBPACK_IMPORTED_MODULE_3__, _src_components_common_Markdown__WEBPACK_IMPORTED_MODULE_17__, _src_components_Comment_CommentContainer__WEBPACK_IMPORTED_MODULE_19__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







// api

// util

// hook

// component













const PostDetail = ({ post: initialPost , posts: relatedPosts ,  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { status , data  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_5__.useSession)();
    // 2022/09/24 - 현재 게시글 상세 데이터 요청 - by 1-blue
    const { data: responsePost , mutate: postMutate  } = (0,swr__WEBPACK_IMPORTED_MODULE_3__["default"])(initialPost ? `/api/post?name=${initialPost.User.name}&title=${initialPost.title}` : null, null, {
        fallbackData: {
            post: initialPost,
            message: ""
        }
    });
    // 2022/04/30 - 카테고리 토글 변수 - by 1-blue
    const { 0: toggleCategory , 1: setToggleCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // 2022/09/24 - 현재 게시글과 연관된 게시글들 - by 1-blue
    const { data: relevantResult  } = (0,swr__WEBPACK_IMPORTED_MODULE_3__["default"])(initialPost ? `/api/post/relevant?postIdx=${initialPost.idx}` : null);
    // 2022/05/01 - 게시글 삭제 모달 - by 1-blue
    const [modalRef, isOpen, setIsOpen] = (0,_src_hooks_useModal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)();
    // 2022/09/24 - 게시글 삭제중인지 확인할 변수 - by 1-blue
    const { 0: isDeleting , 1: setIsDeleting  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // 2022/09/24 - 현재 게시글 제거 요청 - by 1-blue
    const onDeletePost = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!initialPost) return;
        setIsDeleting(true);
        _src_api__WEBPACK_IMPORTED_MODULE_9__/* ["default"].postService.apiDeletePost */ .Z.postService.apiDeletePost({
            postIdx: initialPost.idx
        }).then(({ data: { message  }  })=>{
            react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.success(message);
            router.push("/");
        }).catch((error)=>{
            console.error(error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_7__.AxiosError) {
                var ref;
                react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error("\uC11C\uBC84\uCE21 \uC624\uB958\uC785\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694!");
            }
        }).finally(()=>{
            setIsDeleting(false);
        });
    }, [
        initialPost,
        router
    ]);
    // 2022/09/24 - 좋아요 요청 - by 1-blue
    const onCreateFavorite = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (status !== "authenticated") return react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error("\uB85C\uADF8\uC778\uC744 \uD574\uC57C \uB204\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        try {
            const { data: { message  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_9__/* ["default"].postService.apiCreateFavorite */ .Z.postService.apiCreateFavorite({
                postIdx: initialPost.idx
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.success(message);
            postMutate((prev)=>prev && {
                    ...prev,
                    post: {
                        ...prev.post,
                        favorites: [
                            ...prev.post.favorites,
                            {
                                userIdx: data.user.idx
                            }
                        ]
                    }
                }
            , false);
        } catch (error) {
            console.error(error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_7__.AxiosError) {
                var ref;
                react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error("\uC11C\uBC84 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
            }
        }
    }, [
        status,
        data,
        postMutate,
        initialPost
    ]);
    // 2022/09/24 - 좋아요 취소 요청 - by 1-blue
    const onDeleteFavorite = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        if (status !== "authenticated") return react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error("\uB85C\uADF8\uC778\uC744 \uD574\uC57C \uB204\uB97C \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
        try {
            const { data: { message  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_9__/* ["default"].postService.apiDeleteFavorite */ .Z.postService.apiDeleteFavorite({
                postIdx: initialPost.idx
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.success(message);
            postMutate((prev)=>prev && {
                    ...prev,
                    post: {
                        ...prev.post,
                        favorites: prev.post.favorites.filter(({ userIdx  })=>userIdx !== data.user.idx
                        )
                    }
                }
            , false);
        } catch (error) {
            console.error(error);
            if (error instanceof axios__WEBPACK_IMPORTED_MODULE_7__.AxiosError) {
                var ref;
                react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error((ref = error.response) === null || ref === void 0 ? void 0 : ref.data.message);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error("\uC11C\uBC84 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \n\uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694");
            }
        }
    }, [
        status,
        data,
        postMutate,
        initialPost
    ]);
    // >>> 에러 페이지
    if (!responsePost || !responsePost.post) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_pages_404__WEBPACK_IMPORTED_MODULE_10__["default"], {
        text: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uAC8C\uC2DC\uAE00\uC785\uB2C8\uB2E4."
    });
    const post1 = responsePost.post;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_HeadInfo__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                title: `Jslog | ${post1.title}`,
                description: `${post1.title}\n${post1.contents}`,
                photo: post1.photo
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("article", {
                className: "max-w-[768px] md:w-[60vw] mx-4 md:mx-auto space-y-8 mb-40",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                            className: "text-5xl font-bold",
                            children: post1.title
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                        href: `/${post1.User.name}`,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: "hover:underline underline-offset-2",
                                            children: post1.User.name
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "\u318D"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
                                        children: (0,_src_libs__WEBPACK_IMPORTED_MODULE_12__/* .dateOrTimeFormat */ .ie)(post1.updatedAt, "YYYY-MM-DD")
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Favorite__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                                favorites: post1.favorites,
                                onCreateFavorite: onCreateFavorite,
                                onDeleteFavorite: onDeleteFavorite
                            }),
                            status === "authenticated" && data.user.idx === post1.User.idx && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: "text-gray-400 hover:text-black dark:hover:text-white",
                                        onClick: ()=>{
                                            var ref;
                                            return router.push(`/write?title=${(ref = router.query) === null || ref === void 0 ? void 0 : ref.title}`);
                                        },
                                        children: "\uC218\uC815"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "\u318D"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: "text-gray-400 hover:text-black dark:hover:text-white",
                                        onClick: ()=>setIsOpen((prev)=>!prev
                                            )
                                        ,
                                        children: "\uC0AD\uC81C"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Keyword__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                            keywords: post1.keywords
                        })
                    }),
                    relatedPosts.length !== 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "bg-zinc-300 dark:bg-zinc-700 px-8 py-6 rounded-md space-y-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-xl font-semibold",
                                children: post1.cateogoryIdx
                            }),
                            toggleCategory && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                className: "space-y-1",
                                children: relatedPosts.map(({ title  }, index)=>{
                                    /*#__PURE__*/ return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "dark:text-gray-400",
                                                children: [
                                                    index + 1,
                                                    ". "
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                                href: `/${data === null || data === void 0 ? void 0 : data.user.name}/${title}`,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    className: (0,_src_libs__WEBPACK_IMPORTED_MODULE_15__/* .combineClassNames */ .Nn)("font-semibold hover:text-indigo-500", router.query.title === title ? "text-indigo-400" : ""),
                                                    children: title
                                                })
                                            })
                                        ]
                                    }, title);
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "button",
                                onClick: ()=>setToggleCategory((prev)=>!prev
                                    )
                                ,
                                children: toggleCategory ? "\u25B2 \uC228\uAE30\uAE30" : "\u25BC \uBAA9\uB85D \uBCF4\uAE30"
                            })
                        ]
                    }),
                    post1.photo && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Photo__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {
                            photo: post1.photo,
                            className: "w-full h-[60vh] m-0",
                            $cover: true
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Markdown__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z, {
                            markdown: post1.contents
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Avatar__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z, {
                                photo: post1.User.photo,
                                className: "w-[80px] h-[80px] self-start",
                                alt: "\uC720\uC800 \uC774\uBBF8\uC9C0"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "text-xl font-bold",
                                        children: post1.User.name
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "whitespace-pre",
                                        children: post1.User.introduction
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Comment_CommentContainer__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z, {
                        postIdx: post1.idx,
                        allCount: post1._count.comments
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                className: "mb-4"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "block text-center mb-8 text-2xl",
                        children: "\uAD00\uC2EC \uC788\uC744\uB9CC\uD55C \uAC8C\uC2DC\uAE00"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                        className: "grid gird-col-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
                        children: relevantResult === null || relevantResult === void 0 ? void 0 : relevantResult.relenvantPosts.map((post)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_Post__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .Z, {
                                post: post
                            }, post.idx)
                        )
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_TitleNav__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .Z, {
                contents: post1.contents
            }),
            isOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Modal__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .Z, {
                ref: modalRef,
                noScroll: true,
                primary: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "flex flex-col bg-zinc-900 p-8 rounded-md space-y-4 w-[400px]",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "font-bold text-2xl",
                            children: "\uD3EC\uC2A4\uD2B8 \uC0AD\uC81C"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            children: "\uC815\uB9D0 \uD3EC\uC2A4\uD2B8\uB97C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-right space-x-2",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    className: "px-6 py-2 bg-indigo-400 rounded-md hover:bg-indigo-500",
                                    children: "\uCDE8\uC18C"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    className: "px-6 py-2 bg-indigo-400 rounded-md hover:bg-indigo-500",
                                    onClick: onDeletePost,
                                    children: "\uD655\uC778"
                                })
                            ]
                        })
                    ]
                })
            }),
            isDeleting && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_src_components_common_Spinner__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .Z, {
                kinds: "page"
            })
        ]
    });
};
const getServerSideProps = async (context)=>{
    try {
        const { name , title  } = context.query;
        if (typeof name !== "string" || typeof title !== "string") {
            return {
                props: {}
            };
        }
        const { data: { post  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_9__/* ["default"].postService.apiGetPost */ .Z.postService.apiGetPost({
            name,
            title
        });
        const { data: { posts  } ,  } = await _src_api__WEBPACK_IMPORTED_MODULE_9__/* ["default"].postService.apiGetPostsByCategory */ .Z.postService.apiGetPostsByCategory({
            postIdx: post.idx,
            userIdx: post.User.idx
        });
        return {
            props: {
                post: JSON.parse(JSON.stringify(post)),
                posts: JSON.parse(JSON.stringify(posts))
            }
        };
    } catch (error) {
        console.error("[name]/[title]/index.tsx >> ", error);
        return {
            props: {}
        };
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostDetail);

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

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

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

/***/ }),

/***/ 3135:
/***/ ((module) => {

module.exports = import("react-markdown");;

/***/ }),

/***/ 6809:
/***/ ((module) => {

module.exports = import("remark-gfm");;

/***/ }),

/***/ 5941:
/***/ ((module) => {

module.exports = import("swr");;

/***/ }),

/***/ 1448:
/***/ ((module) => {

module.exports = import("swr/infinite");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1397,676,1664,5675,8915,897,2460,4448,5421,6055,9243,680,8326,6776,7655,2694], () => (__webpack_exec__(2117)));
module.exports = __webpack_exports__;

})();