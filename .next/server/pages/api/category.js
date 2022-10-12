"use strict";
(() => {
var exports = {};
exports.id = 988;
exports.ids = [988];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 658:
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
            const categories = await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].category.findMany */ .Z.category.findMany({
                where: {
                    categories: {
                        some: {
                            userIdx
                        }
                    }
                }
            });
            return res.status(200).json({
                categories,
                message: "\uBAA8\uB4E0 \uCE74\uD14C\uACE0\uB9AC\uB4E4\uC744 \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."
            });
        }
        if (method === "POST") {
            if (typeof req.body.category !== "string") return res.status(418).json({
                message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uC785\uB2C8\uB2E4."
            });
            const { category  } = req.body;
            await _src_prisma__WEBPACK_IMPORTED_MODULE_1__/* ["default"].category.create */ .Z.category.create({
                data: {
                    category,
                    categories: {
                        connectOrCreate: {
                            where: {
                                userIdx_categoryIdx: {
                                    categoryIdx: category,
                                    userIdx
                                }
                            },
                            create: {
                                userIdx
                            }
                        }
                    }
                }
            });
            return res.status(201).json({
                message: "\uC0C8\uB85C\uC6B4 \uCE74\uD14C\uACE0\uB9AC\uB97C \uC0DD\uC131\uD588\uC2B5\uB2C8\uB2E4."
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
var __webpack_exports__ = (__webpack_exec__(658));
module.exports = __webpack_exports__;

})();