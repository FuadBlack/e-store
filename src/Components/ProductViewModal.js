import React, { useEffect, useRef, useState } from "react";
import { ProductView } from "./ProductView";
import productData from "../assets/fake-data/products";
import Button from "./Button";
import { remove } from "../redux/product-modal/productModalSlice";
import { useDispatch, useSelector } from "react-redux";

export const ProductViewModal = () => {
  const productSlug = useSelector((state) => state.productModal.value);
  const [product, setProduct] = useState(undefined);
  //const product = products.getProductBySlug("stylish-jeans-18");

  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(productData.getProductBySlug(productSlug));
  }, [productSlug]);

  if (product) {
    document.body.classList.add("scrollNone");
  } else {
    document.body.classList.remove("scrollNone");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={`product__view__modal ${
        product === undefined ? "" : "active"
      }`}
    >
      <div
        className="product__view__modal__overlay"
        onClick={() => dispatch(remove())}
      ></div>
      <div className="product__view__modal__content">
        <ProductView product={product} />
        <div className="product__view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
