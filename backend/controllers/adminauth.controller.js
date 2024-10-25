import db from '../DB/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Find user by email
export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM admin WHERE email = ?';

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];

    // So sánh mật khẩu bằng bcrypt
    if (password === user.password) {
      const age = 24 * 60 * 60;
      const token = jwt.sign({ id: user.id, isAdmin: 0 }, process.env.JWT_SECRET, { expiresIn: age });
      
      const { password, ...userInfo } = user;
      
      // Gửi cookie và JSON response
      return res.cookie("token", token, { maxAge: age, httpOnly: true })
          .status(200)
          .json({ success: true, message: 'Login successful', userInfo, token });
    } else {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
  });
};


// Đăng xuất
export const logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: 'Logout successful' }
  )
}