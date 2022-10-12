"use strict";
(() => {
var exports = {};
exports.id = 3748;
exports.ids = [3748];
exports.modules = {

/***/ 7096:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 3809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/credentials"
const credentials_namespaceObject = require("next-auth/providers/credentials");
var credentials_default = /*#__PURE__*/__webpack_require__.n(credentials_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/kakao"
const kakao_namespaceObject = require("next-auth/providers/kakao");
var kakao_default = /*#__PURE__*/__webpack_require__.n(kakao_namespaceObject);
// EXTERNAL MODULE: external "bcrypt"
var external_bcrypt_ = __webpack_require__(7096);
var external_bcrypt_default = /*#__PURE__*/__webpack_require__.n(external_bcrypt_);
// EXTERNAL MODULE: ./src/prisma/index.ts + 1 modules
var prisma = __webpack_require__(6711);
;// CONCATENATED MODULE: ./src/pages/api/auth/[...nextauth].ts





/* harmony default export */ const _nextauth_ = (external_next_auth_default()({
    providers: [
        // 인증 방식 선택 ( 현재는 "id" + "password" )
        credentials_default()({
            name: "Credentials",
            credentials: {
                id: {
                    label: "\uC544\uC774\uB514",
                    type: "text",
                    placeholder: "\uC544\uC774\uB514\uB97C \uC785\uB825\uD558\uC138\uC694."
                },
                password: {
                    label: "\uBE44\uBC00\uBC88\uD638",
                    type: "password",
                    placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694."
                }
            },
            // 로그인 유효성 검사
            async authorize (credentials) {
                if (!credentials) throw new Error("\uC798\uBABB\uB41C \uC785\uB825\uAC12\uC73C\uB85C \uC778\uD55C \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.");
                const { id , password  } = credentials;
                const exUser = await prisma/* default.user.findUnique */.Z.user.findUnique({
                    where: {
                        id
                    }
                });
                if (!exUser) throw new Error("\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uC544\uC774\uB514\uC785\uB2C8\uB2E4.");
                if (!exUser.password) throw new Error("\uC798\uBABB\uB41C \uB85C\uADF8\uC778 \uBC29\uC2DD\uC785\uB2C8\uB2E4.");
                const result = await external_bcrypt_default().compare(password, exUser.password);
                if (!result) throw new Error("\uBE44\uBC00\uBC88\uD638\uAC00 \uBD88\uC77C\uCE58\uD569\uB2C8\uB2E4.");
                return exUser;
            }
        }),
        // 카카오 로그인
        kakao_default()({
            clientId: process.env.KAKAO_ID,
            clientSecret: process.env.KAKAO_SECRET
        }), 
    ],
    callbacks: {
        async jwt ({ token , account  }) {
            // 카카오 로그인일 경우
            if ((account === null || account === void 0 ? void 0 : account.provider) === "kakao") {
                const exUser = await prisma/* default.user.findFirst */.Z.user.findFirst({
                    where: {
                        provider: "KAKAO",
                        name: token.name
                    }
                });
                // 등록된 유저가 아니라면 회원가입
                if (!exUser) {
                    await prisma/* default.user.create */.Z.user.create({
                        data: {
                            name: token.name,
                            photo: token.picture,
                            provider: "KAKAO"
                        }
                    });
                }
            }
            return token;
        },
        // 세션에 로그인한 유저 데이터 입력
        async session ({ session  }) {
            // >>> 유저를 식별한 유일한 값이 필요함
            const exUser = await prisma/* default.user.findFirst */.Z.user.findFirst({
                where: {
                    name: session.user.name
                },
                select: {
                    idx: true,
                    id: true,
                    name: true,
                    photo: true,
                    introduction: true
                }
            });
            session.user = exUser;
            return session;
        }
    },
    secret: process.env.SECRET
}));


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
var __webpack_exports__ = (__webpack_exec__(3809));
module.exports = __webpack_exports__;

})();