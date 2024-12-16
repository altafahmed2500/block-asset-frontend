import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Typography } from '@mui/material';
import { IconBrandStripe } from '@tabler/icons-react';
import axios from 'axios';

const UsersAssetCount = () => {
    const [month, setMonth] = React.useState('1'); // State for dropdown selection
    const [assetCount, setAssetCount] = useState(0); // State for total assets
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    const theme = useTheme();
    const primary = theme.palette.primary.main;

    useEffect(() => {
        const fetchAssetCount = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Access token is missing. Please log in again.');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/assets/userassetcount', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set asset count from the `total_assets` field in the response
                setAssetCount(response.data.total_assets || 0);
            } catch (err) {
                setError(err.message || 'Failed to fetch asset count.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssetCount();
    }, []);

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <DashboardCard
            title="The Assets You Own"
            action={
                <Select
                    labelId="month-dd"
                    id="month-dd"
                    value={month}
                    size="small"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>December 2024</MenuItem>
                    <MenuItem value={2}>January 2025</MenuItem>
                    <MenuItem value={3}>February 2025</MenuItem>
                </Select>
            }
        >
            <Box display="flex" alignItems="center" gap={2}>
                {/* Avatar with icon */}
                <Avatar
                    sx={{
                        bgcolor: primary,
                        width: 56,
                        height: 56,
                    }}
                >
                    <IconBrandStripe color="white" size={75} />
                </Avatar>

                {/* Asset Count */}
                {loading ? (
                    <Typography variant="h6" fontWeight="700">
                        Loading...
                    </Typography>
                ) : error ? (
                    <Typography variant="h6" color="error" fontWeight="700">
                        {error}
                    </Typography>
                ) : (
                    <Typography variant="h1" fontWeight="700" fontSize="100">
                        {assetCount}
                    </Typography>
                )}
            </Box>
        </DashboardCard>
    );
};

export default UsersAssetCount;
