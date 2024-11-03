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