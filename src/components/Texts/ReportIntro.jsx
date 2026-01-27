import { Container, Typography } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../context/user'

const ReportIntro = () => {

    const {currentUser} = useContext(UserContext)

    return (
    <Container maxWidth="xl" sx={{marginTop:5}}>
        <Typography variant='subtitle1' fontWeight={600}> Dear {currentUser?.firstName},</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
            Welcome to your Kingdom Calling Assessment Report. This is a tool designed not to define you, but to reveal who you are and the leader for the Kingdom you are called to be. This is not just data. <span style={{fontWeight:"600"}}>This is discovery.</span>
        </Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
            Our prayer is that this report will stir something in your soul and serve as a prophetic guide into who God has uniquely made you to be as a Kingdom leader.
        </Typography>
        <Typography variant='subtitle1'>
            You were made to rise up. Jesus said, “You did not choose me, but I chose you and appointed you so that you might go and bear fruit — fruit that will last” (John 15:16). This report is part of His invitation to walk boldly in the good works He prepared in advance for you (Ephesians. 2:10).
        </Typography>
    </Container>
    )
}

export default ReportIntro