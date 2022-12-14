import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import "./Sections/Navbar.css";
//import "./Sections/Navba.css";
import { Drawer, Button } from "antd";
import { AlignRightOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

function NavBar() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <nav
            className="menu"
            style={{ position: "fixed", zIndex: 5, width: "100%" }}
        >
            <div className="menu__logo">
                <a href="/">5조</a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_rigth">
                    <RightMenu mode="horizontal" />
                </div>
                <Button
                    className="menu__mobile-button"
                    type="primary"
                    onClick={showDrawer}
                >
                    <span className="barsBtn" />
                    <AlignRightOutlined />
                </Button>

                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    //visible={visible} 버전 업데이트 되면서 open으로 써야함.
                    open={visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    );
}

export default NavBar;
