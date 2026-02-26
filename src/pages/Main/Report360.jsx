import { Box, CircularProgress, Typography } from "@mui/material"
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
import { getGroup360sByUserId, getReport360Info, getActiveUserSubmission, updateSubmission360 } from "../../axios/axiosFunctions"
import DownloadSection from "../../components/DownloadSection"
import Separator from "../../components/Banners/Separator"
import SectionReportBanner from "../../components/Banners/SectionReportBanner"
import Results from "../../components/Cards/Results"
import { useParams } from "react-router"

const Report360 = () => {

  const { groupId } = useParams();
  const { currentAssessment } = useContext(AssessmentContext);
  const { currentUser } = useContext(UserContext);
  const [reportInfo, setReportInfo] = useState();
  const [reviewerReport, setReviewerReport] = useState(null);
  const [reviewerCount, setReviewerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userSubmission, setUserSubmission] = useState();
  const [group360Id, setGroup360Id] = useState(null);

  const callReportData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);

    // Find the group360 for this user + group
    let g360Id = group360Id;
    if (!g360Id) {
      const g360Res = await getGroup360sByUserId(currentUser?._id);
      if (g360Res && g360Res.group360s) {
        const match = g360Res.group360s.find(g => g.group?._id === groupId);
        if (match) {
          g360Id = match._id;
          setGroup360Id(match._id);
        }
      }
    }

    if (!g360Id) {
      setLoading(false);
      return { report: null, submission: null };
    }

    const [resInfo, resAnswers] = await Promise.all([
      getReport360Info(g360Id),
      getActiveUserSubmission(currentAssessment?._id, currentUser?._id)
    ]);

    const report = resInfo?.report;
    const submission = resAnswers?.submission;

    if (report) setReportInfo(report);
    if (resInfo?.reviewerReport) setReviewerReport(resInfo.reviewerReport);
    if (resInfo?.reviewerCount !== undefined) setReviewerCount(resInfo.reviewerCount);
    if (submission) setUserSubmission(submission);

    setLoading(false);
    return { report, submission };
  };

  useEffect(() => {
    if (currentAssessment && currentUser) {
      callReportData();
    }
  }, [currentAssessment, currentUser]);

  const finalSection = () => {
    if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return null;
    const info = [...reportInfo];
    return info[info.length - 1];
  }

  const getReviewerSection = (sectionKey) => {
    if (!reviewerReport || !Array.isArray(reviewerReport)) return null;
    return reviewerReport.find(r => r.section === sectionKey);
  }

  return (
    <>
      {
        loading ?
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
          :
          <Box sx={{ paddingBottom: "50px" }}>
            <WaveBannerReport title={currentAssessment?.title} subtitle="360 REPORT" completedAt={userSubmission?.completedAt || userSubmission?.updatedAt} />
            <MiniBanner title={"Embracing the Wonder of You"} bgColor="#F4C542" center={true} titleSize={"2.3"} />
            <ReportIntro />
            <VideoReport />
            <MiniBanner title={"Your Result"} />
            {reportInfo && <ReportResults reportInfo={reportInfo} />}
            {reviewerReport && reviewerReport.length > 0 && (
              <Box sx={{ backgroundColor: "#f5f5f5", py: 2 }}>
                <Typography variant="h6" fontWeight={600} textAlign="center" sx={{ mb: 1 }}>
                  Reviewer Feedback ({reviewerCount} reviewer{reviewerCount !== 1 ? "s" : ""})
                </Typography>
                <ReportResults reportInfo={reviewerReport} />
              </Box>
            )}
            <MiniBanner title={"Understanding the Report"} />
            <ReportUnderstanding />
            <MiniBanner title={"How to Use This Report"} />
            <ReportHowTo />
            {
              reportInfo && currentAssessment?.sections.map((s, i) => (
                <Box key={i}>
                  <SectionsReport section={s} index={i} reportInfo={reportInfo} userSubmission={userSubmission} refreshData={() => callReportData(true)} saveFn={updateSubmission360} />
                  {getReviewerSection(s.customId) && (
                    <Box sx={{ backgroundColor: "#f5f5f5" }}>
                      <Results sectionColor={s?.color} title={`Reviewer Perspective: ${s?.title}`} currentSection={getReviewerSection(s.customId)} />
                    </Box>
                  )}
                </Box>
              ))
            }
            <Separator sectionColor={"#6E5600"} />
            <SectionReportBanner sectionColor={"#6E5600"} title={"The Wonder of You (FIVE-FOLD + BIBLICAL DNA)"} index={3} intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`} />
            {finalSection() && <Results sectionColor={"#6E5600"} title={"The Wonder of You"} currentSection={finalSection()} />}
            <MiniBanner title={"Next Steps: A Spiritual Response."} />
            <ReportNextSteps answers={userSubmission?.answers} submissionId={userSubmission?._id} refreshData={() => callReportData(true)} saveFn={updateSubmission360} />
            <MiniBanner title={"You Are A Leader"} subtitle={"Now Step into It"} />
            <ReportLeader />
            <DownloadSection sections={currentAssessment?.sections} fetchData={callReportData} userSubmission={userSubmission} userName={`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`} />
          </Box>
      }
    </>
  )
}

export default Report360
