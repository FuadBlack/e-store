import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo-2.png";

export const Header = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  const mainNav = [
    {
      display: "Home",
      path: "/",
      onClick: "onClick={() => window.scrollTo(0, 0)}",
    },
    {
      display: "Catalog",
      path: "/catalog",
    },
    {
      display: "Accessories",
      path: "/accessories",
    },
    {
      display: "Contact",
      path: "/contact",
    },
  ];
  //set selected link color
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  //Header scroll
  const headerRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  //Responsive header

  const [menu, setMenu] = useState(false);
  const menuToggle = () => setMenu(!menu);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="fa-solid fa-align-left"></i>
          </div>

          <div className={`header__menu__left ${menu ? "activeMenu" : ""}`}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="fa-solid fa-angles-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path} onClick={item.onClick}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart" className="basket">
                <div>
                  <i className="fa-solid fa-basket-shopping"></i>
                </div>
                {cartItems.length > 0 ? (
                  <div className="cartItems-length">
                    <span>{cartItems.length}</span>
                  </div>
                ) : null}
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/">
                <i className="fa-solid fa-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
