import React from "react";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "antd/dist/antd.min.css";

const item1 = [
    { label: <a href="/">Home</a>, key: "home", icon: <HomeOutlined /> },
];
const item2 = [
    {
        label: <a href="/blog">Blogs</a>,
        key: "app",
        icon: <AppstoreOutlined />,
    },
];

function LeftMenu(props) {
    return <Menu mode="horizontal" items={(item1, item2)} />;
}
export default LeftMenu;
