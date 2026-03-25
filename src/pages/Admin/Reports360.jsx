import { useState, useEffect, useContext } from "react";
import { getAllGroup360sWithReports, getReport360Info, getActiveUserSubmission } from "../../axios/axiosFunctions";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { AssessmentContext } from "../../context/assessment";
import WaveBannerReport from "../../components/Banners/WaveBannerReport";
import MiniBanner from "../../components/Banners/MiniBanner";
import ReportIntro from "../../components/Texts/ReportIntro";
import { ReportResultsSideBySide } from "../../components/Texts/ReportResults";
import ReportResults from "../../components/Texts/ReportResults";
import ReportUnderstanding from "../../components/Texts/ReportUnderstanding";
import ReportHowTo from "../../components/Texts/ReportHowTo";
import SectionsReport from "../../components/SectionsReport";
import ReportNextSteps from "../../components/Texts/ReportNextSteps";
import ReportLeader from "../../components/Texts/ReportLeader";
import Separator from "../../components/Banners/Separator";
import SectionReportBanner from "../../components/Banners/SectionReportBanner";
import Results from "../../components/Cards/Results";
import DownloadSection from "../../components/DownloadSection";
import { Container } from "@mui/material";

const Reports360 = () => {
  const { currentAssessment } = useContext(AssessmentContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Report dialog
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reportInfo, setReportInfo] = useState(null);
  const [reviewerReport, setReviewerReport] = useState(null);
  const [reviewerCount, setReviewerCount] = useState(0);
  const [userSubmission, setUserSubmission] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    const data = await getAllGroup360sWithReports();
    if (data?.group360s) {
      const tempRows = data.group360s.map((g) => ({
        id: g._id,
        firstName: g.reviewee?.firstName || "",
        lastName: g.reviewee?.lastName || "",
        email: g.reviewee?.email || "",
        group: g.group?.name || "—",
        reviewersCount: g.reviewers?.length || 0,
        completedReviewers: g.reviewers?.filter((r) => r.status === "completed").length || 0,
        updatedAt: g.updatedAt,
        group360Id: g._id,
        revieweeId: g.reviewee?._id,
      }));
      setRows(tempRows);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleViewReport = async (row) => {
    setSelectedUser(row);
    setReportDialogOpen(true);
    setReportLoading(true);
    setReportInfo(null);
    setReviewerReport(null);
    setUserSubmission(null);

    const [res, subRes] = await Promise.all([
      getReport360Info(row.group360Id),
      currentAssessment?._id && row.revieweeId
        ? getActiveUserSubmission(currentAssessment._id, row.revieweeId)
        : Promise.resolve(null),
    ]);

    if (res) {
      setReportInfo(res.report || res.selfReport);
      setReviewerReport(res.reviewerReport || null);
      setReviewerCount(res.reviewerCount || 0);
    }
    if (subRes?.submission) {
      setUserSubmission(subRes.submission);
    }
    setReportLoading(false);
  };

  const fetchReportDataForPDF = async () => {
    const [res, subRes] = await Promise.all([
      getReport360Info(selectedUser?.group360Id),
      currentAssessment?._id && selectedUser?.revieweeId
        ? getActiveUserSubmission(currentAssessment._id, selectedUser.revieweeId)
        : Promise.resolve(null),
    ]);
    const report = res?.report || res?.selfReport || null;
    const submission = subRes?.submission || userSubmission || null;
    return {
      report,
      submission,
      reviewerReport: res?.reviewerReport || null,
      reviewerCount: res?.reviewerCount || 0,
    };
  };

  const handleCloseReport = () => {
    setReportDialogOpen(false);
    setSelectedUser(null);
    setReportInfo(null);
    setReviewerReport(null);
    setUserSubmission(null);
  };

  const finalSection = () => {
    if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return null;
    const info = [...reportInfo];
    return info[info.length - 1];
  };

  const getReviewerSection = (sectionKey) => {
    if (!reviewerReport || !Array.isArray(reviewerReport)) return null;
    return reviewerReport.find((r) => r.section === sectionKey);
  };

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "group", headerName: "Team", flex: 1 },
    {
      field: "completedReviewers",
      headerName: "Reviewers",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={`${params.row.completedReviewers}/${params.row.reviewersCount}`}
          color={params.row.completedReviewers >= 3 ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Report",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleViewReport(params.row)} title="View Report">
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AssessmentIcon color="primary" sx={{ fontSize: 36 }} />
          <Typography variant="h3" fontWeight={500} color="secondary">
            360 Reports
          </Typography>
        </Box>
        <Chip label={`${rows.length} report${rows.length !== 1 ? "s" : ""} ready`} color="primary" />
      </Box>

      {rows.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
          No 360 reports have been generated yet.
        </Typography>
      ) : (
        <DataGrid columns={columns} rows={rows} showToolbar initialState={{ sorting: { sortModel: [{ field: "lastName", sort: "asc" }] } }} />
      )}

      {/* Report View Dialog */}
      <Dialog open={reportDialogOpen} onClose={handleCloseReport} maxWidth="xl" fullWidth PaperProps={{ sx: { minHeight: "90vh" } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">
            360 Report — {selectedUser?.firstName} {selectedUser?.lastName}
          </Typography>
          <IconButton onClick={handleCloseReport}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {reportLoading ? (
            <Box display="flex" justifyContent="center" mt={10} mb={10}>
              <CircularProgress />
            </Box>
          ) : !reportInfo ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">No report data available.</Typography>
            </Box>
          ) : (
            <Box sx={{ paddingBottom: "50px" }}>
              <WaveBannerReport
                title={currentAssessment?.title}
                subtitle={`360-DEGREE REPORT — ${selectedUser?.firstName} ${selectedUser?.lastName}`}
              />
              <MiniBanner title={"Embracing the Wonder of You"} bgColor="#F4C542" center={true} titleSize={"2.3"} />
              <ReportIntro is360={true} />
              <MiniBanner title={"Your Results"} />
              {reportInfo && reviewerReport && reviewerReport.length > 0 ? (
                <ReportResultsSideBySide selfReport={reportInfo} reviewerReport={reviewerReport} />
              ) : (
                reportInfo && <ReportResults reportInfo={reportInfo} />
              )}
              <Box sx={{ backgroundColor: "#FFF8E1", px: { xs: 3, sm: 6, md: 10 }, pb: 5, pt: 5 }}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #E8DFC0",
                    px: { xs: 3, sm: 5, md: 6 },
                    py: { xs: 3, sm: 4 },
                    textAlign: "center",
                    maxWidth: "800px",
                    mx: "auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#333", lineHeight: 1.8, fontWeight: 700, fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" } }}
                  >
                    This overview of your results reflects how you see yourself and how others see you. Throughout the
                    report, we will encourage you to pray and reflect to get the most out of this experience.
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#333", lineHeight: 1.8, mt: 2, fontWeight: 400, fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" } }}
                  >
                    At the end of the report, we offer additional resources for your journey.
                  </Typography>
                </Box>
              </Box>
              <MiniBanner title={"Understanding the Report"} />
              <ReportUnderstanding />
              <MiniBanner title={"How to Use This Report"} />
              <ReportHowTo />
              {reportInfo &&
                currentAssessment?.sections.map((s, i) => (
                  <SectionsReport
                    key={i}
                    section={s}
                    index={i}
                    reportInfo={reportInfo}
                    reviewerSection={getReviewerSection(s.customId)}
                    is360={true}
                    readOnly={true}
                  />
                ))}
              <Separator sectionColor={"#6E5600"} />
              <SectionReportBanner
                sectionColor={"#6E5600"}
                title={"The Wonder of You (FIVE-FOLD PERSONALITY + BIBLICAL DNA)"}
                index={3}
                intro={`This final layer integrates core Biblical leadership values with your unique wiring.<br><br>The Wonder of You is the fusion point of your <b>Five-Fold Personality</b>, and <b>Biblical DNA</b>. When these two align, they form a prophetic narrative of the type of Kingdom leader you're becoming. This isn't just a snapshot of where you are today — it's a glimpse into the redemptive future God is inviting you to walk into. Your Destiny Line gives you language for your leadership identity, clarifies how you uniquely impact others, and helps you discern how to steward your influence for the glory of God.`}
              />
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
              <MiniBanner title={"You Are A Leader"} subtitle={"Now Step into It"} />
              <ReportLeader />
              <DownloadSection
                sections={currentAssessment?.sections}
                fetchData={fetchReportDataForPDF}
                userSubmission={userSubmission}
                userName={`${selectedUser?.firstName || ""} ${selectedUser?.lastName || ""}`}
                is360={true}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Reports360;
