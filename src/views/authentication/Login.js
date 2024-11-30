import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import logo from 'src/assets/images/logos/Subi-asset-logo.png';
import axios from 'axios';

// Custom Logo Component
const CustomLogo = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '16px',
      position: 'relative',
    }}
  >
    <img
      src={logo}
      alt="Subi-asset-logo"
      style={{
        height: '40px',
        marginRight: '8px', // Space between logo and text
      }}
    />
    <Box
      sx={{
        fontSize: '24px',
        fontWeight: '900',
        fontFamily: 'Serif',
        color: '#796878', // Adjust text color
      }}
    >
      SubiAssets
    </Box>
  </Box>
);

const Login2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      // Extract tokens from the response
      const { access, refresh } = response.data;

      // Save tokens to localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <CustomLogo />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={2}>
                  A Decentralized Asset
                </Typography>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {error && (
                  <Typography variant="body2" color="error" textAlign="center" mb={2}>
                    {error}
                  </Typography>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  sx={{ mb: 2 }}
                >
                  Login
                </Button>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Typography color="textSecondary" variant="body2">
                    New to Modernize?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/auth/register"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
