import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import { getGroup360sByGroupId, createGroup360, deleteGroup360, createUser, getAllUsers, toggleReport360 } from "../../axios/axiosFunctions";
import ReviewersDialog from "./ReviewersDialog";

const RevieweesDialog = ({ open, onClose, group, assessmentId }) => {
    const [group360s, setGroup360s] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // Add reviewee dialog
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [addForm, setAddForm] = useState({ firstName: "", lastName: "", email: "" });
    const [useExisting, setUseExisting] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    // Reviewers dialog
    const [reviewersDialogOpen, setReviewersDialogOpen] = useState(false);
    const [selectedGroup360, setSelectedGroup360] = useState(null);

    // Delete
    const [deleteDialog, setDeleteDialog] = useState(null);

    // Messages
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");

    const fetchGroup360s = async () => {
        if (!group) return;
        setLoading(true);
        const res = await getGroup360sByGroupId(group._id);
        if (res && res.group360s) {
            setGroup360s(res.group360s);
        }
        setLoading(false);
    };

    const fetchUsers = async () => {
        const data = await getAllUsers();
        if (data) setUsers(data);
    };

    useEffect(() => {
        if (open) {
            fetchGroup360s();
            fetchUsers();
        }
    }, [open, group]);

    const showAlert = (message, severity = "error") => {
        setMsg(message);
        setAlertSeverity(severity);
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 4000);
    };

    const handleAddReviewee = async () => {
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
            // Create new user first
            const userRes = await createUser(addForm);
            if (!userRes.user) {
                showAlert(userRes.msg);
                return;
            }
            userId = userRes.user._id;
        }

        // Check if already a reviewee in this group
        const alreadyExists = group360s.some(g => g.reviewee?._id === userId);
        if (alreadyExists) {
            showAlert("This user is already a reviewee in this team");
            return;
        }

        const res = await createGroup360({
            assessmentId,
            reviewee: userId,
            group: group._id,
        });

        if (res.group360) {
            showAlert("Reviewee added", "success");
            fetchGroup360s();
            fetchUsers();
            setOpenAddDialog(false);
            setAddForm({ firstName: "", lastName: "", email: "" });
            setSelectedUserId("");
        } else {
            showAlert(res.msg);
        }
    };

    const handleDeleteGroup360 = async () => {
        const res = await deleteGroup360(deleteDialog._id);
        if (res) {
            showAlert("Reviewee removed", "success");
            fetchGroup360s();
        } else {
            showAlert("Error removing reviewee");
        }
        setDeleteDialog(null);
    };

    const handleToggleReport = async (g360) => {
        const res = await toggleReport360(g360._id);
        if (res && res.group360) {
            showAlert(res.group360.reportReady ? "Report generated" : "Report reverted", "success");
            fetchGroup360s();
        } else {
            showAlert(res?.msg || "Error toggling report");
        }
    };

    const handleManageReviewers = (g360) => {
        setSelectedGroup360(g360);
        setReviewersDialogOpen(true);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" fontWeight={600}>Reviewees - {group?.name}</Typography>
                        <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={() => setOpenAddDialog(true)}>
                            Add Reviewee
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {showMsg && <Alert severity={alertSeverity} sx={{ mb: 2 }}>{msg}</Alert>}

                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress /></Box>
                    ) : group360s.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                            No reviewees yet. Add one to get started.
                        </Typography>
                    ) : (
                        <List>
                            {group360s.map((g360) => (
                                <ListItem key={g360._id} sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", mb: 1 }}>
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight={500}>
                                                {g360.reviewee?.firstName} {g360.reviewee?.lastName}
                                            </Typography>
                                        }
                                        secondary={g360.reviewee?.email}
                                    />
                                    <ListItemSecondaryAction>
                                        <Chip
                                            label={`${g360.reviewers?.length || 0} reviewers`}
                                            size="small"
                                            color={g360.completed ? "success" : "default"}
                                            sx={{ mr: 1 }}
                                        />
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<PeopleIcon />}
                                            onClick={() => handleManageReviewers(g360)}
                                            sx={{ mr: 1 }}
                                        >
                                            Manage Reviewers
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color={g360.reportReady ? "warning" : "success"}
                                            onClick={() => handleToggleReport(g360)}
                                            sx={{ mr: 1 }}
                                        >
                                            {g360.reportReady ? "Revert Report" : "Generate Report"}
                                        </Button>
                                        <IconButton size="small" onClick={() => setDeleteDialog(g360)}>
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

            {/* Add Reviewee Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add Reviewee</DialogTitle>
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
                    <Button variant="contained" onClick={handleAddReviewee}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove <strong>{deleteDialog?.reviewee?.firstName} {deleteDialog?.reviewee?.lastName}</strong> as a reviewee? This will delete all associated reviews and submissions.
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                        <Button onClick={handleDeleteGroup360} variant="contained" color="error">Delete</Button>
                        <Button variant="contained" onClick={() => setDeleteDialog(null)}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Reviewers Dialog */}
            {selectedGroup360 && (
                <ReviewersDialog
                    open={reviewersDialogOpen}
                    onClose={() => { setReviewersDialogOpen(false); setSelectedGroup360(null); fetchGroup360s(); }}
                    group360={selectedGroup360}
                />
            )}
        </>
    );
};

export default RevieweesDialog;
