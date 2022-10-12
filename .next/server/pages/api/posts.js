"use strict";
(() => {
var exports = {};
exports.id = 223;
exports.ids = [223];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 5720:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _src_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6711);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);


async function handler(req, res) {
    const kinds = req.query.kinds;
    const limit = Number(req.query.limit);
    const lastIdx = Number(req.query.lastIdx);
    try {
        let where = {
            NOT: {
                OR: [
                    {
                        isPrivate: true
                    },
                    {
                        isTemporary: true
                    }
                ]
            }
        };
        if (kinds === "popular") {
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findMany */ .Z.post.findMany({
                where,
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
                take: limit,
                skip: lastIdx === -1 ? 0 : 1,
                ...lastIdx !== -1 && {
                    cursor: {
                        idx: lastIdx
                    }
                },
                orderBy: [
                    {
                        favorites: {
                            _count: "desc"
                        }
                    }
                ]
            });
            return res.status(200).json({
                posts,
                message: "\uC778\uAE30 \uAC8C\uC2DC\uAE00\uB4E4\uC744 " + posts.length + "\uAC1C \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
            });
        }
        if (kinds === "recent") {
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findMany */ .Z.post.findMany({
                where,
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
                take: limit,
                skip: lastIdx === -1 ? 0 : 1,
                ...lastIdx !== -1 && {
                    cursor: {
                        idx: lastIdx
                    }
                },
                orderBy: [
                    {
                        updatedAt: "desc"
                    }
                ]
            });
            return res.status(200).json({
                posts,
                message: "\uCD5C\uADFC \uAC8C\uC2DC\uAE00\uB4E4\uC744 " + posts.length + "\uAC1C \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
            });
        }
        if (kinds === "favorite") {
            const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
                req
            });
            if (!session) return res.status(403).json({
                message: "\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!"
            });
            const userIdx = session.user.idx;
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findMany */ .Z.post.findMany({
                where: {
                    favorites: {
                        some: {
                            userIdx
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
                }
            });
            return res.status(200).json({
                posts,
                message: "\uC88B\uC544\uC694 \uB204\uB978 \uAC8C\uC2DC\uAE00\uB4E4\uC744 \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
            });
        }
        if (kinds === "search") {
            if (typeof req.query.lastIdx !== "string" || typeof req.query.limit !== "string" || typeof req.query.keyword !== "string") {
                return res.status(418).json({
                    message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
                });
            }
            const { keyword  } = req.query;
            const lastIdx = +req.query.lastIdx;
            const limit = +req.query.limit;
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findMany */ .Z.post.findMany({
                where: {
                    ...where,
                    keywords: {
                        some: {
                            keyword: {
                                keyword: {
                                    contains: keyword
                                }
                            }
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
                    },
                    keywords: {
                        select: {
                            keyword: true
                        }
                    }
                },
                take: limit,
                skip: lastIdx === -1 ? 0 : 1,
                ...lastIdx !== -1 && {
                    cursor: {
                        idx: lastIdx
                    }
                },
                orderBy: [
                    {
                        favorites: {
                            _count: "desc"
                        }
                    }
                ]
            });
            const allCount = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.count */ .Z.post.count({
                where: {
                    ...where,
                    keywords: {
                        some: {
                            keyword: {
                                keyword: {
                                    contains: keyword
                                }
                            }
                        }
                    }
                }
            });
            return res.status(200).json({
                posts,
                allCount,
                message: `"${keyword}"를 키워드로 가진 게시글들입니다.`
            });
        }
        if (typeof req.query.username === "string") {
            // 특정 유저의 게시글들 요청
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findMany */ .Z.post.findMany({
                where: {
                    ...where,
                    User: {
                        name: req.query.username
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
                    },
                    keywords: {
                        select: {
                            keyword: true
                        }
                    }
                },
                take: limit,
                skip: lastIdx === -1 ? 0 : 1,
                ...lastIdx !== -1 && {
                    cursor: {
                        idx: lastIdx
                    }
                },
                orderBy: [
                    {
                        updatedAt: "desc"
                    }
                ]
            });
            return res.status(200).json({
                posts,
                message: req.query.username + "\uB2D8\uC758 \uAC8C\uC2DC\uAE00\uB4E4\uC744 " + posts.length + "\uAC1C \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
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
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5720));
module.exports = __webpack_exports__;

})();