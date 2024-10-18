// UserProfile.js
import React from "react";
import "./UserProfile.scss";
import GameList from "../../components/gameList/GameList";
import { CiEdit } from "react-icons/ci";

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="breadcrumb">
        <h1>My Profile</h1>
        <button>EDIT <CiEdit className="icon" /></button>
      </div>
      
      <div className="profile-main">
        <div className="profile-left">
          <div className="avatar">
            <img src="/path-to-avatar.png" alt="Avatar" />
          </div>
          <h3>John Doe</h3>
          <p>Full Stack Developer</p>
          <p>Bay Area, San Francisco, CA</p>
          <div className="profile-actions">
            <button className="btn follow">Follow</button>
            <button className="btn message">Message</button>
          </div>
          <ul className="social-links">
            <li>Website: <a href="https://bootdey.com">https://bootdey.com</a></li>
          </ul>

          <div className="user-info">
            <h1>My Account</h1>
            <h4>Full Name:</h4>
            <h4>Email:</h4>
          </div>
        </div>

        <div className="profile-right">
          <div className="project-status">
            <div className="assignment">
              <h1>My World</h1>
              <GameList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
