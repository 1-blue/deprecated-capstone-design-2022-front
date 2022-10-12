"use strict";
(() => {
var exports = {};
exports.id = 5541;
exports.ids = [5541];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 2432:
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
            if (typeof req.query.name !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            const user = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].user.findFirst */ .Z.user.findFirst({
                where: {
                    name: req.query.name
                },
                select: {
                    idx: true,
                    name: true,
                    photo: true,
                    introduction: true
                }
            });
            if (!user) return res.status(404).json({
                message: "\uC720\uC800\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
            });
            return res.status(200).json({
                user,
                message: "\uD2B9\uC815 \uC720\uC800\uC758 \uC811\uADFC \uAC00\uB2A5\uD55C \uC815\uBCF4\uC785\uB2C8\uB2E4."
            });
        }
        if (method === "PATCH") {
            const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
                req
            });
            if (!session) return res.status(403).json({
                message: "\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!"
            });
            if (typeof req.body.userIdx !== "number") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            if (session.user.idx !== req.body.userIdx) return res.status(401).json({
                message: "\uC811\uADFC \uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
            });
            const { userIdx , photo , ...rest } = req.body;
            const exUser = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].user.findUnique */ .Z.user.findUnique({
                where: {
                    idx: userIdx
                }
            });
            if (!exUser) return res.status(404).json({
                message: "\uC720\uC800\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."
            });
            if (photo === "remove" && exUser.photo) {
                await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].user.update */ .Z.user.update({
                    where: {
                        idx: userIdx
                    },
                    data: {
                        ...rest,
                        photo: null
                    }
                });
                return res.status(200).json({
                    message: "\uC720\uC800\uC758 \uC815\uBCF4\uB97C \uC218\uC815\uD588\uC2B5\uB2C8\uB2E4."
                });
            }
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].user.update */ .Z.user.update({
                where: {
                    idx: userIdx
                },
                data: {
                    ...rest,
                    photo
                }
            });
            return res.status(200).json({
                message: "\uC720\uC800\uC758 \uC815\uBCF4\uB97C \uC218\uC815\uD588\uC2B5\uB2C8\uB2E4."
            });
        }
        if (method === "DELETE") {
            const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
                req
            });
            if (!session) return res.status(403).json({
                message: "\uB85C\uADF8\uC778\uD6C4\uC5D0 \uC811\uADFC\uD574\uC8FC\uC138\uC694!"
            });
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].user["delete"] */ .Z.user["delete"]({
                where: {
                    idx: session.user.idx
                }
            });
            return res.status(200).json({
                message: "\uD68C\uC6D0\uD0C8\uD1F4\uD588\uC2B5\uB2C8\uB2E4."
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
var __webpack_exports__ = (__webpack_exec__(2432));
module.exports = __webpack_exports__;

})();