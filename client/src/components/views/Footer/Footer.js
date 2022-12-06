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
                프리캡스톤디자인 5조 <SmileOutlined />
            </p>
        </div>
    );
}

export default Footer;
