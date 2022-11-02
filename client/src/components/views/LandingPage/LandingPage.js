import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
// 두개의 다른 포트를 가지고 있는 서버는 아무 설정없이 request를 보낼 수 없다. why? Cors(Cross - Origin - Resources Sharing) 보안정책때문에
// 우리는 back과 front 둘 다 control 가능하기 때문에 proxy를 사용할거임!
function LandingPage(props) {
    useEffect(() => {
        let body = {};
        axios.post("api/product/products").then((response) => {
            if (response.data.success) {
                console.log(response.data);
            } else {
                alert("상품들을 가져오는데 실패했습니다.");
            }
        });
    }, []);
    return <div>Landing Page</div>;
}

export default LandingPage;
