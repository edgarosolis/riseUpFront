import { Box, Container, Grid, Typography } from '@mui/material'

const SectionBanner = ({title,description,noQuestions,image,index}) => {
    return (
    <Box sx={{backgroundColor:"backSections.main", paddingTop:{xs:"30px", md:"50px"}, paddingBottom:{xs:"30px", md:"50px"}}}>
        <Container maxWidth="xl" sx={{px: {xs: 2, sm: 3}}}>
            <Grid container spacing={{xs: 2, md: 5}} alignItems="center">
                <Grid size={{xs: 12, md: 8}}>
                <Box sx={{ zIndex: 2, position: 'relative', textAlign: {xs: 'center', md: 'left'} }}>
                    <Typography
                        variant="h2"
                        color="yellow1.main"
                        sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3.5rem' },
                        }}
                    >
                        SECTION {index+1}:
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                        fontWeight: 600,
                        maxWidth:{xs:"100%", md:"600px"},
                        fontSize:{xs: '1.3rem', sm: '1.8rem', md: '2.5rem'},
                        marginTop:{xs:"10px", md:"20px"},
                        mx: {xs: 'auto', md: 0}
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant='h6' sx={{fontSize:{xs:"1rem", md:"1.5rem"}, marginBottom:{xs:"10px", md:"20px"}}}>({noQuestions} questions)</Typography>
                    <Typography component={"div"} variant='subtitle1' sx={{marginBottom:{xs:"15px", md:"30px"}, fontSize:{xs:"0.9rem", md:"1rem"}}} dangerouslySetInnerHTML={{__html:`${description}`}}/>
                </Box>
                </Grid>
                <Grid size={{xs: 12, md: 4}} sx={{display: {xs: 'none', sm: 'block'}}}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <img src={image} alt="section_image" style={{width:"100%", maxWidth:"300px"}}/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
    )
}

export default SectionBanner