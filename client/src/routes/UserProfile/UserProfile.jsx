import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.scss";
import { AuthContext } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { createSlug } from "../../util";
import LockUserForm from "../../components/LockUserForm/LockUserForm";
import axios from "axios";
import ReactPaginate from "react-paginate";

const UserProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [isLockFormOpen, setIsLockFormOpen] = useState(false);
  const [userGames, setUserGames] = useState([]); // Make sure userGames is initialized as an empty array
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const checkLockStatus = async () => {
      if (isLoggedIn.userInfo.is_locked) {
        setIsLockFormOpen(true);
      }
    };

    const fetchUserGames = async () => {
      try {
        const res = await axios.get(`https://hungnt.backendintern.online/api/game/publisher/${isLoggedIn.userInfo.id}`, { withCredentials: true });
        setUserGames(res.data.data || []); // Make sure to set an empty array if response data is undefined
      } catch (error) {
        console.error("Error fetching user games:", error);
      }
    };

    checkLockStatus();
    fetchUserGames();
  }, [isLoggedIn.userInfo.id, isLoggedIn.userInfo.is_locked]);

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
      const res = await axios.post('https://hungnt.backendintern.online/api/user/change-password', { userId, currentPassword, newPassword, confirmNewPassword }, { withCredentials: true });
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

  const handleGameClick = (game) => {
    navigate(`/game/${createSlug(game.Name, game.GameID)}`);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Ensure userGames is always an array before calling slice
  const offset = currentPage * gamesPerPage;
  const currentGames = Array.isArray(userGames) ? userGames.slice(offset, offset + gamesPerPage) : [];

  return (
    <>
      {isLockFormOpen && <LockUserForm isOpen={isLockFormOpen} onClose={() => setIsLockFormOpen(false)} />}
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
              <img src="DefaultAvatar.png" alt="User Avatar" />
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
                <h1>My Game</h1>
                <div className="gamelist">
                  {currentGames.length === 0 ? (
                    <p>Hiện tại tài khoản của bạn chưa có game nào</p>
                  ) : (
                    currentGames.map((game) => (
                      <div className="game" key={game.GameID} onClick={() => handleGameClick(game)}>
                        <img src={game.Image} alt={game.Name} />
                        <h1>{game.Name}</h1>
                      </div>
                    ))
                  )}
                </div>
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={Math.ceil(userGames.length / gamesPerPage)}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={0}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  forcePage={currentPage}
                />
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
    </>
  );
};

export default UserProfile;