import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/rocket.png';

export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h6" mb={1}>Contact Developer</Typography>
                    <Button color="primary" target="_blank" href="http://altafahmedm.com/" variant="contained" aria-label="logout" size="small">
                        Contact
                    </Button>
                </Box>
                <Box mt="-35px">
                    <img alt="Remy Sharp" src={img1} width={100} />
                </Box>
            </>
        </Box>
    );
};
