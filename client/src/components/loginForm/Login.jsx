import React, { useState } from 'react';
import axios from 'axios'; // dùng axios để gửi POST request
import './Login.scss';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8800/login', { email, password }); // Gửi yêu cầu POST đến server
      console.log('Response:', res.data); // Xử lý kết quả từ server
      if (res.data.success) {
        // Đăng nhập thành công, gọi hàm onLoginSuccess
        console.log('Login successful');
        onLoginSuccess(res.data.avatar); // Giả sử server trả về avatar của người dùng
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
        </div>
        <div className="form-group">
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