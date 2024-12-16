import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { IconCloudUpload } from '@tabler/icons-react';
import axios from 'axios';

const UploadFile = () => {
    const [message, setMessage] = useState(''); // Feedback message
    const [loading, setLoading] = useState(false); // Loading state
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (!file) {
            setMessage('No file selected. Please try again.');
            return;
        }

        const formData = new FormData();
        formData.append('file_path', file); // Match the backend key 'file_path'

        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            if (!token) {
                setMessage('Access token is missing. Please log in again.');
                return;
            }

            // API call to upload file
            const response = await axios.post('http://127.0.0.1:8000/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Handle success response
            const data = response.data;
            setMessage(`File uploaded successfully! File ID: ${data.file_id}`);
        } catch (error) {
            console.error('Error response:', error.response); // Debugging
            if (error.response) {
                // Handle specific backend error response
                const errorMessage = error.response.data?.file_path?.[0] || error.response.data?.message;
                if (errorMessage) {
                    setMessage(errorMessage);
                } else {
                    setMessage('An error occurred while uploading the file.');
                }
            } else {
                setMessage('Unable to connect to the server. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardCard title="Upload Your File">
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                {/* Hidden file input */}
                <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {/* Upload icon with background */}
                <Button
                    component="label"
                    htmlFor="file-upload"
                    sx={{
                        bgcolor: primary,
                        borderRadius: '50%',
                        width: 80,
                        height: 80,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': { bgcolor: theme.palette.primary.dark },
                    }}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? (
                        <Typography variant="subtitle2" color="white">
                            Uploading...
                        </Typography>
                    ) : (
                        <IconCloudUpload color="white" size={40} />
                    )}
                </Button>
            </Box>

            {/* Feedback Message */}
            {message && (
                <Typography
                    align="center"
                    color={
                        message.includes('successfully') || message.includes('exists')
                            ? 'success.main'
                            : 'error.main'
                    }
                >
                    {message}
                </Typography>
            )}
        </DashboardCard>
    );
};

export default UploadFile;
