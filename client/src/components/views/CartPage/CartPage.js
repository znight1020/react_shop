import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem} from "../../../_actions/user_action";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty } from 'antd'
import Paypal from '../../utils/Paypal';
function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false); // showTotal이 true인 경우에만 Total을 보여주게

  useEffect(() => {
    let cartItems = [];
    // 리덕스 User State안에 Cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  let removeFromCart = (productId) => {

    dispatch(removeCartItem(productId)).then(response => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false)
      }
    })
    
  }

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock products={props.user && props.user.cartDetail} removeItem={removeFromCart} />
      </div>

      {ShowTotal ?
        <div style={{ marginTop: "3rem" }}>
        <h2> Total Amount: ₩{Total.toLocaleString()}</h2>
        </div>
        :
        <>
          <br />
          <Empty description={false} />
        </>
      }

      {ShowTotal &&
        <Paypal total={Total} />
      }

      




      
    </div>
  )
}

export default CartPage;
