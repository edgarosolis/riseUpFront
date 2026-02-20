import { Container, Grid } from "@mui/material"
import Home from "./Home";
import Admins from "./Admins";
import Questions from "./Questions";
import SectionTexts from "./SectionTexts";
import WonderOfYou from "./WonderOfYou";
import Sidebar from "../../components/Sidebar";

const Dashboard = ({active = "home"}) => {

    return (
    <Container maxWidth={false} sx={{padding:"0px!important"}}>
        <Grid container sx={{height:"calc(100vh - 84px)"}}>
            <Grid size={2}>
                <Sidebar location={active}/>
            </Grid>
            <Grid size={10} sx={{overflowY:"auto", height:"100%"}}>
                <Container maxWidth={"xl"} sx={{padding:"50px"}}>
                    {active === "home" && <Home/>}
                    {active === "admins" && <Admins/>}
                    {active === "questions" && <Questions/>}
                    {active === "sectionTexts" && <SectionTexts/>}
                    {active === "wonderOfYou" && <WonderOfYou/>}
                </Container>
            </Grid>
        </Grid>
    </Container>
    )
}

export default Dashboard