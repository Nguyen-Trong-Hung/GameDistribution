import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GameDetailPage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { createSlug } from '../../util';

const GameDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [gameDetailPage, setGameDetail] = useState(null);
    const [genres, setGenres] = useState({});
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

            fetchGenres(gameDetailPage.GameID); // Gọi hàm fetchGenres với GameID
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

    const handleGameClick = (game) => {
        navigate(`/game/${createSlug(game.Name, game.GameID)}`);
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
                            <div className='left-1'><p>Game Title: {gameDetailPage?.Name || "name"}</p></div>
                            <div className='left-1'><p>Publisher by : {gameDetailPage?.Publisher || "No Pub"}</p></div>
                            <div className='left-1'><p>Created at: {gameDetailPage ? (new Date(gameDetailPage.createAt)).toDateString() : "N/A"}</p></div>
                            <div className='left-1'><p>Description: {gameDetailPage?.Description || "N/A"}</p></div>
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
                            ? similarGames.slice(0, 6).map((game, index) => (
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
