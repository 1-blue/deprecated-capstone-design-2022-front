"use strict";
(() => {
var exports = {};
exports.id = 3241;
exports.ids = [3241];
exports.modules = {

/***/ 9214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _src_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6711);

async function handler(req, res) {
    if (typeof req.query.postIdx !== "string") return res.status(418).json({
        message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uB97C \uBC1B\uC558\uC2B5\uB2C8\uB2E4."
    });
    const postIdx = +req.query.postIdx;
    const kinds = req.query.kinds;
    try {
        const targetPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findUnique */ .Z.post.findUnique({
            where: {
                idx: postIdx
            },
            include: {
                keywords: {
                    select: {
                        keyword: true
                    }
                }
            }
        });
        if (!targetPost) return res.status(404).json({
            message: "\uAC8C\uC2DC\uAE00\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
        });
        if (kinds === "relevant") {
            const keywords = targetPost.keywords.map(({ keyword  })=>keyword.keyword
            );
            const relenvantPosts = await _src_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findMany */ .Z.post.findMany({
                where: {
                    NOT: {
                        idx: targetPost.idx
                    },
                    keywords: {
                        some: {
                            OR: keywords.map((keyword)=>({
                                    keywordIdx: keyword
                                })
                            )
                        }
                    }
                },
                include: {
                    User: {
                        select: {
                            name: true,
                            photo: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                            favorites: true
                        }
                    }
                },
                take: 20
            });
            return res.status(200).json({
                relenvantPosts,
                message: "\uC5F0\uAD00\uB41C \uAC8C\uC2DC\uAE00\uB4E4\uC785\uB2C8\uB2E4."
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
var __webpack_exports__ = (__webpack_exec__(9214));
module.exports = __webpack_exports__;

})();