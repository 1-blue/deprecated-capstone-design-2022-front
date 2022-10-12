"use strict";
(() => {
var exports = {};
exports.id = 2964;
exports.ids = [2964];
exports.modules = {

/***/ 7096:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 7262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "bcrypt"
var external_bcrypt_ = __webpack_require__(7096);
var external_bcrypt_default = /*#__PURE__*/__webpack_require__.n(external_bcrypt_);
// EXTERNAL MODULE: ./src/prisma/index.ts + 1 modules
var prisma = __webpack_require__(6711);
;// CONCATENATED MODULE: external "@prisma/client/runtime"
const runtime_namespaceObject = require("@prisma/client/runtime");
;// CONCATENATED MODULE: ./src/pages/api/signup.ts



async function handler(req, res) {
    const { body  } = req;
    try {
        let data = null;
        const hashPassword = await external_bcrypt_default().hash(body.password, 6);
        if (body.photo) {
            const photo = body.photo;
            data = {
                ...body,
                password: hashPassword,
                photo
            };
        } else {
            data = {
                ...body,
                password: hashPassword,
                photo: undefined
            };
        }
        await prisma/* default.user.create */.Z.user.create({
            data
        });
        return res.status(200).json({
            message: "\uD68C\uC6D0\uAC00\uC785\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4. \uB85C\uADF8\uC778 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4."
        });
    } catch (error) {
        console.error("/api/signup >> ", error);
        // 아이디 겹친다면 실행
        if (error instanceof runtime_namespaceObject.PrismaClientKnownRequestError) {
            var ref;
            const errorType = (ref = error.meta) === null || ref === void 0 ? void 0 : ref.target;
            switch(errorType){
                case "User_id_key":
                    return res.status(409).json({
                        message: "\uC774\uBBF8 \uC0AC\uC6A9\uC911\uC778 \uC544\uC774\uB514\uC785\uB2C8\uB2E4."
                    });
            }
        }
        return res.status(409).json({
            message: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uC785\uB2C8\uB2E4. \uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694!"
        });
    }
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
var __webpack_exports__ = (__webpack_exec__(7262));
module.exports = __webpack_exports__;

})();