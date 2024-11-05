import db from '../DB/db.js';

export const getGames = (req, res) => {
  const genreIds = req.query.genreId ? req.query.genreId.split(',').map(id => parseInt(id)) : null;
  if (!genreIds) {
    const sql = 'SELECT * FROM game';
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      return res.json({ success: true, data: result });
    });
  } else {
    const placeholders = genreIds.map(() => '?').join(',');
    const number_of_genres = genreIds.length;
    const query = `
      SELECT Game.*
      FROM Game
      JOIN Game_Genres ON Game.GameID = Game_Genres.game_id
      WHERE Game_Genres.genre_id IN (${placeholders})
      GROUP BY Game.GameID
      HAVING COUNT(DISTINCT Game_Genres.genre_id) = ${number_of_genres}
    `;
    db.query(query, genreIds, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      return res.json({ success: true, data: result });
    });
  }
};

export const getGameByPublisher = (req, res) => {
  const sql = "SELECT * FROM game JOIN users ON Game.Publisher = users.username WHERE users.id = ?";
  const { userId } = req.params;
  db.query(sql, [userId], (err, result) => {
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


export const getSimilarGamesByGenres = (req, res) => {
  const { gameId } = req.params;
  const genreSql = `
    SELECT genre_id FROM game_genres WHERE game_id = ?
  `;

  db.query(genreSql, [gameId], (err, genreResults) => {
    if (err) {
      console.error("Error fetching genres:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (genreResults.length === 0) {
      return res.status(404).json({ success: false, message: "No genres found for this game" });
    }

    // Lấy danh sách genre_id từ kết quả
    const genreIds = genreResults.map(genre => genre.genre_id);

    // Truy vấn để tìm các game khác có nhiều thể loại chung nhất
    const similarGamesSql = `
      SELECT game.*, COUNT(*) AS commonGenres FROM game
      JOIN game_genres ON game.GameID = game_genres.game_id
      WHERE game_genres.genre_id IN (?)
      AND game.GameID != ?
      GROUP BY game.GameID
      ORDER BY commonGenres DESC
    `;

    db.query(similarGamesSql, [genreIds, gameId], (err, gameResults) => {
      if (err) {
        console.error("Error fetching similar games:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      res.status(200).json({ success: true, data: gameResults });
    });
  });
};


export const createNewGame = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const { GameName, PublisherName, GameGenresId, GameDescription } = req.body;
    // console.log(req.body);

    if (!GameName || !PublisherName || !GameDescription) {
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const newGame = {
      GameName,
      PublisherName,
      GameGenresId,
      GameDescription,
      GameImage: imagePath,
    };

    const sql = "INSERT INTO game (Name, Image, Publisher, Description, createAt) VALUES (?, ?, ?, ?, ?)";
    const sql2 = "INSERT INTO game_genres (game_id, genre_id) VALUES (?, ?)";

    db.query(sql, [newGame.GameName, newGame.GameImage, newGame.PublisherName, newGame.GameDescription, new Date()], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      const gameId = result.insertId;

      // Chuyển đổi GameGenresId từ chuỗi thành mảng
      let genreIds;
      try {
        genreIds = JSON.parse(GameGenresId);
        if (!Array.isArray(genreIds)) {
          throw new Error('GameGenresId is not a valid array');
        }
      } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid GameGenresId format' });
      }

      const genreInserts = genreIds.map(genreId => new Promise((resolve, reject) => {
        db.query(sql2, [gameId, genreId], (err) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve();
        });
      }));

      // Wait for all inserts to complete
      Promise.all(genreInserts)
        .then(() => {
          return res.status(201).json({ success: true, message: 'Game created successfully', gameId });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ success: false, message: 'Failed to insert game genres' });
        });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred' });
  }
};


export const deleteGame = (req, res) => {
  const gameId = req.params.id;

  //Xóa game_genres
  const sql2 = "DELETE FROM game_genres WHERE game_id = ?";

  db.query(sql2, [gameId], (err, result) => {
    if (err) {
      console.error("Error executing query to delete game_genres:", err);
      return res.status(500).json({ success: false, message: 'Server error while deleting genres', error: err.message });
    }

    //Sau khi xóa game_genres, xóa game
    const sql = "DELETE FROM game WHERE GameID = ?";

    db.query(sql, [gameId], (err, result) => {
      if (err) {
        console.error("Error executing query to delete game:", err);
        return res.status(500).json({ success: false, message: 'Server error while deleting game', error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Game not found' });
      }

      res.json({ success: true, message: 'Game and associated genres deleted' });
    });
  });
};

