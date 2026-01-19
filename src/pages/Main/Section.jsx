import React, { useContext, useEffect, useState } from 'react'
import SectionBanner from '../../components/Banners/SectionBanner'
import { Box, CircularProgress } from '@mui/material'
import SectionBar from '../../components/Banners/SectionBar'
import QuestionsSections from '../../components/QuestionsSections'
import { useNavigate, useParams } from 'react-router'
import { AssessmentContext } from '../../context/assessment'
import { UserContext } from '../../context/user'
import { getActiveUserSubmission } from '../../axios/axiosFunctions'

const Section = () => {

    const {id}=useParams();
    const navigate = useNavigate();
    const { getSectionInfo, currentAssessment, isLoading } = useContext(AssessmentContext);
    const { currentUser } = useContext(UserContext)
    const [sectionInfo, setSectionInfo] = useState(null);
    const [userSubmission, setUserSubmission] = useState();

    useEffect(() => {      
        if(isLoading) return;
        const info = getSectionInfo(id);
        if(!info || !info.section){
            navigate('/');
        }
        setSectionInfo(info);
    }, [id,getSectionInfo,isLoading,navigate]);

    useEffect(() => {
        const callUserSubmission = async()=>{
            if(currentAssessment && currentUser){
                const answers = await getActiveUserSubmission(currentAssessment._id,currentUser._id);
                if(answers){
                    setUserSubmission(answers.submission);
                }
            }
        }
        callUserSubmission();
    }, [currentAssessment,currentUser])

    if (isLoading || !sectionInfo) {
        return <Box sx={{ p: 4 }}><CircularProgress/></Box>; // O un Spinner de MUI
    }

    return (
    <Box sx={{paddingBottom:"50px"}}>
        {
            sectionInfo &&
            <>
                <SectionBanner title={sectionInfo?.section?.title} description={sectionInfo?.section?.description} noQuestions={sectionInfo?.section?.questions?.length} image={sectionInfo?.section?.image} index={sectionInfo?.index}/>
                <SectionBar subtitle={sectionInfo?.section?.subtitle} noQuestions={sectionInfo?.section?.questions.length}/>
                <QuestionsSections answers={userSubmission?.answers} submissionId={userSubmission?._id} questions={sectionInfo?.section?.questions} noQuestions={sectionInfo?.section?.questions?.length} nextSection={sectionInfo?.next}/>
            </>
        }
    </Box>
    )
}

export default Section