import React, { useContext, useState } from "react";
import "./UserProfile.scss";
import GameList from "../../components/gameList/GameList";
import { AuthContext } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

const UserProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  // console.log(isLoggedIn);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);

  const handlePasswordChangeClick = () => {
    setIsPasswordFormOpen(!isPasswordFormOpen);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = isLoggedIn.userInfo.id;
      const currentPassword = e.target[0].value;
      const newPassword = e.target[1].value;
      const confirmNewPassword = e.target[2].value;
      if (newPassword !== confirmNewPassword) {
        alert("New password and confirm new password do not match");
        return;
      }
      const res = await axios.post('http://localhost:8800/api/user/change-password', { userId, currentPassword, newPassword, confirmNewPassword }, { withCredentials: true });
      // console.log(res.data);
      if (res.data.success) {
        alert("Password changed successfully");
        setIsPasswordFormOpen(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="breadcrumb">
        <h1>My Profile</h1>
        <button onClick={handlePasswordChangeClick}>
          Change Password <CiEdit className="icon" />
        </button>
      </div>

      <div className="profile-main">
        <div className="profile-left">
          <div className="avatar">
            <img src={isLoggedIn.userInfo.avatar || "DefaultAvatar.png"} alt="User Avatar" />
          </div>
          <h1>{isLoggedIn.userInfo.username}</h1>
          <div className="user-info">
            <h1>My Account</h1>
            <h4>Full Name: <input value={isLoggedIn.userInfo.username} readOnly style={{ border: "none", fontSize: "1rem" }} /></h4>
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

      {isPasswordFormOpen && (
        <div className="password-form">
          <form onSubmit={handlePasswordSubmit}>
            <h2>Change Password</h2>
            <label>Current Password:</label>
            <input type="password" required />
            <label>New Password:</label>
            <input type="password" required />
            <label>Confirm New Password:</label>
            <input type="password" required />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsPasswordFormOpen(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
