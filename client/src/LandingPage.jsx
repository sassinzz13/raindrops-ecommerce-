import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage.jsx";
import SecondPage from "./pages/Second/secondpage.jsx";
import ThirdPage from "./pages/Third/thirdpage.jsx";
import Footer from "./Pages/footer/Footer.jsx";
import LoginModal from "./pages/Login/LoginModal"; 

export default function LandingPage() {
  const navigate = useNavigate(); // hook for programmatic navigation
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    navigate("/shop/products/");
  };

  return (
    <div>
      <Homepage />
      <SecondPage openLoginModal={openLoginModal} />
      <ThirdPage />
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
