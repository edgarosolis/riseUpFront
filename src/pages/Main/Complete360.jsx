import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Container, Typography, CircularProgress, LinearProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getGroup360sByUserId } from "../../axios/axiosFunctions";
import { UserContext } from "../../context/user";

const Complete360 = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [group360, setGroup360] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const fetchData = async () => {
            const res = await getGroup360sByUserId(currentUser._id);
            if (res && res.group360s) {
                const match = res.group360s.find(g => g.group?._id === groupId);
                if (match) setGroup360(match);
            }
            setLoading(false);
        };

        fetchData();
    }, [currentUser, groupId]);

    if (loading) return <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}><CircularProgress /></Box>;

    const completedCount = group360?.reviewers?.filter(r => r.status === 'completed').length || 0;
    const totalReviewers = group360?.reviewers?.length || 0;
    const progress = totalReviewers > 0 ? (completedCount / totalReviewers) * 100 : 0;

    return (
        <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 3 }} />

            <Typography variant="h4" fontWeight={600} color="secondary" gutterBottom>
                Thank you!
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                You have completed your self-assessment for <strong>{group360?.group?.name}</strong>.
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Waiting for reviewers to complete their assessments
            </Typography>

            <Box sx={{ mb: 4, px: 4 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                    {completedCount} of {totalReviewers} reviewers completed
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{ mt: 2 }}
            >
                Back to Menu
            </Button>
        </Container>
    );
};

export default Complete360;
