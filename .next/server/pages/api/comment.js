"use strict";
(() => {
var exports = {};
exports.id = 74;
exports.ids = [74];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 4180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _src_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6711);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);


async function handler(req, res) {
    const { method  } = req;
    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
        req
    });
    if (!session) return res.status(403).json({
        message: "\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!"
    });
    try {
        if (method === "POST") {
            const { postIdx , contents  } = req.body;
            if (typeof postIdx !== "number" || typeof contents !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uB97C \uBC1B\uC558\uC2B5\uB2C8\uB2E4."
            });
            const exPost = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].post.findUnique */ .Z.post.findUnique({
                where: {
                    idx: postIdx
                }
            });
            if (!exPost) return res.status(404).json({
                message: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uAC8C\uC2DC\uAE00\uC785\uB2C8\uB2E4."
            });
            const createdComment = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].comment.create */ .Z.comment.create({
                data: {
                    contents,
                    postIdx,
                    userIdx: session.user.idx
                }
            });
            return res.status(200).json({
                message: "\uB313\uAE00\uC744 \uC0DD\uC131\uD588\uC2B5\uB2C8\uB2E4.",
                commentIdx: createdComment.idx
            });
        }
        if (method === "DELETE") {
            if (typeof req.query.commentIdx !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uB97C \uBC1B\uC558\uC2B5\uB2C8\uB2E4."
            });
            const commentIdx = +req.query.commentIdx;
            const exComment = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].comment.findUnique */ .Z.comment.findUnique({
                where: {
                    idx: commentIdx
                }
            });
            if (!exComment) return res.status(404).json({
                message: "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uB313\uAE00\uC785\uB2C8\uB2E4."
            });
            const deletedComment = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].comment["delete"] */ .Z.comment["delete"]({
                where: {
                    idx: commentIdx
                }
            });
            if (deletedComment) {
                return res.status(200).json({
                    message: "\uB313\uAE00\uC744 \uC81C\uAC70\uD588\uC2B5\uB2C8\uB2E4."
                });
            } else {
                return res.status(500).json({
                    message: "\uB313\uAE00 \uC81C\uAC70\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
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
var __webpack_exports__ = (__webpack_exec__(4180));
module.exports = __webpack_exports__;

})();