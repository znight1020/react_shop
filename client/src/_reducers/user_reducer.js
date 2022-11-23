import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
} from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };

        case REGISTER_USER:
            return { ...state, register: action.payload };

        case AUTH_USER:
            return { ...state, userData: action.payload }; // 여기서 action.payload의 모든 유저 정보가 들어있다. 들어있는 정보는 server/index.js에서의 app.get auth function 확인

        case ADD_TO_CART:
            return {
                ...state,
                userData: { ...state.userData, cart: action.payload },
            };

        case GET_CART_ITEMS:
            return { ...state, cartDetail: action.payload };
        default:
            return state;
    }
}
