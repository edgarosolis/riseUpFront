import { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Grid, IconButton, CircularProgress, Alert, Chip, Snackbar
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getUserGroup360, addReviewerByEmail, sendInvitation, sendReminder,
    removeReviewerFromGroup360, generateReport360, FRONT_URL
} from "../../axios/axiosFunctions";

const ShowReviewersDialog = ({ open, onClose, userId, onUpdate }) => {
    const [group360, setGroup360] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addForm, setAddForm] = useState({ firstName: "", lastName: "", email: "" });
    const [addMsg, setAddMsg] = useState("");
    const [addMsgSeverity, setAddMsgSeverity] = useState("error");
    const [showAddMsg, setShowAddMsg] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        if (open && userId) {
            fetchGroup360();
        }
    }, [open, userId]);

    const fetchGroup360 = async () => {
        setLoading(true);
        const res = await getUserGroup360(userId);
        setGroup360(res.group360);
        setLoading(false);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddForm({ ...addForm, [name]: value });
    };

    const handleAddReviewer = async () => {
        if (!addForm.firstName || !addForm.lastName || !addForm.email) {
            setAddMsg("Please fill all fields");
            setAddMsgSeverity("error");
            setShowAddMsg(true);
            return;
        }

        const res = await addReviewerByEmail(group360._id, addForm);
        if (res.group360) {
            setAddForm({ firstName: "", lastName: "", email: "" });
            setAddMsg("Reviewer added");
            setAddMsgSeverity("success");
            setShowAddMsg(true);
            await fetchGroup360();
            if (onUpdate) onUpdate();
        } else {
            setAddMsg(res.msg);
            setAddMsgSeverity("error");
            setShowAddMsg(true);
        }
        setTimeout(() => setShowAddMsg(false), 3000);
    };

    const handleCopyLink = (reviewToken) => {
        const link = `${FRONT_URL}review/${reviewToken}`;
        navigator.clipboard.writeText(link);
        setSnackMsg("Link copied to clipboard");
        setSnackOpen(true);
    };

    const handleSendInvite = async (reviewerId) => {
        const res = await sendInvitation(group360._id, reviewerId);
        if (!res.error) {
            setSnackMsg("Invitation sent");
            setSnackOpen(true);
            await fetchGroup360();
        } else {
            setSnackMsg(res.msg);
            setSnackOpen(true);
        }
    };

    const handleSendReminder = async (reviewerId) => {
        const res = await sendReminder(group360._id, reviewerId);
        if (!res.error) {
            setSnackMsg("Reminder sent");
            setSnackOpen(true);
        } else {
            setSnackMsg(res.msg);
            setSnackOpen(true);
        }
    };

    const handleDeleteReviewer = async (reviewerId) => {
        const res = await removeReviewerFromGroup360(group360._id, reviewerId);
        if (res.group360) {
            setSnackMsg("Reviewer removed");
            setSnackOpen(true);
            setConfirmDelete(null);
            await fetchGroup360();
            if (onUpdate) onUpdate();
        } else {
            setSnackMsg(res.msg);
            setSnackOpen(true);
        }
    };

    const handleGenerateReport = async () => {
        const res = await generateReport360(group360._id);
        if (res.group360) {
            setSnackMsg("Report generated successfully");
            setSnackOpen(true);
            await fetchGroup360();
        } else {
            setSnackMsg(res.msg);
            setSnackOpen(true);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'in_progress': return 'warning';
            default: return 'default';
        }
    };

    const completedCount = group360?.reviewers?.filter(r => r.status === 'completed').length || 0;

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>360 Reviewers</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : !group360 ? (
                        <Typography>No 360 review found for this user.</Typography>
                    ) : (
                        <Box sx={{ pt: 1 }}>
                            {/* Reviewers Table */}
                            {group360.reviewers && group360.reviewers.length > 0 ? (
                                <TableContainer component={Paper} sx={{ mb: 3 }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Name</strong></TableCell>
                                                <TableCell><strong>Email</strong></TableCell>
                                                <TableCell><strong>Status</strong></TableCell>
                                                <TableCell align="center"><strong>Actions</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {group360.reviewers.map((reviewer) => (
                                                <TableRow key={reviewer._id}>
                                                    <TableCell>
                                                        {reviewer.user?.firstName} {reviewer.user?.lastName}
                                                    </TableCell>
                                                    <TableCell>{reviewer.user?.email}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={reviewer.status}
                                                            color={getStatusColor(reviewer.status)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                                                            {reviewer.reviewToken && (
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleCopyLink(reviewer.reviewToken)}
                                                                    title="Copy review link"
                                                                >
                                                                    <ContentCopyIcon fontSize="small" />
                                                                </IconButton>
                                                            )}
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleSendInvite(reviewer._id)}
                                                                title="Send invitation"
                                                                color="primary"
                                                            >
                                                                <SendIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleSendReminder(reviewer._id)}
                                                                title="Send reminder"
                                                                color="warning"
                                                            >
                                                                <NotificationsActiveIcon fontSize="small" />
                                                            </IconButton>
                                                            {confirmDelete === reviewer._id ? (
                                                                <Button
                                                                    size="small"
                                                                    color="error"
                                                                    variant="contained"
                                                                    onClick={() => handleDeleteReviewer(reviewer._id)}
                                                                >
                                                                    Confirm
                                                                </Button>
                                                            ) : (
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => setConfirmDelete(reviewer._id)}
                                                                    title="Remove reviewer"
                                                                    color="error"
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography sx={{ mb: 2, color: "text.secondary" }}>
                                    No reviewers added yet.
                                </Typography>
                            )}

                            {/* Add Reviewer Section */}
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                Add Reviewer
                            </Typography>
                            <Grid container spacing={1} alignItems="center">
                                <Grid size={3}>
                                    <TextField
                                        value={addForm.firstName}
                                        onChange={handleAddChange}
                                        name="firstName"
                                        label="First Name"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={3}>
                                    <TextField
                                        value={addForm.lastName}
                                        onChange={handleAddChange}
                                        name="lastName"
                                        label="Last Name"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField
                                        value={addForm.email}
                                        onChange={handleAddChange}
                                        name="email"
                                        label="Email"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={2}>
                                    <Button
                                        variant="contained"
                                        onClick={handleAddReviewer}
                                        fullWidth
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>

                            {showAddMsg && (
                                <Alert severity={addMsgSeverity} sx={{ mt: 1 }}>
                                    {addMsg}
                                </Alert>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateReport}
                        disabled={!group360 || completedCount < 3}
                    >
                        Generate Report ({completedCount}/3+ completed)
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={() => setSnackOpen(false)}
                message={snackMsg}
            />
        </>
    );
};

export default ShowReviewersDialog;
