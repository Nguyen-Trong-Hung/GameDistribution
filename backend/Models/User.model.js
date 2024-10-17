import db from '../DB/db.js';

// Get user by email
export const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

// Create new user
export const createUser = (userData, callback) => {
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, userData, callback);
};
