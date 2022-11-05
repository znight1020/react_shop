const express = require("express");
const router = express.Router();
const multer = require("multer");
const prod = require("../config/prod");
const { Product } = require("../models/Product");

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

router.post("/", (req, res) => {
    // 받아온 정보들을 DB에 넣어준다.

    const product = new Product(req.body);
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

router.post("/products", (req, res) => {
    // product collection에 들어 있는 모든 상품 정보를 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20; // parseInt는 req.body.limit이 String일 경우에 대비해
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Product.find()
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            return res
                .status(200)
                .json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length,
                });
        });
});

module.exports = router;
