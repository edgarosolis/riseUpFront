import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    Box, Container, Typography, Button, IconButton, Chip, Alert,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
    CircularProgress, Card, CardContent, Tooltip, LinearProgress
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { UserContext } from "../../context/user";
import {
    getGroup360sByUserId,
    addReviewerByEmail,
    updateReviewer,
    removeReviewerFromGroup360,
    sendInvitation,
    sendInviteAll,
    sendReminder,
    sendRemindAll,
    generateReport360,
} from "../../axios/axiosFunctions";

const Setup360 = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    const [group360, setGroup360] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Alert
    const [alert, setAlert] = useState({ show: false, msg: "", severity: "success" });

    // Add Reviewer Dialog
    const [addOpen, setAddOpen] = useState(false);
    const [addForm, setAddForm] = useState({ firstName: "", lastName: "", email: "" });

    // Edit Reviewer Dialog
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({ firstName: "", lastName: "", email: "" });
    const [editReviewerId, setEditReviewerId] = useState(null);

    // Delete Confirmation Dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteReviewer, setDeleteReviewer] = useState(null);

    const fetchGroup360 = async () => {
        const res = await getGroup360sByUserId(currentUser._id);
        if (res && res.group360s) {
            const match = res.group360s.find(g => g.group?._id === groupId);
            if (match) setGroup360(match);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (currentUser) fetchGroup360();
    }, [currentUser, groupId]);

    const showAlert = (msg, severity = "success") => {
        setAlert({ show: true, msg, severity });
        setTimeout(() => setAlert({ show: false, msg: "", severity: "success" }), 4000);
    };

    const updateFromResponse = (res) => {
        if (res && res.group360) {
            setGroup360(res.group360);
        }
    };

    // Computed
    const reviewers = group360?.reviewers || [];
    const completedCount = reviewers.filter(r => r.status === "completed").length;
    const totalReviewers = reviewers.length;
    const canGenerateReport = completedCount >= 3;
    const canAddReviewer = totalReviewers < 10;
    const neededForReport = Math.max(0, 3 - completedCount);

    // ─── Handlers ───

    const handleAddReviewer = async () => {
        if (!addForm.firstName || !addForm.lastName || !addForm.email) {
            showAlert("Please fill all fields", "error");
            return;
        }
        setActionLoading(true);
        const res = await addReviewerByEmail(group360._id, addForm);
        if (res.group360) {
            updateFromResponse(res);
            showAlert("Reviewer added");
            setAddOpen(false);
            setAddForm({ firstName: "", lastName: "", email: "" });
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const handleEditReviewer = async () => {
        if (!editForm.firstName || !editForm.lastName || !editForm.email) {
            showAlert("Please fill all fields", "error");
            return;
        }
        setActionLoading(true);
        const res = await updateReviewer(group360._id, editReviewerId, editForm);
        if (res.group360) {
            updateFromResponse(res);
            showAlert("Reviewer updated");
            setEditOpen(false);
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const handleDeleteReviewer = async () => {
        setActionLoading(true);
        const res = await removeReviewerFromGroup360(group360._id, deleteReviewer.user?._id);
        if (res.group360) {
            updateFromResponse(res);
            showAlert("Reviewer removed");
        } else {
            showAlert(res?.msg || "Error removing reviewer", "error");
        }
        setDeleteOpen(false);
        setDeleteReviewer(null);
        setActionLoading(false);
    };

    const handleInvite = async (reviewerId) => {
        setActionLoading(true);
        const res = await sendInvitation(group360._id, reviewerId);
        if (res.group360) {
            updateFromResponse(res);
            showAlert("Invitation sent");
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const handleInviteAll = async () => {
        setActionLoading(true);
        const res = await sendInviteAll(group360._id);
        if (res.group360) {
            updateFromResponse(res);
            showAlert(res.msg);
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const handleRemind = async (reviewerId) => {
        setActionLoading(true);
        const res = await sendReminder(group360._id, reviewerId);
        if (res.group360) {
            updateFromResponse(res);
            showAlert("Reminder sent");
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const handleRemindAll = async () => {
        setActionLoading(true);
        const res = await sendRemindAll(group360._id);
        if (res.group360) {
            updateFromResponse(res);
            showAlert(res.msg);
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const handleGenerateReport = async () => {
        setActionLoading(true);
        const res = await generateReport360(group360._id);
        if (res.group360) {
            updateFromResponse(res);
            showAlert("Report generated!");
        } else {
            showAlert(res.msg, "error");
        }
        setActionLoading(false);
    };

    const openEditDialog = (reviewer) => {
        setEditReviewerId(reviewer.user?._id);
        setEditForm({
            firstName: reviewer.user?.firstName || "",
            lastName: reviewer.user?.lastName || "",
            email: reviewer.user?.email || "",
        });
        setEditOpen(true);
    };

    const getStatusChip = (status) => {
        switch (status) {
            case "completed":
                return <Chip label="Completed" color="success" size="small" />;
            case "in_progress":
                return <Chip label="In Progress" color="warning" size="small" />;
            default:
                return <Chip label="Pending" size="small" />;
        }
    };

    if (loading) return <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}><CircularProgress /></Box>;

    if (!group360) return (
        <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h5" color="text.secondary">360 group not found</Typography>
            <Button onClick={() => navigate("/")} sx={{ mt: 2 }}>Back to Assessments</Button>
        </Container>
    );

    const progress = totalReviewers > 0 ? (completedCount / totalReviewers) * 100 : 0;

    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
            {/* Header */}
            <Typography variant="h4" fontWeight={600} color="secondary" sx={{ mb: 1, textAlign: "center" }}>
                360 Review Setup
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
                {group360.group?.name}
            </Typography>

            {/* Alert */}
            {alert.show && (
                <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert({ ...alert, show: false })}>
                    {alert.msg}
                </Alert>
            )}

            {/* Progress */}
            <Box sx={{ mb: 3, px: 2 }}>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    {completedCount} of {totalReviewers} reviewers completed
                    {neededForReport > 0 && ` (need ${neededForReport} more to generate report)`}
                </Typography>
            </Box>

            {/* Action Bar */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", mb: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setAddOpen(true)}
                    disabled={!canAddReviewer || actionLoading}
                    size="small"
                >
                    Add Reviewer {totalReviewers >= 10 && "(Max 10)"}
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<SendIcon />}
                    onClick={handleInviteAll}
                    disabled={totalReviewers === 0 || actionLoading}
                    size="small"
                >
                    Invite All
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<NotificationsActiveIcon />}
                    onClick={handleRemindAll}
                    disabled={totalReviewers === 0 || actionLoading}
                    size="small"
                >
                    Remind All
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<BarChartIcon />}
                    onClick={handleGenerateReport}
                    disabled={!canGenerateReport || actionLoading}
                    size="small"
                >
                    {group360.reportReady ? "Regenerate Report" : "Generate Report"}
                </Button>
                {group360.reportReady && (
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => navigate(`/group/${groupId}/report`)}
                        size="small"
                    >
                        View Report
                    </Button>
                )}
            </Box>

            {/* Reviewer Cards */}
            {reviewers.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                    No reviewers yet. Add reviewers to get started with your 360 review.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {reviewers.map((reviewer) => (
                        <Grid key={reviewer._id} size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ border: "1px solid #e0e0e0" }}>
                                <CardContent sx={{ pb: "12px !important" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <Box>
                                            <Typography fontWeight={600}>
                                                {reviewer.user?.firstName} {reviewer.user?.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {reviewer.user?.email}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 0.5 }}>
                                            {getStatusChip(reviewer.status)}
                                            {reviewer.invitedAt && (
                                                <Chip label="Invited" color="info" size="small" variant="outlined" />
                                            )}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 0.5 }}>
                                        <Tooltip title="Send Invitation">
                                            <span>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleInvite(reviewer.user?._id)}
                                                    disabled={reviewer.status === "completed" || actionLoading}
                                                >
                                                    <MailOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Send Reminder">
                                            <span>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemind(reviewer.user?._id)}
                                                    disabled={reviewer.status === "completed" || actionLoading}
                                                >
                                                    <NotificationsActiveIcon fontSize="small" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => openEditDialog(reviewer)} disabled={actionLoading}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Remove">
                                            <IconButton
                                                size="small"
                                                onClick={() => { setDeleteReviewer(reviewer); setDeleteOpen(true); }}
                                                disabled={actionLoading}
                                            >
                                                <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Back Link */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
                    Back to Assessments
                </Button>
            </Box>

            {/* ─── Add Reviewer Dialog ─── */}
            <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add Reviewer</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={6}>
                            <TextField
                                label="First Name"
                                value={addForm.firstName}
                                onChange={(e) => setAddForm({ ...addForm, firstName: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label="Last Name"
                                value={addForm.lastName}
                                onChange={(e) => setAddForm({ ...addForm, lastName: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                label="Email"
                                type="email"
                                value={addForm.email}
                                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddReviewer} disabled={actionLoading}>
                        {actionLoading ? <CircularProgress size={20} /> : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ─── Edit Reviewer Dialog ─── */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Reviewer</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={6}>
                            <TextField
                                label="First Name"
                                value={editForm.firstName}
                                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                label="Last Name"
                                value={editForm.lastName}
                                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                label="Email"
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleEditReviewer} disabled={actionLoading}>
                        {actionLoading ? <CircularProgress size={20} /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ─── Delete Confirmation Dialog ─── */}
            <Dialog open={deleteOpen} onClose={() => { setDeleteOpen(false); setDeleteReviewer(null); }}>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove <strong>{deleteReviewer?.user?.firstName} {deleteReviewer?.user?.lastName}</strong> as a reviewer?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                        <Button variant="contained" color="error" onClick={handleDeleteReviewer} disabled={actionLoading}>
                            {actionLoading ? <CircularProgress size={20} /> : "Remove"}
                        </Button>
                        <Button variant="contained" onClick={() => { setDeleteOpen(false); setDeleteReviewer(null); }}>
                            Cancel
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Setup360;
