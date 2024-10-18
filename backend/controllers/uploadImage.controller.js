import db from '../DB/db.js';

const uploadImage = (req, res) => {
  const { gameId } = req.body; // Nhận gameId từ client

  if (!req.file || !gameId) {
    return res.status(400).json({ success: false, message: 'Invalid request, missing file or gameId' });
  }

  // Tạo đường dẫn tới ảnh
  const imagePath = `/uploads/${req.file.filename}`;

  // Sử dụng callback để cập nhật database
  db.query('UPDATE games SET Image = ? WHERE GameID = ?', [imagePath, gameId], (error, results) => {
    if (error) {
      console.error('Error uploading image:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    // Kiểm tra kết quả để đảm bảo truy vấn đã thành công
    if (results.affectedRows > 0) {
      res.status(200).json({ success: true, filePath: imagePath });
    } else {
      res.status(404).json({ success: false, message: 'Game not found' });
    }
  });
};

export default uploadImage;