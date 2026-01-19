import WaveBanner from '../../components/Banners/WaveBanner';
import WelcomeIntro from '../../components/Texts/WelcomeIntro';
import VideoWelcome from '../../components/Video/VideoWelcome';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { AssessmentContext } from '../../context/assessment';

const Welcome = () => {

  const {currentAssessment,isLoading} = useContext(AssessmentContext);

  return (
    <>
    {
    !isLoading && 
    <Box sx={{paddingBottom:"50px"}}>
        <WaveBanner title={"WELCOME"} subtitle={"TO YOUR KINGDOM CALLING ASSESSMENT"} imageUrl={currentAssessment?.image}/>
        <WelcomeIntro/>
        <VideoWelcome sections={currentAssessment?.sections}/>
    </Box>
    }
    </>
  )
}

export default Welcome