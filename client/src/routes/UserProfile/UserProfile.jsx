// UserProfile.js
import React, {useContext} from "react";
import "./UserProfile.scss";
import GameList from "../../components/gameList/GameList";
import { AuthContext } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";

const UserProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // console.log(isLoggedIn);
  return (
    <div className="profile-container">
      <div className="breadcrumb">
        <h1>My Profile</h1>
        <button>EDIT <CiEdit className="icon" /></button>
      </div>
      
      <div className="profile-main">
        <div className="profile-left">
          <div className="avatar">
            <img src={isLoggedIn.userInfo.avatar || "DefaultAvatar.png"}/>
          </div>
          <h1>{isLoggedIn.userInfo.username}</h1>
          <div className="user-info">
            <h1>My Account</h1>
            <h4>Full Name: {isLoggedIn.userInfo.username}</h4>
            <h4>Email: {isLoggedIn.userInfo.email}</h4>
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
