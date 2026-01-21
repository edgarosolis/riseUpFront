import { Box, styled } from "@mui/system";

export const BannerContainerReport = styled(Box)(({ theme }) => ({
    backgroundColor: '#383838', // Color institucional
    color: 'white',
    position: 'relative',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20), // Espacio inferior para acomodar el SVG
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    minHeight: '500px',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(15),
      textAlign: 'center',
    },
}));