import { Container, Typography } from '@mui/material'
import React from 'react'

const ReportHowTo = () => {
    return (
    <Container maxWidth="xl">
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>Before you analyze, pause. Invite the Holy Spirit into this moment.</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}><span style={{fontWeight:"bold"}}>Consider praying:</span> “Lord, You know me better than I know myself. Speak through these insights. Confirm what’s true. Challenge what’s misaligned. Reveal what You see in me.”</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>As you read through each section, consider:</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· How does this resonate with your lived experience?</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· What are the invitations in this season?</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· Who can you process this with — a pastor, mentor, or trusted leader?</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>· Are there any confirmations that have already come in prayer or community?</Typography>
        <Typography variant='subtitle1' fontWeight={"bold"} sx={{margin:"20px 0px"}}>Let’s dive in.</Typography>
    </Container>
    )
}

export default ReportHowTo