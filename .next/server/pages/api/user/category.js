"use strict";
(() => {
var exports = {};
exports.id = 9259;
exports.ids = [9259];
exports.modules = {

/***/ 8567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _src_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6711);

async function handler(req, res) {
    const { method  } = req;
    try {
        if (method === "GET") {
            if (typeof req.query.userIdx !== "string" || typeof req.query.category !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            const targetUserIdx = +req.query.userIdx;
            const category = req.query.category;
            const user = await _src_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.findUnique */ .Z.user.findUnique({
                where: {
                    idx: targetUserIdx
                }
            });
            if (!user) return res.status(404).json({
                message: "\uC720\uC800\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
            });
            const posts = await _src_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post.findMany */ .Z.post.findMany({
                where: {
                    userIdx: targetUserIdx,
                    cateogoryIdx: category
                },
                select: {
                    idx: true,
                    title: true,
                    summary: true,
                    photo: true,
                    updatedAt: true,
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
                message: "\uD2B9\uC815 \uC720\uC800\uC758 \uD2B9\uC815 \uCE74\uD14C\uACE0\uB9AC\uC758 \uAC8C\uC2DC\uB4E4\uC744 \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
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
var __webpack_exports__ = (__webpack_exec__(8567));
module.exports = __webpack_exports__;

})();