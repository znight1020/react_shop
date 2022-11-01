import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";

const { TextArea } = Input;

const Categories = [
  { Key: 1, value: "맨투맨" },
  { Key: 2, value: "청바지" },
  { Key: 3, value: "트레이닝복" },
  { Key: 4, value: "아우터" },
];

function UploadProductPage() {
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

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> 의류 상품 업로드</h2>
      </div>

      <Form>
        {/* DropZone */}

        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />

        <br />
        <br />
        <label>가격(₩)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
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
        <Button>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
