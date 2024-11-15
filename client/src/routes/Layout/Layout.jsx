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
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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
        logout();
        navigate('/')
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/search/search-game', {
        params: { q: searchInput },
      });
      if (response.data.length === 0) {
        alert('No results found');
      }
      setSearchResults(response.data);
    } catch (error) {
      console.error('Lỗi khi kết nối với backend:', error);
    }
  };

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
    setSearchInput('');
    setSearchResults([]);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="gameBar">
        <div className='home'><Link to="/"><img src="/Logo_XGame-03.png" alt="" /></Link></div>
        <div className="game-bar-right">
          <div className='category'>
            <div><Link to="/games">Games</Link></div>
            {isLoggedIn && isLoggedIn.userInfo.isDeveloper ? <div><Link to="/distribution">Distribution</Link></div> : null}
            <div><Link to="/support">Support</Link></div>
          </div>
          <div className="search-group">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <IoIosSearch className="search-icon" onClick={handleSearch} />
            </div>
            <div className="search-results">
              {searchResults.map((game) => (
                <div key={game.GameID} className="result-item" onClick={() => handleGameClick(game.GameID)}>
                  <img src={game.Image} alt={game.Name} className="result-image" />
                  <div className="result-info">
                    <h4 className="result-publisher">{game.Publisher}</h4>
                    <p className="result-name">{game.Name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='login-container'>
            {isLoggedIn ? (
              <div className='user-info'>
                <div className='user-name'>
                  <Link to="userprofile"><img src="DefaultAvatar.png" className='user-avatar' alt="User Avatar" /></Link>
                </div>
                <div className='logout-button' >
                  <button onClick={handleLogout}>Logout</button>
                  <IoIosLogOut className='logout-icon' />
                </div>
                <div className="menu" onClick={toggleDropdown}><img src='menu.png' alt="Menu" /></div>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <ul>
                      <div><Link to="/games">Games</Link></div>
                      {isLoggedIn && isLoggedIn.userInfo.isDeveloper && <div><Link to="/distribution">Distribution</Link></div>}
                      <div><Link to="/support">Support</Link></div>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button className='login-button' onClick={toggleForm}>
                <FaUser className='login-icon' /> Login / Register
              </button>
            )}
          </div>
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