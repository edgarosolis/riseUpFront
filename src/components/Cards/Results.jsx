import { Box, Container, Typography } from '@mui/material'

const Results = ({sectionColor,title,currentSection}) => {

    return (
    <Container maxWidth="xl">
        <Box sx={{backgroundColor:sectionColor, margin:"30px -30px", padding:"20px 30px"}}>
        <Typography
            variant="h6"
            color='white'
            fontWeight="bold"
            sx={{  
            maxWidth:"600px",
            fontSize:'2rem',
            }}
        >
            {title}
        </Typography>
        <Typography
            variant="h6"
            color={currentSection?.section === "s1" ? "black" : currentSection?.section === "s3" ? "#F4C542" : "white"}
            sx={{
            maxWidth:"600px",
            fontSize:'1.5rem',
            }}
        >{currentSection?.content.title}</Typography>
        <Typography component={"div"} variant='subtitle1' color={currentSection?.section==="s1"?"black":"white"} sx={{marginTop:"20px", marginBottom:"10px"}} dangerouslySetInnerHTML={{__html:`${currentSection?.content?.content}`}}/>
        </Box>
    </Container>
    )
}

export default Results