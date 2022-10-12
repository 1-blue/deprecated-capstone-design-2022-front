"use strict";
(() => {
var exports = {};
exports.id = 9971;
exports.ids = [9971];
exports.modules = {

/***/ 8309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "aws-sdk"
const external_aws_sdk_namespaceObject = require("aws-sdk");
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_namespaceObject);
;// CONCATENATED MODULE: ./src/libs/s3.ts

external_aws_sdk_default().config.update({
    region: process.env.JSLOG_AWS_REGION,
    accessKeyId: process.env.JSLOG_AWS_ACCESS_KEY,
    secretAccessKey: process.env.JSLOG_AWS_SECRET_KEY
});
const S3 = new (external_aws_sdk_default()).S3({
    apiVersion: "2012-10-17",
    signatureVersion: "v4"
});
/**
 * "이미지.확장자"를 받아서 "경로/이미지_시간.확장자"으로 변경해주는 함수
 * @param name "이미지.확장자" 형태로 전송
 * @returns "경로/이미지_시간.확장자" 형태로 반환
 */ const getPhotoPath = (name, kinds)=>{
    const [filename, ext] = name.split(".");
    return `photos/${"production"}/temporary/${kinds}/${filename}_${Date.now()}.${ext}`;
};
/**
 * "preSignedURL"을 생성하는 함수
 * @param name "이미지.확장자" 형태로 전송
 * @returns "preSignedURL"와 "photoURL"을 반환 ( "photoURL"은 정상적으로 완료 시 이미지 url )
 */ const getSignedURL = (name, kinds)=>{
    const photoURL = getPhotoPath(name, kinds);
    const preSignedURL = S3.getSignedUrl("putObject", {
        Bucket: "blelog",
        Key: photoURL,
        Expires: 20
    });
    return {
        preSignedURL,
        photoURL
    };
};
/**
 * 2022/09/23 - S3 이미지 제거 - by 1-blue
 * @param photo 이미지 파일 이름
 * @returns
 */ const deletePhoto = (photo)=>S3.deleteObject({
        Bucket: "blelog",
        Key: photo
    }, (error, data)=>{
        if (error) console.error("S3 \uC774\uBBF8\uC9C0 \uC81C\uAC70 error >> ", error);
    }).promise()
;
/**
 * 2022/09/23 - S3 이미지 복사 - by 1-blue
 * @param originalSource: 이미지 파일 이름, location: 이미지 복사 위치
 * @returns
 */ const copyPhoto = (originalSource, location)=>{
    let Key = null;
    const firstSlashIndex = originalSource.indexOf("/");
    const secondSlashIndex = originalSource.indexOf("/", firstSlashIndex + 1);
    switch(location){
        // 이미지 제거
        case "remove":
            Key = originalSource.slice(0, secondSlashIndex) + "/" + location + originalSource.slice(secondSlashIndex);
            break;
        // 이미지 사용 확정으로 인한 이미지 이동
        default:
            Key = originalSource.replace("/temporary", "");
            break;
    }
    if (typeof Key !== "string") return console.error("\uC774\uBBF8\uC9C0 \uC800\uC7A5 \uC704\uCE58\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    return S3.copyObject({
        Bucket: "blelog",
        CopySource: "blelog" + "/" + originalSource,
        Key
    }, (error, data)=>{
        /**
       * >>> 여기가 가끔씩 두 번 실행됨, 요청은 한 번으로 확인했고, callback이 두 번 실행되면서 에러가 발생함
       * 하지만 첫 번째 실행에 정상작동해서 이미지 복사는 정상적으로 실행되므로 상관은 없지만 에러 로그가 남는 문제가 발생
       */ if (error) console.error("S3 \uC774\uBBF8\uC9C0 \uC774\uB3D9 error >> ", error);
    }).promise();
};
/**
 * 2022/09/23 - S3 이미지 이동 ( 복사 후 제거 ) - by 1-blue
 * @param photo: 이미지 파일 이름, location: 이미지 복사 위치
 * @returns
 */ const movePhoto = async (photo, location)=>{
    // OAuth의 이미지를 사용하는 경우
    if (photo.includes("http")) return;
    try {
        await copyPhoto(photo, location);
        await deletePhoto(photo);
    } catch (error) {
        console.error("movePhoto >> ", error);
    }
};

;// CONCATENATED MODULE: ./src/pages/api/photo.ts
// util

async function handler(req, res) {
    const { query , method  } = req;
    // 이미지 업로드 url 받기
    if (method === "GET") {
        if (typeof query.name === "string") {
            const { name , kinds  } = query;
            const { photoURL , preSignedURL  } = getSignedURL(name, kinds);
            return res.status(200).json({
                preSignedURL,
                photoURL,
                message: "\uC774\uBBF8\uC9C0\uB97C \uC5C5\uB85C\uB4DC\uC911\uC785\uB2C8\uB2E4. \uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824\uC8FC\uC138\uC694!"
            });
        }
    }
    return res.status(412).json({
        preSignedURL: null,
        photoURL: null,
        message: "\uC798\uBABB\uB41C \uB370\uC774\uD130\uB97C \uC804\uB2EC\uBC1B\uC558\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC\uD6C4\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694!"
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8309));
module.exports = __webpack_exports__;

})();