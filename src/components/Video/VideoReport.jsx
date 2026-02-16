import { Box, Container } from "@mui/material"
import ReactPlayer from 'react-player';

const VideoReport = () => {
    return (
      <Container maxWidth="md">
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
            <source src="/assets/videos/OutroAssessment.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </Box>
        </Box>
      </Container>
    )
  }

export default VideoReport