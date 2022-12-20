import React from "react";
import { Carousel } from "antd";
function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img
                            style={{ width: "100%", maxHeight: "150px" }}
                            src={`http://192.168.0.122:5000/${image}`}
                            //src={`192.168.0.122:5000/${image}`}
                            alt="slide"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageSlider;
