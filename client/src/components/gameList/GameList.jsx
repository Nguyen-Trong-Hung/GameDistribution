import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameList.scss';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/game');
        if (response.data.success) {
          setGames(response.data.data); // Gán response.data.data vào state games
        } else {
          console.error('Failed to fetch games:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames(); // Gọi hàm fetchGames
  }, []);

  return (
    <div className='gamelistcontainer'>
      <div className="detailgamelist">
        {Array.isArray(games) && games.map(game => (
          <div className="game" key={game.GameID}> {/* Hiển thị từng game */}
            {game.Image && <img src={game.Image} alt={game.Name} />} {/* Hiển thị ảnh bìa nếu có */}
            <h2>{game.Name}</h2> {/* Hiển thị tiêu đề game */}
            <p>{new Date(game.createAt).toLocaleDateString()}</p> {/* Hiển thị ngày tạo game */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;