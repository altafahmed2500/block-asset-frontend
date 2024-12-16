import React, { useEffect, useState } from 'react';
import { Grid, Typography, Tooltip, Fab, CardContent } from '@mui/material';
import { Stack } from '@mui/system';
import { IconCoins } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const AssetGrid = () => {
    const [assets, setAssets] = useState([]); // State to store user assets
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    const theme = useTheme(); // Access theme colors
    const colorPalette = [
        theme.palette.primary?.main || '#2196f3',
        theme.palette.secondary?.main || '#f50057',
        theme.palette.success?.main || '#4caf50',
        theme.palette.error?.main || '#f44336',
    ];

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Access token is missing. Please log in again.');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/assets/userassets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('API Response:', response.data); // Log the API response
                setAssets(response.data.assets || []);
            } catch (err) {
                setError(err.message || 'Failed to fetch assets.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    if (loading) {
        return <Typography>Loading assets...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {assets.map((asset, index) => (
                <Grid item sm={12} md={4} lg={3} key={asset.asset_id || index}>
                    <BlankCard sx={{ p: 2, textAlign: 'center', backgroundColor: 'transparent' }}>
                        <Tooltip title={`Asset ID: ${asset.asset_id || 'N/A'}`}>
                            <Fab
                                size="large"
                                sx={{
                                    backgroundColor: colorPalette[index % colorPalette.length], // Cycle through colors
                                    color: 'white',
                                    width: '120px', // Reduced size for a cleaner look
                                    height: '120px',
                                    marginBottom: 2,
                                    align: 'center' // Add gap between the Fab and text below
                                }}
                            >
                                <IconCoins size={60} />
                            </Fab>
                        </Tooltip>
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="h6" noWrap>
                                {asset.name || 'Unnamed Asset'}
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Typography variant="body2">Token ID: {asset.token_id || 'N/A'}</Typography>
                            </Stack>
                            <Typography variant="caption" color="textSecondary" mt={1}>
                                Created: {asset.created_at ? new Date(asset.created_at).toLocaleString() : 'Unknown'}
                            </Typography>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default AssetGrid;
