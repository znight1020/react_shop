import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;
function CheckBox(props) {
    const [Checked, setChecked] = useState([]);

    const hadleToggle = (value) => {
        // 누른 것의 Index를 구하고
        const currentIndex = Checked.indexOf(value); // CheckBox를 눌렀을 때는 value = 0부터 순서대로의 수를 반환하고 indexof(value) 1,2,3을 넣었다면 indexof(1) = 0, indexof(2) , 아니면 -1을 반환한다

        // 전체 Checked 된 State에서 현재 누른 CheckBox가 이미 있다면
        const newChecked = [...Checked];

        // 없다면 State 넣어준다.
        if (currentIndex === -1) {
            newChecked.push(value);
        }
        //  빼주고
        else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    };

    const renderCheckboxLists = () =>
        props.list &&
        props.list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => hadleToggle(value._id)}
                    checked={Checked.indexOf(value._id) === -1 ? false : true}
                />
                <span>{value.name}</span>
            </React.Fragment>
        ));
    return (
        <div>
            <Collapse defaultActiveKey={["1"]}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    );
}

export default CheckBox;
