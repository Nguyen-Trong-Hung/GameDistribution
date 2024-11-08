import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSlug } from '../../util';
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import "./GamePage.scss";

const GamePage = () => {
  const [showSortBy, setShowSortBy] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 12;

  const navigate = useNavigate();

  const toggleSortBy = () => {
    setShowSortBy((prev) => !prev);
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((genre) => genre !== value)
    );
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/search/search-game', {
        params: { q: searchInput },
      });
      setGames(response.data); // Update the game list with search results
    } catch (error) {
      console.error('Lỗi khi kết nối với backend:', error);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/genres');
        if (res.data.success) {
          setGenres(res.data.data);
        } else {
          console.error('Failed to fetch genres:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected genres:", selectedGenres);
    const selectedGenreIds = genres
      .filter((genre) => selectedGenres.includes(genre.name))
      .map((genre) => genre.id);
    axios.get(`http://localhost:8800/api/game?genreId=${selectedGenreIds.join(",")}`)
      .then(response => {
        if (response.data.success) {
          setGames(response.data.data);
        } else {
          console.error('Failed to fetch games:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  };

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

  const handleGameClick = (game) => {
    navigate(`/game/${createSlug(game.Name, game.GameID)}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedGames = [...games].sort((a, b) => {
      const dateA = new Date(a.createAt);
      const dateB = new Date(b.createAt);
      return order === "Newest" ? dateB - dateA : dateA - dateB;
    });
    setGames(sortedGames);
    toggleSortBy();
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * gamesPerPage;
  const currentGames = games.slice(offset, offset + gamesPerPage);

  return (
    <div className="game-page">
      <form className="sidebar" onSubmit={handleSubmit}>
        <h1>Filters</h1>
        <button
          type="button"
          className="genre-button"
        >
          <h3>Genres you want to play:</h3>
        </button>
        <div className="filter-section">
          <div className="genre-list">
            {genres.map((genre) => (
              <label key={genre.id}>
                <input
                  type="checkbox"
                  value={genre.name}
                  onChange={handleGenreChange}
                />{" "}
                {genre.name} <span>{genre.count}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="apply-button">
          Apply
        </button>
      </form>

      <div className="main-content">
        <div className="header">
          <h1>Games</h1>
          <div className="search-group">
            <input
              type="text"
              placeholder="Search Games"
              className="search-bar"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
            />
            <IoIosSearch className="search-icon" onClick={handleSearch} />
          </div>
          <div className="Sort-group">
            <input
              type="button"
              className={`sort-button ${showSortBy ? "active" : ""}`}
              onClick={toggleSortBy}
              value={showSortBy ? "▼ Sort By" : "► Sort By"}
            />
            {showSortBy && (
              <div className="sort-options">
                <div className="option" onClick={() => handleSort("Newest")}>Newest</div>
                <div className="option" onClick={() => handleSort("Oldest")}>Oldest</div>
              </div>
            )}
          </div>
        </div>
        <div className="game-list">
          {currentGames.map((game) => (
            <div className="game-item" key={game.GameID} onClick={() => handleGameClick(game)}>
              {game.Image && <img src={game.Image} alt={game.Name} />}
              <h1>{game.Name}</h1>
              {/* <h3>{game.createAt}</h3> */}
            </div>
          ))}
        </div>
        {games.length === 0 && (
          <div className="no-games-message">
            No games available. Please try adjusting your filters.
          </div>
        )}
        {games.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default GamePage;