import { Box, Button, Container, Typography } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../context/user'

const ReportIntro = ({ is360 }) => {

    const {currentUser} = useContext(UserContext)

    return (
    <Container maxWidth="xl" sx={{marginTop:5}}>
        <Typography variant='subtitle1' fontWeight={600}> Dear {currentUser?.firstName},</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
            Welcome to your Kingdom Calling Assessment Report. This is a tool designed not to define you, but to reveal who you are and the leader for the Kingdom you are called to be. This is not just data. <span style={{fontWeight:"600"}}>This is discovery.</span>
        </Typography>
        {!is360 && (
            <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
                This self-assessment report reflects how you answered questions about yourself.
            </Typography>
        )}
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
            Our prayer is that this report will stir something in your soul and serve as a prophetic guide into who God has uniquely made you to be as a Kingdom leader.
        </Typography>
        <Typography variant='subtitle1'>
            You were made to rise up. Jesus said, "You did not choose me, but I chose you and appointed you so that you might go and bear fruit — fruit that will last" (John 15:16). This report is part of His invitation to walk boldly in the good works He prepared in advance for you (Ephesians. 2:10).
        </Typography>
        {is360 && (
            <>
                <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
                    You have courageously asked for others to share how they see you in terms of what sphere you thrive in, what Five-Fold personality shows up most often for you, and what Biblical DNA that most see in you. It is always good to pursue outside feedback, counsel, and advice. Review your results to gain insights that will help you uncover and unleash your calling!
                </Typography>
                <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>
                    Review how you see yourself and how others see you as data points. The real gold in your calling comes from personal reflection in a prayerful conversation with your Creator.
                </Typography>
            </>
        )}
        {!is360 && (
            <Box sx={{
                mt: 3,
                p: 2.5,
                backgroundColor: '#FFF8E1',
                borderRadius: 2,
                borderLeft: '4px solid #D4AF37',
            }}>
                <Typography variant='subtitle1'>
                    If you are interested, we also offer a 360-degree assessment where you can invite others to confidentially answer the same questions about you from their perspectives.
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    href="https://www.theriseupculture.com/kingdom-calling"
                    target="_blank"
                    sx={{
                        mt: 1.5,
                        backgroundColor: '#D4AF37',
                        color: '#fff',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        '&:hover': { backgroundColor: '#C49B2F' }
                    }}
                >
                    &gt; More Details
                </Button>
            </Box>
        )}
    </Container>
    )
}

export default ReportIntro
