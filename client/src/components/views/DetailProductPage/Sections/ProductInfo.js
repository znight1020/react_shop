import React from "react";
import { Badge, Button, Descriptions } from "antd";
export default function ProductInfo(props) {
    const clickHandler = () => {};

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">
                    {props.detail.price}
                </Descriptions.Item>
                <Descriptions.Item label="Sold">
                    {props.detail.sold}
                </Descriptions.Item>
                <Descriptions.Item label="View">
                    {props.detail.views}
                </Descriptions.Item>
                <br />
                <br />
                <br />
                <Descriptions.Item label="Description">
                    {props.detail.description}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <br />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    size="large"
                    shape="round"
                    type="danger"
                    onClick={clickHandler}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
