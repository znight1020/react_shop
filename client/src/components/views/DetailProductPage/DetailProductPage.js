import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/*
 * react-router-dom 버전 6부터는 element로 컴포넌트를 만들고,
 * route props(match, history, location)을 받지 않는다.
 * 따라서, useParams, useLocation, useHistory를 사용하여 route context에 접근한다
 * let id = props.match.params.id 에서
 * const { id } = useParams(); 로 바꿈 !
 */
function DetailProductPage(props) {
    const { productId } = useParams();
    useEffect(() => {
        axios
            .get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then((response) => {
                if (response.data.success) {
                    console.log("response.data", response.data);
                } else {
                    alert("상세 정보 가져오기를 실패했습니다.");
                }
            });
    }, []);

    return <div>DetailProductPage</div>;
}

export default DetailProductPage;
