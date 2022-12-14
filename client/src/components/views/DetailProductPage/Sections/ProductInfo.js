import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_action";
export default function ProductInfo(props) {
    const dispatch = useDispatch();
    const clickHandler = () => {
        // 필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail._id));
        alert("상품을 카트에 담았습니다.")
    };

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">
                    {props.detail.price + "원"}
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

            <div
                style={{
                    display: "flex",
                    justifyContent: "right",
                }}
            >
                <Button
                    style={{ alignContent: "left", marginRight: "10px" }}
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
