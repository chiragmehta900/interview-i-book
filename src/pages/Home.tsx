import React from "react";
import {Box, styled} from "@mui/material";
import KitLoader from "../kit/components/KitLoader";
import Typography from "@mui/material/Typography";

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
    marginBottom: '20px'
}));

const Home = () => {
    return(
        <PageWrapper sx={{  backgroundImage: `url('/images/splash/background-layer.png')` }}>
            <Box sx={{ maxWidth: '600px'}}>
                <Logo src={'/images/logo.svg'} alt={'logo'} />
                <Typography variant={'h4'} sx={{ fontWeight: '900', color: '#FFFFFF' }}>WELCOME HOME</Typography>
            </Box>
        </PageWrapper>
    )
}

export default Home;