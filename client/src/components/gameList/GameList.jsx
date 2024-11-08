import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GameList.scss';
import { createSlug } from '../../util';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [gamesPerPage, setGamesPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const updateGamesPerPage = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setGamesPerPage(4);
      } else {
        setGamesPerPage(12);
      }
    };

    updateGamesPerPage(); // Set lần đầu
    window.addEventListener("resize", updateGamesPerPage); // Cập nhật khi thay đổi kích thước

    return () => window.removeEventListener("resize", updateGamesPerPage);
  }, []);

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
  };

  // Countdown logic riêng, chỉ phụ thuộc vào `countdown`
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(games.length / gamesPerPage));
          return 20; // Đặt lại đếm ngược về 20 giây khi chuyển trang
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [games.length, gamesPerPage]);

  useEffect(() => {
    setCountdown(20);
  }, [currentPage]);

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
        <div className="progress" style={{ width: `${(countdown / 20) * 100}%` }}></div>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={Math.ceil(games.length / gamesPerPage)}
          marginPagesDisplayed={0}  // Không hiển thị margin pages
          pageRangeDisplayed={0}    // Không hiển thị các trang số
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={currentPage}   // Giữ trang hiện tại
        />
      </div>
    </div>
  );
};

export default GameList;
