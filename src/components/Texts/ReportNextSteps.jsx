import { Box, Button, Container, TextField, Typography } from "@mui/material"

const ReportNextSteps = () => {
    return (
    <Container maxWidth="xl">
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>The Kingdom Calling Assessment is the beginning of a conversation with God, not the end of one. Set aside time in the coming days to do the following:</Typography>
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>ASK. LISTEN. DISCERN.</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>Spend time with the Lord and ask Him to speak into your calling and to embrace the wonder of you.</Typography>
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>PRAY FOR CONFIRMATION</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>“Lord, confirm what’s true. I surrender what doesn’t reflect You. Align me with heaven’s assignment.”</Typography>
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>JOURNAL WITH THE HOLY SPIRIT</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· “Jesus, how do You see me showing up in this season?”</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· “What are You developing in me right now?”</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· “What scares or excites me about what I’m seeing?”</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· “Who should I invite into my journey to help me grow?”</Typography>
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>INVITE WISE COUNSEL</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>“Plans fail for lack of counsel, but with many advisers they succeed.” — Proverbs 15:22
        Bring this report to someone who knows you well and is grounded in God’s Word. Let them speak life, caution, and direction over what they see.</Typography>
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>YOUR ACTIVATION CHALLENGE</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>Before you move forward:</Typography>
        <Typography variant='subtitle1' sx={{marginTop:"20px", paddingLeft:"20px"}}><span style={{fontWeight:"600"}}>Circle</span> 2–3 key phrases in your report that stand out to you.</Typography>
        <Typography variant='subtitle1' sx={{marginTop:"20px", paddingLeft:"20px"}}><span style={{fontWeight:"600"}}>Write </span> a 3-sentence summary of how you believe God is calling you to lead in this season.</Typography>
        <TextField fullWidth multiline rows={5}/>
        <Typography variant='subtitle1' sx={{marginTop:"20px", paddingLeft:"20px"}}><span style={{fontWeight:"600"}}>Document</span> one action you can take this week that aligns with what you’re discovering.</Typography>
        <TextField fullWidth multiline rows={5} sx={{marginBottom:"20px"}}/>
        <Box display={"flex"} justifyContent={"flex-end"} sx={{marginBottom:"50px"}}>
            <Button color="secondary" variant="contained">Save</Button>
        </Box>
    </Container>
    )
}

export default ReportNextSteps