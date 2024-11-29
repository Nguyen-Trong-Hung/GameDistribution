import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // dùng axios để gửi POST request
import './Login.scss';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';


const Login = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://hungnt.backendintern.online/api/auth/login', { email, password }); // Gửi yêu cầu POST đến server
      // console.log('Response:', res.data); // Xử lý kết quả từ server
      if (res.data.success) {
        Cookies.set('token', res.data.token, { expires: 1 });
        // console.log(token);
        // Đăng nhập thành công, gọi hàm onLoginSuccess và onClose
        console.log('Login successful');
        login(res.data); // Cập nhật trạng thái đăng nhập
        onLoginSuccess(res.data); // Giả sử server trả về dữ liệu người dùng
        navigate("/userprofile");
        onClose(); // Đóng overlay
      } else {
        // Thông báo lỗi đăng nhập
        console.log('Login failed');
      }
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Email</h1>
          <input
            type="email"
            id="email"
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h1>Password</h1>
          <input
            type="password"
            id="password"
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-actions'>
          <div className='task'>
            <label>
              <input type="checkbox" name='remember-me' />
              Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;