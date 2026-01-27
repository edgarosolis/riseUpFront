import { Box, Container, Typography } from "@mui/material"

const MiniBanner = ({title,subtitle, bgColor="report.main",center=false, titleSize="1.7"}) => {

    return (
    <Box sx={{backgroundColor:bgColor,paddingTop:"30px",paddingBottom:"30px"}}>
        <Container maxWidth="xl" sx={{display:"flex",flexDirection:"column",alignItems:center?"center":"normal"}}>
            <Typography variant='h6' color='white' fontWeight={600} sx={{fontSize:`${titleSize}rem`}}>{title}</Typography>
            <Typography variant='subtitle1' color="primary" fontWeight={600}>{subtitle}</Typography>
        </Container>
    </Box>
    )
}

export default MiniBanner