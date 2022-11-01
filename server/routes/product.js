const express = require("express");
const router = express.Router();
const multer = require("multer");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // destination 어디에 파일이 저장되는가?
        cb(null, "uploads/"); // root의 upload폴더로 지정
    },
    filename: function (req, file, cb) {
        // 파일을 저장할때 어떠한 이름으로 저장할지
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
    // 가져온 이미지를 저장 해주면 된다. 이때 multer사용 google에 multer npm 검색해서 사용
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

module.exports = router;
