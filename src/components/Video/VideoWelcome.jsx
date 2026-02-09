import { Box, Button, Container } from '@mui/material'
import {Link} from 'react-router';

const VideoWelcome = ({sections}) => {
  
  return (
    <Container maxWidth="lg">
    <Box 
      sx={{ 
        position: 'relative', 
        paddingTop: '56.25%', 
        margin: "30px 0px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#000",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.2)"
      }}
    >
      <Box
        component="video"
        controls 
        playsInline
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      >
        <source src="/assets/videos/IntroAssessment.mov" type="video/quicktime" />
        <source src="/assets/videos/IntroAssessment.mov" type="video/mp4" />
        Tu navegador no soporta videos.
      </Box>
    </Box>
    <Box display={"flex"} justifyContent={"center"}>
        <Button component={Link} to={`/section/${sections[0]?._id}`} className='roundedB' variant='contained' color='primary'>START</Button>
    </Box>
    </Container>
  )
}

export default VideoWelcome