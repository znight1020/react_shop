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
    let term = req.body.searchTerm;

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], // gte = grater than equal : 이것보다 크거나 같고               - 둘다 mongoDB꺼
                    $lte: req.body.filters[key][1], // let = less than equal : 이것보다 작거나 같은                  - 0원보다 크거나 같고 4999원보다 작거나 같고
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        } // key는 categories or price가 된다.
    }
    //console.log("findArgs", findArgs);

    if (term) {
        Product.find(findArgs) // findArgs가 뭔가? findArgs로 설정된 categories = n,n,n,n만 찾아서 가져와라
            .find({ title: { $regex: term } }) // mongodb에서 제공해주는 $text, $search
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length,
                });
            });
    } else {
        Product.find(findArgs) // findArgs가 뭔가? findArgs로 설정된 categories = n,n,n,n만 찾아서 가져와라
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true,
                    productInfo,
                    postSize: productInfo.length,
                });
            });
    }
});

module.exports = router;
