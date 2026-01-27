import { Box, CircularProgress } from "@mui/material"
import WaveBannerReport from "../../components/Banners/WaveBannerReport"
import { useContext, useEffect, useState } from "react"
import { AssessmentContext } from "../../context/assessment"
import ReportIntro from "../../components/Texts/ReportIntro"
import VideoReport from "../../components/Video/VideoReport"
import MiniBanner from "../../components/Banners/MiniBanner"
import ReportResults from "../../components/Texts/ReportResults"
import ReportUnderstanding from "../../components/Texts/ReportUnderstanding"
import ReportHowTo from "../../components/Texts/ReportHowTo"
import SectionsReport from "../../components/SectionsReport"
import ReportNextSteps from "../../components/Texts/ReportNextSteps"
import ReportLeader from "../../components/Texts/ReportLeader"
import { UserContext } from "../../context/user"
import { getActiveUserSubmission, getReportInfo } from "../../axios/axiosFunctions"
import DownloadSection from "../../components/DownloadSection"

const Report = () => {

  const {currentAssessment} = useContext(AssessmentContext);
  const {currentUser} = useContext(UserContext);
  const [reportInfo, setReportInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [userSubmission, setUserSubmission] = useState();

  const callReportData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    const [resInfo, resAnswers] = await Promise.all([
      getReportInfo(currentAssessment?._id, currentUser?._id),
      getActiveUserSubmission(currentAssessment?._id, currentUser?._id)
    ]);

    const report = resInfo?.report;
    const submission = resAnswers?.submission;

    if(report) setReportInfo(report);
    if(submission) setUserSubmission(submission);
    
    setLoading(false);
    return { report, submission };
  };

  useEffect(() => {
    if(currentAssessment && currentUser){
      callReportData();
    }
  }, [currentAssessment,currentUser])

  return (
    <>
      {
      loading ? 
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress/>    
      </Box>
      :
      <Box sx={{paddingBottom:"50px"}}>
        <WaveBannerReport title={currentAssessment?.title}/>
        <MiniBanner title={"Embracing the Wonder of You"} bgColor="#F4C542" center={true} titleSize={"2.3"}/>
        <ReportIntro/>
        <VideoReport/>
        <MiniBanner title={"Your Result"}/>
        <ReportResults reportInfo={reportInfo}/>
        <MiniBanner title={"Understanding the Report"}/>
        <ReportUnderstanding/>
        <MiniBanner title={"How to Use This Report"}/>
        <ReportHowTo/>
        {
          currentAssessment?.sections.map((s,i)=>(
            <SectionsReport key={i} section={s} index={i} reportInfo={reportInfo} userSubmission={userSubmission} refreshData={()=>callReportData(true)}/>
          ))
        }
        <MiniBanner title={"Next Steps: A Spiritual Response"}/>
        <ReportNextSteps answers={userSubmission?.answers} submissionId={userSubmission?._id} refreshData={()=>callReportData(true)}/>
        <MiniBanner title={"You Are A Leader"} subtitle={"Now Step into It"} />
        <ReportLeader/>
        <DownloadSection sections={currentAssessment?.sections} fetchData={callReportData} userSubmission={userSubmission} userName={`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`}/>
      </Box>    
      }
    </>
  )
}

export default Report