"use strict";
exports.id = 4448;
exports.ids = [4448];
exports.modules = {

/***/ 4448:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "b": () => (/* binding */ axiosInstance),
  "Z": () => (/* binding */ api)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./src/api/photo.ts


/**
 * 2022/09/23 - presignedURL을 이용해서 이미지를 업로드하는 함수 - by 1-blue
 * @param object file: File 형태 입력, kinds: 이미지 종류 ( user, post )
 * @returns 업로드된 이미지 URL(photoURL)반환 ( "photoURL"가 null이 아니면 성공 )
 */ const apiCreatePhoto = async ({ file , kinds  })=>{
    try {
        const { data: { preSignedURL , photoURL , message  } ,  } = await axiosInstance.get(`/photo?name=${file.name}&kinds=${kinds}`);
        // 예측 불가능한 에러
        if (!preSignedURL || !photoURL) return {
            photoURL,
            preSignedURL,
            message: "\uC54C \uC218 \uC5C6\uB294 \uC5D0\uB7EC\uC785\uB2C8\uB2E4. \uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694!"
        };
        await external_axios_default().put(preSignedURL, file, {
            headers: {
                "Content-Type": file.type
            }
        });
        return {
            photoURL,
            preSignedURL,
            message
        };
    } catch (error) {
        console.error("apiCreatePhoto() >> ", error);
        // 예측 가능한 에러 ( 잘못된 형식의 데이터를 전달받음 )
        if (error instanceof external_axios_.AxiosError) {
            var ref;
            const { preSignedURL , photoURL , message  } = (ref = error.response) === null || ref === void 0 ? void 0 : ref.data;
            return {
                photoURL,
                preSignedURL,
                message
            };
        }
        // 예측 불가능한 에러
        return {
            photoURL: null,
            preSignedURL: null,
            message: "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694!"
        };
    }
};
/**
 * 2022/09/23 - 이미지 관련 api 요청 객체 - by 1-blue
 */ const photoService = {
    apiCreatePhoto
};
/* harmony default export */ const photo = (photoService);

;// CONCATENATED MODULE: ./src/api/auth.ts

/**
 * 2022/09/23 - 회원가입 요청 - by 1-blue
 * @param body 회원가입에 필요한 데이터들 ( id, password, name, email, phone, photo? )
 * @returns 결과 메시지 ( message )
 */ const apiSignUp = (body)=>axiosInstance.post(`/signup`, body)
;
/**
 * 2022/09/23 - 인증 관련 api 요청 객체 - by 1-blue
 */ const authService = {
    apiSignUp
};
/* harmony default export */ const auth = (authService);

;// CONCATENATED MODULE: ./src/api/post.ts

/**
 * 2022/09/23 - 게시글들 패치 - by 1-blue
 * @param body lastIdx: 마지막 게시글 식별자, limit: 게시글 요청 개수, kinds: 인기순/최신순
 * @returns 게시글들
 */ const apiGetPosts = ({ lastIdx , limit , kinds  })=>axiosInstance.get(`/posts?lastIdx=${lastIdx}&limit=${limit}&kinds=${kinds}`)
;
/**
 * 2022/09/24 - 특정 게시글 패치 - by 1-blue
 * @param body name: 게시글의 작성자 이름, title: 게시글의 제목
 * @returns 특정 게시글
 */ const apiGetPost = ({ name , title  })=>axiosInstance.get(encodeURI(`/post?name=${name}&title=${title}`))
;
/**
 * 특정 게시글과 연관된 게시글들 불러오는 함수는 생략 ( SWR로 처리함 )
 */ /**
 * 2022/09/24 - 특정 게시글 제거 - by 1-blue
 * @param body postIdx: 게시글 식별자
 * @returns 결과 메시지
 */ const apiDeletePost = ({ postIdx  })=>axiosInstance["delete"](`/post?postIdx=${postIdx}`)
;
/**
 * 2022/09/24 - 특정 게시글에 좋아요 생성 - by 1-blue
 * @param body postIdx: 게시글 식별자
 * @returns 결과 메시지
 */ const apiCreateFavorite = ({ postIdx  })=>axiosInstance.post(`/post/favorite?postIdx=${postIdx}`)
;
/**
 * 2022/09/24 - 특정 게시글에 좋아요 제거 - by 1-blue
 * @param body postIdx: 게시글 식별자
 * @returns 결과 메시지
 */ const apiDeleteFavorite = ({ postIdx  })=>axiosInstance["delete"](`/post/favorite?postIdx=${postIdx}`)
;
/**
 * 2022/09/24 - 게시글 생성 - by 1-blue
 * @param body 게시글 생성에 필요한 데이터
 * @returns 결과 메시지
 */ const apiCreatePost = (body)=>axiosInstance.post(`/post`, body)
;
/**
 * 2022/09/24 - 게시글 임시 생성 - by 1-blue
 * @param body 게시글 임시 생성에 필요한 데이터
 * @returns 결과 메시지
 */ const apiCreateTemporaryPost = (body)=>axiosInstance.post(`/post/temporary`, body)
;
/**
 * 2022/09/25 - 특정 게시글과 같은 작성자면서 같은 카테고리를 가진 게시글들 요청 - by 1-blue
 * @param body postIdx: 게시글 식별자, userIdx: 게시글 작성자 식별자
 * @returns 게시글들의 제목
 */ const apiGetPostsByCategory = ({ postIdx , userIdx  })=>axiosInstance.get(`/post/category?postIdx=${postIdx}&userIdx=${userIdx}`)
;
/**
 * 2022/09/26 - 특정 임시 게시글 제거 - by 1-blue
 * @param body postIdx: 게시글의 식별자
 * @returns 결과 메시지
 */ const apiDeleteTemporaryPost = ({ postIdx  })=>axiosInstance["delete"](`/post/temporary?postIdx=${postIdx}`)
;
/**
 * 2022/09/23 - 게시글 관련 api 요청 객체 - by 1-blue
 */ const postService = {
    apiGetPosts,
    apiGetPost,
    apiDeletePost,
    apiCreateFavorite,
    apiDeleteFavorite,
    apiCreatePost,
    apiCreateTemporaryPost,
    apiGetPostsByCategory,
    apiDeleteTemporaryPost
};
/* harmony default export */ const post = (postService);

;// CONCATENATED MODULE: ./src/api/comment.ts

/**
 * 특정 게시글의 댓글들 패치하는 로직은 SWR로 대체
 */ /**
 * 2022/09/24 - 댓글 생성 - by 1-blue
 * @param body postIdx: 특정 게시글 식별자, contents: 댓글 내용
 * @returns
 */ const apiCreateComment = (body)=>axiosInstance.post(`/comment`, body)
;
/**
 * 2022/09/24 - 댓글 제거 - by 1-blue
 * @param body postIdx: 특정 게시글 식별자, contents: 댓글 내용
 * @returns
 */ const apiDeleteComment = ({ commentIdx  })=>axiosInstance["delete"](`/comment?commentIdx=${commentIdx}`)
;
/**
 * 2022/09/24 - 댓글 관련 api 요청 객체 - by 1-blue
 */ const commentService = {
    apiCreateComment,
    apiDeleteComment
};
/* harmony default export */ const comment = (commentService);

;// CONCATENATED MODULE: ./src/api/reply.ts

/**
 * 특정 게시글의 답글들 패치하는 로직은 SWR로 대체
 */ /**
 * 2022/09/24 - 답글 생성 - by 1-blue
 * @param body commentIdx: 특정 댓글 식별자, contents: 답글 내용
 * @returns
 */ const apiCreateReply = (body)=>axiosInstance.post(`/reply`, body)
;
/**
 * 2022/09/24 - 답글 제거 - by 1-blue
 * @param body replyIdx: 특정 답글 식별자
 * @returns
 */ const apiDeleteReply = ({ replyIdx  })=>axiosInstance["delete"](`/reply?replyIdx=${replyIdx}`)
;
/**
 * 2022/09/24 - 답글 관련 api 요청 객체 - by 1-blue
 */ const replyService = {
    apiCreateReply,
    apiDeleteReply
};
/* harmony default export */ const reply = (replyService);

;// CONCATENATED MODULE: ./src/api/category.ts

/**
 * 2022/09/25 - 로그인한 유저의 모든 카테고리 요청 - by 1-blue
 * @returns 결과 메시지
 */ const apiGetCategories = ()=>axiosInstance.get(`/category`)
;
/**
 * 2022/09/25 - 카테고리 생성 요청 - by 1-blue
 * @param body category: 생성할 카테고리 이름
 * @returns 결과 메시지
 */ const apiCreateCategory = (body)=>axiosInstance.post(`/category`, body)
;
/**
 * 2022/09/25 - 카테고리 관련 api 요청 객체 - by 1-blue
 */ const categoryService = {
    apiGetCategories,
    apiCreateCategory
};
/* harmony default export */ const category = (categoryService);

;// CONCATENATED MODULE: ./src/api/user.ts

/**
 * 2022/09/26 - 특정 유저의 접근 가능한 정보 요청 - by 1-blue
 * @param body name: 특정 유저의 이름
 * @returns 특정 유저의 접근 가능한 데이터
 */ const apiGetUser = ({ name  })=>axiosInstance.get(encodeURI(`/user?name=${name}`))
;
/**
 * 2022/09/26 - 유저 정보 수정 요청 - by 1-blue
 * @param body 수정할 정보들
 * @returns 결과 메시지
 */ const apiUpdateUser = (body)=>axiosInstance.patch("/user", body)
;
/**
 * 2022/09/27 - 회원 탈퇴 요청 - by 1-blue
 * @returns 결과 메시지
 */ const apiDeleteUser = ()=>axiosInstance["delete"]("/user")
;
/**
 * 2022/09/26 - 유저 관련 api 요청 객체 - by 1-blue
 */ const userService = {
    apiGetUser,
    apiUpdateUser,
    apiDeleteUser
};
/* harmony default export */ const user = (userService);

;// CONCATENATED MODULE: ./src/api/index.ts

const axiosInstance = external_axios_default().create({
    baseURL: "https://jslog.co.kr" + "/api",
    withCredentials: true,
    timeout: 10000
});







/**
 * 2022/09/23 - api요청 관련 메서드들을 가진 객체 - by 1-blue
 */ const apiService = {
    photoService: photo,
    authService: auth,
    postService: post,
    commentService: comment,
    replyService: reply,
    categoryService: category,
    userService: user
};
/* harmony default export */ const api = (apiService);


/***/ })

};
;