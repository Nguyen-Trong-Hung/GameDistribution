import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GamePage.scss";

const GamePage = () => {
  const [showSortBy, setShowSortBy] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);



  const toggleSortBy = () => {
    setShowSortBy((prev) => !prev);
  };

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((genre) => genre !== value)
    );
  };

  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/genres');
        if (res.data.success) {
          console.log('Genres:', res.data.data);
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


  return (
    <div className="game-page">
      <form className="sidebar" onSubmit={handleSubmit}>
        <h1>Filters</h1>
        <button
          type="button"
          className="genre-button"
        >
          <h3>Genres you like:</h3>
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
          <input
            type="text"
            placeholder="Search Games"
            className="search-bar"
          />
          <div className="Sort-group">
            <input
              type="button"
              className={`sort-button ${showSortBy ? "active" : ""}`}
              onClick={toggleSortBy}
              value={showSortBy ? "▼ Sort By" : "► Sort By"}
            />
            {showSortBy && (
              <div className="sort-options">
                <div>Oldest</div>
                <div>Newest</div>
              </div>
            )}
          </div>
        </div>
        <div className="game-list">
          {games.map((game) => (
            <div className="game-item" key={game.GameID}>
              {game.Image && <img src={game.Image} alt={game.Name} />}
              <h1>{game.Name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
