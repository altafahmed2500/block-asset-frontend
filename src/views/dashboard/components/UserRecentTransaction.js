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
import { Link, Typography, Box, CircularProgress } from '@mui/material';

const UserRecentTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecentTransactions = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Access token is missing. Please log in again.');
                }

                const response = await axios.get(
                    'http://127.0.0.1:8000/api/assets/userTransactions',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTransactions(response.data.all_transactions || []); // Use all_transactions key
            } catch (err) {
                setError(err.response?.data?.error || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentTransactions();
    }, []);

    return (
        <DashboardCard title="Your Recent Transactions">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : transactions.length === 0 ? (
                <Typography>No recent transactions available.</Typography>
            ) : (
                <Box
                    sx={{
                        maxHeight: 'auto',
                        overflowY: 'auto',
                        p: 2,
                        '&::-webkit-scrollbar': { width: '8px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'rgba(0, 0, 0, 0.3)',
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
                                    {transaction.time || 'No time available'}
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
                                        Transaction Hash: {transaction.transaction_hash || 'Unknown'}
                                    </Typography>
                                    <Typography>
                                        From: {transaction.from_address}
                                    </Typography>
                                    <Typography>
                                        To: {transaction.to_address}
                                    </Typography>
                                    {transaction.transaction_hash && (
                                        <Link
                                            href={`https://etherscan.io/tx/${transaction.transaction_hash}`}
                                            target="_blank"
                                            underline="none"
                                        >
                                            View on Etherscan
                                        </Link>
                                    )}
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Box>
            )}
        </DashboardCard>
    );
};

export default UserRecentTransactions;
