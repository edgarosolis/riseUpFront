import { Alert, Box, Container, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { saveProgress } from "../axios/axiosFunctions";

const QuestionsReportSections = ({ questions, answers, submissionId, callUserSubmission, saveFn }) => {

    const [currentAnswers, setCurrentAnswers] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const debounceRef = useRef(null);
    const answersRef = useRef();

    useEffect(() => {
        setCurrentAnswers(answers);
        answersRef.current = answers;
    }, [answers]);

    const doSave = async (answersToSave) => {
        setIsSaving(true);
        const save = saveFn || saveProgress;
        const res = await save(submissionId, { answers: answersToSave });
        if (res) {
            setSaveStatus("success");
            await callUserSubmission();
        } else {
            setSaveStatus("error");
        }
        setIsSaving(false);
        setTimeout(() => setSaveStatus(null), 2500);
    };

    const handleChange = (e, i) => {
        const { value } = e.target;
        const customId = questions[i].customId;
        const existsAnswer = currentAnswers.findIndex(a => a.customId === customId);
        let newAnswers;
        if (existsAnswer !== -1) {
            newAnswers = [...currentAnswers];
            newAnswers[existsAnswer] = { ...newAnswers[existsAnswer], value };
        } else {
            newAnswers = [...currentAnswers, { customId, value }];
        }
        setCurrentAnswers(newAnswers);
        answersRef.current = newAnswers;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => doSave(answersRef.current), 2000);
    };

    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, []);

    const findValue = (customId) => {
        if (currentAnswers) {
            const a = currentAnswers.find(a => a.customId === customId);
            return a?.value || "";
        }
        return "";
    }

    return (
    <Container maxWidth="xl" sx={{padding:"40px 0px"}}>
        {
            questions.map((q,i)=>(
                <Box key={i} sx={{marginBottom:"20px"}}>
                    <Typography variant="subtitle1" fontWeight={600}>{q.text}</Typography>
                    <TextField value={findValue(questions[i]?.customId)} onChange={(e)=>handleChange(e,i)} fullWidth multiline rows={5}/>
                </Box>
            ))
        }
        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} sx={{ minHeight: 36 }}>
            {isSaving && <Typography variant="caption" color="text.secondary">Saving...</Typography>}
            {saveStatus === "success" && <Alert severity="success" sx={{ py: 0 }}>Saved</Alert>}
            {saveStatus === "error" && <Alert severity="error" sx={{ py: 0 }}>Error saving</Alert>}
        </Box>
    </Container>
    )
}

export default QuestionsReportSections