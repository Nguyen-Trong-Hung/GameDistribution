import React, { useEffect, useState } from 'react';
import './GameDetailPage.scss';
import { useParams } from 'react-router-dom';
import { BiLike } from "react-icons/bi";
import GameList from '../../components/gameList/GameList';

const GameDetailPage = () => {
    const { id } = useParams();  // Lấy GameID từ URL
    const [gameDetailPage, setGameDetail] = useState(null);
    const [loading, setLoading] = useState(true);  // Trạng thái loading

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
                    <BiLike />
                    <div className="descript">
                        <p>Game Title: {gameDetailPage?.Name || "name"}</p>
                        <p>Publisher by : {gameDetailPage?.Publisher || "No Pub"}</p>
                        <p>Created At: {gameDetailPage ? (new Date(gameDetailPage.createAt)).toDateString() : "N/A"}</p>
                    </div>
                </div>
                <div className="game-info-right">
                    <div className="similar-game"><h5>Similar Game</h5></div>
                    <GameList />
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