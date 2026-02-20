import { useContext, useState } from "react";
import { AssessmentContext } from "../../context/assessment";
import {
  Typography, Box, Tabs, Tab, Chip, Paper, Accordion, AccordionSummary,
  AccordionDetails, Alert
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';

const SECTION_LABELS = {
  s1: "Sphere of Influence",
  s2: "5-Fold Leaning",
  s3: "Biblical DNA",
};

const SECTION_COLORS = {
  s1: "#FFC700",
  s2: "#CDA310",
  s3: "#907000",
};

const Questions = () => {

  const { currentAssessment } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  const sections = currentAssessment?.sections || [];

  const currentSection = sections[activeTab];
  const currentSectionKey = currentSection?.customId || "";
  const sectionLabel = SECTION_LABELS[currentSectionKey] || currentSection?.title || "";
  const sectionColor = SECTION_COLORS[currentSectionKey] || "#F4C542";

  const getCategoriesForSection = (section) => {
    const categories = new Set();
    section?.questions?.forEach(q => {
      q.options?.forEach(opt => {
        if (opt.category) categories.add(opt.category);
      });
    });
    return Array.from(categories).sort();
  };

  return (
    <>
      <Typography variant="h3" fontWeight={500} color="secondary" sx={{ marginBottom: "20px" }}>
        Questions
      </Typography>

      {/* Guide for new admins */}
      {showGuide && (
        <Alert
          icon={<InfoIcon />}
          severity="info"
          onClose={() => setShowGuide(false)}
          sx={{ marginBottom: "30px", "& .MuiAlert-message": { width: "100%" } }}
        >
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            How the Assessment System Works
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The assessment has <b>3 sections</b>: Sphere of Influence, 5-Fold Leaning, and Biblical DNA. Each section contains multiple-choice questions.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Every answer option is <b>tagged with a category</b> (shown as colored chips below). When a user picks an answer, that category gets +1 point. After all questions are answered, the system tallies the scores and picks the top category (or a combination if scores are close).
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The winning category is then matched to a <b>Result text</b> in the "Section Texts" page. That text is what appears in the user's report. If no matching Result exists, the report shows "NOT FOUND."
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <b>"Wonder of You"</b> is a special combined result — it takes the winner from 5-Fold Leaning + the winner from Biblical DNA (e.g. "Apostolic + King David") and looks up a combined text.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Summary:</b> Questions → Options (tagged with categories) → Scores tallied → Top category matched → Result text shown in report.
          </Typography>
        </Alert>
      )}

      {!showGuide && (
        <Box
          onClick={() => setShowGuide(true)}
          sx={{ cursor: "pointer", mb: 2, display: "inline-flex", alignItems: "center", gap: 0.5 }}
        >
          <InfoIcon color="info" fontSize="small" />
          <Typography variant="body2" color="info.main">Show admin guide</Typography>
        </Box>
      )}

      {sections.length > 0 && (
        <>
          <Tabs
            value={activeTab}
            onChange={(e, newVal) => setActiveTab(newVal)}
            sx={{ marginBottom: "10px" }}
          >
            {sections.map((s, i) => (
              <Tab key={i} label={SECTION_LABELS[s.customId] || s.title} />
            ))}
          </Tabs>

          {/* Section summary */}
          <Paper sx={{ p: 2, mb: 3, backgroundColor: "#fafafa" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {sectionLabel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentSection?.questions?.length || 0} questions
                  {" · Section ID: "}<code>{currentSectionKey}</code>
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Categories in this section:
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {getCategoriesForSection(currentSection).map(cat => (
                    <Chip
                      key={cat}
                      label={cat}
                      size="small"
                      sx={{ backgroundColor: sectionColor, color: "white", fontWeight: 600 }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Questions list */}
          {currentSection?.questions?.map((q, i) => (
            <Accordion key={q.customId || i} defaultExpanded={i === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
                  <Chip
                    label={`Q${i + 1}`}
                    size="small"
                    sx={{ backgroundColor: sectionColor, color: "white", fontWeight: 700, minWidth: 40 }}
                  />
                  <Typography variant="subtitle1" fontWeight={500} sx={{ flex: 1 }}>
                    {q.text}
                  </Typography>
                  <Chip label={q.customId} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Type: {q.type || "multiple_choice"} · {q.options?.length || 0} options
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {q.options?.map((opt, j) => (
                    <Box
                      key={j}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        borderRadius: 1,
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #eee",
                      }}
                    >
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {opt.text}
                      </Typography>
                      <Chip
                        label={opt.category || "No category"}
                        size="small"
                        sx={{
                          backgroundColor: opt.category ? sectionColor : "#ccc",
                          color: "white",
                          fontWeight: 600,
                          ml: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}

      {sections.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 4 }}>
          No assessment data loaded. Make sure the assessment exists in the database.
        </Typography>
      )}
    </>
  )
}

export default Questions
