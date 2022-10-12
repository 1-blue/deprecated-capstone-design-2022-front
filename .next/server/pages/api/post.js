"use strict";
(() => {
var exports = {};
exports.id = 4593;
exports.ids = [4593];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 6384:
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
    try {
        if (method === "GET") {
            const { title , name  } = req.query;
            if (typeof name !== "string" || typeof title !== "string") {
                return res.status(418).json({
                    message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uB97C \uC804\uC1A1\uBC1B\uC558\uC2B5\uB2C8\uB2E4."
                });
            }
            const post = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findFirst */ .Z.post.findFirst({
                where: {
                    title,
                    User: {
                        name
                    },
                    NOT: {
                        OR: [
                            {
                                isTemporary: true
                            },
                            {
                                isPrivate: true
                            }
                        ]
                    }
                },
                include: {
                    User: {
                        select: {
                            idx: true,
                            name: true,
                            photo: true,
                            introduction: true
                        }
                    },
                    keywords: {
                        select: {
                            keyword: true
                        }
                    },
                    favorites: {
                        select: {
                            userIdx: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            });
            if (!post) return res.status(404).json({
                message: "\uAC8C\uC2DC\uAE00\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
            });
            return res.status(200).json({
                post,
                message: "\uD2B9\uC815 \uAC8C\uC2DC\uAE00\uC744 \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
            });
        }
        if (method === "POST") {
            const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
                req
            });
            if (!session) return res.status(403).json({
                message: "\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!"
            });
            const { title , contents , keywords , photo , category , isPrivate , summary , temporaryPostIdx ,  } = req.body;
            if (!Array.isArray(keywords)) return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            let postIdx = -1;
            if (temporaryPostIdx) {
                const updatedPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.update */ .Z.post.update({
                    where: {
                        idx: temporaryPostIdx
                    },
                    data: {
                        title,
                        contents,
                        photo,
                        summary,
                        isPrivate,
                        isTemporary: false,
                        userIdx: session.user.idx,
                        cateogoryIdx: category || null
                    }
                });
                postIdx = updatedPost.idx;
            } else {
                const createdPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.create */ .Z.post.create({
                    data: {
                        title,
                        contents,
                        photo,
                        summary,
                        isPrivate,
                        isTemporary: false,
                        userIdx: session.user.idx,
                        cateogoryIdx: category || null
                    }
                });
                postIdx = createdPost.idx;
            }
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].keyword.createMany */ .Z.keyword.createMany({
                data: keywords.map((keyword)=>({
                        keyword: keyword.toLocaleLowerCase()
                    })
                ),
                skipDuplicates: true
            });
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.update */ .Z.post.update({
                where: {
                    idx: postIdx
                },
                data: {
                    keywords: {
                        createMany: {
                            data: keywords.map((keyword)=>({
                                    keywordIdx: keyword
                                })
                            ),
                            skipDuplicates: true
                        }
                    }
                }
            });
            return res.status(201).json({
                message: "\uAC8C\uC2DC\uAE00\uC744 \uC0DD\uC131\uD588\uC2B5\uB2C8\uB2E4."
            });
        }
        if (method === "DELETE") {
            if (typeof req.query.postIdx !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uB97C \uBC1B\uC558\uC2B5\uB2C8\uB2E4."
            });
            const postIdx = +req.query.postIdx;
            const deletedPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post["delete"] */ .Z.post["delete"]({
                where: {
                    idx: postIdx
                }
            });
            if (deletedPost) {
                return res.status(200).json({
                    message: "\uAC8C\uC2DC\uAE00\uC744 \uC0AD\uC81C\uD588\uC2B5\uB2C8\uB2E4. \n\uBA54\uC778 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9\uB429\uB2C8\uB2E4."
                });
            } else {
                return res.status(500).json({
                    message: "\uAC8C\uC2DC\uAE00 \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \n\uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694!"
                });
            }
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
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6384));
module.exports = __webpack_exports__;

})();