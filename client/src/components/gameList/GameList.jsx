import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './GameList.scss';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/game');
        if (response.data.success) {
          setGames(response.data.data);
        } else {
          console.error('Failed to fetch games:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(games.length / gamesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(games.length / gamesPerPage);

  return (
    <div className='gamelistcontainer'>
      <div className="detailgamelist">
        {currentGames.map(game => (
          <div className="game" key={game.GameID} onClick={() => handleGameClick(game.GameID)}>
            {game.Image && <img src={game.Image} alt={game.Name} />}
            <h2>{game.Name}</h2>
          </div>
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default GameList;