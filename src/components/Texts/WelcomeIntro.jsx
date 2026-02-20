import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';


const WelcomeIntro = () => {
  // Responsive styles for headings and body text
  const headingStyle = {marginBottom:{xs:"12px", md:"20px"}, fontSize:{xs:"1.1rem", sm:"1.3rem", md:"1.5rem"}};
  const bodyStyle = {marginBottom:{xs:"8px", md:"12px"}, fontSize:{xs:"0.85rem", sm:"0.95rem", md:"1.05rem"}};

  return (
    <Container maxWidth="lg" sx={{py: {xs: 2, md: 3}}}>
        <Typography variant='h5' color='primary' sx={headingStyle}>Deep down, you know you were made for more.</Typography>
        <Typography variant='h5' color='primary' sx={headingStyle}>Not just to survive, but to transform the world around you.</Typography>
        <Typography variant='body1' sx={bodyStyle}>This assessment is designed to help you uncover the God-given leadership DNA already inside you. Every believer is called to lead—not always from a platform, but always with Kingdom influence. The world changes when ordinary people realize they're extraordinary in Christ.</Typography>
        <Typography variant='body1' sx={bodyStyle}>In just a few minutes, you'll discover:</Typography>
        <List component={"ul"} sx={{ listStyle: "disc", pl:{xs:2, md:4}}}>
            <ListItem component={"li"} sx={{display:"list-item", py:{xs:0.5, md:1}}}>
                <ListItemText primary={<Typography variant='h6' sx={bodyStyle}><b>Your Sphere of Influence</b> — where you're uniquely called to lead (business, ministry, education, etc.).</Typography>}/>
            </ListItem>
            <ListItem component={"li"} sx={{display:"list-item", py:{xs:0.5, md:1}}}>
                <ListItemText primary={<Typography variant='h6' sx={bodyStyle}><b>our 5-Fold Personality</b> — how you express God's heart (apostolic, prophetic, evangelistic, shepherd, or teacher personalities).</Typography>}/>
            </ListItem>
            <ListItem component={"li"} sx={{display:"list-item", py:{xs:0.5, md:1}}}>
                <ListItemText primary={<Typography variant='h6' sx={bodyStyle}><b>Your Biblical DNA</b> — which biblical leaders reflect your gifts and style.</Typography>}/>
            </ListItem>
        </List>
        <Typography variant='h6' sx={bodyStyle}>Afterward, you'll receive a personalized Destiny Report that awakens you to God's design and launches you into His call.</Typography>
        <Typography variant='h6' sx={bodyStyle}>There are 60 total questions. 2 demographic (Name and Email), 18 Sphere, 20 Five Fold and 20 DNA.</Typography>
        <Typography variant='h6' sx={bodyStyle}>The assessment should take approximated 30-40 minutes to complete. Go at your own pace. Everything saves automatically, so you can step away and continue later whenever you're ready. There are no wrong answers!</Typography>
        <Typography variant='h6' sx={bodyStyle}>This isn't just about taking a test. It's about awakening the potential in you.</Typography>
        <Typography variant='h6' sx={bodyStyle}>Because what God has put in you is bigger than you think.</Typography>
        <Typography variant='h6' sx={bodyStyle}>Ready?</Typography>
        <Typography variant='h6' fontWeight={600} sx={{fontSize:{xs:"0.95rem", sm:"1.1rem", md:"1.25rem"}}}>Let's step into discovery together. Watch this short welcome video from Pastor Drew to start.</Typography>
    </Container>
  )
}

export default WelcomeIntro
