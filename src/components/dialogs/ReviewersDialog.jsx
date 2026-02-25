import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { addReviewerToGroup360, removeReviewerFromGroup360, createUser, getAllUsers } from "../../axios/axiosFunctions";
import { FRONT_URL } from "../../axios/axiosFunctions";

const statusColors = {
    pending: "default",
    in_progress: "warning",
    completed: "success",
};

const ReviewersDialog = ({ open, onClose, group360 }) => {
    const [reviewers, setReviewers] = useState(group360?.reviewers || []);
    const [users, setUsers] = useState([]);

    // Add reviewer dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [addForm, setAddForm] = useState({ firstName: "", lastName: "", email: "" });
    const [useExisting, setUseExisting] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    // Delete
    const [deleteDialog, setDeleteDialog] = useState(null);

    // Messages
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [copied, setCopied] = useState(null);

    const fetchUsers = async () => {
        const data = await getAllUsers();
        if (data) setUsers(data);
    };

    useEffect(() => {
        if (open) {
            setReviewers(group360?.reviewers || []);
            fetchUsers();
        }
    }, [open, group360]);

    const showAlert = (message, severity = "error") => {
        setMsg(message);
        setAlertSeverity(severity);
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 4000);
    };

    const handleAddReviewer = async () => {
        let userId;

        if (useExisting) {
            if (!selectedUserId) {
                showAlert("Please select a user");
                return;
            }
            userId = selectedUserId;
        } else {
            if (!addForm.firstName || !addForm.lastName || !addForm.email) {
                showAlert("Please fill all fields");
                return;
            }
            const userRes = await createUser(addForm);
            if (!userRes.user) {
                showAlert(userRes.msg);
                return;
            }
            userId = userRes.user._id;
        }

        // Check if already a reviewer
        const alreadyExists = reviewers.some(r => r.user?._id === userId);
        if (alreadyExists) {
            showAlert("This user is already a reviewer");
            return;
        }

        const res = await addReviewerToGroup360(group360._id, { userId });
        if (res.group360) {
            setReviewers(res.group360.reviewers);
            showAlert("Reviewer added", "success");
            fetchUsers();
            setOpenAddDialog(false);
            setAddForm({ firstName: "", lastName: "", email: "" });
            setSelectedUserId("");
        } else {
            showAlert(res.msg);
        }
    };

    const handleRemoveReviewer = async () => {
        const res = await removeReviewerFromGroup360(group360._id, deleteDialog.user?._id);
        if (res.group360) {
            setReviewers(res.group360.reviewers);
            showAlert("Reviewer removed", "success");
        } else {
            showAlert(res.msg || "Error removing reviewer");
        }
        setDeleteDialog(null);
    };

    const copyReviewLink = (token) => {
        const url = `${FRONT_URL}review/${token}`;
        navigator.clipboard.writeText(url);
        setCopied(token);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" fontWeight={600}>
                            Reviewers for {group360?.reviewee?.firstName} {group360?.reviewee?.lastName}
                        </Typography>
                        <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={() => setOpenAddDialog(true)}>
                            Add Reviewer
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {showMsg && <Alert severity={alertSeverity} sx={{ mb: 2 }}>{msg}</Alert>}

                    {reviewers.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                            No reviewers yet. Add one to get started.
                        </Typography>
                    ) : (
                        <List>
                            {reviewers.map((reviewer) => (
                                <ListItem key={reviewer._id} sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", mb: 1 }}>
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight={500}>
                                                {reviewer.user?.firstName} {reviewer.user?.lastName}
                                            </Typography>
                                        }
                                        secondary={reviewer.user?.email}
                                    />
                                    <ListItemSecondaryAction>
                                        <Chip
                                            label={reviewer.status}
                                            size="small"
                                            color={statusColors[reviewer.status] || "default"}
                                            sx={{ mr: 1 }}
                                        />
                                        <Tooltip title={copied === reviewer.reviewToken ? "Copied!" : "Copy review link"}>
                                            <IconButton size="small" onClick={() => copyReviewLink(reviewer.reviewToken)} sx={{ mr: 1 }}>
                                                <ContentCopyIcon fontSize="small" color={copied === reviewer.reviewToken ? "success" : "action"} />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton size="small" onClick={() => setDeleteDialog(reviewer)}>
                                            <DeleteIcon sx={{ color: "red" }} fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Add Reviewer Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add Reviewer</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                            <Button
                                variant={!useExisting ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setUseExisting(false)}
                            >
                                Create New User
                            </Button>
                            <Button
                                variant={useExisting ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setUseExisting(true)}
                            >
                                Select Existing
                            </Button>
                        </Box>

                        {useExisting ? (
                            <TextField
                                select
                                fullWidth
                                label="Select User"
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                slotProps={{ select: { native: true } }}
                            >
                                <option value="">-- Select a user --</option>
                                {users.map((u) => (
                                    <option key={u._id} value={u._id}>
                                        {u.firstName} {u.lastName} ({u.email})
                                    </option>
                                ))}
                            </TextField>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Typography variant="h6" color="secondary">First Name</Typography>
                                    <TextField
                                        value={addForm.firstName}
                                        onChange={(e) => setAddForm({ ...addForm, firstName: e.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="h6" color="secondary">Last Name</Typography>
                                    <TextField
                                        value={addForm.lastName}
                                        onChange={(e) => setAddForm({ ...addForm, lastName: e.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Typography variant="h6" color="secondary">Email</Typography>
                                    <TextField
                                        value={addForm.email}
                                        onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddReviewer}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove <strong>{deleteDialog?.user?.firstName} {deleteDialog?.user?.lastName}</strong> as a reviewer?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                        <Button onClick={handleRemoveReviewer} variant="contained" color="error">Remove</Button>
                        <Button variant="contained" onClick={() => setDeleteDialog(null)}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ReviewersDialog;
