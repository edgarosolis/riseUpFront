import { Box, Button, Container, TextField, Typography } from "@mui/material"

const QuestionsReportSections = ({questions}) => {

    //TODO FUNCTIONALITY

    return (
    <Container maxWidth="xl" sx={{padding:"40px 0px"}}> 
        {
            questions.map((q,i)=>(
                <Box key={i} sx={{marginBottom:"20px"}}>
                    <Typography variant="subtitle1" fontWeight={600}>{q.text}</Typography>
                    <TextField fullWidth multiline rows={5}/>
                </Box>
            ))
        }
        <Box display={"flex"} justifyContent={"flex-end"}>
            <Button color="secondary" variant="contained">Save</Button>
        </Box>
    </Container>
    )
}

export default QuestionsReportSections