import React, { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import OverlayLogin from '../../components/loginForm/OverlayLogin';
import { AuthContext } from '../../context/AuthContext';
import './Layout.scss'; // Import file CSS cho Layout

const Layout = () => {
  const [showFormLogin, setShowFormLogin] = useState(false);

  const toggleForm = () => {
    setShowFormLogin(!showFormLogin);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <div className="gameBar">
        <div className='home'><Link to="/"><img src="/gamedistribution.png" alt="" /></Link></div>
        <div className='category'>
          <div><Link to="/games">Games</Link></div>
          <div><Link to="/distribution">Distribution</Link></div>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <IoIosSearch className="search-icon" />
        </div>
        <div className='login-container'>
          {isLoggedIn ? (
            <div className='user-info'>
              <Link to="/userprofile"><img src={isLoggedIn.userInfo.avatar || "DefaultAvatar.png"} 
              className='user-avatar' /></Link>
              <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className='login-button' onClick={toggleForm}>
              <FaUser className='login-icon' /> Login / Register
            </button>
          )}
        </div>
        <OverlayLogin isOpen={showFormLogin} onClose={toggleForm} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;