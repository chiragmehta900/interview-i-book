import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, styled } from "@mui/material";
import KitLoader from "../kit/components/KitLoader";

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

const SplashScreen = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/login')
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return(
        <PageWrapper sx={{  backgroundImage: `url('/images/splash/background-layer.png')` }}>
            <Box sx={{ maxWidth: '600px'}}>
                <Logo src={'/images/logo.svg'} alt={'logo'} />
                <KitLoader isLoading showLabel={false} />
            </Box>
        </PageWrapper>
    )
}

export default SplashScreen;