import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { Stack } from '@mui/material';
import AppNavbar from './AppNavbar';
import MenuContent from './MenuContent';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/users');
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
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

  const filteredUsers = users.filter((user) =>
    user.username && user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <AppNavbar />
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
            <p>Loading users...</p> // Optional loading message
          ) : (
            <>
              <Input.Search
                placeholder="Tìm kiếm"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
              />
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default Users;