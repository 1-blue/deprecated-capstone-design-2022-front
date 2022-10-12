"use strict";
(() => {
var exports = {};
exports.id = 6635;
exports.ids = [6635];
exports.modules = {

/***/ 6670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _src_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6711);

async function handler(req, res) {
    const { method  } = req;
    if (typeof req.query.postIdx !== "string" || typeof req.query.userIdx !== "string") return res.status(418).json({
        message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
    });
    const postIdx = +req.query.postIdx;
    const userIdx = +req.query.userIdx;
    try {
        const exPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findUnique */ .Z.post.findUnique({
            where: {
                idx: postIdx
            },
            select: {
                cateogoryIdx: true
            }
        });
        if (!exPost) return res.status(404).json({
            message: "\uAC8C\uC2DC\uAE00\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
        });
        if (method === "GET") {
            if (!exPost.cateogoryIdx) return res.status(200).json({
                posts: [],
                message: "\uCE74\uD14C\uACE0\uB9AC\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
            });
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findMany */ .Z.post.findMany({
                where: {
                    cateogoryIdx: exPost.cateogoryIdx,
                    userIdx,
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
                },
                select: {
                    title: true
                }
            });
            return res.status(200).json({
                posts,
                message: "\uD2B9\uC815 \uCE74\uD14C\uACE0\uB9AC\uB97C \uAC00\uC9C4 \uAC8C\uC2DC\uAE00\uB4E4\uC744 \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
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
var __webpack_exports__ = (__webpack_exec__(6670));
module.exports = __webpack_exports__;

})();