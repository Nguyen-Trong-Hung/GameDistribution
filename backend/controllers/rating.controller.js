import db from "../DB/db.js";

export const postRating = (req, res) => {
    const { rating, gameId, userId } = req.body;

    // Kiểm tra xem đã có bản ghi rating cho game và user chưa
    const checkSql = "SELECT * FROM ratings WHERE game_id = ? AND user_id = ?";
    db.query(checkSql, [gameId, userId], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        if (results.length > 0) {
            // Nếu đã có, thực hiện cập nhật
            const updateSql = "UPDATE ratings SET rating = ? WHERE game_id = ? AND user_id = ?";
            db.query(updateSql, [rating, gameId, userId], (err, result) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ success: false, message: "Server error" });
                }
                return res.status(200).json({ success: true, message: "Rating updated successfully", data: result });
            });
        } else {
            // Nếu chưa có, chèn bản ghi mới
            const insertSql = "INSERT INTO ratings (rating, game_id, user_id) VALUES (?, ?, ?)";
            db.query(insertSql, [rating, gameId, userId], (err, result) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ success: false, message: "Server error" });
                }
                return res.status(201).json({ success: true, message: "Rating added successfully", data: result });
            });
        }
    });
};


export const getRatingByGame = (req, res) => {
    const gameId = req.params.gameid;
    const sql = "SELECT * FROM ratings WHERE game_id = ?";
    db.query(sql, [gameId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Server error" });
        }
        return res.json({ success: true, data: result });
    });
}