import { Box, Container, Grid, Typography } from '@mui/material'

const SectionBanner = ({title,description,noQuestions,image,index}) => {
    return (
    <Box sx={{backgroundColor:"backSections.main",paddingTop:"50px",paddingBottom:"50px"}}>
        <Container maxWidth="xl">
            <Grid container spacing={5} alignItems="center">
                <Grid size={8}>
                <Box sx={{ zIndex: 2, position: 'relative' }}>
                    <Typography 
                        variant="h2"
                        color="yellow1.main"
                        sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                    >
                        SECTION {index+1}:
                    </Typography>
                    <Typography
                        variant="h4" 
                        sx={{ 
                        fontWeight: 600,
                        maxWidth:"600px",
                        fontSize:'2.5rem',
                        marginTop:"20px"
                        }}
                    >
                        {title}
                    </Typography> 
                    <Typography variant='h6' sx={{fontSize:"1.5rem",marginBottom:"20px"}}>({noQuestions} questions)</Typography>
                    <Typography component={"div"} variant='subtitle1' sx={{marginBottom:"30px"}} dangerouslySetInnerHTML={{__html:`${description}`}}/>
                </Box>
                </Grid>
                <Grid size={4}>
                    <Box>
                        <img src={image} alt="section_image" style={{width:"120%"}}/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
    )
}

export default SectionBanner