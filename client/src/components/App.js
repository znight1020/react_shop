import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from "./views/CartPage/CartPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import "antd/dist/antd.min.css";
import "./styles.css";

import Auth from "../hoc/auth";

const AuthLandingPage = Auth(LandingPage, null);
const AuthLoginPage = Auth(LoginPage, false);
const AuthRegisterPage = Auth(RegisterPage, false);
const AuthUploadProductPage = Auth(UploadProductPage, true);
const AuthDetailProductPage = Auth(DetailProductPage, null);
const AuthCartPage = Auth(CartPage, true);

function App(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <NavBar />
                <div
                    style={{
                        paddingTop: "69px",
                        minHeight: "calc(100vh - 80px)",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<AuthLandingPage />} />
                        <Route path="/login" element={<AuthLoginPage />} />
                        <Route
                            path="/register"
                            element={<AuthRegisterPage />}
                        />
                        <Route
                            path="/product/upload"
                            element={<AuthUploadProductPage />}
                        />
                        <Route
                            path="/product/:productId"
                            element={<AuthDetailProductPage />}
                        />
                        <Route path="/user/cart" element={<AuthCartPage />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </Suspense>
    );
}

/**
 * Auth functionSpecificComponent = LandingPage
 * option = 유저의 권한(null = 아무나 출입, ....)
 * 3번째 인자는 admin만 접근이 가능한 Page, default를 null로 설정했기 때문에 명시 안해주면 일반유저가 접근 가능 -> true이면 관리자 접근
 */

export default App;
