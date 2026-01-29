import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';


const WelcomeIntro = () => {
  // Responsive styles for headings and body text
  const headingStyle = {marginBottom:{xs:"20px", md:"40px"}, fontSize:{xs:"1.3rem", sm:"1.6rem", md:"2.125rem"}};
  const bodyStyle = {marginBottom:{xs:"15px", md:"20px"}, fontSize:{xs:"0.95rem", sm:"1.1rem", md:"1.25rem"}};

  return (
    <Container maxWidth="xl" sx={{px: {xs: 2, sm: 3}}}>
        <Typography variant='h4' color='primary' sx={headingStyle}>Deep down, you know you were made for more.</Typography>
        <Typography variant='h4' color='primary' sx={headingStyle}>Not just to survive, but to transform the world around you.</Typography>
        <Typography variant='h6' sx={bodyStyle}>This assessment is designed to help you uncover the God-given leadership DNA already inside you. Every believer is called to lead—not always from a platform, but always with Kingdom influence. The world changes when ordinary people realize they're extraordinary in Christ.</Typography>
        <Typography variant='h6' sx={bodyStyle}>In just a few minutes, you'll discover:</Typography>
        <List component={"ul"} sx={{ listStyle: "disc", pl:{xs:2, md:4}}}>
            <ListItem component={"li"} sx={{display:"list-item", py:{xs:0.5, md:1}}}>
                <ListItemText primary={<Typography variant='h6' sx={bodyStyle}>Your Sphere of Influence — where you're uniquely called to lead (business, ministry, education, etc.).</Typography>}/>
            </ListItem>
            <ListItem component={"li"} sx={{display:"list-item", py:{xs:0.5, md:1}}}>
                <ListItemText primary={<Typography variant='h6' sx={bodyStyle}>Your 5-Fold Personality — how you express God's heart (apostolic, prophetic, evangelistic, shepherd, or teacher personalities).</Typography>}/>
            </ListItem>
            <ListItem component={"li"} sx={{display:"list-item", py:{xs:0.5, md:1}}}>
                <ListItemText primary={<Typography variant='h6' sx={bodyStyle}>Your Biblical DNA — which biblical leaders reflect your gifts and style.</Typography>}/>
            </ListItem>
        </List>
        <Typography variant='h6' sx={bodyStyle}>Afterward, you'll receive a personalized Destiny Report that awakens you to God's design and launches you into His call.</Typography>
        <Typography variant='h6' sx={bodyStyle}>There are 60 total questions. 2 DEMOGRAPHIC (Name and Email), 18 Sphere, 20 Five Fold and 20 DNA20 Five Fold.</Typography>
        <Typography variant='h6' sx={bodyStyle}>The assessment should take approximated 30-40 minutes to complete. Go at your own pace. Everything saves automatically, so you can step away and continue later whenever you're ready. There are no wrong answers!</Typography>
        <Typography variant='h6' sx={bodyStyle}>This isn't just about taking a test. It's about awakening the potential in you.</Typography>
        <Typography variant='h6' sx={bodyStyle}>Because what God has put in you is bigger than you think.</Typography>
        <Typography variant='h6' sx={bodyStyle}>Ready?</Typography>
        <Typography variant='h6' fontWeight={600} sx={{fontSize:{xs:"0.95rem", sm:"1.1rem", md:"1.25rem"}}}>Let's step into discovery together.</Typography>
    </Container>
  )
}

export default WelcomeIntro