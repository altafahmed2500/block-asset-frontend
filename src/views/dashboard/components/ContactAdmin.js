import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import axios from 'axios';

const ContactAdmin = () => {
    const [incidentName, setIncidentName] = useState('');
    const [incidentDescription, setIncidentDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setMessage('Access token is missing. Please log in again.');
                return;
            }

            const response = await axios.post(
                'http://127.0.0.1:8000/api/user/incidents/create',
                {
                    incident_name: incidentName,
                    incident_description: incidentDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message || 'Incident submitted successfully.');
            setIncidentName('');
            setIncidentDescription('');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to submit the incident.');
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" mb={2}>
                Contact Admin
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="Incident Name"
                    variant="outlined"
                    fullWidth
                    value={incidentName}
                    onChange={(e) => setIncidentName(e.target.value)}
                />
                <TextField
                    label="Incident Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={incidentDescription}
                    onChange={(e) => setIncidentDescription(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!incidentName || !incidentDescription}
                >
                    Submit Incident
                </Button>
                {message && (
                    <Typography color={message.includes('successfully') ? 'success.main' : 'error'} variant="body2">
                        {message}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default ContactAdmin;
