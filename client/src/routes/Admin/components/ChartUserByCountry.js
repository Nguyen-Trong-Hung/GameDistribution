import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// Các biểu tượng cho các quốc gia (hoặc có thể dùng bất kỳ icon nào cho thể loại game)
// import { IndiaFlag, UsaFlag, BrazilFlag, GlobeFlag } from '../internals/components/CustomIcons';

const colors = [
  '#4B0082',
  '#4682B4',
  '#2F4F4F',
  '#4169E1',
  '#191970',
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

export default function ChartUserByCountry() {
  const [genreData, setGenreData] = React.useState([]);
  const [totalGames, setTotalGames] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const genreResponse = await fetch('http://45.77.32.24:8800/api/genres');
        const genreResult = await genreResponse.json();

        if (genreResult.success) {
          const genrePromises = genreResult.data.map(async (genre) => {
            const gameResponse = await fetch(`http://45.77.32.24:8800/api/game?genreId=${genre.id}`);
            const gameResult = await gameResponse.json();
            const gameIDs = new Set();
            gameResult.data.forEach((game) => {
              gameIDs.add(game.GameID); // Thêm GameID vào set (set sẽ tự loại bỏ trùng)
            });

            // Cập nhật số lượng game cho mỗi thể loại
            return { label: genre.name, value: gameIDs.size, gameIDs: Array.from(gameIDs) };
          });

          // Sau khi lấy xong số lượng game cho mỗi thể loại
          const genreGamesData = await Promise.all(genrePromises);

          // Tính tổng số game (loại bỏ game trùng lặp)
          const allGameIDs = new Set();
          genreGamesData.forEach((genre) => {
            genre.gameIDs.forEach((gameID) => {
              allGameIDs.add(gameID);
            });
          });

          setTotalGames(allGameIDs.size);
          setGenreData(genreGamesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, backgroundColor: 'rgba(137, 186, 208, 0.17)' }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Ratio of Game Genres
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data: genreData,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText={totalGames} secondaryText="Total Games" />
          </PieChart>
        </Box>
        {genreData.map((genre, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {genre.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {genre.value} games
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of games by genre"
                value={(genre.value / totalGames) * 100}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: colors[index % colors.length],
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
