import React, { useEffect, useState } from 'react';
import {
    CardContent,
    Typography,
    Grid,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { IconFile } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const UserFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [assetName, setAssetName] = useState(''); // State for asset name input
    const [message, setMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const theme = useTheme();
    const colorPalette = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.error.main];

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setError('Access token is missing. Please log in again.');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/assets/getUserFilesWithAssets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFiles(response.data.files || []);
            } catch (err) {
                setError('Failed to fetch files. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const handleOpen = (file) => {
        setSelectedFile(file);
        setAssetName(''); // Clear the input when opening the dialog
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setAssetName('');
        setMessage('');
    };

    const handleUpdateAndCreateAsset = async () => {
        if (!selectedFile || !assetName) {
            setMessage('Asset name is required.');
            return;
        }
        setIsUpdating(true);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setMessage('Access token is missing. Please log in again.');
                return;
            }

            const response = await axios.post(
                'http://127.0.0.1:8000/api/assets/updateuploadcreate',
                {
                    file_id: selectedFile.file_id,
                    name: assetName, // Use the entered asset name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message || 'Metadata updated, file uploaded, and asset created successfully.');
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to update and create the asset.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return <Typography>Loading files...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <Grid container spacing={3} sx={{ p: 2 }}>
                {files.map((file, index) => (
                    <Grid item sm={12} md={4} lg={3} key={file.file_id}>
                        <BlankCard>
                            <Tooltip title="Click to update and create asset">
                                <Fab
                                    size="large"
                                    sx={{
                                        p: 4, // Increased padding for above and below
                                        textAlign: 'center',
                                        backgroundColor: colorPalette[index % colorPalette.length],
                                        // Cycle through colors
                                        display: 'flex', // Use flexbox for centering
                                        flexDirection: 'column', // Arrange content in a column
                                        justifyContent: 'center', // Center content vertically
                                        alignItems: 'center', // Center content horizontally
                                        margin: '20px auto', // Center horizontally and add vertical spacing
                                        maxWidth: '300px', // Set a max width for consistent margins
                                        borderRadius: '8px', // Optional: Add rounded corners for a cleaner look
                                    }}
                                    onClick={() => handleOpen(file)}
                                >
                                    <IconFile size={80} />
                                </Fab>
                            </Tooltip>
                            <CardContent sx={{ p: 3, pt: 2 }}>
                                <Typography variant="h6" noWrap>
                                    {file.file_metadata.file_name}
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    {file.asset_id
                                        ? `Asset Number: ${file.asset_id}`
                                        : 'Not an Asset'}
                                </Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                    <Typography variant="body2">
                                        Size: {(file.file_metadata.file_size / 1024).toFixed(2)} KB
                                    </Typography>
                                </Stack>
                                <Typography variant="caption" color="textSecondary" mt={1}>
                                    Uploaded: {new Date(file.created_at).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update and Create Asset</DialogTitle>
                <DialogContent>
                    <Typography>
                        Enter the asset name and confirm to update the metadata and upload the file to IPFS.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Asset Name"
                        type="text"
                        fullWidth
                        value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    {message && (
                        <Typography
                            color={message.includes('successfully') ? 'success.main' : 'error'}
                            sx={{ mt: 2 }}
                        >
                            {message}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateAndCreateAsset} color="primary" disabled={isUpdating || !assetName}>
                        {isUpdating ? 'Updating...' : 'Update and Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserFiles;
