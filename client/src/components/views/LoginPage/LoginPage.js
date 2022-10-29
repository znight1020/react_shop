import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom"; // react-router-dom v6부터 useHistory에서 useNavigate로 바뀜

function LoginPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState(""); // <-- Email State
    const [Password, setPassword] = useState(""); // <-- Password State

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password,
        };
        // Redux의 data flow = action -> reducer -> store -> subscribe -> dispatch이다.
        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                navigate("/");
            } else {
                alert("Error");
            }
        });
    };

    //타이핑을 할 때 onChange라는 이벤트를 발생시켜, state를 바꾸고 state가 바뀌면 value가 바뀌는 것
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />

                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
