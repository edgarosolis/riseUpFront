import { useState } from "react"
import { Box, Container, Drawer, Grid, IconButton, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Home from "./Home";
import Admins from "./Admins";
import Questions from "./Questions";
import Sections from "./Sections";
import SectionTexts from "./SectionTexts";
import WonderOfYou from "./WonderOfYou";
import Groups from "./Groups";
import EmailNotifications from "./EmailNotifications";
import PlatformGuide from "./PlatformGuide";
import Reports360 from "./Reports360";
import Sidebar from "../../components/Sidebar";

const MOBILE_BAR_HEIGHT = 48;

const Dashboard = ({active = "home"}) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
    <Container maxWidth={false} sx={{padding:"0px!important"}}>
        {/* Mobile top bar with hamburger */}
        <Box sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
            px: 1,
            height: `${MOBILE_BAR_HEIGHT}px`,
            backgroundColor: "#000",
            color: "#F4C542",
        }}>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#F4C542" }} aria-label="open admin menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={600}>Admin</Typography>
        </Box>

        <Grid container sx={{
            height: {
                xs: `calc(100vh - 84px - ${MOBILE_BAR_HEIGHT}px)`,
                md: "calc(100vh - 84px)",
            },
        }}>
            {/* Desktop inline sidebar */}
            <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: "none", md: "block" } }}>
                <Sidebar location={active}/>
            </Grid>

            {/* Mobile temporary drawer */}
            <Drawer
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{ display: { xs: "block", md: "none" } }}
                slotProps={{ paper: { sx: { width: 240 } } }}
            >
                <Sidebar location={active} onNavigate={() => setMobileOpen(false)}/>
            </Drawer>

            <Grid size={{ xs: 12, md: 10 }} sx={{overflowY:"auto", height:"100%"}}>
                <Container maxWidth={"xl"} sx={{padding:{ xs: "20px 16px", sm: "30px", md: "50px" }}}>
                    {active === "home" && <Home/>}
                    {active === "admins" && <Admins/>}
                    {active === "questions" && <Questions/>}
                    {active === "sections" && <Sections/>}
                    {active === "sectionTexts" && <SectionTexts/>}
                    {active === "wonderOfYou" && <WonderOfYou/>}
                    {active === "reports360" && <Reports360/>}
                    {active === "groups" && <Groups/>}
                    {active === "emailNotifications" && <EmailNotifications/>}
                    {active === "guide" && <PlatformGuide/>}
                </Container>
            </Grid>
        </Grid>
    </Container>
    )
}

export default Dashboard
