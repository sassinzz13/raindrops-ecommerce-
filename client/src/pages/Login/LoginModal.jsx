import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    //insert auth 
    if (isLogin) {
      console.log('Login:', formData.email, formData.password);

      
      onLoginSuccess();
    } else {
     
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      console.log('Register:', formData);

      onLoginSuccess();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-content">
          <h2 className="modal-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="modal-subtitle">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join us and start your journey'}
          </p>

          <div className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>
            )}

            <button onClick={handleSubmit} className="submit-button">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="social-button google">
            <span className="social-icon">G</span>
            Continue with Google
          </button>

          <button className="social-button facebook">
            <span className="social-icon">f</span>
            Continue with Facebook
          </button>

          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} className="toggle-button">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
