import React from "react";
import "./Footer.scss";
import { GrFacebook, GrTwitter, GrInstagram } from "react-icons/gr";
import { Link } from "react-router-dom";
//!=============================================================
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <GrFacebook className="footer__icon" />
        <GrTwitter className="footer__icon" />
        <GrInstagram className="footer__icon" />
      </div>
      <div className="footer__bottom">
        <div className="footer__ofertas footer__flex">
          {" "}
          <h4 className="heading-4">Get to Know Us</h4>
          <Link to="/careers">Careers</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="footer__information footer__flex">
          <h4 className="heading-4">Information</h4>
        </div>
        <div className="footer__conditions footer__flex">
          <h4 className="heading-4">Selling Conditions</h4>
        </div>
        <div className="footer__more footer__flex">
          <h4 className="heading-4">More...</h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
