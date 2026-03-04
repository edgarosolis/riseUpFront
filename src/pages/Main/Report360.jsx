import { Box, CircularProgress, Typography } from "@mui/material"
import WaveBannerReport from "../../components/Banners/WaveBannerReport"
import { useContext, useEffect, useState } from "react"
import { AssessmentContext } from "../../context/assessment"
import ReportIntro from "../../components/Texts/ReportIntro"
import MiniBanner from "../../components/Banners/MiniBanner"
import ReportResults, { ReportResultsSideBySide } from "../../components/Texts/ReportResults"
import ReportUnderstanding from "../../components/Texts/ReportUnderstanding"
import ReportHowTo from "../../components/Texts/ReportHowTo"
import SectionsReport from "../../components/SectionsReport"
import ReportNextSteps from "../../components/Texts/ReportNextSteps"
import { UserContext } from "../../context/user"
import { getGroup360sByUserId, getReport360Info, getActiveUserSubmission, updateSubmission360 } from "../../axios/axiosFunctions"
import DownloadSection from "../../components/DownloadSection"
import Separator from "../../components/Banners/Separator"
import SectionReportBanner from "../../components/Banners/SectionReportBanner"
import Results from "../../components/Cards/Results"
import QuestionsReportSections from "../../components/QuestionsReportSections"
import { Container } from "@mui/material"
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
    return { report, submission, reviewerReport: resInfo?.reviewerReport || null, reviewerCount: resInfo?.reviewerCount || 0 };
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
            <WaveBannerReport title={currentAssessment?.title} subtitle="360-DEGREE REPORT" completedAt={userSubmission?.completedAt || userSubmission?.updatedAt} />
            <MiniBanner title={"Embracing the Wonder of You"} bgColor="#F4C542" center={true} titleSize={"2.3"} />
            <ReportIntro is360={true} />
            <MiniBanner title={"Your Results"} />
            {reportInfo && reviewerReport && reviewerReport.length > 0 ? (
              <ReportResultsSideBySide selfReport={reportInfo} reviewerReport={reviewerReport} />
            ) : (
              reportInfo && <ReportResults reportInfo={reportInfo} />
            )}
            <MiniBanner title={"Understanding the Report"} />
            <ReportUnderstanding />
            <MiniBanner title={"How to Use This Report"} />
            <ReportHowTo />
            {
              reportInfo && currentAssessment?.sections.map((s, i) => (
                <SectionsReport key={i} section={s} index={i} reportInfo={reportInfo} userSubmission={userSubmission} refreshData={() => callReportData(true)} saveFn={updateSubmission360} reviewerSection={getReviewerSection(s.customId)} is360={true} />
              ))
            }
            <Separator sectionColor={"#6E5600"} />
            <SectionReportBanner sectionColor={"#6E5600"} title={"The Wonder of You (FIVE-FOLD PERSONALITY + BIBLICAL DNA)"} index={3} intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`} />
            {finalSection() && getReviewerSection("r1") ? (
              <Container maxWidth="xl">
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mx: { xs: 1, sm: 3, md: 5 }, my: 3 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Results sectionColor={"#6E5600"} title={"How do you see yourself:"} currentSection={finalSection()} noWrapper />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Results sectionColor={"#6E5600"} title={"How others see you:"} currentSection={getReviewerSection("r1")} noWrapper />
                  </Box>
                </Box>
              </Container>
            ) : (
              finalSection() && <Results sectionColor={"#6E5600"} title={"How do you see yourself:"} currentSection={finalSection()} />
            )}
            <QuestionsReportSections
              questions={[{ customId: "r1-reflect-1", text: "Wonder of You Reflection: As you read the descriptions above, highlight what resonates most for you and summarize it here." }]}
              answers={userSubmission?.answers}
              submissionId={userSubmission?._id}
              callUserSubmission={() => callReportData(true)}
              saveFn={updateSubmission360}
            />
            <MiniBanner title={"Next Steps: A Spiritual Response."} />
            <ReportNextSteps answers={userSubmission?.answers} submissionId={userSubmission?._id} refreshData={() => callReportData(true)} saveFn={updateSubmission360} />
            <Container maxWidth="xl">
              <Box sx={{ backgroundColor: "#000", borderRadius: "8px", px: 3, py: 2.5, mx: { xs: 1, sm: 3, md: 5 }, my: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" sx={{ color: "#F4C542", fontWeight: 700 }}>YOUR NEXT STEP</Typography>
                  <Typography variant="body1" sx={{ color: "#fff", mt: 0.5 }}>Take our "Calling Course" or request a Coaching session to go over your results</Typography>
                </Box>
                <Box component="a" href="https://www.theriseupculture.com/course/your-kingdom-calling" target="_blank" rel="noopener noreferrer" sx={{ backgroundColor: "#F4C542", color: "#000", fontWeight: 700, px: 2.5, py: 1, borderRadius: "4px", textDecoration: "none", whiteSpace: "nowrap", ml: 2 }}>COURSE</Box>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ mx: { xs: 1, sm: 3, md: 5 }, my: 3 }}>Welcome to the adventure. The world will never be the same.</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, mb: 2 }}>
                <img src={require("../../assets/images/RiseUpLogo.png")} alt="Rise Up Logo" style={{ width: "clamp(80px, 20vw, 150px)" }} />
                <Typography component="a" href="https://www.theriseupculture.com" target="_blank" rel="noopener noreferrer" sx={{ color: "#000", fontWeight: 600, mt: 1, textDecoration: "none" }}>www.theriseupculture.com</Typography>
              </Box>
            </Container>
            <DownloadSection sections={currentAssessment?.sections} fetchData={callReportData} userSubmission={userSubmission} userName={`${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`} is360={true} />
          </Box>
      }
    </>
  )
}

export default Report360
