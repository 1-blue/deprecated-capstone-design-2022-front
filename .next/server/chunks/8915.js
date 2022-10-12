"use strict";
exports.id = 8915;
exports.ids = [8915];
exports.modules = {

/***/ 8915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eV": () => (/* binding */ combinePhotoUrl),
/* harmony export */   "Nn": () => (/* binding */ combineClassNames),
/* harmony export */   "eB": () => (/* binding */ getTitleList),
/* harmony export */   "NC": () => (/* binding */ throttleHelper)
/* harmony export */ });
/* unused harmony export dedounceHelper */
/**
 * 2022/09/23 - 이미지 경로 붙여주는 헬퍼함수 - by 1-blue
 * @param path 이미지 후반부 경로
 * @returns "aws-s3"의 전체 이미지 경로
 */ const combinePhotoUrl = (path)=>"https://blelog.s3.ap-northeast-2.amazonaws.com" + "/" + path
;
// 2022/03/21 - 나열된 클래스명을 공백기준으로 합친 문자열로 만들어주는 헬퍼함수 - by 1-blue
const combineClassNames = (...classname)=>classname.join(" ")
;
// 2022/05/04 - 문장에서 제목인 단어만 골라서 단어와 크기( h1 ~ h6 ) 객체로 반환 - by 1-blue
const getTitleList = (sentence)=>{
    const titleListArray = [
        ...sentence.matchAll(/((?<=^[\s]*#{1}\s).+)|((?<=^[\s]*#{2}\s).+)|((?<=^[\s]*#{3}\s).+)|((?<=^[\s]*#{4}\s).+)|((?<=^[\s]*#{5}\s).+)|((?<=^[\s]*#{6}\s).+)/gm), 
    ];
    const titleList = [];
    titleListArray.map((title)=>{
        // #, ##, ... ###### 중 어느것인지 판단해서 그 크기를 0(h1) ~ 5(h6)로 반환함
        const size = title.slice(1).findIndex((v)=>{
            return (v === null || v === void 0 ? void 0 : v.length) > 0;
        });
        titleList.push({
            text: title[0],
            size
        });
    });
    return titleList;
};
// 2022/05/11 - 스로틀 헬퍼 함수 - by 1-blue
const throttleHelper = (callback, waitTime)=>{
    let timerId = null;
    return ()=>{
        if (timerId) return;
        timerId = setTimeout(()=>{
            callback();
            timerId = null;
        }, waitTime);
    };
};
// 2022/05/11 - 디바운스 헬퍼 함수 - by 1-blue
const dedounceHelper = (callback, waitTime)=>{
    let timerId = null;
    return ()=>{
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(()=>{
            callback();
            timerId = null;
        }, waitTime);
    };
};


/***/ })

};
;