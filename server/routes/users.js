const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {
    //회원 가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

router.post("/login", (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found",
            });
        }

        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Wrong password",
                });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("x_authExp", user.tokenExp); // 400은 실패했다는 뜻

                // 토큰을 저장한다. 어디에 ?  쿠기, 로컬스토리지 등등 저장할 곳은 많음,
                // 어디가 가장 안전한가? 논란이 많다, 각자 다 장단점이 있음

                //쿠키에 저장해보자
                res.cookie("x_auth", user.token)
                    .status(200) // 200은 성공했다는 뜻
                    .json({ loginSuccess: true, userId: user._id });
            });
        });

        // 비밀번호까지 맞다면 토큰을 생성해준다. 토큰생성을 위해 JSONWEBTOKEN 라이브러리를 다운받아야 함
    });
});
// role 0 = 일반유저, 0이 아니면 관리자

//auth는 미들웨어 = '/api/users/auth' 와 (req,res) 중간에서 무언가를 해주는 역할

router.get("/logout", auth, (req, res) => {
    // 로그아웃 기능
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "", tokenExp: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true,
            });
        }
    );
});

router.post("/addTocart", auth, (req, res) => {
    // 먼저 User Collection에 해당 유저 정보를 가져오기
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        // 가져온 정보에서 카트에다 넣으려하는 상품이 이미 들어 있는지 확인
        let duplicate = false;

        userInfo.cart.forEach((item) => {
            if (item.id === req.body.productId) {
                duplicate = true;
            }
        });

        // 상품이 이미 있을때
        if (duplicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    "cart.id": req.body.productId,
                },
                {
                    $inc: { "cart.$.quantity": 1 },
                },
                { new: true },
                (err, userInfo) => {
                    if (err)
                        return res.status(200).json({ success: false, err });
                    res.status(200).send(userInfo.cart);
                }
            );
        } else {
            // 상품이 이미 없을때
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true },
                (err, userInfo) => {
                    if (err) {
                        return res.status(400).json({ success: false, err });
                    }
                    res.status(200).send(userInfo.cart);
                }
            );
        }
    });
});
module.exports = router;
