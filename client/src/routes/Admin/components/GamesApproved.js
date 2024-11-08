import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GamesApproved = () => {
  const [gamesApproved, setGamesApproved] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGamesApproved = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/game/approve-game');
        if (response.data.success) {
          const gamesApprovedData = response.data.data;
          setGamesApproved(gamesApprovedData);
          const genrePromises = gamesApprovedData.map(game => fetchGenres(game.GameID));
          await Promise.all(genrePromises);
        } else {
          console.error('Failed to fetch gamesApproved:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching gamesApproved:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesApproved();
  }, []);


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

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = async (gameID) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this game?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8800/api/game/delete/${gameID}`);
      if (response.data.success) {
        setGamesApproved((prevGamesApproved) => prevGamesApproved.filter((game) => game.GameID !== gameID));
        alert('Game deleted successfully');
      } else {
        console.error('Failed to delete game:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleApproveGame = async (gameID) => {
    console.log("Approve game with ID:", gameID);
    const confirmApproved = window.confirm(`Are you sure you want to approve this game?`);
    if (!confirmApproved) return;

    try {
      const res = await axios.post(`http://localhost:8800/api/game/approve/${gameID}`);
      if (res.data.success) {
        setGamesApproved((prevGamesApproved) =>
          prevGamesApproved.map((game) =>
            game.GameID === gameID ? { ...game, approved: true } : game
          )
        );
        alert('Game approved successfully');
        navigate('/dashboard/games');
      } else {
        console.error('Failed to approve game:', res.data.message);
      }
    } catch (err) {
      console.error('Error approving game:', err);
    }
  };

  const columns = [
    {
      title: 'Game Name',
      dataIndex: 'Name',
    },
    {
      title: 'Genre',
      dataIndex: 'GameID',
      render: (gameId) => {
        const genreList = genres[gameId];
        return genreList ? genreList.map(genre => genre.name).join(', ') : 'Loading...';
      },
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      render: (image) => (
        <img src={image} alt="Game" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      ),
    },
    {
      title: 'Release Date',
      dataIndex: 'createAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      render: (record) => (
        <div>
          <Button type="primary" size="small" style={{ backgroundColor: 'green', marginRight: '10px' }} onClick={() => handleApproveGame(record.GameID)}>
            Approve
          </Button>
          <Button type="danger" size="small" style={{ backgroundColor: '#FF0000', color: 'white' }} onClick={() => handleDelete(record.GameID)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredGamesApproved = gamesApproved.filter((game) =>
    game.Name && game.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'flex-start',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack
          direction="column"
          sx={{
            width: '300px',
            borderRight: '1px solid',
            borderColor: 'divider',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            p: 2,
            boxSizing: 'border-box',
          }}
        >
          <MenuContent />
        </Stack>
        <Stack
          direction="column"
          sx={{
            flexGrow: 1,
            ml: '300px',
            p: 2,
          }}
        >
          {loading ? (
            <p>Loading gamesApproved...</p> // Optional loading message
          ) : (
            <>
              <Input.Search
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Table
                columns={columns}
                dataSource={filteredGamesApproved}
                rowKey="GameID"
              />
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default GamesApproved;
