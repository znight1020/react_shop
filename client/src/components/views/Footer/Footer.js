import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

function Footer(props) {
    return (
        <div
            style={{
                height: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
            }}
        >
            <p>
                {" "}
                <a href="//drive.google.com/file/d/1Q16i7Anadj3vIGZpCJtpYrf6OA2sY4Jt/view?usp=sharing">&nbsp;&nbsp;&nbsp;APK를 다운받고 핸드폰에서 AR 피팅 프로그램을 실행시켜보세요!</a> 
            </p>
            <p>프리캡스톤디자인 5조 <SmileOutlined /></p>
        </div>
    );
}

export default Footer;
