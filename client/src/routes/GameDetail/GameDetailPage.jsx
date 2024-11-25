import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './GameDetailPage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { createSlug } from '../../util';

const GameDetailPage = () => {
    const { slug } = useParams();
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ratingValue, setRatingValue] = useState(0);
    const [gameDetailPage, setGameDetail] = useState(null);
    const [genres, setGenres] = useState({});
    const [ratings, setRatings] = useState({});
    const [similarGames, setSimilarGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const id = slug.split("-").pop();

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const res = await fetch(`http://localhost:8800/api/game/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.success) {
                    setGameDetail(data.data[0]);
                } else {
                    console.error("Failed to fetch game detail:", data.message);
                }
            } catch (err) {
                console.error("Error fetching game detail:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGameDetail();
    }, [id]);

    useEffect(() => {
        if (gameDetailPage?.GameID) {
            const fetchGenres = async (gameId) => {
                try {
                    const response = await axios.get(`http://localhost:8800/api/genres/${gameId}`);
                    if (response.data.success) {
                        setGenres(prevGenres => ({
                            ...prevGenres,
                            [gameId]: response.data.data
                        }));
                    } else {
                        console.error('Failed to fetch genres:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error fetching genres:', error);
                }
            };
            fetchGenres(gameDetailPage.GameID);
        }
    }, [gameDetailPage]);

    useEffect(() => {
        const fetchGameSimilarGenres = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:8800/api/game/similar/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.success) {
                    setSimilarGames(data.data);
                } else {
                    console.error('Failed to fetch similar games:', data.message);
                }
            } catch (error) {
                console.error('Error fetching similar games:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGameSimilarGenres();
    }, [id]);

    useEffect(() => {
        const fetchAverageRating = async (gameId) => {
            try {
                const response = await axios.get(`http://localhost:8800/api/rating/${gameId}`);
                if (response.data.success) {
                    const ratings = response.data.data;
                    const averageRating = (ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length).toFixed(1);
                    setRatings(prevRatings => ({
                        ...prevRatings,
                        [gameId]: parseFloat(averageRating)
                    }));
                } else {
                    console.error('Failed to fetch average rating:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        if (gameDetailPage?.GameID) {
            fetchAverageRating(gameDetailPage.GameID);
        }
    }, [gameDetailPage]);


    const handleGameClick = (game) => {
        navigate(`/game/${createSlug(game.Name, game.GameID)}`);
    };

    const submitRating = async (GameID, UserID, ratingValue) => {

        try {
            const response = await fetch('http://localhost:8800/api/rating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating: ratingValue,
                    gameId: GameID,
                    userId: UserID,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Rating submitted successfully!");
                setRatings(prevRatings => ({
                    ...prevRatings,
                    [GameID]: ratingValue
                }));
            } else {
                console.error("Failed to submit rating:", data.message);
            }
        } catch (err) {
            console.error("Error submitting rating:", err);
        }
    };

    
    const handleRatingChange = (newValue) => {
        if (newValue >= 1 && newValue <= 5) {
            setRatingValue(newValue);
            if (!isLoggedIn || !isLoggedIn.userInfo) {
                alert("Please log in to submit a rating.");
                return;
            }
            submitRating(gameDetailPage?.GameID, isLoggedIn.userInfo.id, newValue);
        } else {
            console.error("Invalid rating value. Please select a rating between 1 and 5.");
        }
    };

    if (loading) return <p>Loading...</p>;
    return (
        <div className='gamedetail'>
            <div className="game-info">
                <div className="game-info-left">
                    <div className="game-play">
                        <img src={gameDetailPage?.Image || "Img"} alt={gameDetailPage?.Name || "name"} />
                        <p>{gameDetailPage?.Name || "name"}</p>
                        <p>by {gameDetailPage?.Publisher || "No Pub"}</p>
                        <button>Play now</button>
                    </div>
                    <div className="descript">
                        <div className="des-left">
                            <div className='left-1-like'>
                                <p>Game Title: {gameDetailPage?.Name || "name"}</p>
                                <Box className="custom-box">
                                    <Rating
                                        key={ratings[gameDetailPage?.GameID]}
                                        className="custom-rating"
                                        name="game-rating"
                                        value={ratings[gameDetailPage?.GameID]}
                                        precision={1}
                                        onChange={(event, newValue) => handleRatingChange(newValue)}
                                    />
                                    <p>{ratings[gameDetailPage?.GameID] ? ratings[gameDetailPage.GameID].toFixed(1) : '0.0'}</p>
                                </Box>
                            </div>
                            <div className='left-1' style={{ backgroundColor: 'rgba(0, 0, 255, 0.03)'}}><p>Publisher by : {gameDetailPage?.Publisher || "No Pub"}</p></div>
                            <div className='left-1'><p>Created at: {gameDetailPage ? (new Date(gameDetailPage.createAt)).toDateString() : "N/A"}</p></div>
                            <div className='left-1' style={{ backgroundColor: 'rgba(0, 0, 255, 0.03)'}}><p>Description: {gameDetailPage?.Description || "N/A"}</p></div>
                            <div className='left-1'>
                                <p>
                                    Genres: {genres[gameDetailPage?.GameID]
                                        ? genres[gameDetailPage.GameID].map(genre => genre.name).join(', ')
                                        : 'Loading...'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="game-info-right">
                    <h1>Similar Games</h1>
                    <div className="similar-game">
                        {similarGames.length > 0
                            ? similarGames.slice(0, 6).map((game) => (
                                <div
                                    className="similar-game-item"
                                    key={game.GameID}
                                    onClick={() => handleGameClick(game)}
                                >
                                    <img src={game.Image} alt={game.Name} />
                                    <p>{game.Name}</p>
                                </div>
                            ))
                            : null
                        }
                        {similarGames.length < 6 &&
                            Array.from({ length: 6 - similarGames.length }).map((_, index) => (
                                <div className="similar-game-item empty" key={`empty-${index}`}>
                                    <p>No Game</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailPage;