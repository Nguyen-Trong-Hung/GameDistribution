import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from '../../context/AuthContext';
import './LockUserForm.scss';

const LockUserForm = ({ isOpen, onClose }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            const res = await axios.get('http://45.77.32.24:8800/api/auth/logout', { withCredentials: true });
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

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Tài Khoản Đã Bị Khóa</h2>
                <p>Vui thôi đừng vui quá!! Tài khoản của bạn đã bị khóa. Vui lòng nạp VIP cho XGame để hưởng sự khoan hồng 🤝🫰</p>
                <div className='logout-button'>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LockUserForm;