import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Container, FormControlLabel, MobileStepper, Radio, RadioGroup, Typography } from "@mui/material";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { saveProgress } from "../axios/axiosFunctions";

const QuestionsSections = ({ answers,submissionId,questions=[],noQuestions,nextSection }) => {

    const {id}=useParams();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const [currentAnswers, setCurrentAnswers] = useState();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // O 'instant' si prefieres que no haya animación
        });
    }, [id]);

    useEffect(() => {
      setCurrentAnswers(answers);
    }, [answers])
    

    const handleNext = async() => {
        
        const data = {
            answers:currentAnswers
        }
        const res = await saveProgress(submissionId,data);
        if(res){
            setCurrentAnswers(res.submission.answers);
        }

        if(activeStep===noQuestions){
            if(nextSection){
                window.scrollTo(0, 0);
                navigate(`/section/${nextSection._id}`);
                setActiveStep(1);
            }else{
                window.scrollTo(0, 0);
                navigate('/report');
            }
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const findValue = (customId)=>{
        if(currentAnswers){
            const a = currentAnswers.find(a=>a.customId === customId);
            return  a?.value || "";
        }
        return "";
    }

    const handleChange = (e)=>{
        const {value} = e.target;
        const customId = questions[activeStep-1].customId;
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

    return (
    <Container maxWidth="lg" sx={{padding:"50px"}}>
        <MobileStepper
            variant="progress"
            steps={noQuestions+1}
            position="static"
            activeStep={activeStep}
            nextButton={<Typography>{noQuestions}</Typography>}
            backButton={<Typography>{activeStep}</Typography>}
            sx={{justifyContent:"space-evenly"}}
        />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant="h6" sx={{marginTop:"50px",marginBottom:"30px"}}>{activeStep}. {questions[activeStep-1]?.text}</Typography>
            <RadioGroup value={findValue(questions[activeStep-1]?.customId)} onChange={handleChange}>
                {
                    questions[activeStep-1]?.options.map((q,i)=>(
                        <FormControlLabel key={i} value={q} control={<Radio/>} label={q}/>
                    ))
                }
            </RadioGroup>
            <Box display={"flex"} justifyContent={"space-around"} sx={{width: "60%",marginTop:"100px"}} >
                <Button startIcon={<ArrowCircleLeftRoundedIcon/>} variant="contained" color="secondary" disabled={activeStep===1} onClick={handleBack}>
                    Back
                </Button>
                <Button endIcon={<ArrowCircleRightRoundedIcon/>} variant="contained" color="secondary" onClick={handleNext}>
                    {
                        activeStep===noQuestions ?
                        "Complete"
                        :
                        "Next"
                    }
                </Button>
            </Box>
        </Box>
    </Container>
    )
}

export default QuestionsSections