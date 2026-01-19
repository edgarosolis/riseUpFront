import { Box, Button, Container } from '@mui/material'
import {Link} from 'react-router';

const VideoWelcome = ({sections}) => {
  
  return (
    <Container maxWidth="xl">
    ***INSERT VIDEO HERE***
    <Box display={"flex"} justifyContent={"center"}>
        <Button component={Link} to={`/section/${sections[0]?._id}`} className='roundedB' variant='contained' color='primary'>START</Button>
    </Box>
    </Container>
  )
}

export default VideoWelcome