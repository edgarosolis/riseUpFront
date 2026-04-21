import { useContext, useEffect, useState } from "react";
import { AssessmentContext } from "../../context/assessment";
import { updateSection, updateWelcomeIntro } from "../../axios/axiosFunctions";
import {
  Typography, Box, Tabs, Tab, Paper, Alert, Button, TextField,
  Divider, IconButton, Tooltip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const emptyWelcomeIntro = {
  headings: [""],
  intro: "",
  bulletsLead: "",
  bullets: [],
  closingParagraphs: [""],
  callToAction: ""
};

const Sections = () => {
  const { currentAssessment, refetchAssessments } = useContext(AssessmentContext);
  const [activeTab, setActiveTab] = useState(0);

  const sections = currentAssessment?.sections || [];
  const isWelcomeTab = activeTab === sections.length;
  const currentSection = sections[activeTab];

  const [sectionForm, setSectionForm] = useState({
    title: "", subtitle: "", description: "", reviewerDescription: ""
  });
  const [welcomeForm, setWelcomeForm] = useState(emptyWelcomeIntro);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    if (currentSection) {
      setSectionForm({
        title: currentSection.title || "",
        subtitle: currentSection.subtitle || "",
        description: currentSection.description || "",
        reviewerDescription: currentSection.reviewerDescription || ""
      });
    }
    setSaveMsg({ type: "", text: "" });
  }, [currentSection?._id]);

  useEffect(() => {
    const wi = currentAssessment?.welcomeIntro;
    setWelcomeForm({
      headings: wi?.headings?.length ? [...wi.headings] : [""],
      intro: wi?.intro || "",
      bulletsLead: wi?.bulletsLead || "",
      bullets: wi?.bullets?.length ? wi.bullets.map(b => ({ bold: b.bold || "", text: b.text || "" })) : [],
      closingParagraphs: wi?.closingParagraphs?.length ? [...wi.closingParagraphs] : [""],
      callToAction: wi?.callToAction || ""
    });
  }, [currentAssessment?._id, currentAssessment?.welcomeIntro]);

  const handleSaveSection = async () => {
    if (!currentAssessment || !currentSection) return;
    setSaving(true);
    setSaveMsg({ type: "", text: "" });
    const res = await updateSection(currentAssessment._id, currentSection.customId, sectionForm);
    setSaving(false);
    if (!res.error) {
      await refetchAssessments();
      setSaveMsg({ type: "success", text: "Section saved" });
    } else {
      setSaveMsg({ type: "error", text: res.msg || "Error saving section" });
    }
  };

  const handleSaveWelcome = async () => {
    if (!currentAssessment) return;
    setSaving(true);
    setSaveMsg({ type: "", text: "" });
    const payload = {
      ...welcomeForm,
      headings: welcomeForm.headings.filter(h => h.trim() !== ""),
      closingParagraphs: welcomeForm.closingParagraphs.filter(p => p.trim() !== ""),
      bullets: welcomeForm.bullets.filter(b => (b.bold || "").trim() || (b.text || "").trim())
    };
    const res = await updateWelcomeIntro(currentAssessment._id, payload);
    setSaving(false);
    if (!res.error) {
      await refetchAssessments();
      setSaveMsg({ type: "success", text: "Welcome intro saved" });
    } else {
      setSaveMsg({ type: "error", text: res.msg || "Error saving welcome intro" });
    }
  };

  const updateListItem = (key, index, value) => {
    setWelcomeForm(prev => {
      const list = [...prev[key]];
      list[index] = value;
      return { ...prev, [key]: list };
    });
  };

  const addListItem = (key, empty = "") => {
    setWelcomeForm(prev => ({ ...prev, [key]: [...prev[key], empty] }));
  };

  const removeListItem = (key, index) => {
    setWelcomeForm(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  const updateBullet = (index, field, value) => {
    setWelcomeForm(prev => {
      const bullets = [...prev.bullets];
      bullets[index] = { ...bullets[index], [field]: value };
      return { ...prev, bullets };
    });
  };

  return (
    <>
      <Typography variant="h3" fontWeight={500} color="secondary" sx={{ mb: 2 }}>
        Sections
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Edit section titles, subtitles, and descriptions shown in the assessment and in the 360 reviewer flow. Use <code>{"{name}"}</code> in reviewer descriptions to insert the reviewee's first name.
      </Alert>

      {sections.length === 0 && (
        <Typography color="text.secondary">No assessment loaded.</Typography>
      )}

      {sections.length > 0 && (
        <>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{ mb: 3 }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {sections.map((s, i) => (
              <Tab key={i} label={s.title || s.customId || `Section ${i + 1}`} />
            ))}
            <Tab label="360 Welcome Intro" />
          </Tabs>

          {!isWelcomeTab && currentSection && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Section ID: <code>{currentSection.customId}</code>
              </Typography>

              <TextField
                label="Title"
                fullWidth
                value={sectionForm.title}
                onChange={(e) => setSectionForm(s => ({ ...s, title: e.target.value }))}
                helperText='Shown as the section header, e.g. "Sphere of Influence"'
                sx={{ mb: 3 }}
              />

              <TextField
                label="Subtitle"
                fullWidth
                value={sectionForm.subtitle}
                onChange={(e) => setSectionForm(s => ({ ...s, subtitle: e.target.value }))}
                helperText='Shown under the title, e.g. "Where Melissa is called to influence and lead"'
                sx={{ mb: 3 }}
              />

              <TextField
                label="Description (self-assessment)"
                fullWidth
                multiline
                rows={6}
                value={sectionForm.description}
                onChange={(e) => setSectionForm(s => ({ ...s, description: e.target.value }))}
                helperText="Shown to the candidate taking their own assessment"
                sx={{ mb: 3 }}
              />

              <TextField
                label="Reviewer description (360)"
                fullWidth
                multiline
                rows={6}
                value={sectionForm.reviewerDescription}
                onChange={(e) => setSectionForm(s => ({ ...s, reviewerDescription: e.target.value }))}
                helperText="Shown to reviewers when answering on someone else's behalf. Use {name} for the reviewee's first name."
                sx={{ mb: 3 }}
              />

              {saveMsg.text && <Alert severity={saveMsg.type || "info"} sx={{ mb: 2 }}>{saveMsg.text}</Alert>}

              <Button variant="contained" onClick={handleSaveSection} disabled={saving}>
                {saving ? "Saving..." : "Save Section"}
              </Button>
            </Paper>
          )}

          {isWelcomeTab && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                360 Welcome Intro
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                The paragraphs shown to the candidate on the 360 welcome page, before they start the assessment.
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Headings</Typography>
              {welcomeForm.headings.map((h, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField fullWidth size="small" value={h} onChange={(e) => updateListItem("headings", i, e.target.value)} />
                  <Tooltip title="Remove"><IconButton onClick={() => removeListItem("headings", i)}><DeleteIcon /></IconButton></Tooltip>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={() => addListItem("headings")} sx={{ mb: 3 }}>Add heading</Button>

              <TextField
                label="Intro paragraph"
                fullWidth multiline rows={4}
                value={welcomeForm.intro}
                onChange={(e) => setWelcomeForm(f => ({ ...f, intro: e.target.value }))}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Bullets lead-in"
                fullWidth
                value={welcomeForm.bulletsLead}
                onChange={(e) => setWelcomeForm(f => ({ ...f, bulletsLead: e.target.value }))}
                helperText={`e.g. "In just a few minutes, you'll discover:"`}
                sx={{ mb: 2 }}
              />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Bullets</Typography>
              {welcomeForm.bullets.map((b, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1, mb: 1, alignItems: "flex-start" }}>
                  <TextField label="Bold" size="small" value={b.bold} onChange={(e) => updateBullet(i, "bold", e.target.value)} sx={{ minWidth: 220 }} />
                  <TextField label="Rest of text" size="small" fullWidth value={b.text} onChange={(e) => updateBullet(i, "text", e.target.value)} />
                  <Tooltip title="Remove"><IconButton onClick={() => removeListItem("bullets", i)}><DeleteIcon /></IconButton></Tooltip>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={() => setWelcomeForm(f => ({ ...f, bullets: [...f.bullets, { bold: "", text: "" }] }))} sx={{ mb: 3 }}>Add bullet</Button>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Closing paragraphs</Typography>
              {welcomeForm.closingParagraphs.map((p, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField fullWidth multiline rows={2} size="small" value={p} onChange={(e) => updateListItem("closingParagraphs", i, e.target.value)} />
                  <Tooltip title="Remove"><IconButton onClick={() => removeListItem("closingParagraphs", i)}><DeleteIcon /></IconButton></Tooltip>
                </Box>
              ))}
              <Button size="small" startIcon={<AddIcon />} onClick={() => addListItem("closingParagraphs")} sx={{ mb: 3 }}>Add paragraph</Button>

              <TextField
                label="Call to action"
                fullWidth multiline rows={2}
                value={welcomeForm.callToAction}
                onChange={(e) => setWelcomeForm(f => ({ ...f, callToAction: e.target.value }))}
                sx={{ mb: 3 }}
              />

              {saveMsg.text && <Alert severity={saveMsg.type || "info"} sx={{ mb: 2 }}>{saveMsg.text}</Alert>}

              <Button variant="contained" onClick={handleSaveWelcome} disabled={saving}>
                {saving ? "Saving..." : "Save Welcome Intro"}
              </Button>
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default Sections;
