import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import toFixed from "../utils/toFixed";
import { useNavigate } from "react-router-dom";
import { remove } from "../redux/product-modal/productModalSlice";
import { addItem } from "../redux/shopping-cart/cartItemSlice";
import { useDispatch } from "react-redux";

export const ProductView = (props) => {
  let product = props.product;
  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };

  const [previewImg, setPreviewImg] = useState(product.image01);

  const [descExpand, setDescExpand] = useState(false);

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [amount, setAmount] = useState(1);

  const updateAmount = (type) => {
    if (type === "plus") {
      setAmount(amount + 1);
    }
    if (type === "minus") {
      setAmount(amount - 1 < 1 ? 0 : amount - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setColor(undefined);
    setSize(undefined);
    setAmount(1);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      alert("Please choose a color");
      return false;
    }

    if (size === undefined) {
      alert("Please choose a size");
      return false;
    }

    return true;
  };

  //useDispatch
  const dispatch = useDispatch();

  const addToCart = () => {
    if (check()) {
      if (
        dispatch(
          addItem({
            image01: product.image01,
            image02: product.image02,
            title: product.title,
            slug: product.slug,
            color: color,
            size: size,
            amount: amount,
            price: product.price,
          })
        )
      ) {
        alert("New product added to cart");
      } else {
        alert("Something wrong");
      }
    }
  };

  const history = useNavigate();

  const goToCart = () => {
    if (check()) {
      if (
        dispatch(
          addItem({
            image01: product.image01,
            image02: product.image02,
            title: product.title,
            slug: product.slug,
            color: color,
            size: size,
            amount: amount,
            price: product.price,
          })
        )
      ) {
        history("/cart");
        dispatch(remove());
      } else {
        alert("Something wrong");
      }
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div className={`product-description ${descExpand ? "expand" : ""}`}>
          <div className="product-description__title">Product details</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description__toggle">
            <Button size="sm" onClick={() => setDescExpand(!descExpand)}>
              {descExpand ? "Collapse" : "See more"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <div className="product__info__item__price">
            <span> ${toFixed(product.price)}</span>
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Color</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Size</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Amount</div>
          <div className="product__info__item__amount">
            <div
              className="product__info__item__amount__btn"
              onClick={() => updateAmount("minus")}
            >
              -
            </div>
            <div className="product__info__item__amount__input">{amount}</div>
            <div
              className="product__info__item__amount__btn"
              onClick={() => updateAmount("plus")}
            >
              +
            </div>
          </div>
        </div>
        <div className="product__info__item__btn">
          <Button size="sm" onClick={addToCart}>
            Add to Cart
          </Button>
          <Button size="sm" onClick={goToCart}>
            Buy now
          </Button>
        </div>
      </div>
      <div
        className={`product__description-mobile ${descExpand ? "expand" : ""}`}
      >
        <div className="product__description-mobile__title">
          Product details
        </div>
        <div
          className="product__description-mobile__content"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className="product__description-mobile__toggle">
          <Button size="md" onClick={() => setDescExpand(!descExpand)}>
            {descExpand ? "Collapse" : "See more"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};
