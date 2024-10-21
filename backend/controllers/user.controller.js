import db from "../DB/db.js";

export const getUser = (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
        console.log(err);
        return res.json({ success: false, message: "Server error" });
        }
        return res.json({ success: true, data: result });
    });
}