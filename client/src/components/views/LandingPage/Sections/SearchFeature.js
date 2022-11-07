import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
    const [SearchTerm, setSearchTerm] = useState("");
    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value);
    };
    return (
        <div>
            <Search
                placeholder="상품 검색"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={SearchTerm} // 타이핑 할때마다 searchTerm을 바꿔줌
                enterButton
            />
        </div>
    );
}

export default SearchFeature;
