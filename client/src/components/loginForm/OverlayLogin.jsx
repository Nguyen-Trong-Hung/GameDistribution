import React, { useState, useContext } from 'react';
import './OverlayLogin.scss';
import Login from './Login';
import Register from './Register';
import { AuthContext } from '../../context/AuthContext';

const OverlayLogin = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay-background" onClick={onClose} />
      <div className="overlay-container">
        <div className="overlay-login">
          <div className="title">
            <h3>Sign up if you want to contribute your games to us</h3>
          </div>
          <div className="overlay-tabs">
            <h1 className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</h1>
            <h1 className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</h1>
          </div>
          {isLogin ? <Login onLoginSuccess={login} onClose={onClose} /> : <Register onClose={onClose} />}
        </div>
        <button className="overlay-close" onClick={onClose}>×</button>
      </div>
    </>
  );
};

export default OverlayLogin;