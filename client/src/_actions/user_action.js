import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
} from "./types";
import { USER_SERVER } from "../components/Config";
// Axios를 통해 post 함수를 서버에 보낸다.
export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/login`, dataToSubmit)
        .then((response) => response.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/register`, dataToSubmit)
        .then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios
        .get(`${USER_SERVER}/auth`)
        .then((response) => response.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function addToCart(id) {
    let body = {
        productId: id,
    };
    const request = axios
        .post(`${USER_SERVER}/addTocart`, body)
        .then((response) => response.data);

    return {
        type: ADD_TO_CART,
        payload: request,
    };
}

export function getCartItems(cartItems, userCart) {
    const request = axios
        .get(`/api/product/products_by_id?id=${cartItems}&type=array`) // get메소드이므로 body는 필요없다.
        .then((response) => {
            // CartItem들에 해당하는 정보들을
            // Product Collection에서 가져온후에
            // Quantity 정보를 넣어 준다
            userCart.forEach((cartItem) => {
                response.data.product.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data.product[index].quantity =
                            cartItem.quantity;
                    }
                });
            });

            return response.data;
        }); //

    return {
        type: GET_CART_ITEMS,
        payload: request,
    };
}
