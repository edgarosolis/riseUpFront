import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AssessmentContext } from "../../context/assessment";
import { getActiveUserSubmission, getReportInfo } from "../../axios/axiosFunctions";
import WaveBannerReport from "../Banners/WaveBannerReport";
import MiniBanner from "../Banners/MiniBanner";
import ReportIntro from "../Texts/ReportIntro";
import ReportResults from "../Texts/ReportResults";
import ReportUnderstanding from "../Texts/ReportUnderstanding";
import ReportHowTo from "../Texts/ReportHowTo";
import SectionsReport from "../SectionsReport";
import Separator from "../Banners/Separator";
import SectionReportBanner from "../Banners/SectionReportBanner";
import Results from "../Cards/Results";
import ReportLeader from "../Texts/ReportLeader";
import DownloadSection from "../DownloadSection";
import { useIsMobile } from "../../utils/useIsMobile";

// Admin-side, read-only view of a user's self-assessment report, with the same
// PDF download the user gets. Mirrors the 360 report dialog in Reports360.
const SelfReportDialog = ({ open, onClose, user }) => {
  const isMobile = useIsMobile();
  const { currentAssessment } = useContext(AssessmentContext);
  const [loading, setLoading] = useState(false);
  const [reportInfo, setReportInfo] = useState(null);
  const [userSubmission, setUserSubmission] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | ready | not_started | in_progress | error

  const userName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const fetchData = async () => {
    if (!currentAssessment?._id || !user?.id) return { report: null, submission: null };
    const [resInfo, resSub] = await Promise.all([
      getReportInfo(currentAssessment._id, user.id),
      getActiveUserSubmission(currentAssessment._id, user.id),
    ]);
    return { report: resInfo?.report || null, submission: resSub?.submission || null };
  };

  useEffect(() => {
    if (!open || !user?.id || !currentAssessment?._id) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setReportInfo(null);
      setUserSubmission(null);
      const { report, submission } = await fetchData();
      if (cancelled) return;
      if (!submission || !submission.answers || submission.answers.length === 0) {
        setStatus("not_started");
      } else if (!submission.finished) {
        setStatus("in_progress");
      } else if (!report || !Array.isArray(report) || report.length === 0) {
        setStatus("error");
      } else {
        setReportInfo(report);
        setUserSubmission(submission);
        setStatus("ready");
      }
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user?.id, currentAssessment?._id]);

  const finalSection = () => {
    if (!reportInfo || reportInfo.length === 0) return null;
    return reportInfo[reportInfo.length - 1];
  };

  const renderMessage = (text) => (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography color="text.secondary">{text}</Typography>
    </Box>
  );

  return (
    <Dialog fullScreen={isMobile} open={open} onClose={onClose} maxWidth="xl" fullWidth PaperProps={{ sx: { minHeight: "90vh" } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Self-Assessment Report: {userName}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10} mb={10}>
            <CircularProgress />
          </Box>
        ) : status === "not_started" ? (
          renderMessage("This user has not started the assessment yet.")
        ) : status === "in_progress" ? (
          renderMessage("This user has not finished the assessment yet. The report is available once all sections are completed.")
        ) : status === "error" ? (
          renderMessage("The report could not be generated for this user. Please contact support.")
        ) : status === "ready" ? (
          <Box sx={{ paddingBottom: "50px" }}>
            <WaveBannerReport
              title={currentAssessment?.title}
              userName={userName}
              completedAt={userSubmission?.completedAt || userSubmission?.updatedAt}
            />
            <MiniBanner title={"Embracing the Wonder of You"} bgColor="#F4C542" center={true} titleSize={"2.3"} />
            <ReportIntro />
            <MiniBanner title={"Your Result"} />
            <ReportResults reportInfo={reportInfo} />
            <MiniBanner title={"Understanding the Report"} />
            <ReportUnderstanding />
            <MiniBanner title={"How to Use This Report"} />
            <ReportHowTo />
            {currentAssessment?.sections.map((s, i) => (
              <SectionsReport key={i} section={s} index={i} reportInfo={reportInfo} />
            ))}
            <Separator sectionColor={"#6E5600"} />
            <SectionReportBanner
              sectionColor={"#6E5600"}
              title={"The Wonder of You (FIVE-FOLD PERSONALITY + BIBLICAL DNA)"}
              index={3}
              intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`}
            />
            {finalSection() && <Results sectionColor={"#6E5600"} title={"The Wonder of You"} currentSection={finalSection()} />}
            <MiniBanner title={"You Are A Leader"} subtitle={"Now Step into It"} />
            <ReportLeader />
            <DownloadSection
              sections={currentAssessment?.sections}
              fetchData={fetchData}
              userSubmission={userSubmission}
              userName={userName}
            />
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default SelfReportDialog;
