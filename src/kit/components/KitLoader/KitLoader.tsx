import { Box, CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import KitShow from "../KitShow";

interface Props {
    isLoading: boolean;
    showLabel?: boolean;
    isDarkTheme?: boolean;
}
const KitLoader = ({
    isLoading,
    showLabel = true,
}: Props) => {

    if (!isLoading) return null;

    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress
                    sx={{
                        color: '#FFFFFF',
                    }}
                />
                <KitShow show={Boolean(showLabel)}>
                    <Typography
                        sx={{
                            mt: 4,
                            color: '#FFFFFF',
                        }}
                    >
                        Loading...
                    </Typography>
                </KitShow>
            </Box>
        </Grid>
    );
};

export default KitLoader;