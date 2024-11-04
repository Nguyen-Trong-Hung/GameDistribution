import React, { useEffect, useState } from 'react';
import './GameDetailPage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { BiLike } from "react-icons/bi";
import GameList from '../../components/gameList/GameList';
import { createSlug } from '../../util';


const GameDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [gameDetailPage, setGameDetail] = useState(null);
    const [similarGames, setSimilarGames] = useState([]);
    const [loading, setLoading] = useState(true);  // Trạng thái loading

    // Tách ID từ slug
    const id = slug.split("-").pop();

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const res = await fetch(`http://localhost:8800/api/game/${id}`, {
                    method: 'GET',
                    credentials: 'include', // Đảm bảo cookie được gửi đi
                });
                const data = await res.json();

                if (data.success) {
                    setGameDetail(data.data[0]); // Lấy phần tử đầu tiên của mảng data
                } else {
                    console.error("Failed to fetch game detail:", data.message);
                }
            } catch (err) {
                console.error("Error fetching game detail:", err);
            } finally {
                setLoading(false);  // Cập nhật trạng thái loading
            }
        };
        fetchGameDetail();
    }, [id]);

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
                            <p>Game Title: {gameDetailPage?.Name || "name"}</p>
                            <p>Publisher by : {gameDetailPage?.Publisher || "No Pub"}</p>
                            <p>Created At: {gameDetailPage ? (new Date(gameDetailPage.createAt)).toDateString() : "N/A"}</p>
                        </div>
                        <div className="des-right">
                            <BiLike />
                            <p>{gameDetailPage?.Like}</p>
                        </div>
                    </div>
                </div>
                <div className="game-info-right">
                    <h1>Similar Game</h1>
                    <div className="similar-game">
                        {loading ? (
                            <p>Loading similar games...</p> // Thông báo khi đang tải
                        ) : (
                            <ul>
                                {similarGames.slice(0, 6).map((game) => (
                                    <div className="similar-game-item" key={game.GameID} onClick={() => handleGameClick(game)}>
                                        <img src={game.Image} alt={game.Name} />
                                        <p>{game.Name}</p>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="collections">
                <h5>Collections</h5>
                <GameList />
            </div>
        </div>
    );
};

export default GameDetailPage;