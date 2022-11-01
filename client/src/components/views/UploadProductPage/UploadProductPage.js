import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const Categories = [
    { Key: 1, value: "맨투맨" },
    { Key: 2, value: "청바지" },
    { Key: 3, value: "트레이닝복" },
    { Key: 4, value: "아우터" },
];

function UploadProductPage(props) {
    const navigate = useNavigate();

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Category, setCategory] = useState(1);
    const [Images, setImages] = useState([]);

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    };

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
    };

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value);
    };

    const CategoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value);
    };

    /*
     *현재 업로드는 FileUpload에서만 이루어져 있어 부모 컴포넌트인 UploadProductPage에 전달이 안되고있으므로
     * Form에서 refreshFunction prop으로 FileUpload에서 이미지들(state)의 변화가 생기면 UploadProductPage에 전달된다
     */
    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Category || !Images) {
            return alert("모든 값을 넣어주셔야 합니다.");
        }

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            // 로그인된 사람의 아이디
            writer: props.user.userData._id, // props를 넣어주면서 UploadProductPage가 auth.js의 자식 컴포넌트가 되었으므로 auth의 user 데이터를 가져올 수 있음
            title: Title,
            description: Description,
            price: Price,
            categories: Category,
            images: Images,
        };
        Axios.post("/api/product", body).then((response) => {
            if (response.data.success) {
                alert("상품 업로드에 성공했습니다.");
                navigate("/");
            } else {
                alert("상품 업로드에 실패했습니다.");
            }
        });
    };

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2> 의류 상품 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}

                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={Description}
                />

                <br />
                <br />
                <label>가격(₩)</label>
                <Input
                    type="number"
                    onChange={priceChangeHandler}
                    value={Price}
                />
                <br />
                <br />
                <select onChange={CategoryChangeHandler} value={Category}>
                    {Categories.map((item) => (
                        <option key={item.Key} value={item.Key}>
                            {item.value}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <Button onClick={submitHandler}>확인</Button>
            </Form>
        </div>
    );
}

export default UploadProductPage;
