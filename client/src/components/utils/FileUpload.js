import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function FileUpload() {
    const [Images, setImages] = useState([]);
    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: { "content-type": "multipart/form-data" }, // header에 파일의 type을 정의해줘서 request가 받을 수 있게
        };

        formData.append("file", files[0]);
        axios
            .post("/api/product/image", formData, config) // 같이 넣어주지 않으면 err발생 formData에는 파일의 정보가 들어감
            .then((response) => {
                if (response.data.success) {
                    setImages([...Images, response.data.filePath]);
                } else {
                    alert("파일을 저장하는데 실패하였습니다.");
                }
            });
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300,
                                height: 240,
                                border: "1px solid lightgray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <PlusOutlined style={{ fontSize: "3rem" }} />
                        </div>
                    </section>
                )}
            </Dropzone>

            <div
                style={{
                    display: "flex",
                    width: "350px",
                    height: "240px",
                    overflowX: "scroll",
                }}
            >
                {Images.map((image, index) => (
                    <div key={index}>
                        <img
                            style={{
                                minWidth: "300px",
                                width: "300px",
                                height: "240px",
                            }}
                            src={`http://localhost:5000/${image}`}
                            alt="profile"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;
