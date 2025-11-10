import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Footer.css";
import LoginModal from "../Login/LoginModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleShopClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate('/shop');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    navigate('/shop'); 
  };

  return (
    <>
      <div className='MainThird' id='About'>
        <footer className="footer-content">
          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-text">
              Raindrops is a thrift shop dedicated to giving pre-loved dresses a second chance. Established in 2020, we help you find unique, stylish pieces that let your personality shine.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Why buy from us</h3>
            <p className="footer-text">
              Raindrops is your go-to thrift dress shop for one-of-a-kind finds that are stylish and affordable. Each piece tells a story, helping you express your unique style and stand out wherever you go.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">My Account</h3>
            <ul className="footer-links">
              <li><a href="#" onClick={handleShopClick}>Sign in</a></li>
              <li><a href="#cart">View cart</a></li>
              <li><a href="#favorites">My Favorites</a></li>
              <li><a href="#help">Help</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className='footer-links'>
              <li><a href="#">☏ 0920 824 3124</a></li>
              <li><a href="#">✉ raindropsshoppu@gmail.com</a></li>
              <li><a href="https://www.facebook.com/janewearssss">Facebook</a></li>
            </ul>
          </div>
        </footer>
      </div>

      {isModalOpen && (
        <LoginModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Footer;
