import db from '../DB/db.js';

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
