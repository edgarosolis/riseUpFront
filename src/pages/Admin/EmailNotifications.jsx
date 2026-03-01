import { useState, useEffect } from "react";
import { getAllEmailTemplates, updateEmailTemplate } from "../../axios/axiosFunctions";
import {
    Typography, Button, Dialog, DialogTitle, DialogContent,
    Box, Grid, TextField, Alert, Card, CardContent, CardActions,
    Chip
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const EmailNotifications = () => {
    const [templates, setTemplates] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [form, setForm] = useState({ subject: "", htmlBody: "", textBody: "" });
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [previewMode, setPreviewMode] = useState(false);

    const fetchTemplates = async () => {
        const data = await getAllEmailTemplates();
        if (data) {
            setTemplates(data);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleEdit = (template) => {
        setSelectedTemplate(template);
        setForm({
            subject: template.subject,
            htmlBody: template.htmlBody,
            textBody: template.textBody,
        });
        setPreviewMode(false);
        setShowMsg(false);
        setOpenEditDialog(true);
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        if (!form.subject || !form.htmlBody) {
            setMsg("Subject and HTML Body are required");
            setAlertSeverity("error");
            setShowMsg(true);
            setTimeout(() => setShowMsg(false), 4000);
            return;
        }

        const res = await updateEmailTemplate(selectedTemplate._id, form);

        if (!res.template) {
            setMsg(res.msg || "Error updating template");
            setAlertSeverity("error");
            setShowMsg(true);
            setTimeout(() => setShowMsg(false), 4000);
            return;
        }

        setMsg("Template updated successfully");
        setAlertSeverity("success");
        setShowMsg(true);
        fetchTemplates();
        setTimeout(() => {
            setShowMsg(false);
            setOpenEditDialog(false);
        }, 2000);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <Typography variant="h3" fontWeight={500} color="secondary">
                    Email Notifications
                </Typography>
            </Box>

            <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: "20px" }}>
                Manage the email templates sent by the platform. Click edit to modify the subject line and HTML content.
            </Typography>

            <Grid container spacing={3}>
                {templates.map((template) => (
                    <Grid size={{ xs: 12, md: 4 }} key={template._id}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {template.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Subject:</strong> {template.subject}
                                </Typography>
                                <Box sx={{ mt: 1.5 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Variables:
                                    </Typography>
                                    <Box sx={{ mt: 0.5 }}>
                                        {template.variables?.map((v) => (
                                            <Chip
                                                key={v}
                                                label={`{{${v}}}`}
                                                size="small"
                                                sx={{ mr: 0.5, mb: 0.5, fontFamily: "monospace" }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ padding: "16px" }}>
                                <Button
                                    startIcon={<Edit />}
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleEdit(template)}
                                >
                                    Edit Template
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                    Edit: {selectedTemplate?.name}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ marginTop: "10px" }}>
                        <Box sx={{ mb: 2, p: 1.5, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Available variables (use in subject or body):
                            </Typography>
                            {selectedTemplate?.variables?.map((v) => (
                                <Chip key={v} label={`{{${v}}}`} size="small" sx={{ mr: 0.5, fontFamily: "monospace" }} />
                            ))}
                        </Box>

                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Typography variant="h6" color="secondary">Subject</Typography>
                                <TextField
                                    value={form.subject}
                                    required
                                    fullWidth
                                    onChange={handleForm}
                                    name="subject"
                                />
                            </Grid>

                            <Grid size={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="h6" color="secondary">HTML Body</Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => setPreviewMode(!previewMode)}
                                    >
                                        {previewMode ? "Edit HTML" : "Preview"}
                                    </Button>
                                </Box>
                                {previewMode ? (
                                    <Box sx={{
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        mt: 1,
                                        height: "400px"
                                    }}>
                                        <iframe
                                            srcDoc={form.htmlBody}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: "none"
                                            }}
                                            title="Email Preview"
                                        />
                                    </Box>
                                ) : (
                                    <TextField
                                        value={form.htmlBody}
                                        required
                                        fullWidth
                                        onChange={handleForm}
                                        name="htmlBody"
                                        multiline
                                        rows={20}
                                        slotProps={{
                                            input: {
                                                sx: { fontFamily: "monospace", fontSize: "13px" }
                                            }
                                        }}
                                    />
                                )}
                            </Grid>

                            <Grid size={12}>
                                <Typography variant="h6" color="secondary">Plain Text Body</Typography>
                                <TextField
                                    value={form.textBody}
                                    fullWidth
                                    onChange={handleForm}
                                    name="textBody"
                                    multiline
                                    rows={4}
                                />
                            </Grid>

                            {showMsg && (
                                <Grid size={12}>
                                    <Alert sx={{ marginTop: "10px" }} severity={alertSeverity}>
                                        {msg}
                                    </Alert>
                                </Grid>
                            )}

                            <Grid size={12} sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                <Button onClick={handleSubmit} variant="contained">SAVE</Button>
                                <Button onClick={() => setOpenEditDialog(false)} variant="outlined">CANCEL</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EmailNotifications;
