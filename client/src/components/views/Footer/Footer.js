import React from "react";
// import { Icon } from "antd";
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
                APK를 다운받고 핸드폰에서 AR 피팅 프로그램을 실행시켜보세요! &nbsp;&nbsp;&nbsp;
                <a href="//www.naver.com"> www.naver.com </a> 
            </p>
            <p>프리캡스톤디자인 5조 <SmileOutlined /></p>
        </div>
    );
}

export default Footer;
