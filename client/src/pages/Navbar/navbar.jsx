import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import LoginModal from "../Login/LoginModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleShopClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate('/shop/products/');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    navigate('/shop/products/'); 
  };

  return (
    <>
      <div className="nav-container">
      
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="./logo.png" alt="Logo" />
          </Link>
        </div>

    
        <div className="nav-right">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#" onClick={handleShopClick}>Shop</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#About">Contact</a></li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                Log-in
              </a>
            </li>
          </ul>
        </div>
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

export default Navbar;
