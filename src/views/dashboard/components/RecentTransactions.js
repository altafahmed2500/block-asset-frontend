import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography, Box } from '@mui/material';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Access token is missing');
        }

        const response = await axios.get('http://127.0.0.1:8000/api/assets/recentTransactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data.recent_transactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <DashboardCard title="Recent Transactions">
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          sx={{
            maxHeight: '400px', // Adjust the height as needed
            overflowY: 'auto',
            p: 2, // Padding to maintain spacing
            '&::-webkit-scrollbar': {
              width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent', // Make the track transparent
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.2)', // Semi-transparent thumb
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(0, 0, 0, 0.3)', // Slightly darker on hover
            },
          }}
        >
          <Timeline
            className="theme-timeline"
            sx={{
              p: 0,
              mb: '-40px',
              '& .MuiTimelineConnector-root': {
                width: '1px',
                backgroundColor: '#efefef',
              },
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.5,
                paddingLeft: 0,
              },
            }}
          >
            {transactions.map((transaction, index) => (
              <TimelineItem key={transaction.transaction_id}>
                <TimelineOppositeContent>
                  {transaction.time}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    color={index % 2 === 0 ? 'primary' : 'secondary'}
                    variant="outlined"
                  />
                  {index < transactions.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="600">
                    Transaction Hash: {transaction.transaction_hash}
                  </Typography>
                  <Link
                    href={`https://etherscan.io/tx/${transaction.transaction_hash}`}
                    target="_blank"
                    underline="none"
                  >
                    View on Etherscan
                  </Link>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      )}
    </DashboardCard>
  );
};

export default RecentTransactions;
