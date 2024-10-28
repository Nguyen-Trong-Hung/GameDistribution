import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import axios from 'axios';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

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
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: 'Game Name',
      dataIndex: 'Name',
    },
    {
      title: 'Genre',
      dataIndex: 'Genre',
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
          <Button type="primary" size="small" style={{backgroundColor: 'green'}}>Update</Button>
          <Button type="danger" size="small" style={{ backgroundColor: '#FF0000', color: "white" }}>
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