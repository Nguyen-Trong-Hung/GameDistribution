import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GameList.scss';
import { createSlug } from '../../util';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [countdown, setCountdown] = useState(5); // Đếm ngược 5 giây
  const gamesPerPage = 8;
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

  // Xử lý sự kiện khi người dùng nhấn vào trang
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    setCountdown(5); // Đặt lại đếm ngược khi chuyển trang
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(games.length / gamesPerPage));
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp timer
  }, [currentPage, games.length]);

  // Lấy danh sách game cho trang hiện tại
  const currentGames = games.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  const handleGameClick = (game) => {
    navigate(`/game/${createSlug(game.Name, game.GameID)}`);
  };

  return (
    <div className='gamelistcontainer'>
      <div className="detailgamelist">
        {currentGames.map(game => (
          <div className="game" key={game.GameID} onClick={() => handleGameClick(game)}>
            {game.Image && <img src={game.Image} alt={game.Name} />}
            <h1>{game.Name}</h1>
          </div>
        ))}
      </div>
      <div className="countdown-bar">
        <div className="progress" style={{ width: `${(countdown / 5) * 100}%` }}></div>
        {/* Phân trang */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(games.length / gamesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default GameList;
