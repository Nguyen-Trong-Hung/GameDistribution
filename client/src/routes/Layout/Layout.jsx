import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { FaUser } from "react-icons/fa6";
import OverlayLogin from '../../components/loginForm/OverlayLogin';
import './Layout.scss'; // Import file CSS cho Layout

const Layout = () => {
  const [showFormLogin, setShowFormLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');

  const toggleForm = () => {
    setShowFormLogin(!showFormLogin);
  };

  const handleLoginSuccess = (avatar) => {
    setIsLoggedIn(true);
    setUserAvatar(avatar);
    setShowFormLogin(false);
  };

  return (
    <div>
      <div className="gameBar">
        <div className='home'><Link to="/"><img src="/gamedistribution.png" alt="" /></Link></div>
        <div className='category'>
          <div><Link to="/games">Games</Link></div>
          <div><Link to="/support">Support</Link></div>
          {isLoggedIn && <div><Link to="/distribution">Distribution</Link></div>}
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <IoIosSearch className="search-icon" />
        </div>
        <div className='login-container'>
          {isLoggedIn ? (
            <img src={userAvatar} alt="User Avatar" className='user-avatar' />
          ) : (
            <button className='login-button' onClick={toggleForm}>
              <FaUser className='login-icon' /> Login / Register
            </button>
          )}
        </div>
        <OverlayLogin isOpen={showFormLogin} onClose={toggleForm} onLoginSuccess={handleLoginSuccess} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;