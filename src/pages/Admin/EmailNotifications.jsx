import { useState, useEffect } from "react";
import { getAllEmailTemplates, updateEmailTemplate } from "../../axios/axiosFunctions";
import {
    Typography, Button, Dialog, DialogTitle, DialogContent,
    Box, Grid, TextField, Alert, Card, CardContent, CardActions,
    Chip, Divider
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";

const EmailNotifications = () => {
    const [templates, setTemplates] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [form, setForm] = useState({
        subject: "",
        content: {
            heading: "",
            greeting: "",
            bodyText: "",
            buttonText: "",
            expiryText: "",
            footerText: ""
        }
    });
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
            content: {
                heading: template.content?.heading || "Rise Up Culture",
                greeting: template.content?.greeting || "",
                bodyText: template.content?.bodyText || "",
                buttonText: template.content?.buttonText || "",
                expiryText: template.content?.expiryText || "",
                footerText: template.content?.footerText || ""
            }
        });
        setPreviewMode(false);
        setShowMsg(false);
        setOpenEditDialog(true);
    };

    const handleSubjectChange = (e) => {
        setForm({ ...form, subject: e.target.value });
    };

    const handleContentChange = (field) => (e) => {
        setForm({
            ...form,
            content: { ...form.content, [field]: e.target.value }
        });
    };

    /** Build a quick preview HTML from the current form content */
    const buildPreviewHtml = () => {
        const { heading, greeting, bodyText, buttonText, expiryText, footerText } = form.content;
        const slug = selectedTemplate?.slug;

        const processedBody = (bodyText || "")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .split("\n")
            .filter(p => p.trim())
            .map(p => `<p style="color:#666;font-size:16px;margin-bottom:10px;">${p}</p>`)
            .join("");

        let inner = "";

        if (slug === "otp-login") {
            inner = `
                ${processedBody}
                <div style="background-color:#fff;border:2px solid #007bff;border-radius:8px;padding:20px;margin:20px 0;">
                    <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#007bff;">123456</span>
                </div>
                ${expiryText ? `<p style="color:#999;font-size:14px;margin-top:30px;">${expiryText}</p>` : ""}
                ${footerText ? `<p style="color:#999;font-size:12px;margin-top:20px;">${footerText}</p>` : ""}`;
        } else {
            inner = `
                ${greeting ? `<p style="color:#666;font-size:16px;margin-bottom:10px;">${greeting.replace("{{reviewerName}}", "John")}</p>` : ""}
                ${processedBody
                    .replace(/\{\{revieweeName\}\}/g, "Jane Doe")
                    .replace(/\{\{reviewerName\}\}/g, "John")}
                ${buttonText ? `
                <a href="#" style="display:inline-block;background-color:#F4C542;color:#000;font-weight:bold;font-size:18px;padding:14px 40px;border-radius:8px;text-decoration:none;margin-top:10px;">
                    ${buttonText}
                </a>` : ""}
                ${footerText ? `
                <p style="color:#999;font-size:12px;margin-top:30px;">
                    ${footerText}<br>
                    <a href="#" style="color:#007bff;">https://example.com/review/abc123</a>
                </p>` : ""}`;
        }

        return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
        <body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <div style="background-color:#f8f9fa;border-radius:10px;padding:30px;text-align:center;">
                <h1 style="color:#333;margin-bottom:20px;">${heading || "Rise Up Culture"}</h1>
                ${inner}
            </div>
        </body></html>`;
    };

    const handleSubmit = async () => {
        if (!form.subject || !form.content.bodyText) {
            setMsg("Subject and message body are required");
            setAlertSeverity("error");
            setShowMsg(true);
            setTimeout(() => setShowMsg(false), 4000);
            return;
        }

        const res = await updateEmailTemplate(selectedTemplate._id, {
            subject: form.subject,
            content: form.content
        });

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

    const is360 = selectedTemplate?.slug !== "otp-login";

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <Typography variant="h3" fontWeight={500} color="secondary">
                    Email Notifications
                </Typography>
            </Box>

            <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: "20px" }}>
                Manage the email templates sent by the platform. Click edit to modify the content.
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
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Edit: {selectedTemplate?.name}</span>
                    <Button
                        startIcon={<Visibility />}
                        size="small"
                        variant={previewMode ? "contained" : "outlined"}
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode ? "Back to Edit" : "Preview"}
                    </Button>
                </DialogTitle>
                <DialogContent>
                    {previewMode ? (
                        <Box sx={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            mt: 1,
                            height: "500px",
                            overflow: "hidden"
                        }}>
                            <iframe
                                srcDoc={buildPreviewHtml()}
                                style={{ width: "100%", height: "100%", border: "none" }}
                                title="Email Preview"
                            />
                        </Box>
                    ) : (
                        <Box sx={{ marginTop: "10px" }}>
                            {/* Variables info */}
                            <Box sx={{ mb: 3, p: 2, backgroundColor: "#FFF8E1", borderRadius: 2, border: "1px solid #FFE082" }}>
                                <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                                    💡 Available variables (will be replaced with real data when sent):
                                </Typography>
                                <Box sx={{ mt: 0.5 }}>
                                    {selectedTemplate?.variables?.map((v) => (
                                        <Chip
                                            key={v}
                                            label={`{{${v}}}`}
                                            size="small"
                                            sx={{ mr: 0.5, mb: 0.5, fontFamily: "monospace", backgroundColor: "#fff" }}
                                        />
                                    ))}
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                                    Use <strong>**text**</strong> to make words bold in the message body.
                                </Typography>
                            </Box>

                            <Grid container spacing={2.5}>
                                {/* Subject */}
                                <Grid size={12}>
                                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                        Email Subject
                                    </Typography>
                                    <TextField
                                        value={form.subject}
                                        required
                                        fullWidth
                                        size="small"
                                        onChange={handleSubjectChange}
                                        placeholder="e.g. Your Rise Up Culture Login Code"
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <Divider />
                                </Grid>

                                {/* Heading */}
                                <Grid size={12}>
                                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                        Email Heading
                                    </Typography>
                                    <TextField
                                        value={form.content.heading}
                                        fullWidth
                                        size="small"
                                        onChange={handleContentChange("heading")}
                                        placeholder="Rise Up Culture"
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        The main title shown at the top of the email
                                    </Typography>
                                </Grid>

                                {/* Greeting - only for 360 templates */}
                                {is360 && (
                                    <Grid size={12}>
                                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                            Greeting
                                        </Typography>
                                        <TextField
                                            value={form.content.greeting}
                                            fullWidth
                                            size="small"
                                            onChange={handleContentChange("greeting")}
                                            placeholder='e.g. Hi {{reviewerName}},'
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            Personal greeting before the message
                                        </Typography>
                                    </Grid>
                                )}

                                {/* Body Text */}
                                <Grid size={12}>
                                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                        Message Body
                                    </Typography>
                                    <TextField
                                        value={form.content.bodyText}
                                        required
                                        fullWidth
                                        onChange={handleContentChange("bodyText")}
                                        multiline
                                        rows={3}
                                        placeholder="The main message of the email..."
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        The main message content. Use **text** for bold.
                                    </Typography>
                                </Grid>

                                {/* Button Text - only for 360 templates */}
                                {is360 && (
                                    <Grid size={12}>
                                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                            Button Text
                                        </Typography>
                                        <TextField
                                            value={form.content.buttonText}
                                            fullWidth
                                            size="small"
                                            onChange={handleContentChange("buttonText")}
                                            placeholder='e.g. Start Review'
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            The text shown on the action button
                                        </Typography>
                                    </Grid>
                                )}

                                {/* Expiry Text - only for OTP */}
                                {!is360 && (
                                    <Grid size={12}>
                                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                            Expiry Message
                                        </Typography>
                                        <TextField
                                            value={form.content.expiryText}
                                            fullWidth
                                            size="small"
                                            onChange={handleContentChange("expiryText")}
                                            placeholder="e.g. This code will expire in 5 minutes."
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            Shown below the verification code
                                        </Typography>
                                    </Grid>
                                )}

                                {/* Footer Text */}
                                <Grid size={12}>
                                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                        Footer Text
                                    </Typography>
                                    <TextField
                                        value={form.content.footerText}
                                        fullWidth
                                        size="small"
                                        onChange={handleContentChange("footerText")}
                                        placeholder="Small print at the bottom of the email..."
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        Small disclaimer text at the bottom
                                    </Typography>
                                </Grid>

                                {showMsg && (
                                    <Grid size={12}>
                                        <Alert sx={{ marginTop: "5px" }} severity={alertSeverity}>
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
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EmailNotifications;
