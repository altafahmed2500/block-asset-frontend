import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyEthereum } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const MonthlyEarnings = () => {
  const [ethereumPrice, setEthereumPrice] = useState(null); // State to store Ethereum price
  const [currentTime, setCurrentTime] = useState(''); // State to store current time

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // Fetch Ethereum price and current time
  useEffect(() => {
    const fetchEthereumPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        setEthereumPrice(data.ethereum.usd); // Set Ethereum price
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
      }
    };

    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime); // Set current time
    };

    fetchEthereumPrice();
    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Chart configuration
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Ethereum price"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyEthereum width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {ethereumPrice !== null ? `$${ethereumPrice}` : 'Loading...'}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {currentTime}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            current time
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
