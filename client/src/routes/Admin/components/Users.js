import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import { Stack } from '@mui/material';
import AppNavbar from './AppNavbar';
import MenuContent from './MenuContent';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.error.dark,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.error.dark),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.error.dark),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .Mui-checked .MuiSwitch-track': {
    backgroundColor: theme.palette.success.dark,
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://45.77.32.24:8800/api/user/users');
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

  const handleLockUser = async (userId) => {
    if (!window.confirm('Are you sure you want to lock this user?')) {
      return;
    }
    try {
      const response = await axios.post(`http://45.77.32.24:8800/api/user/lock-user`, { userId }, { withCredentials: true });
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_locked: user.is_locked === 0 ? 1 : 0 } : user
          )
        );
      } else {
        console.error('Failed to lock user:', response.data.message);
      }
    } catch (error) {
      console.error('Error locking user:', error);
    }
  };

  const handleUnlockUser = async (userId) => {
    if (!window.confirm('Are you sure you want to unlock this user?')) {
      return;
    }
    try {
      const response = await axios.post(`http://45.77.32.24:8800/api/user/unlock-user`, { userId }, { withCredentials: true });
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_locked: user.is_locked === 0 ? 1 : 0 } : user
          )
        );
      } else {
        console.error('Failed to unlock user:', response.data.message);
      }
    } catch (error) {
      console.error('Error unlocking user:', error);
    }
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
      title: 'Status',
      render: (record) => (
        <div>
          <FormControlLabel
            control={
              <Android12Switch
                checked={record.is_locked === 0}
                onClick={() => record.is_locked === 0 ? handleLockUser(record.id) : handleUnlockUser(record.id)}
              />
            }
          />
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