import React from "react";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "antd/dist/antd.min.css";

const items = [
    { label: <a href="/">Home</a>, key: "home", icon: <HomeOutlined /> },
    {
        label: <a href="/blog">Blogs</a>,
        key: "app",
        icon: <AppstoreOutlined />,
    },
];

function LeftMenu(props) {
    return <Menu mode="horizontal" items={items} />;
}
export default LeftMenu;
