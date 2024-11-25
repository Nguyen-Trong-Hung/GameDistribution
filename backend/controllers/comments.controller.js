import db from '../DB/db.js';

export const postComment = async (req, res) => {
    const { game_id, user_id, content } = req.body;

    if (!game_id || !user_id || !content) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = 'INSERT INTO comments (game_id, user_id, content) VALUES (?, ?, ?)';
        await db.execute(query, [game_id, user_id, content]);
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message });
    }
};

export const getComments = (req, res) => {
    const { game_id } = req.params;
    console.log('Game ID received:', game_id);

    if (!game_id) {
        return res.status(400).json({ error: 'Game ID is required' });
    }

    const sql = 'SELECT * FROM comments WHERE game_id = ?';
    db.query(sql, [game_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        return res.json({ success: true, data: result });
    });
};