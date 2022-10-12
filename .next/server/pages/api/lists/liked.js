"use strict";
(() => {
var exports = {};
exports.id = 4635;
exports.ids = [4635];
exports.modules = {

/***/ 1625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: ./src/libs/dummy.ts
const getMe = ()=>({
        idx: 0,
        id: "admin@naver.com",
        password: "asld123nakkf!@#askfdas",
        name: "\uAD00\uB9AC\uC790",
        avatar: "/avatar.png",
        introduction: "\uAE30\uB85D\uACFC \uC815\uB9AC\uB97C \uC88B\uC544\uD558\uB294 \uAC1C\uBC1C\uC790\uC785\uB2C8\uB2E4! \uD83D\uDC4F"
    })
;
const getDummyPosts = (kinds, page, keyword)=>{
    // 검색 테스트
    if (keyword) {
        if (keyword.toLocaleLowerCase().includes("react")) {
            return Array(4).fill(null).map((v, i)=>({
                    idx: i + page * 10,
                    title: "React.js [ \uD0A4\uC6CC\uB4DC \uD14C\uC2A4\uD2B8 ]",
                    summary: "\uB300\uCDA9 \uB9AC\uC561\uD2B8 \uAD00\uD55C \uB0B4\uC6A9\uD83D\uDC32",
                    thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
                    updatedAt: new Date(),
                    user: {
                        idx: 1,
                        name: "\uC720\uC800" + i,
                        avatar: "/avatar.png"
                    },
                    keywords: [
                        {
                            keyword: "React.js"
                        },
                        {
                            keyword: "Next.js"
                        }
                    ],
                    _count: {
                        comment: i + page * 10,
                        favorite: i + page * 10
                    }
                })
            );
        }
        if (keyword.toLocaleLowerCase().includes("vue")) {
            return Array(4).fill(null).map((v, i)=>({
                    idx: i + page * 10,
                    title: "Vue.js [ \uD0A4\uC6CC\uB4DC \uD14C\uC2A4\uD2B8 ]",
                    summary: "\uB300\uCDA9 \uBDF0 \uAD00\uD55C \uB0B4\uC6A9",
                    thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
                    updatedAt: new Date(),
                    user: {
                        idx: 1,
                        name: "\uC720\uC800" + i,
                        avatar: "/avatar.png"
                    },
                    keywords: [
                        {
                            keyword: "Next.js"
                        },
                        {
                            keyword: "Vue.js"
                        }
                    ],
                    _count: {
                        comment: i + page * 10,
                        favorite: i + page * 10
                    }
                })
            );
        }
        if (keyword.toLocaleLowerCase().includes("javascript")) {
            return Array(4).fill(null).map((v, i)=>({
                    idx: i + page * 10,
                    title: "JavaScript [ \uD0A4\uC6CC\uB4DC \uD14C\uC2A4\uD2B8 ]",
                    summary: "\uB300\uCDA9 \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uAD00\uD55C \uB0B4\uC6A9",
                    thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
                    updatedAt: new Date(),
                    user: {
                        idx: 1,
                        name: "\uC720\uC800" + i,
                        avatar: "/avatar.png"
                    },
                    keywords: [
                        {
                            keyword: "Next.js"
                        },
                        {
                            keyword: "JavaScript"
                        }
                    ],
                    _count: {
                        comment: i + page * 10,
                        favorite: i + page * 10
                    }
                })
            );
        }
    }
    const posts = Array(20).fill(null).map((v, i)=>({
            idx: i + page * 10,
            title: "\uB300\uCDA9 \uC81C\uBAA9 - " + i + page * 10,
            summary: "\uB300\uCDA9 \uC774\uB7F0 \uC800\uB7F0\n\uC904\uBC14\uAFC8\uD558\uACE0\n\uD83D\uDC40\uD83D\uDC32\u2712\uFE0F\u2796\uD83D\uDEA8\uD83D\uDD0D\uD83E\uDDE8\uD83C\uDF13\uD83D\uDE80\n\uC774\uBAA8\uD2F0\uCF58\uB3C4 \uB123\uC5B4\uBCF4\uACE0\n\uC774\uB7F0 \uB0B4\uC6A9 \uC544\uBB34\uD2BC - " + i + page * 10,
            thumbnail: i % 2 ? "/cat.jpg" : "/venice.jpg",
            updatedAt: Date.now() - 1000 * 60 * 60 * 24 * i,
            user: {
                idx: 1,
                name: "\uC720\uC800" + i,
                avatar: "/avatar.png"
            },
            keywords: [
                {
                    keyword: "React.js"
                },
                {
                    keyword: "Next.js"
                },
                {
                    keyword: "Vue.js"
                },
                {
                    keyword: "JavaScript"
                },
                {
                    keyword: "HTML5"
                },
                {
                    keyword: "CSS3"
                },
                {
                    keyword: "SWR"
                },
                {
                    keyword: "AWS"
                },
                {
                    keyword: "tailwindCss"
                },
                {
                    keyword: "styled-components"
                }, 
            ],
            _count: {
                comment: i + page * 10,
                favorite: i + page * 10
            }
        })
    );
    if (kinds === "popular") return posts.reverse();
    else return posts;
};
const getDummyPost = ()=>({
        idx: 0,
        title: "React.js [\uD14C\uC2A4\uD2B8\uC6A9 \uAC8C\uC2DC\uAE00]",
        contents: `# 첫 번째 목록 테스트
  + 순서
  + 순서
  1. 숫자
  2. 숫자

  ## 두 번째 코드 블럭 테스트
  \`\`\`
  코드 블럭
  \`\`\`

  
  ### 세 번째 블럭 테스트
  \`테스트\`

  # h1 테스트

  #### 네 번째 테이블 테스트
  |제목|내용|설명|
  |:---|---:|:---:|
  |왼쪽정렬|오른쪽정렬|중앙정렬|
  |왼쪽정렬|오른쪽정렬|중앙정렬|
  |왼쪽정렬|오른쪽정렬|중앙정렬|

  ## h2 테스트

  ##### 다섯 번째 글자 형식 테스트
  **굵은 글씨**
  ~중간라인~

  ###### 여섯 번째 링크, 이미지, 문구 테스트
  [링크](https://github.com/1-blue)
  
  ![이미지](https://blemarket.s3.ap-northeast-2.amazonaws.com/images/production/germany_1650793243414)

  > 👉 중요한 내용 👈
  `,
        thumbnail: "/venice.jpg",
        updatedAt: new Date(Date.now()),
        summary: "\uB300\uCDA9 \uC694\uC57D",
        user: getMe(),
        _count: {
            comment: 12,
            favorite: 3
        },
        keywords: [
            {
                keyword: "React.js"
            },
            {
                keyword: "Vue.js"
            },
            {
                keyword: "Node.js"
            }, 
        ]
    })
;
const getRelevantPosts = ()=>Array(4).fill(null).map((v, i)=>({
            idx: i,
            title: `React.js [테스트용 연관 게시글 - ${i}]`,
            thumbnail: "/venice.jpg",
            updatedAt: new Date(Date.now()),
            summary: "\uB300\uCDA9 \uC694\uC57D",
            user: getMe(),
            _count: {
                comment: 0,
                favorite: i
            }
        })
    )
;
const getCategorizedPosts = ()=>Array(8).fill(null).map((v, i)=>({
            idx: i,
            title: `React.js [테스트용 카테고리 게시글 - ${i}]`,
            thumbnail: "/cat.jpg",
            updatedAt: new Date(Date.now()),
            summary: "\uB300\uCDA9 \uC694\uC57D",
            user: getMe(),
            _count: {
                comment: 0,
                favorite: i
            }
        })
    )
;
const getRecomments = (number)=>{
    return Array(14).fill(null).map((v, i)=>({
            idx: i + 2000,
            contents: "\uB2F5\uAE00 \uD83D\uDC32 - " + i,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            user: getMe(),
            postIdx: 1,
            commentIdx: i + number * 10
        })
    );
};
const getComments = (page)=>{
    if (page === 0) {
        return Array(10).fill(null).map((v, i)=>({
                idx: i,
                contents: "\uB313\uAE00 - " + i,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                user: getMe(),
                postIdx: 1,
                recomments: i === 0 || i === 1 ? getRecomments(0) : undefined
            })
        );
    } else if (page === 1) {
        return Array(3).fill(null).map((v, i)=>({
                idx: i + 5,
                contents: "\uCD94\uAC00\uB85C \uD328\uCE58\uD55C \uB313\uAE00 - " + i + 5,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                user: getMe(),
                postIdx: 1
            })
        );
    }
    return [];
};
const getLikers = ()=>Array(3).fill(null).map((v, i)=>({
            idx: i,
            name: "\uD14C\uC2A4\uD2B8 \uC720\uC800" + i,
            avatar: "/avatar.png",
            introduction: "\uD14C\uC2A4\uD2B8 \uC544\uBB34\uB9D0" + i
        })
    )
;
const getTempPosts = (page)=>{
    if (page === 0) {
        return Array(6).fill(null).map((v, i)=>({
                idx: i,
                title: "\uC784\uC2DC \uC800\uC7A5 \uAC8C\uC2DC\uAE00" + i,
                updatedAt: Date.now(),
                summary: "\uC784\uC2DC \uC800\uC7A5 \uB0B4\uD83D\uDC32\n\u0F3C \u3064 \u25D5_\u25D5 \u0F3D\u3064\n( \xb4\uFF65\uFF65)\uFF89(._.`)" + i
            })
        );
    } else if (page === 1) {
        return Array(3).fill(null).map((v, i)=>({
                idx: i,
                title: "\uCD94\uAC00\uB41C \uC784\uC2DC \uC800\uC7A5 \uAC8C\uC2DC\uAE00" + i,
                updatedAt: Date.now(),
                summary: "\uCD94\uAC00\uB41C \uC784\uC2DC \uC800\uC7A5 \uB0B4\uD83D\uDC32" + i
            })
        );
    }
};
const getLikedPosts = ()=>Array(7).fill(null).map((v, i)=>({
            idx: i,
            title: "\uC88B\uC544\uC694 \uB204\uB978 \uAC8C\uC2DC\uAE00",
            updatedAt: Date.now(),
            summary: "\uC88B\uC544\uC694\n\u0F3C \u3064 \u25D5_\u25D5 \u0F3D\u3064",
            thumbnail: "/cat.jpg",
            user: {
                idx: 1,
                name: "\uC720\uC800"
            },
            _count: {
                comment: 123,
                favorite: 25
            }
        })
    )
;

;// CONCATENATED MODULE: ./src/pages/api/lists/liked.ts

async function handler(req, res) {
    res.status(200).json({
        status: {
            ok: true
        },
        data: {
            posts: getLikedPosts()
        }
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1625));
module.exports = __webpack_exports__;

})();