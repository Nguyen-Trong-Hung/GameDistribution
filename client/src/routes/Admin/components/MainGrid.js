import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

export default function MainGrid() {

  const [data, setData] = useState([
    {
      title: 'Users',
      value: 0,
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30
      ],
    },
    {
      title: 'Games',
      value: '0',
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
        780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
      ],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8800/api/users');
        const result = await response.json();
        if (result.success) {
          const totalUsers = result.data.length; // Get the total users from the response
          // Update the Users card value
          setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[0].value = totalUsers; // Update the Users card
            return updatedData;
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 18, sm: 9, lg: 6 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}


// export default function MainGrid() {
//   useEffect(() => {
//     // Gọi API để lấy dữ liệu
//     fetch('http://localhost:8800/api/users')
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.success) {
//           data[0].value = result.data.length;
//           setData(result.data);  // Cập nhật dữ liệu khi thành công
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [data]);

//   // Tính tổng số người dùng
//   const totalUsers = data.length;

//   return (
//     <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
//       {/* Hiển thị tổng số người dùng */}
//       <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
//         Total Users: {totalUsers}
//       </Typography>
//       <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
//         {Array.isArray(data) && data.length > 0 ? (
//           data.map((user, index) => (
//             <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
//               <Typography>{user.username}</Typography>
//             </Grid>
//           ))
//         ) : (
//           <Typography>Loading...</Typography>
//         )}
//       </Grid>
//     </Box>
//   );
// }