import db from '../DB/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Get user by email
const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

// Create new user
const createUser = (userData, callback) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, userData, callback);
};

// Get all games
export const getGames = (req, res) => {
  const sql = 'SELECT * FROM game';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: 'Server error' });
    }
    return res.json({ success: true, data: result });
  });
};

// Login logic
export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }
    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }
      if (isMatch) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Tạo token JWT
        return res.json({ success: true, message: 'Login successful', token });
      } else {
        return res.json({ success: false, message: 'Invalid email or password' });
      }
    });
  });
};

// Registration logic
export const register = (req, res) => {
  const { email, password, username } = req.body;

  findUserByEmail(email, (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }
    if (result.length > 0) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }
      const newUser = { email, password: hashedPassword, username, isAdmin: 0 };
      createUser(newUser, (err, result) => {
        if (err) {
          return res.json({ success: false, message: 'Server error' });
        }
        return res.json({ success: true, message: 'Registration successful' });
      });
    });
  });
};