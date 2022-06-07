import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toFixed from "../utils/toFixed";
import {
  addItem,
  removeItem,
  increaseItem,
} from "../redux/shopping-cart/cartItemSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const item = props.item;

  const updateAmount = (opt) => {
    if (opt === "-") {
      dispatch(increaseItem({ ...item, amount: item.amount - 1 }));
    }
    if (opt === "+") {
      dispatch(
        addItem({
          ...item,
          amount: item.amount + 1,
        })
      );
    }
  };

  const removeCartItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <img src={item.image01} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.slug}`}>
            {`${item.title} - ${item.color} - ${item.size}`}
          </Link>
        </div>
        <div className="cart__item__info__price">${toFixed(item.price)}</div>
        <div className="cart__item__info__amount">
          <div className="product__info__item__amount">
            <div
              className="product__info__item__amount__btn"
              onClick={() => updateAmount("-")}
            >
              -
            </div>
            <div className="product__info__item__amount__input">
              {item.amount}
            </div>
            <div
              className="product__info__item__amount__btn"
              onClick={() => updateAmount("+")}
            >
              +
            </div>
          </div>
        </div>
        <div
          className="cart__item__info__del"
          onClick={() => removeCartItem(item)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
