import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format, subDays } from 'date-fns';

function StatCard({ title, value, interval, trend, data }) {
  const theme = useTheme();
  
  const trendColors = {
    up: theme.palette.mode === 'light' ? theme.palette.success.light : theme.palette.success.main,
    down: theme.palette.mode === 'light' ? theme.palette.error.light : theme.palette.error.main,
    neutral: theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.grey[700],
  };
  
  const chartColor = trendColors[trend];
  
  function AreaGradient({ color, id }) {
    return (
      <defs>
        <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={chartColor} stopOpacity={0.5} />
          <stop offset="100%" stopColor={chartColor} stopOpacity={0.1} />
        </linearGradient>
      </defs>
    );
  }

  AreaGradient.propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => format(subDays(new Date(), 29 - i), 'MMM dd'));

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, backgroundColor: 'rgba(117, 149, 237, 0.17)' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="p">
                {value}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {interval}
            </Typography>
          </Stack>
          <Box sx={{ width: '100%', height: 50 }}>
            <SparkLineChart
              colors={[chartColor]}
              data={data}
              area
              showHighlight
              showTooltip
              xAxis={{
                scaleType: 'band',
                data: daysInMonth,
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-${value})`,
                  opacity: 0.6,
                },
              }}
            >
              <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  interval: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']).isRequired,
};

export default StatCard;
