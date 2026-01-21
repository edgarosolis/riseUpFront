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
import { getReportInfo } from "../../axios/axiosFunctions"

const Report = () => {

  const {currentAssessment} = useContext(AssessmentContext);
  const {currentUser} = useContext(UserContext);
  const [reportInfo, setReportInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(currentAssessment && currentUser){
      callReportInfo(); 
    }
  }, [currentAssessment,currentUser])
  
  const callReportInfo = async()=>{
    const res = await getReportInfo(currentAssessment?._id,currentUser?._id)
    if(res){
      setReportInfo(res.report);
    }
    setLoading(false);
  }

  return (
    <>
      {
      loading ? 
      <CircularProgress/>    
      :
      <Box sx={{paddingBottom:"50px"}}>
        <WaveBannerReport title={currentAssessment?.title}/>
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
            <SectionsReport key={i} section={s} index={i} reportInfo={reportInfo}/>
          ))
        }
        <MiniBanner title={"Next Steps: A Spiritual Response"}/>
        <ReportNextSteps/>
        <MiniBanner title={"You Are A Leader"} subtitle={"Now Step into It"}/>
        <ReportLeader/>
      </Box>    
      }
    </>
  )
}

export default Report