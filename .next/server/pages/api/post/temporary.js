"use strict";
(() => {
var exports = {};
exports.id = 9196;
exports.ids = [9196];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 7095:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6711);


async function handler(req, res) {
    const { method  } = req;
    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
        req
    });
    if (!session) return res.status(403).json({
        message: "\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!"
    });
    const userIdx = session.user.idx;
    try {
        if (method === "GET") {
            if (typeof req.query.title !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            const { title  } = req.query;
            const exPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findFirst */ .Z.post.findFirst({
                where: {
                    title,
                    userIdx
                },
                include: {
                    keywords: {
                        select: {
                            keyword: true
                        }
                    },
                    Category: {
                        select: {
                            category: true
                        }
                    }
                }
            });
            if (!exPost) return res.status(404).json({
                message: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uAC8C\uC2DC\uAE00\uC785\uB2C8\uB2E4."
            });
            return res.status(200).json({
                post: exPost,
                message: "\uAC8C\uC2DC\uAE00\uC758 \uC815\uBCF4\uB97C \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
            });
        }
        if (method === "POST") {
            const { title , keywords , ...rest } = req.body;
            if (!Array.isArray(keywords)) return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            // >>> promise 병렬 처리 필요
            const exPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findFirst */ .Z.post.findFirst({
                where: {
                    title,
                    userIdx
                }
            });
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].keyword.createMany */ .Z.keyword.createMany({
                data: keywords.map((keyword)=>({
                        keyword
                    })
                ),
                skipDuplicates: true
            });
            // 임시 저장 게시글의 식별자
            let temporaryPostIdx = -1;
            // >>> 기존에 등록된 키워드와 비교해서 제거하는 로직도 필요
            if (exPost) {
                const post = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.update */ .Z.post.update({
                    where: {
                        idx: exPost.idx
                    },
                    data: {
                        title,
                        keywords: {
                            createMany: {
                                data: keywords.map((keyword)=>({
                                        keywordIdx: keyword
                                    })
                                ),
                                skipDuplicates: true
                            }
                        },
                        userIdx,
                        ...rest
                    }
                });
                temporaryPostIdx = post.idx;
            } else {
                const post = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.create */ .Z.post.create({
                    data: {
                        isTemporary: true,
                        title,
                        keywords: {
                            createMany: {
                                data: keywords.map((keyword)=>({
                                        keywordIdx: keyword
                                    })
                                ),
                                skipDuplicates: true
                            }
                        },
                        userIdx,
                        ...rest
                    }
                });
                temporaryPostIdx = post.idx;
            }
            return res.status(201).json({
                temporaryPostIdx,
                message: "\uD604\uC7AC \uAC8C\uC2DC\uAE00\uC744 \uC784\uC2DC \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4."
            });
        }
        if (method === "DELETE") {
            if (typeof req.query.postIdx !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            const postIdx = +req.query.postIdx;
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post["delete"] */ .Z.post["delete"]({
                where: {
                    idx: postIdx
                }
            });
            return res.status(200).json({
                message: "\uC784\uC2DC \uAC8C\uC2DC\uAE00\uC744 \uC81C\uAC70\uD588\uC2B5\uB2C8\uB2E4."
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "\uC11C\uBC84\uCE21 \uC624\uB958\uC785\uB2C8\uB2E4."
        });
    }
    return res.status(404).json({
        message: "\uC798\uBABB\uB41C \uC811\uADFC\uC785\uB2C8\uB2E4."
    });
};


/***/ }),

/***/ 6711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ src_prisma)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./src/prisma/index.ts

const prisma = new client_namespaceObject.PrismaClient();
/* harmony default export */ const src_prisma = (prisma);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7095));
module.exports = __webpack_exports__;

})();