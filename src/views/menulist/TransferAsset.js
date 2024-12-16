import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import axios from 'axios';

const TransferAssetDashboard = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transferStatus, setTransferStatus] = useState({});
    const [toAddressInputs, setToAddressInputs] = useState({}); // Store recipient addresses for each asset

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

                setAssets(response.data.assets || []);
            } catch (err) {
                setError(err.message || 'Failed to fetch assets.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    const handleTransfer = async (assetId, tokenId) => {
        const toAddress = toAddressInputs[assetId];
        if (!toAddress) {
            setTransferStatus((prev) => ({
                ...prev,
                [assetId]: 'Recipient address is required.',
            }));
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const response = await axios.post(
                'http://127.0.0.1:8000/api/assets/transferToken',
                {
                    token_id: tokenId,
                    to_address: toAddress,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTransferStatus((prev) => ({
                ...prev,
                [assetId]: 'Asset transferred successfully!',
            }));
        } catch (err) {
            setTransferStatus((prev) => ({
                ...prev,
                [assetId]: err.response?.data?.error || 'Failed to transfer asset.',
            }));
        }
    };

    const handleInputChange = (assetId, value) => {
        setToAddressInputs((prev) => ({
            ...prev,
            [assetId]: value,
        }));
    };

    if (loading) {
        return <Typography>Loading assets...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {assets.map((asset) => (
                <Grid item sm={12} md={6} lg={4} key={asset.asset_id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{asset.name || 'Unnamed Asset'}</Typography>
                            <Typography variant="body2">
                                Token ID: {asset.token_id || 'N/A'}
                            </Typography>
                            <Typography variant="body2">
                                Created: {asset.created_at
                                    ? new Date(asset.created_at).toLocaleString()
                                    : 'Unknown'}
                            </Typography>
                            <Typography variant="body2">
                                Owner: {asset.asset_owner || 'Unknown'}
                            </Typography>
                        </CardContent>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<IconArrowUpLeft
                                />}
                                aria-controls="panel-content"
                                id="panel-header"
                            >
                                <Typography>Transfer Asset</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    fullWidth
                                    label="Recipient Address"
                                    value={toAddressInputs[asset.asset_id] || ''}
                                    onChange={(e) =>
                                        handleInputChange(asset.asset_id, e.target.value)
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => handleTransfer(asset.asset_id, asset.token_id)}
                                >
                                    Transfer
                                </Button>
                                {transferStatus[asset.asset_id] && (
                                    <Typography
                                        variant="body2"
                                        color={
                                            transferStatus[asset.asset_id].includes('successfully')
                                                ? 'green'
                                                : 'error'
                                        }
                                        mt={2}
                                    >
                                        {transferStatus[asset.asset_id]}
                                    </Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default TransferAssetDashboard;
