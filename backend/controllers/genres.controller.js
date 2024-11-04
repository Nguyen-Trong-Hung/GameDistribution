import db from "../DB/db.js";

export const getGenres = (req, res) => {
    const sql = "SELECT * FROM genres";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        return res.json({ success: true, data: result });
    })
};

export const getGenreByGame = (req, res) => {
    const gameId = req.params.gameid;
    // console.log(gameId);
    const sql = `
      SELECT genres.* FROM genres
      JOIN game_genres ON genres.id = game_genres.genre_id
      WHERE game_genres.game_id = ?
    `;

    db.query(sql, [gameId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json({ success: true, data: results });
    });
};
