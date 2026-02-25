import React, { useContext, useEffect, useState } from 'react'
import SectionBanner from '../../components/Banners/SectionBanner'
import { Box, CircularProgress } from '@mui/material'
import SectionBar from '../../components/Banners/SectionBar'
import QuestionsSections from '../../components/QuestionsSections'
import { useNavigate, useParams } from 'react-router'
import { AssessmentContext } from '../../context/assessment'
import { UserContext } from '../../context/user'
import { getActiveUserSubmission, getActiveSubmission360 } from '../../axios/axiosFunctions'

const Section = () => {

    const {id, groupId}=useParams();
    const navigate = useNavigate();
    const { getSectionInfo, currentAssessment, isLoading } = useContext(AssessmentContext);
    const { currentUser } = useContext(UserContext)
    const [sectionInfo, setSectionInfo] = useState(null);
    const [userSubmission, setUserSubmission] = useState();

    useEffect(() => {
        if(isLoading) return;
        const info = getSectionInfo(id);
        if(!info || !info.section){
            navigate(groupId ? `/group/${groupId}/welcome` : '/');
        }
        setSectionInfo(info);
    }, [id,getSectionInfo,isLoading,navigate,groupId]);

    useEffect(() => {
        const callUserSubmission = async()=>{
            if(currentAssessment && currentUser){
                if(groupId){
                    // 360 group context: fetch Submission360
                    const res = await getActiveSubmission360(currentUser._id, currentUser._id, groupId);
                    if(res && res.submission){
                        setUserSubmission(res.submission);
                    }
                } else {
                    // Normal assessment
                    const answers = await getActiveUserSubmission(currentAssessment._id,currentUser._id);
                    if(answers){
                        setUserSubmission(answers.submission);
                    }
                }
            }
        }
        callUserSubmission();
    }, [currentAssessment,currentUser,groupId])

    if (isLoading || !sectionInfo) {
        return <Box sx={{ p: 4 }}><CircularProgress/></Box>;
    }

    return (
    <Box sx={{paddingBottom:"50px"}}>
        {
            sectionInfo &&
            <>
                <SectionBanner title={sectionInfo?.section?.title} description={sectionInfo?.section?.description} noQuestions={sectionInfo?.section?.questions?.length} image={sectionInfo?.section?.image} index={sectionInfo?.index}/>
                <SectionBar title={sectionInfo?.section?.title} subtitle={sectionInfo?.section?.subtitle} noQuestions={sectionInfo?.section?.questions.length}/>
                <QuestionsSections
                    answers={userSubmission?.answers}
                    submissionId={userSubmission?._id}
                    questions={sectionInfo?.section?.questions}
                    noQuestions={sectionInfo?.section?.questions?.length}
                    nextSection={sectionInfo?.next}
                    groupId={groupId}
                />
            </>
        }
    </Box>
    )
}

export default Section
