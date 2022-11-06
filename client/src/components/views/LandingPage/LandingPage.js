import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.min.css";
import { Col, Card, Row } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import RadioBox from "./Sections/RadioBox";
import CheckBox from "./Sections/CheckBox";
import { categories, price } from "./Sections/Datas";

// 두개의 다른 포트를 가지고 있는 서버는 아무 설정없이 request를 보낼 수 없다. why? Cors(Cross - Origin - Resources Sharing) 보안정책때문에
// 우리는 back과 front 둘 다 control 가능하기 때문에 proxy를 사용할거임!
function LandingPage(props) {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8); // eslint-disable-line no-unused-vars
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        categories: [],
        price: [],
    });
    useEffect(() => {
        let body = {
            skip: Skip, // 더보기 버튼을 누를 시 Skip만 달리 해서 다음 상품들을 볼 수 있게 할 수 있다.
            limit: Limit,
        };
        getProducts(body);
    }, [Skip, Limit]);

    const getProducts = (body) => {
        axios.post("api/product/products", body).then((response) => {
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo]);
                } else {
                    setProducts(response.data.productInfo);
                }

                setPostSize(response.data.postSize);
            } else {
                alert("상품들을 가져오는데 실패했습니다.");
            }
        });
    };

    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        };

        getProducts(body);
    };

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

    const showFilterdResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
        };
        getProducts(body);
        setSkip(0);
    };

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    };

    const handleFilters = (filters, category) => {
        // CheckBox의 id가 filter에 담겨있다.
        const newFilters = { ...Filters };
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }
        console.log("filters", filters);

        showFilterdResults(newFilters);
        setFilters(newFilters);
    };

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Buy Whatever <ShopOutlined />
                </h2>
            </div>
            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox
                        list={categories}
                        handleFilters={(filters) =>
                            handleFilters(filters, "categories")
                        }
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={(filters) =>
                            handleFilters(filters, "price")
                        }
                    />
                </Col>
            </Row>

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>

            <br />

            {PostSize >= Limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
