import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";
/*
 * react-router-dom 버전 6부터는 element로 컴포넌트를 만들고,
 * route props(match, history, location)을 받지 않는다.
 * 따라서, useParams, useLocation, useHistory를 사용하여 route context에 접근한다
 * let id = props.match.params.id 에서
 * const { id } = useParams(); 로 바꿈 !
 */
function DetailProductPage(props) {
    const { productId } = useParams();
    const [Product, setProduct] = useState({});

    useEffect(() => {
        axios
            .get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then((response) => {
                setProduct(response.data[0]);
            })
            .catch((err) => alert(err));
    }, [productId]);

    return (
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>{Product.title}</h1>
            </div>

            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* productImage*/}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* productInfo*/}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </div>
    );
}

export default DetailProductPage;
