import { Box, Container, Typography } from "@mui/material"

const MiniBanner = ({title,subtitle}) => {

    return (
    <Box sx={{backgroundColor:"report.main",paddingTop:"30px",paddingBottom:"30px"}}>
        <Container maxWidth="xl">
            <Typography variant='h6' color='white' fontWeight={600} sx={{fontSize:"1.7rem"}}>{title}</Typography>
            <Typography variant='subtitle1' color="primary" fontWeight={600}>{subtitle}</Typography>
        </Container>
    </Box>
    )
}

export default MiniBanner