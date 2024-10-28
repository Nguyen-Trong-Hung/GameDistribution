import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GameList.scss';

const GameList = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

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

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`); // Chuyển hướng đến trang chi tiết game
  };

  return (
    <div className='gamelistcontainer'>
      <div className="detailgamelist">
        {Array.isArray(games) && games.map(game => (
          <div className="game" key={game.GameID} onClick={() => handleGameClick(game.GameID)}>
            {game.Image && <img src={game.Image} alt={game.Name} />}
            <h2>{game.Name}</h2>
          </div>  
        ))}
      </div>
    </div>
  );
};

export default GameList;