import db from '../DB/db.js';

const uploadImage = async (req, res) => {
  const { gameId } = req.body; // Giả sử bạn gửi gameId cùng với yêu cầu upload

  try {
    // Cập nhật trường Image với đường dẫn hoặc tên tệp của hình ảnh
    const imagePath = `/uploads/${req.file.filename}`;
    const [result] = await db.query('UPDATE games SET Image = ? WHERE GameID = ?', [imagePath, gameId]);

    res.status(200).json({ success: true, filePath: imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default uploadImage;