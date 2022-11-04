import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import { Col, Card, Row } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";

// 두개의 다른 포트를 가지고 있는 서버는 아무 설정없이 request를 보낼 수 없다. why? Cors(Cross - Origin - Resources Sharing) 보안정책때문에
// 우리는 back과 front 둘 다 control 가능하기 때문에 proxy를 사용할거임!
function LandingPage(props) {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };
        axios.post("api/product/products", body).then((response) => {
            if (response.data.success) {
                console.log(response.data);

                setProducts(response.data.productInfo);
            } else {
                alert("상품들을 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const loadMoreHandler = () => {};

    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={<ImageSlider images={product.images} />}>
                    <Meta
                        title={product.title}
                        description={`${product.price}`}
                    />
                </Card>
            </Col>
        );
    });

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Buy Whatever <ShopOutlined />
                </h2>
            </div>
            {/* Filter */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
        </div>
    );
}

export default LandingPage;
