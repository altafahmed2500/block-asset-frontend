import { useMediaQuery, Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import { Sidebar } from 'react-mui-sidebar';
import logo from '../../../assets/images/logos/Subi-asset-logo.png';

const MSidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px';

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  // Custom Logo with "SubiAssets" text in top-left corner
  const CustomLogo = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align logo and text to the left
        padding: '16px',
        position: 'relative',
      }}
    >
      {/* Logo Image */}
      <img
        src={logo}
        alt="Subi-asset-logo"
        style={{
          height: '80px',
          marginRight: '8px', // Space between logo and text
        }}
      />
      {/* SubiAssets Text */}
      <Box
        sx={{
          fontSize: '24px',
          fontWeight: '1000',
          fontFamily: 'Serif',
          color: '#796878', // Adjust text color
        }}
      >
        SubiAssets
      </Box>
    </Box >
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for Desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={props.isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* Custom Logo */}
              <CustomLogo />
              <Box>
                {/* Sidebar Items */}
                <SidebarItems />
                <Upgrade />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Sidebar
        width={'270px'}
        collapsewidth="80px"
        isCollapse={false}
        mode="light"
        direction="ltr"
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        {/* Custom Logo */}
        <CustomLogo />
        {/* Sidebar Items */}
        <SidebarItems />
        <Upgrade />
      </Sidebar>
    </Drawer>
  );
};

export default MSidebar;
