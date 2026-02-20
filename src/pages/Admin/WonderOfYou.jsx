import { useState, useEffect, useContext } from "react";
import { getAllResults, createResult } from "../../axios/axiosFunctions";
import { AssessmentContext } from "../../context/assessment";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogTitle, DialogContent, Box, Grid, TextField, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import { resultColumns } from "../../utils/resultCols";

const WonderOfYou = () => {

  const { currentAssessment } = useContext(AssessmentContext);
  const [rows, setRows] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [form, setForm] = useState({ category: "", title: "", content: "" });
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");

  const fetchResults = async () => {
    const results = await getAllResults();
    if (results) {
      const r1Results = results
        .filter(r => r.sectionCustomId === "r1")
        .map(r => ({
          id: r._id,
          category: r.category,
          title: r.title,
          content: r.content,
        }));
      setRows(r1Results);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
      sectionCustomId: "r1",
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
      setForm({ category: "", title: "", content: "" });
      setShowMsg(false);
      setOpenCreateDialog(false);
    }, 2000);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <Typography variant="h3" fontWeight={500} color="secondary">Wonder of You</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Combination
        </Button>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: "20px" }}>
        Combined result texts based on 5-Fold Leaning + Biblical DNA combinations.
      </Typography>

      <DataGrid
        columns={resultColumns}
        rows={rows}
        showToolbar
        autoHeight
        pageSizeOptions={[10, 25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      />

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Combination</DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="h6" color="secondary">Category</Typography>
                <TextField
                  value={form.category}
                  required
                  fullWidth
                  onChange={handleForm}
                  name="category"
                  placeholder="e.g. Apostolic + King David"
                />
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

export default WonderOfYou
