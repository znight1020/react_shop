import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload };
            break;

        case AUTH_USER:
            return { ...state, userData: action.payload }; // 여기서 action.payload의 모든 유저 정보가 들어있다. 들어있는 정보는 server/index.js에서의 app.get auth function 확인
            break;
        default:
            return state;
    }
}
