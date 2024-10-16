import db from '../DB/db.js';

// Login logic
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
    if (password === user.password) {  // In a real app, use bcrypt to compare hashed passwords
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
  });
};

// Registration logic
export const register = (req, res) => {
  const { email, password, username } = req.body;

  // Check if email already exists
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }
    if (result.length > 0) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    // Add user to database
    const newUser = { email, password, username, isAdmin: 0 };
    const insertSql = 'INSERT INTO users SET ?';
    db.query(insertSql, newUser, (err, result) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }
      return res.json({ success: true, message: 'Registration successful' });
    });
  });
};
