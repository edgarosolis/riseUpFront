import { Box, Container, Typography } from "@mui/material"
import LeaderReport from "../Cards/LeaderReport"
import Logo from '../../assets/images/RiseUpLogo.png'

const ReportLeader = () => {
    return (
    <Container maxWidth="xl">
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>Your Kingdom Calling Report is not an endpoint. It is an invitation.</Typography>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>You now have language for the wonder of how God uniquely designed you. The next step is learning how to live it out with confidence, clarity, and purpose within the Body of Christ.</Typography>
        <Typography variant='h6' fontWeight={600} sx={{margin:"20px 0px"}}>Choose the next step that fits where you are right now:</Typography>
        <LeaderReport title="Deepen Your Understanding" info="Read our eBook, Understanding Your Kingdom Calling Report, to learn how your Sphere of Influence, Biblical DNA, and 5-Fold Personality work together and how God may be inviting you to serve and lead within your local church." button={true} buttonText={"E-Book"} buttonLink="https://www.theriseupculture.com/kingdom-calling" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
        <LeaderReport title="Go Deeper in Activation" info="Take the Kingdom Calling Course to explore your calling in a more personal and practical way, with teaching, reflection, and activation steps designed to help you move from insight to action." button={true} buttonText={"Course"} buttonLink="https://www.theriseupculture.com/kingdom-calling" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
        <LeaderReport title="Get Personal Support" info="Book a Calling Coach Session with The Rise Up Culture Team if you would like to walk through your results one-on-one and gain clarity on what obedience and faithfulness look like in this season." button={true} buttonText={"Book"} buttonLink="https://www.theriseupculture.com/kingdom-calling" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
        <LeaderReport title="Keep Growing as a Leader" info="We also recommend You Are A Leader by Drew East as your next read, a powerful reminder that leadership begins with identity and surrender, not position." button={true} buttonText={"Read"} buttonLink="https://www.theriseupculture.com/course/you-are-a-leader-pdf" cardColor="#D4AF37" titleColor="white" buttonColor="secondary"/>
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>You do not have to do everything at once. Take one faithful step at www.theriseupculture.com</Typography>
        <LeaderReport title="YOUR NEXT STEP" info="Take our “Calling Course” or request a Coaching session to go over your results" cardColor="#000000" titleColor="primary" infoColor="white" button={true} buttonText={"Course"} buttonLink={""} buttonColor="primary"/>
        {/* <LeaderReport title="YOUR NEXT READ" info="So, You’re a Leader… Now What? (coming soon by Drew East)." cardColor="#000000" titleColor="primary" infoColor="white"/> */}
        <Typography variant='subtitle1' sx={{margin:"20px 0px"}}>The best leaders aren’t the loudest in the room. They’re the ones who know who they are, walk with Jesus, and say “yes” to the call. That’s you.</Typography>
        <Typography variant='h4' fontWeight={600} sx={{margin:"20px 0px"}}>Welcome to the adventure. The world will never be the same.</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mb: 2 }}>
            <img src={Logo} alt="Rise Up Logo" style={{ width: 'clamp(80px, 20vw, 150px)' }} />
            <Typography component="a" href="https://www.theriseupculture.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#000', fontWeight: 600, mt: 1, textDecoration: 'none' }}>
                www.theriseupculture.com
            </Typography>
        </Box>
    </Container>
    )
}

export default ReportLeader