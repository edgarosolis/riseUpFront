import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { saveProgress } from "../axios/axiosFunctions";

const QuestionsReportSections = ({ questions, answers, submissionId, callUserSubmission }) => {

    const [currentAnswers, setCurrentAnswers] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [showError, setShowError] = useState(false); 
    const [error, setError] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("error"); 

    useEffect(() => {
        setCurrentAnswers(answers);
    }, [answers]);

    const handleChange = (e,i)=>{
        const {value} = e.target;
        const customId = questions[i].customId;

        const existsAnswer = currentAnswers.findIndex(a=>a.customId === customId); 
        if(existsAnswer !== -1){
            const newAnswers = [...currentAnswers];
            newAnswers[existsAnswer].value = value;
            setCurrentAnswers(newAnswers);
        }
        else{
            const newAnswers = [...currentAnswers];
            newAnswers.push({
                customId,
                value
            });
            setCurrentAnswers(newAnswers);
        }
    }
    
    const handleSave = async() => {
        setIsSaving(true)
        const data = {
            answers:currentAnswers
        }
        const res = await saveProgress(submissionId, data);
        
        if(res){
            setAlertSeverity("success");
            setError("Saved correctly");            
            await callUserSubmission(); 
        } else {
            setAlertSeverity("error");
            setError("Error while saving");
        }
        
        setShowError(true);
        setIsSaving(false);
        setTimeout(() => setShowError(false), 2000);
    };

    const findValue = (customId)=>{
        if(currentAnswers){
            const a = currentAnswers.find(a=>a.customId === customId);
            return  a?.value || "";
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
        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
            {showError && <Alert severity={alertSeverity}>{error}</Alert>}
            <Button onClick={handleSave} disabled={isSaving} color="secondary" variant="contained">{isSaving ? "Saving..." : "Save"}</Button>
        </Box>
    </Container>
    )
}

export default QuestionsReportSections