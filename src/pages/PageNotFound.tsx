import React from "react";
import {Box, styled, Typography} from "@mui/material";

const PageWrapper = styled(Box)(() => ({
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const Logo = styled('img')(() => ({
    height: 'auto',
    width: 'auto',
    display: 'flex',
    margin: '0 auto'
}));

const PageNotFound = () => {
    return(
        <PageWrapper sx={{  backgroundImage: `url('/images/splash/background-layer.png')` }}>
            <Box sx={{ maxWidth: '600px'}}>
                <Logo src={'/images/logo.svg'} alt={'logo'} />
                <Typography variant={'h5'} mt={10} sx={{ color: '#FFF', fontWeight: 'bold', textAlign: 'center'}}>You didn't break the internet, but we can't find what your are looking for.</Typography>
            </Box>
        </PageWrapper>
    )
}

export default PageNotFound;