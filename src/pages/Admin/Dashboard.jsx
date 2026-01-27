import { useEffect, useState } from "react"
import { Container, Grid } from "@mui/material"
/* import UsersAdmin from "./UsersAdmin"; */
import Home from "./Home";
import Sidebar from "../../components/Sidebar";
import Users from "./Users";

const Dashboard = ({active}) => {

    const [location, setLocation] = useState();

    useEffect(() => {
        setLocation(active);
    }, [active]);

    return (
    <Container maxWidth={false} sx={{padding:"0px!important"}}> 
        <Grid container sx={{height:"calc(100vh - 84px)"}}>
            <Grid size={2}>
                <Sidebar location={location}/>
            </Grid>
            <Grid size={10}>
                <Container maxWidth={"xl"} sx={{padding:"50px"}}>
                    {
                        location === "home" && <Home/>
                    }
                    {
                        location === "users" && <Users/>
                    }
                </Container>
            </Grid>
        </Grid>   
    </Container>
    )
}

export default Dashboard