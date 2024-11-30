import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { IconListCheck, IconMail, IconUser, IconCreditCard } from '@tabler/icons-react'; // Example icon
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [publicAddress, setPublicAddress] = useState('Loading...'); // Default state for public address
  const navigate = useNavigate(); // React Router navigate function

  // Fetch user account details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
        if (!token) {
          handleLogout();
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/account/getAddress', {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        });

        setPublicAddress(response.data.public_address); // Update the public address from API
      } catch (error) {
        console.error('Failed to fetch account details:', error);
        if (error.response && error.response.status === 401) {
          handleLogout(); // Logout if the token is invalid or expired
        }
      }
    };

    fetchAccountDetails();
  }, []);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Logout Function
  const handleLogout = () => {
    // Remove authentication tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect to the login page
    navigate('/auth/login');
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {/* Account Public Address and Icon */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconCreditCard size={20} color="gray" /> {/* Replace with desired icon */}
        <Typography variant="body1" fontWeight="500">
          Account no: {publicAddress}
        </Typography>
      </Box>

      {/* Avatar and Dropdown */}
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          {/* Logout Button */}
          <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
