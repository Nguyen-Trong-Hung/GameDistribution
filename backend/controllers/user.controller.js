import db from "../DB/db.js";
import bcrypt from 'bcryptjs';

export const getUser = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Server error" });
    }
    return res.json({ success: true, data: result });
  });
}

export const changePassword = (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  db.query("SELECT password FROM users WHERE id = ?", [userId], async (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, results[0].password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid current password" });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    const updateSql = "UPDATE users SET password = ? WHERE id = ?";
    db.query(updateSql, [hashedPassword, userId], (err, results) => {
      if (err) {
        console.error("Database update failed:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      return res.status(200).json({ success: true, message: "Password changed successfully" });
    });
  });
};

export const lockUser = (req, res) => {
  const { userId } = req.body;

  db.query("UPDATE users SET is_locked = 1 WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({ success: true, message: "User locked successfully" });
  });
}

export const unlockUser = (req, res) => {
  const { userId } = req.body;

  db.query("UPDATE users SET is_locked = 0 WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({ success: true, message: "User unlocked successfully" });
  });
}