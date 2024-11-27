import React, { useState } from 'react';
import './Register.scss';

const Register = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký ở đây
    const user = {
      username,
      email,
      password,
      role
    };

    try {
      const response = await fetch('http://45.77.32.24:8800/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        alert('Registration successful');
        console.log('Registration successful');
        onClose();
      } else {
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
        <div className='role-group'>
          <h1>Role</h1>
          <div className="role">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={(e) => setRole(e.target.value)}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="developer"
                checked={role === 'developer'}
                onChange={(e) => setRole(e.target.value)}
              />
              Developer
            </label>
          </div>
        </div>
        <div className='form-actions'>
          <button type="submit">Registration</button>
        </div>
      </form>
    </div>
  );
};

export default Register;