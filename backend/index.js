import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors'; // Import cors
import bodyParser from 'body-parser';

const app = express();

app.use(cors()); // Sử dụng cors middleware
app.use(bodyParser.json()); // Dùng để parse JSON từ body request


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hung17020309',  // Thay bằng mật khẩu của bạn
  database: 'Intern',  // Thay bằng tên database của bạn
});


// Test MySQL connection when the server starts
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL');
    }
});


// API đăng nhập
// Đường dẫn xử lý đăng nhập
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra email và password từ database
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }
    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];
    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong database
    if (password === user.password) { // In a real application, use bcrypt to compare hashed passwords
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});

app.post('/register', (req, res) => {
  const { email, password, username} = req.body;

  // Kiểm tra email đã tồn tại chưa
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: 'Server error' });
    }
    if (result.length > 0) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    // Thêm user vào database
    const newUser = { email, password, username, isAdmin: 0 };
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
      if (err) {
        return res.json({ success: false, message: 'Server error' });
      }
      return res.json({ success: true, message: 'Registration successful' });
    });
  });
});

// Khởi động server
app.listen(8800, () => {
  console.log('Server is running on port 8800.');
});