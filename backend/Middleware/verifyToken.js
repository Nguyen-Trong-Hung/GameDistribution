import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Lấy token từ cookie
  console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid Token' });
    }
    req.user = user.id; // Gán thông tin người dùng vào request
    next(); // Tiếp tục xử lý yêu cầu
  });
};