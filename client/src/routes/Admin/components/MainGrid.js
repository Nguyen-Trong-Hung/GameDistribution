import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import StatCard from './StatCard';
import { subDays, isSameDay } from 'date-fns';

export default function MainGrid() {

  const [data, setData] = useState([
    {
      title: 'Users',
      value: 0,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [], // Dữ liệu ngày
    },
    {
      title: 'Games',
      value: 0,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [], // Dữ liệu ngày
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, gamesResponse] = await Promise.all([
          fetch('http://45.77.32.24:8800/api/user/users'),
          fetch('http://45.77.32.24:8800/api/game')
        ]);
  
        const usersResult = await usersResponse.json();
        const gamesResult = await gamesResponse.json();
  
        console.log("Users Data:", usersResult.data); // Kiểm tra dữ liệu users
        console.log("Games Data:", gamesResult.data); // Kiểm tra dữ liệu games
  
        if (usersResult.success && gamesResult.success) {
          const totalUsers = usersResult.data.length;
          const totalGames = gamesResult.data.length;
  
          const userData = groupUsersByDay(usersResult.data);
          const gameData = groupGamesByDay(gamesResult.data);
  
          console.log("Grouped Users Data:", userData); // Kiểm tra dữ liệu người dùng đã nhóm
          console.log("Grouped Games Data:", gameData); // Kiểm tra dữ liệu game đã nhóm
  
          setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[0].value = totalUsers;
            updatedData[1].value = totalGames;
            updatedData[0].data = userData;
            updatedData[1].data = gameData;
            return updatedData;
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const groupGamesByDay = (games) => {
    const today = new Date();
    // Lấy danh sách 30 ngày gần nhất
    const last30Days = Array.from({ length: 30 }, (_, i) => subDays(today, i));
    
    // Tạo một mảng với 30 phần tử, mỗi phần tử là số game của một ngày
    const result = new Array(30).fill(0);
  
    games.forEach((game) => {
      const gameDate = new Date(game.createAt); // Chuyển đổi createAt thành Date
      const dayIndex = last30Days.findIndex((date) => isSameDay(date, gameDate));
      if (dayIndex >= 0) {
        result[dayIndex]++; // Tăng số lượng game vào ngày tương ứng
      }
    });
  
    return result.reverse(); // Đảo lại để ngày mới nhất ở cuối
  };
  
  const groupUsersByDay = (users) => {
    const today = new Date();
    // Lấy danh sách 30 ngày gần nhất
    const last30Days = Array.from({ length: 30 }, (_, i) => subDays(today, i));
  
    const result = new Array(30).fill(0); // Mảng số lượng người dùng mỗi ngày
  
    users.forEach((user) => {
      const userDate = new Date(user.createAt); // Chuyển đổi createAt thành Date
      const dayIndex = last30Days.findIndex((date) => isSameDay(date, userDate));
      if (dayIndex >= 0) {
        result[dayIndex]++;
      }
    });
  
    return result.reverse(); // Đảo lại để ngày mới nhất ở cuối
  };
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 18, sm: 9, lg: 6 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
