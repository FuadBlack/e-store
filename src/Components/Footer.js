import React from "react";
import { Link } from "react-router-dom";
import Grid from "./Grid";
import logo from "../assets/images/Logo-2.png";

export const Footer = () => {
  const footerAboutLinks = [
    {
      display: "Introduce",
      path: "/about",
    },
    {
      display: "Contact",
      path: "/about",
    },
    {
      display: "To hire",
      path: "/about",
    },
    {
      display: "News",
      path: "/about",
    },
    {
      display: "Shop system",
      path: "/about",
    },
  ];

  const footerCustomerLinks = [
    {
      display: "Return Policy",
      path: "/about",
    },
    {
      display: "Warranty Policy",
      path: "/about",
    },
    {
      display: "Refund Policy",
      path: "/about",
    },
  ];

  return (
    <div className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">Support call center</div>
            <div className="footer__content">
              <p>
                Contact to order <strong>0775557766</strong>
              </p>
              <p>
                Order problems <strong>0775557766</strong>
              </p>
              <p>
                Comments, complaints <strong>0775557766</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title"> About Yolo</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Customer services</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img src={logo} alt="" className="footer__logo" />
              </Link>
            </p>
            <p>
              Towards the goal of bringing a new dressing pleasure to consumers
              from all over the world every day. Let's work with Yolo for a more
              active and positive life.
            </p>
          </div>
        </Grid>
      </div>
    </div>
  );
};
