import { useContext, useState } from "react";
import { AssessmentContext } from "../../context/assessment";
import { updateQuestion } from "../../axios/axiosFunctions";
import {
  Typography, Box, Tabs, Tab, Chip, Paper, Accordion, AccordionSummary,
  AccordionDetails, Alert, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Tooltip, Divider
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

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

  const { currentAssessment, refetchAssessments } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const [editText, setEditText] = useState("");
  const [editReviewerText, setEditReviewerText] = useState("");
  const [editOptions, setEditOptions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

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

  const handleOpenEdit = (question) => {
    setEditQuestion(question);
    setEditText(question.text || "");
    setEditReviewerText(question.reviewerText || "");
    setEditOptions(question.options?.map(opt => ({ text: opt.text, category: opt.category })) || []);
    setSaveMsg("");
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setEditQuestion(null);
    setEditText("");
    setEditReviewerText("");
    setEditOptions([]);
    setSaveMsg("");
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...editOptions];
    updated[index] = { ...updated[index], [field]: value };
    setEditOptions(updated);
  };

  const handleSaveQuestion = async () => {
    if (!editQuestion || !currentAssessment) return;
    setSaving(true);
    setSaveMsg("");

    const data = {
      customId: editQuestion.customId,
      text: editText,
      reviewerText: editReviewerText,
      options: editOptions.map((opt, i) => ({
        index: i,
        text: opt.text,
        category: opt.category,
      })),
    };

    const res = await updateQuestion(currentAssessment._id, data);
    setSaving(false);

    if (!res.error) {
      await refetchAssessments();
      setSaveMsg("Question updated successfully");
      setTimeout(() => handleCloseEdit(), 1500);
    } else {
      setSaveMsg(res.msg || "Error saving question");
    }
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
                  <Tooltip title="Edit question">
                    <IconButton
                      size="small"
                      onClick={(e) => { e.stopPropagation(); handleOpenEdit(q); }}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Chip label={q.customId} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {q.reviewerText && (
                  <Box sx={{ mb: 1.5, p: 1.5, backgroundColor: "#fff8e1", borderRadius: 1, border: "1px solid #ffe082" }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Reviewer version:
                    </Typography>
                    <Typography variant="body2">
                      {q.reviewerText}
                    </Typography>
                  </Box>
                )}
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

      {/* Edit Question Dialog */}
      <Dialog open={editOpen} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Question
          {editQuestion && (
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              ({editQuestion.customId})
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            {/* Question Text */}
            <TextField
              label="Question Text (Self-Assessment)"
              multiline
              rows={3}
              fullWidth
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              sx={{ mb: 3 }}
            />

            {/* Reviewer Text */}
            <TextField
              label="Reviewer Version (360 Assessment)"
              placeholder="e.g. How would you describe {name}'s leadership style? Leave empty to use the original question."
              multiline
              rows={2}
              fullWidth
              value={editReviewerText}
              onChange={(e) => setEditReviewerText(e.target.value)}
              helperText="Use {name} as a placeholder for the reviewee's name. Leave empty to show the original question to reviewers."
              sx={{ mb: 3 }}
            />

            {/* Options */}
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Answer Options
            </Typography>
            {editOptions.map((opt, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                <Chip label={`${i + 1}`} size="small" sx={{ minWidth: 30 }} />
                <TextField
                  label="Option Text"
                  value={opt.text}
                  onChange={(e) => handleOptionChange(i, "text", e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Category"
                  value={opt.category}
                  onChange={(e) => handleOptionChange(i, "category", e.target.value)}
                  size="small"
                  sx={{ minWidth: 150 }}
                  disabled
                  helperText="Fixed"
                />
              </Box>
            ))}

            {saveMsg && (
              <Alert severity={saveMsg.includes("Error") ? "error" : "success"} sx={{ mt: 2 }}>
                {saveMsg}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">Cancel</Button>
          <Button onClick={handleSaveQuestion} variant="contained" color="primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Questions
