import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    SettingOutlined,
    UploadOutlined,
    LoginOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.min.css";

const items = [
    {
        label: <a href="/login">Signin</a>,
        key: "mail",
        icon: <LoginOutlined />,
    },
    {
        label: <a href="/register">Signup</a>,
        key: "app",
        icon: <SettingOutlined />,
    },
];

// const logInItem1 = [
//     {
//         label: <a href="/product/upload">Upload</a>,
//         key: "upload",
//         icon: <UploadOutlined />,
//     },
//     {
//         label: <a href="/login">Logout</a>,
//         key: "logout",
//         icon: <LogoutOutlined />,
//     },
// ];

function RightMenu(props) {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then((response) => {
            if (response.status === 200) {
                navigate("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return <Menu mode="horizontal" items={items} />;
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <a href="/product/upload">
                        <UploadOutlined />
                        Upload
                    </a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>
                        <LogoutOutlined />
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        );
    }
}
export default RightMenu;

// export default withRouter(RightMenu);
