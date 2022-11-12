import React from "react";
import { Menu, Badge, Avatar } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    SettingOutlined,
    UploadOutlined,
    LoginOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.min.css";

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
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">
                        <LoginOutlined /> Sign In
                    </a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">
                        <SettingOutlined /> Sign Up
                    </a>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="cart">
                    <a href="/user/cart">
                        <Badge count={5}>
                            <ShoppingCartOutlined
                                style={{ fontSize: 30, marginTop: 7 }}
                            />
                        </Badge>
                    </a>
                </Menu.Item>

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
