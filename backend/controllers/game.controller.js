import db from '../DB/db.js';
import upload from '../Middleware/Multerconfig.js';

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

export const getGameById = (req, res) => {
  const sql = "SELECT * FROM game WHERE GameID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: 'Server error' });
    }

    return res.json({ success: true, data: result });
  });
};

export const deleteGamebyId = (req, res) => {
  const sql = "DELETE FROM game WHERE GameID = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: 'Server error' });
    }

    return res.json({ success: true, message: 'Game deleted' });
  });
}

export const createNewGame = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }
    const { GameName, PublisherName, GameGenres, GameDescription } = req.body;
    if (!GameName || !PublisherName || !GameDescription) {
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    const newGame = {
      GameName,
      PublisherName,
      GameGenres,
      GameDescription,
      GameImage: imagePath, // Sử dụng đường dẫn ảnh từ multer
    };
    const sql = "INSERT INTO game (Name, Image, Publisher, Description, createAt) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [newGame.GameName, newGame.GameImage, newGame.PublisherName, newGame.GameDescription, new Date()], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
    
      return res.status(201).json({ success: true, message: 'Game created successfully', gameId: result.insertId });
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
  }
};


export const deleteGame = (req, res) => {
  const sql = "DELETE FROM game WHERE GameID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err); // In ra lỗi chi tiết
      return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    return res.json({ success: true, message: 'Game deleted' });
  });
};
