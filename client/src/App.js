import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

// const authenticlandingpage = Auth({ LandingPage }, null); // html 요소는 모두 소문자
// const Authenticpage = Auth({ LoginPage }, false);
// const authenticregisterpage = Auth({ RegisterPage }, false);

const AuthLandingPage = Auth(LandingPage, null);
const AuthLoginPage = Auth(LoginPage, false);
const AuthRegisterPage = Auth(RegisterPage, false);

function App() {
    return (
        <Router>
            <div>
                {/* <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>

                <hr /> */}

                <Routes>
                    <Route path="/" element={<AuthLandingPage />} />
                    <Route path="/login" element={<AuthLoginPage />} />
                    <Route path="/register" element={<AuthRegisterPage />} />
                </Routes>
            </div>
        </Router>
    );
}

/**
 * Auth functionSpecificComponent = LandingPage
 * option = 유저의 권한(null = 아무나 출입, ....)
 * 3번째 인자는 admin만 접근이 가능한 Page, default를 null로 설정했기 때문에 명시 안해주면 일반유저가 접근 가능 -> true이면 관리자 접근
 */

export default App;
