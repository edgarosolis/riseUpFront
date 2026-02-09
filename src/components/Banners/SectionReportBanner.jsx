import { Box, Container, Grid, Typography } from "@mui/material"

const SectionReportBanner = ({sectionColor,index, title,intro,image}) => { 
    return (
    <Box sx={{backgroundColor:"backSections.main",paddingTop:"50px",paddingBottom:"30px"}}>
        <Container maxWidth="xl">
            <Grid container spacing={5} alignItems="center">
                <Grid size={image?8:12}>
                <Box sx={{ zIndex: 2, position: 'relative' }}>
                    <Typography 
                        variant="h4"
                        color={sectionColor}
                        sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '2.5rem', md: '2.5rem' },
                        }}
                    >
                        SECTION {index+1}:
                    </Typography>
                    <Typography
                        variant="h6" 
                        sx={{  
                        maxWidth:"600px",
                        fontSize:'2rem', 
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography component={"div"} variant='subtitle1' sx={{marginTop:"20px", marginBottom:"10px"}} dangerouslySetInnerHTML={{__html:`${intro}`}}/>
                </Box>
                </Grid>
                {
                    image &&
                    <Grid size={4}>
                        <Box>
                            {<img src={image} alt="section_image" style={{width:"120%"}}/>}
                        </Box>
                    </Grid>
                }
            </Grid>
        </Container>
    </Box>
    )
}

export default SectionReportBanner