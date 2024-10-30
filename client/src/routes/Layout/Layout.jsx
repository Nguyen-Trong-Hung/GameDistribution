import React, { useState, useContext } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import OverlayLogin from '../../components/loginForm/OverlayLogin';
import { AuthContext } from '../../context/AuthContext';
import './Layout.scss';

const Layout = () => {
  const [showFormLogin, setShowFormLogin] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowFormLogin(!showFormLogin);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const res = await axios.get('http://localhost:8800/api/auth/logout', { withCredentials: true });
      console.log('Response:', res.data);
      if (res.data.success) {
        logout(); // Cập nhật trạng thái đăng nhập sau khi đăng xuất
        navigate('/')
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
            <div className='user-info'>
              <div className='user-name'>
                <Link to="userprofile"><img src={isLoggedIn.userInfo.avatar ?? "DefaultAvatar.png"} className='user-avatar' alt="User Avatar" /></Link>
              </div>
              <div className='logout-button' >
                <button onClick={handleLogout}>Logout</button>
                <IoIosLogOut className='logout-icon' />
              </div>
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