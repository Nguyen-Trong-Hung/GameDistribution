import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AdminLogin.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminLogin = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hungnt.backendintern.online/:8800/api/admin/loginAdmin', { email, password });
            if (res.data.success) {
                Cookies.set('token', res.data.token, { expires: 1 });
                console.log('Login successful');
                // console.log(res.data);
                login(res.data);
                // onLogin(res.data);
                navigate('/dashboard');
            } else {
                console.log('Login failed');
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className="login-admin">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p className="forgot-password">
                    <a href="#">Forgot your password?</a>
                </p>
            </form>
        </div>
    );
};

export default AdminLogin;
