import { useState, useEffect, useContext } from "react";
import { getAllResults, createResult } from "../../axios/axiosFunctions";
import { AssessmentContext } from "../../context/assessment";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogTitle, DialogContent, Box, Grid, TextField, Alert, Tabs, Tab, MenuItem, Select } from "@mui/material";
import { Add } from "@mui/icons-material";
import { resultColumns } from "../../utils/resultCols";

const SECTION_MAP = {
  s1: "Sphere",
  s2: "5-Fold Leaning",
  s3: "Biblical DNA",
};

const SECTION_KEYS = ["s1", "s2", "s3"];

const SectionTexts = () => {

  const { currentAssessment } = useContext(AssessmentContext);
  const [allResults, setAllResults] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [form, setForm] = useState({ sectionCustomId: "s1", category: "", title: "", content: "" });
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");

  const fetchResults = async () => {
    const results = await getAllResults();
    if (results) {
      setAllResults(results);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const getRowsForSection = (sectionKey) => {
    return allResults
      .filter(r => r.sectionCustomId === sectionKey)
      .map(r => ({
        id: r._id,
        category: r.category,
        title: r.title,
        content: r.content,
      }));
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOpenCreate = () => {
    setForm({ sectionCustomId: SECTION_KEYS[activeTab], category: "", title: "", content: "" });
    setOpenCreateDialog(true);
  };

  const handleSubmit = async () => {
    if (!form.category || !form.content) {
      setMsg("Please fill in Category and Content");
      setAlertSeverity("error");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 4000);
      return;
    }

    const data = {
      assessmentId: currentAssessment?._id,
      sectionCustomId: form.sectionCustomId,
      category: form.category,
      title: form.title,
      content: form.content,
    };

    const res = await createResult(data);

    if (!res.result) {
      setMsg(res.msg || "Error creating result");
      setAlertSeverity("error");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 4000);
      return;
    }

    setMsg("Result created successfully");
    setAlertSeverity("success");
    setShowMsg(true);
    fetchResults();
    setTimeout(() => {
      setForm({ sectionCustomId: SECTION_KEYS[activeTab], category: "", title: "", content: "" });
      setShowMsg(false);
      setOpenCreateDialog(false);
    }, 2000);
  };

  const currentSectionKey = SECTION_KEYS[activeTab];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <Typography variant="h3" fontWeight={500} color="secondary">Section Texts</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreate}
        >
          Create Result
        </Button>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, newVal) => setActiveTab(newVal)}
        sx={{ marginBottom: "20px" }}
      >
        {SECTION_KEYS.map((key, i) => (
          <Tab key={key} label={SECTION_MAP[key]} />
        ))}
      </Tabs>

      <DataGrid
        columns={resultColumns}
        rows={getRowsForSection(currentSectionKey)}
        showToolbar
        autoHeight
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      />

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Result</DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography variant="h6" color="secondary">Section</Typography>
                <Select
                  value={form.sectionCustomId}
                  onChange={handleForm}
                  name="sectionCustomId"
                  fullWidth
                >
                  {SECTION_KEYS.map(key => (
                    <MenuItem key={key} value={key}>{SECTION_MAP[key]}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid size={6}>
                <Typography variant="h6" color="secondary">Category</Typography>
                <TextField value={form.category} required fullWidth onChange={handleForm} name="category" />
              </Grid>
              <Grid size={6}>
                <Typography variant="h6" color="secondary">Title</Typography>
                <TextField value={form.title} fullWidth onChange={handleForm} name="title" />
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" color="secondary">Content</Typography>
                <TextField value={form.content} required fullWidth onChange={handleForm} name="content" multiline rows={8} />
              </Grid>
              {
                showMsg &&
                <Grid size={12}>
                  <Alert sx={{ marginTop: "10px" }} severity={alertSeverity}>
                    {msg}
                  </Alert>
                </Grid>
              }
              <Grid size={12} sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button onClick={handleSubmit} variant="contained">CREATE</Button>
                <Button onClick={() => setOpenCreateDialog(false)} variant="outlined">CANCEL</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SectionTexts
