import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Card, CardContent, CardActionArea, Typography, Container, Grid, Chip, CircularProgress } from "@mui/material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import { UserContext } from "../../context/user";
import { AssessmentContext } from "../../context/assessment";
import { getActiveUserSubmission, getGroup360sByUserId } from "../../axios/axiosFunctions";

const AssessmentMenu = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const { currentAssessment, isLoading } = useContext(AssessmentContext);

    const [normalStatus, setNormalStatus] = useState("not_started");
    const [group360s, setGroup360s] = useState([]);
    const [loadingGroups, setLoadingGroups] = useState(true);

    useEffect(() => {
        if (!currentAssessment || !currentUser) return;

        const fetchData = async () => {
            // Check normal assessment status
            const subRes = await getActiveUserSubmission(currentAssessment._id, currentUser._id);
            if (subRes && subRes.submission) {
                if (subRes.submission.finished) {
                    setNormalStatus("completed");
                } else if (subRes.submission.answers?.length > 0) {
                    setNormalStatus("in_progress");
                } else {
                    setNormalStatus("not_started");
                }
            }

            // Fetch 360 group assignments
            const g360Res = await getGroup360sByUserId(currentUser._id);
            if (g360Res && g360Res.group360s && g360Res.group360s.length > 0) {
                setGroup360s(g360Res.group360s);
                setLoadingGroups(false);
            } else {
                // No 360 assignments — skip menu, go straight to normal assessment
                navigate("/welcome");
                return;
            }
        };

        fetchData();
    }, [currentAssessment, currentUser]);

    const getStatusChip = (status) => {
        switch (status) {
            case "completed":
                return <Chip label="Completed" color="success" size="small" />;
            case "in_progress":
                return <Chip label="In Progress" color="warning" size="small" />;
            default:
                return <Chip label="Not Started" size="small" />;
        }
    };

    if (isLoading) return <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            <Typography variant="h4" fontWeight={600} color="secondary" sx={{ mb: 1, textAlign: "center" }}>
                Your Assessments
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
                Select an assessment to begin or continue
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {/* Normal Assessment Card */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card sx={{ height: "100%", border: "2px solid #F4C542" }}>
                        <CardActionArea onClick={() => navigate("/welcome")} sx={{ height: "100%", p: 2 }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <AssessmentIcon sx={{ fontSize: 60, color: "#F4C542", mb: 2 }} />
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {currentAssessment?.title || "My Assessment"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Your personal Kingdom Calling Assessment
                                </Typography>
                                {getStatusChip(normalStatus)}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* 360 Group Cards */}
                {loadingGroups ? (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}><CircularProgress size={24} /></Box>
                    </Grid>
                ) : (
                    group360s.map((g360) => {
                        const completed360 = g360.reviewers?.filter(r => r.status === "completed").length || 0;
                        const total360 = g360.reviewers?.length || 0;
                        return (
                            <Grid key={g360._id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ height: "100%" }}>
                                    <CardActionArea
                                        onClick={() => navigate(`/group/${g360.group?._id}/setup`)}
                                        sx={{ height: "100%", p: 2 }}
                                    >
                                        <CardContent sx={{ textAlign: "center" }}>
                                            <GroupsIcon sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
                                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                                360 - {g360.group?.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                Manage your 360 review
                                            </Typography>
                                            {g360.reportReady
                                                ? <Chip label="Report Ready" color="info" size="small" />
                                                : <Chip label={`${completed360} of ${total360} reviewers completed`} size="small" />
                                            }
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </Container>
    );
};

export default AssessmentMenu;
