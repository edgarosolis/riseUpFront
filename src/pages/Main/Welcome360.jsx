import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import WaveBanner from "../../components/Banners/WaveBanner";
import WelcomeIntro from "../../components/Texts/WelcomeIntro";
import VideoWelcome from "../../components/Video/VideoWelcome";
import { AssessmentContext } from "../../context/assessment";
import { UserContext } from "../../context/user";
import { getActiveSubmission360 } from "../../axios/axiosFunctions";

const Welcome360 = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { currentAssessment, isLoading } = useContext(AssessmentContext);
    const { currentUser } = useContext(UserContext);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!currentAssessment || !currentUser) return;

        const checkSubmission = async () => {
            const res = await getActiveSubmission360(currentUser._id, currentUser._id, groupId);
            if (res && res.submission && res.submission.finished) {
                navigate(`/group/${groupId}/complete`);
            }
            setChecking(false);
        };

        checkSubmission();
    }, [currentAssessment, currentUser, groupId, navigate]);

    if (isLoading || checking) return <Box sx={{ p: 4 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ paddingBottom: "50px" }}>
            <WaveBanner
                title={"WELCOME"}
                subtitle={"TO YOUR 360 ASSESSMENT"}
                imageUrl={currentAssessment?.image}
            />
            <WelcomeIntro />
            <VideoWelcome sections={currentAssessment?.sections} groupId={groupId} />
        </Box>
    );
};

export default Welcome360;
