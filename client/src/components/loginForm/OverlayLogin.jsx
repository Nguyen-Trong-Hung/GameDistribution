import React, { useState } from 'react';
import './OverlayLogin.scss';
import Login from './Login';
import Register from './Register';

const OverlayLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay-background" onClick={onClose} />
      <div className="overlay-container">
        <div className="overlay-login">
          <div className="overlay-tabs">
            <h1 className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</h1>
            <h1 className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Registration</h1>
          </div>
          {isLogin ? <Login onLoginSuccess={onLoginSuccess} /> : <Register />}
        </div>
        <button className="overlay-close" onClick={onClose}>×</button>
      </div>
    </>
  );
};

export default OverlayLogin;