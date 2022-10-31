const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected.."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/api/hello", (req, res) => {
    res.send("안녕하세요 ~");
});

app.post("/api/users/register", (req, res) => {
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

app.post("/api/users/login", (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            });
        }

        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err); // 400은 실패했다는 뜻

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
app.get("/api/users/auth", auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        Image: req.user.image,
    });
});

app.get("/api/users/logout", auth, (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
