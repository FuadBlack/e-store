import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import CartItem from "../Components/CartItem";
import { Helmet } from "../Components/Helmet";
import toFixed from "../utils/toFixed";
import { removeAll } from "../redux/shopping-cart/cartItemSlice";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);
  const cartProducts = cartItems;


  const dispatch = useDispatch();
  const removeAllItem = () => {
    dispatch(removeAll());
  };

  //totalPrice
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.amount) * Number(item.price),
    0
  );

  return (
    <Helmet title="Cart">
      {cartItems.length > 0 ? (
        <div className="cart">
          <div className="cart__info">
            <div className="cart__info__txt">
              <p>You have {cartItems.length} products in your shopping cart</p>
              <div className="cart__info__txt__price">
                <span>Total price:</span>
                <span>${toFixed(totalPrice)}</span>
              </div>
            </div>
            <div className="cart__info__btn">
              <Button size="md">Order</Button>
              <Link to="/catalog">
                <Button size="md">Continue shopping</Button>
              </Link>
              <Button size="md" onClick={() => removeAllItem()}>
                Clear basket
              </Button>
            </div>
          </div>
          <div className="cart__list">
            {cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="cart">
          <div className="empty-cart">
            <p>Your have no any orders</p>
            <Link to="/catalog">Back to shopping</Link>
          </div>
        </div>
      )}
    </Helmet>
  );
};
