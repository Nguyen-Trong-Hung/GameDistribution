import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import axios from 'axios';

const Games = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/game');
        if (response.data.success) {
          const gamesData = response.data.data;
          setGames(gamesData);
          const genrePromises = gamesData.map(game => fetchGenres(game.GameID));
          await Promise.all(genrePromises);
        } else {
          console.error('Failed to fetch games:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
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
        setGames((prevGames) => prevGames.filter((game) => game.GameID !== gameID));
        alert('Game deleted successfully');
      } else {
        console.error('Failed to delete game:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting game:', error);
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
          {/* <Button type="primary" size="small" style={{backgroundColor: 'green'}}>Update</Button> */}
          <Button type="danger" size="small" style={{ backgroundColor: '#FF0000', color: "white" }} onClick={() => handleDelete(record.GameID)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filteredGames = games.filter((game) =>
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
            <p>Loading games...</p> // Optional loading message
          ) : (
            <>
              <Input.Search
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Table
                columns={columns}
                dataSource={filteredGames}
                rowKey="GameID"
              />
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default Games;
