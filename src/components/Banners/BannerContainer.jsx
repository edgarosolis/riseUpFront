import { Box, styled } from "@mui/system";

export const BannerContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#000000',
    color: 'white',
    position: 'relative',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
}));