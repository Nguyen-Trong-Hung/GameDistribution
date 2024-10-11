import React, { useState } from 'react';
import './Register.scss'; // Import file CSS cho Register

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký ở đây
    const user = {
      username,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:8800/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        // Xử lý khi đăng ký thành công
        console.log('Registration successful');
      } else {
        // Xử lý khi đăng ký thất bại
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <div htmlFor="username"><h1>Username</h1></div>
          <input
            type="text"
            id="username"
            placeholder='Your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <div htmlFor="email"><h1>Email</h1></div>
          <input
            type="email"
            id="email"
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <div htmlFor="password"><h1>Password</h1></div>
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
          <button type="submit">Registration</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
