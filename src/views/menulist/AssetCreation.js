import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import UsersAssetCount from '../dashboard/components/UsersAssetCount';
import UploadFile from '../dashboard/components/UploadFile';
import UserFiles from '../dashboard/components/UserFiles';

const AssetCreation = () => {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <UploadFile />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <UsersAssetCount />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <UserFiles />
                    </Grid>
                    <Grid item xs={12} lg={4}>

                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default AssetCreation;
