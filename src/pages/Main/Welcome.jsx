import WaveBanner from '../../components/Banners/WaveBanner';
import WelcomeIntro from '../../components/Texts/WelcomeIntro';
import VideoWelcome from '../../components/Video/VideoWelcome';
import { Box } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AssessmentContext } from '../../context/assessment';
import { UserContext } from '../../context/user';
import { getActiveUserSubmission } from '../../axios/axiosFunctions';
import { useNavigate } from 'react-router';

const Welcome = () => {

  const navigate = useNavigate();
  const {currentAssessment,isLoading} = useContext(AssessmentContext);
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    if(currentAssessment && currentUser){
      callSubmission(); 
    }
  }, [currentAssessment,currentUser]);

  const callSubmission = async()=>{
    const res = await getActiveUserSubmission(currentAssessment._id,currentUser._id);
    if(res){
      if(res.submission.finished){
        navigate('/report');
      }
    }
  }  

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