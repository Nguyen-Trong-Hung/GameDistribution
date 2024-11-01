import db from '../DB/db.js';

export const searchGame = (req, res) => {
    const searchQuery = req.query.q;
    const sqlQuery = `SELECT * FROM Game WHERE Name LIKE ?`;
    db.query(sqlQuery, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            res.status(500).send('Lỗi khi thực hiện truy vấn');
        } else {
            res.json(results);
        }
    });
};