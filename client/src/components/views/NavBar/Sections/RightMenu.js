import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined, SettingOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

const items = [
    {
        label: <a href="/login">Signin</a>,
        key: "mail",
        icon: <CheckCircleOutlined />,
    },
    {
        label: <a href="/register">Signup</a>,
        key: "app",
        icon: <SettingOutlined />,
    },
];

const logInItems = [
    { label: <a href="/product/upload">upload</a>, key: "upload" },
    {
        label: <a href="/">logout</a>,
        key: "logout",
    },
];

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
            <Menu
                mode="horizontal"
                items={logInItems}
                onClick={logoutHandler}
            />
        );
    }
}
export default RightMenu;

// export default withRouter(RightMenu);
