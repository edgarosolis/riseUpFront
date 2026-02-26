import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getReviewByToken } from "../../axios/axiosFunctions";
import QuestionsSections360 from "../../components/QuestionsSections360";
import SectionBanner from "../../components/Banners/SectionBanner";
import SectionBar from "../../components/Banners/SectionBar";

const ReviewAssessment = () => {
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [revieweeName, setRevieweeName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [completed, setCompleted] = useState(false);

    // Multi-section navigation
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    useEffect(() => {
        const fetchReview = async () => {
            const res = await getReviewByToken(token);
            if (res.error) {
                setError(res.msg);
            } else if (res.completed) {
                setCompleted(true);
                setRevieweeName(res.revieweeName);
            } else {
                setAssessment(res.assessment);
                setSubmission(res.submission);
                setRevieweeName(res.revieweeName);
                setGroupName(res.groupName || "");

                // Resume at the last section the reviewer was working on
                const savedAnswers = res.submission?.answers || [];
                if (savedAnswers.length > 0 && res.assessment?.sections) {
                    const sections = res.assessment.sections;
                    let resumeIndex = 0;
                    for (let i = 0; i < sections.length; i++) {
                        const sectionQuestionIds = sections[i].questions.map(q => q.customId);
                        const answeredInSection = savedAnswers.filter(a => sectionQuestionIds.includes(a.customId));
                        if (answeredInSection.length > 0) {
                            resumeIndex = i;
                        }
                    }
                    setCurrentSectionIndex(resumeIndex);
                }
            }
            setLoading(false);
        };

        fetchReview();
    }, [token]);

    const handleComplete = (type, nextSection, updatedSubmission) => {
        if (updatedSubmission) {
            setSubmission(updatedSubmission);
        }
        if (type === "completed") {
            setCompleted(true);
        } else if (type === "nextSection") {
            // Find the index of nextSection
            const nextIndex = assessment.sections.findIndex(s => s._id === nextSection._id);
            if (nextIndex !== -1) {
                setCurrentSectionIndex(nextIndex);
                window.scrollTo(0, 0);
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
                <ErrorOutlineIcon sx={{ fontSize: 80, color: "#f44336", mb: 3 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Invalid Review Link
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {error}
                </Typography>
            </Container>
        );
    }

    if (completed) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 3 }} />
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    Thank You!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Your review for <strong>{revieweeName}</strong> has been submitted successfully.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    You may close this page now.
                </Typography>
            </Container>
        );
    }

    const currentSection = assessment?.sections?.[currentSectionIndex];
    const nextSection = assessment?.sections?.[currentSectionIndex + 1] || null;

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Header */}
            <Box sx={{ backgroundColor: "#000", color: "#F4C542", py: 3, textAlign: "center" }}>
                <Typography variant="h5" fontWeight={600}>
                    360 Review for {revieweeName}
                </Typography>
                {groupName && (
                    <Typography variant="body2" sx={{ color: "#ccc", mt: 0.5 }}>
                        {groupName}
                    </Typography>
                )}
            </Box>

            {/* Section Banner + Bar (matching personal assessment style) */}
            {currentSection && (
                <>
                    <SectionBanner
                        title={currentSection.title}
                        description={currentSection.description}
                        noQuestions={currentSection.questions?.length}
                        image={currentSection.image}
                        index={currentSectionIndex}
                    />
                    <SectionBar
                        title={currentSection.title}
                        subtitle={currentSection.subtitle}
                        noQuestions={currentSection.questions?.length}
                    />
                </>
            )}

            {/* Questions */}
            {currentSection && (
                <QuestionsSections360
                    token={token}
                    questions={currentSection.questions}
                    noQuestions={currentSection.questions.length}
                    nextSection={nextSection}
                    answers={submission?.answers || []}
                    allSections={assessment?.sections}
                    onComplete={handleComplete}
                />
            )}
        </Box>
    );
};

export default ReviewAssessment;
