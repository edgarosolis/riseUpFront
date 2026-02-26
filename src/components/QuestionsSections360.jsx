import { useEffect, useState } from "react";
import { Box, Button, Container, FormControlLabel, MobileStepper, Radio, RadioGroup, Typography } from "@mui/material";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { saveReviewProgress, completeReview } from "../axios/axiosFunctions";

const QuestionsSections360 = ({ token, questions = [], noQuestions, nextSection, answers, allSections, onComplete }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [options, setOptions] = useState([]);

    // Resume at the first unanswered question within this section
    useEffect(() => {
        setCurrentAnswers(answers || []);
        if (answers && answers.length > 0 && questions.length > 0) {
            let resumeStep = 1;
            for (let i = 0; i < questions.length; i++) {
                const hasAnswer = answers.find(a => a.customId === questions[i].customId && a.value);
                if (hasAnswer) {
                    resumeStep = i + 1;
                } else {
                    break;
                }
            }
            // If all answered, stay on the last question so they can hit "Complete"/"Next"
            setActiveStep(resumeStep);
        } else {
            setActiveStep(1);
        }
    }, [answers, questions]);

    useEffect(() => {
        if (questions.length > 0 && activeStep - 1 < questions.length) {
            const shuffledOpt = shuffleArray(questions[activeStep - 1].options);
            setOptions(shuffledOpt);
        }
    }, [questions, activeStep]);

    const shuffleArray = (array) => {
        const newArray = [...array];
        let currentIndex = newArray.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    };

    const handleNext = async () => {
        const data = { answers: currentAnswers };
        const res = await saveReviewProgress(token, data);
        if (res && res.submission) {
            setCurrentAnswers(res.submission.answers);
        }

        if (activeStep === noQuestions) {
            if (nextSection) {
                window.scrollTo(0, 0);
                // Pass updated submission to parent so next section starts with fresh answers
                if (onComplete) onComplete("nextSection", nextSection, res?.submission);
            } else {
                window.scrollTo(0, 0);
                const completeData = { answers: currentAnswers };
                const completeRes = await completeReview(token, completeData);
                if (onComplete) onComplete("completed", null, completeRes?.submission);
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const findValue = (customId) => {
        if (currentAnswers) {
            const a = currentAnswers.find(a => a.customId === customId);
            return a?.value || "";
        }
        return "";
    };

    const handleChange = (e) => {
        const { value } = e.target;
        const customId = questions[activeStep - 1].customId;
        const existsAnswer = currentAnswers.findIndex(a => a.customId === customId);
        if (existsAnswer !== -1) {
            const newAnswers = [...currentAnswers];
            newAnswers[existsAnswer].value = value;
            setCurrentAnswers(newAnswers);
        } else {
            const newAnswers = [...currentAnswers];
            newAnswers.push({ customId, value });
            setCurrentAnswers(newAnswers);
        }
    };

    if (!questions.length) return null;

    return (
        <Container maxWidth="lg" sx={{ padding: { xs: "20px 16px", sm: "30px", md: "50px" } }}>
            <MobileStepper
                variant="progress"
                steps={noQuestions + 1}
                position="static"
                activeStep={activeStep}
                nextButton={<Typography>{noQuestions}</Typography>}
                backButton={<Typography>{activeStep}</Typography>}
                sx={{ justifyContent: "space-evenly" }}
            />
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{ px: { xs: 1, sm: 2 } }}>
                <Typography variant="h6" sx={{ marginTop: { xs: "25px", md: "50px" }, marginBottom: { xs: "20px", md: "30px" }, fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" }, textAlign: "center" }}>
                    {activeStep}. {questions[activeStep - 1]?.text}
                </Typography>
                <RadioGroup value={findValue(questions[activeStep - 1]?.customId)} onChange={handleChange} sx={{ width: "100%", maxWidth: "500px" }}>
                    {options.map((q, i) => (
                        <FormControlLabel key={i} value={q.text} control={<Radio />} label={q.text} sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.9rem', sm: '1rem' } } }} />
                    ))}
                </RadioGroup>
                <Box display={"flex"} justifyContent={"space-between"} gap={2} sx={{ width: { xs: "100%", sm: "80%", md: "60%" }, marginTop: { xs: "40px", md: "100px" } }}>
                    <Button startIcon={<ArrowCircleLeftRoundedIcon />} variant="contained" color="secondary" disabled={activeStep === 1} onClick={handleBack} sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, px: { xs: 2, sm: 3 } }}>
                        Back
                    </Button>
                    <Button endIcon={<ArrowCircleRightRoundedIcon />} variant="contained" disabled={findValue(questions[activeStep - 1]?.customId) === ""} color="secondary" onClick={handleNext} sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, px: { xs: 2, sm: 3 } }}>
                        {activeStep === noQuestions ? "Complete" : "Next"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default QuestionsSections360;
