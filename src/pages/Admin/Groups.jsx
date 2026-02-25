import { useEffect, useState, useContext } from "react";
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Accordion, AccordionSummary, AccordionDetails, Grid, IconButton, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, CircularProgress } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import ChurchIcon from '@mui/icons-material/Church';
import { getAllChurches, createChurch, updateChurch, deleteChurch, getGroupsByChurchId, createGroup, updateGroup, deleteGroup } from "../../axios/axiosFunctions";
import { AssessmentContext } from "../../context/assessment";
import RevieweesDialog from "../../components/dialogs/RevieweesDialog";

const Groups = () => {
    const { currentAssessment } = useContext(AssessmentContext);
    const [churches, setChurches] = useState([]);
    const [churchGroups, setChurchGroups] = useState({});
    const [loading, setLoading] = useState(true);

    // Church dialog state
    const [openChurchDialog, setOpenChurchDialog] = useState(false);
    const [editingChurch, setEditingChurch] = useState(null);
    const [churchForm, setChurchForm] = useState({ name: "" });
    const [deleteChurchDialog, setDeleteChurchDialog] = useState(null);

    // Group dialog state
    const [openGroupDialog, setOpenGroupDialog] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [groupForm, setGroupForm] = useState({ name: "" });
    const [groupChurchId, setGroupChurchId] = useState(null);
    const [deleteGroupDialog, setDeleteGroupDialog] = useState(null);

    // Reviewees dialog
    const [revieweesDialogOpen, setRevieweesDialogOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Messages
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");

    const fetchChurches = async () => {
        const data = await getAllChurches();
        if (data) {
            setChurches(data);
            // Fetch groups for each church
            const groupsMap = {};
            await Promise.all(data.map(async (church) => {
                const res = await getGroupsByChurchId(church._id);
                if (res && res.groups) {
                    groupsMap[church._id] = res.groups;
                }
            }));
            setChurchGroups(groupsMap);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchChurches();
    }, []);

    const showAlert = (message, severity = "error") => {
        setMsg(message);
        setAlertSeverity(severity);
        setShowMsg(true);
        setTimeout(() => setShowMsg(false), 4000);
    };

    // ─── Church CRUD ───
    const handleOpenChurchDialog = (church = null) => {
        setEditingChurch(church);
        setChurchForm({ name: church ? church.name : "" });
        setOpenChurchDialog(true);
    };

    const handleSubmitChurch = async () => {
        if (!churchForm.name.trim()) {
            showAlert("Please enter a name");
            return;
        }
        if (editingChurch) {
            const res = await updateChurch(editingChurch._id, churchForm);
            if (res.church) {
                showAlert("Church updated", "success");
                fetchChurches();
                setOpenChurchDialog(false);
            } else {
                showAlert(res.msg);
            }
        } else {
            const res = await createChurch(churchForm);
            if (res.church) {
                showAlert("Church created", "success");
                fetchChurches();
                setOpenChurchDialog(false);
            } else {
                showAlert(res.msg);
            }
        }
    };

    const handleDeleteChurch = async () => {
        const res = await deleteChurch(deleteChurchDialog._id);
        if (res) {
            showAlert("Church deleted", "success");
            fetchChurches();
        } else {
            showAlert("Error deleting church");
        }
        setDeleteChurchDialog(null);
    };

    // ─── Group CRUD ───
    const handleOpenGroupDialog = (churchId, group = null) => {
        setGroupChurchId(churchId);
        setEditingGroup(group);
        setGroupForm({ name: group ? group.name : "" });
        setOpenGroupDialog(true);
    };

    const handleSubmitGroup = async () => {
        if (!groupForm.name.trim()) {
            showAlert("Please enter a name");
            return;
        }
        if (editingGroup) {
            const res = await updateGroup(editingGroup._id, groupForm);
            if (res.group) {
                showAlert("Team updated", "success");
                fetchChurches();
                setOpenGroupDialog(false);
            } else {
                showAlert(res.msg);
            }
        } else {
            const res = await createGroup({ ...groupForm, church: groupChurchId });
            if (res.group) {
                showAlert("Team created", "success");
                fetchChurches();
                setOpenGroupDialog(false);
            } else {
                showAlert(res.msg);
            }
        }
    };

    const handleDeleteGroup = async () => {
        const res = await deleteGroup(deleteGroupDialog._id);
        if (res) {
            showAlert("Team deleted", "success");
            fetchChurches();
        } else {
            showAlert("Error deleting team");
        }
        setDeleteGroupDialog(null);
    };

    // ─── Manage Reviewees ───
    const handleManageReviewees = (group) => {
        setSelectedGroup(group);
        setRevieweesDialogOpen(true);
    };

    if (loading) return <Box sx={{ p: 4 }}><CircularProgress /></Box>;

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <Typography variant="h3" fontWeight={500} color="secondary">Groups</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenChurchDialog()}>
                    New Church / Organization
                </Button>
            </Box>

            {showMsg && <Alert severity={alertSeverity} sx={{ marginBottom: "20px" }}>{msg}</Alert>}

            {churches.length === 0 && (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
                    No churches/organizations yet. Create one to get started.
                </Typography>
            )}

            {churches.map((church) => (
                <Accordion key={church._id} defaultExpanded sx={{ marginBottom: "10px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%", justifyContent: "space-between", pr: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <ChurchIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>{church.name}</Typography>
                                <Chip label={`${(churchGroups[church._id] || []).length} teams`} size="small" sx={{ ml: 1 }} />
                            </Box>
                            <Box onClick={(e) => e.stopPropagation()}>
                                <IconButton size="small" onClick={() => handleOpenChurchDialog(church)}>
                                    <EditIcon sx={{ color: "orange" }} fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => setDeleteChurchDialog(church)}>
                                    <DeleteIcon sx={{ color: "red" }} fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                            <Button size="small" startIcon={<AddIcon />} onClick={() => handleOpenGroupDialog(church._id)}>
                                Add Team
                            </Button>
                        </Box>
                        <List>
                            {(churchGroups[church._id] || []).map((group) => (
                                <ListItem key={group._id} sx={{ border: "1px solid #e0e0e0", borderRadius: "8px", mb: 1 }}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <GroupIcon fontSize="small" color="action" />
                                                <Typography fontWeight={500}>{group.name}</Typography>
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Button size="small" variant="outlined" onClick={() => handleManageReviewees(group)} sx={{ mr: 1 }}>
                                            Manage
                                        </Button>
                                        <IconButton size="small" onClick={() => handleOpenGroupDialog(church._id, group)}>
                                            <EditIcon sx={{ color: "orange" }} fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => setDeleteGroupDialog(group)}>
                                            <DeleteIcon sx={{ color: "red" }} fontSize="small" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            {(churchGroups[church._id] || []).length === 0 && (
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                                    No teams yet
                                </Typography>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Church Create/Edit Dialog */}
            <Dialog open={openChurchDialog} onClose={() => setOpenChurchDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingChurch ? "Edit Church / Organization" : "New Church / Organization"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" color="secondary">Name</Typography>
                        <TextField
                            value={churchForm.name}
                            onChange={(e) => setChurchForm({ ...churchForm, name: e.target.value })}
                            fullWidth
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenChurchDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmitChurch}>
                        {editingChurch ? "Save" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Group Create/Edit Dialog */}
            <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingGroup ? "Edit Team" : "New Team"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" color="secondary">Team Name</Typography>
                        <TextField
                            value={groupForm.name}
                            onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                            fullWidth
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenGroupDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmitGroup}>
                        {editingGroup ? "Save" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Church Confirmation */}
            <Dialog open={!!deleteChurchDialog} onClose={() => setDeleteChurchDialog(null)}>
                <DialogContent>
                    <Typography>Are you sure you want to delete <strong>{deleteChurchDialog?.name}</strong>? This will also delete all teams, reviewees, and submissions within it.</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                        <Button onClick={handleDeleteChurch} variant="contained" color="error">Delete</Button>
                        <Button variant="contained" onClick={() => setDeleteChurchDialog(null)}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Delete Group Confirmation */}
            <Dialog open={!!deleteGroupDialog} onClose={() => setDeleteGroupDialog(null)}>
                <DialogContent>
                    <Typography>Are you sure you want to delete team <strong>{deleteGroupDialog?.name}</strong>? This will also delete all reviewees and submissions.</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
                        <Button onClick={handleDeleteGroup} variant="contained" color="error">Delete</Button>
                        <Button variant="contained" onClick={() => setDeleteGroupDialog(null)}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Reviewees Dialog */}
            {selectedGroup && (
                <RevieweesDialog
                    open={revieweesDialogOpen}
                    onClose={() => { setRevieweesDialogOpen(false); setSelectedGroup(null); }}
                    group={selectedGroup}
                    assessmentId={currentAssessment?._id}
                />
            )}
        </>
    );
};

export default Groups;
