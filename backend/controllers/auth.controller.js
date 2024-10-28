import db from '../DB/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Find user by email
export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];

    // So sánh mật khẩu bằng bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }

      const age = 24 * 60 * 60;

      if (isMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: age });
      
        const { password, ...userInfo } = user;
      
        // Gửi cookie và JSON response
        return res.cookie("token", token, { maxAge: age, httpOnly: true })
                  .status(200)
                  .json({ success: true, message: 'Login successful', userInfo, token });
      } else {
        return res.json({ success: false, message: 'Invalid email or password' });
      }      
    });
  });
};

// Đăng ký user mới
export const register = (req, res) => {
  const { email, password, username } = req.body;

  // Kiểm tra xem email đã tồn tại chưa
  const findUserSql = 'SELECT * FROM users WHERE email = ?';

  db.query(findUserSql, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }

    // Nếu email đã tồn tại trong cơ sở dữ liệu
    if (result.length > 0) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    // Mã hóa mật khẩu
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }

      // Tạo đối tượng người dùng mới
      const newUser = { email, password: hashedPassword, username };

      const createUserSql = 'INSERT INTO users SET ?';

      db.query(createUserSql, newUser, (err, result) => {
        if (err) {
          return res.json({ success: false, message: 'Server error' });
        }
        return res.json({ success: true, message: 'Registration successful' });
      });
    });
  });
};


// Đăng xuất
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: 'Logout successful' }
  )
}