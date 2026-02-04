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
import Separator from "../../components/Banners/Separator"
import SectionReportBanner from "../../components/Banners/SectionReportBanner"
import Results from "../../components/Cards/Results"

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

  const finalSection = ()=>{
    const info = [...reportInfo];
    return info[info.length-1];
  }

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
        <Separator sectionColor={"#6E5600"}/>
        <SectionReportBanner sectionColor={"#6E5600"} title={"The Wonder of You (FIVE-FOLD + BIBLICAL DNA)"} index={3} intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`}/>
        <Results sectionColor={"#6E5600"} title={"The Wonder of You"} currentSection={finalSection()}/>
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