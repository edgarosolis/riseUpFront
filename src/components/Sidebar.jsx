import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { navItems } from "../utils/adminMenu";

const Sidebar = ({location}) => {
    
    const [menuItems,] = useState(navItems);
    const [applicationMenuOpen, setApplicationMenuOpen] = useState(true);

    const handleMenuOpen = ()=>{
        setApplicationMenuOpen(!applicationMenuOpen);
    }

    return (
    <Grid sx={{backgroundColor:"#000000",height:"100%",color:"#F4C542"}}>
        <List>
            {
            menuItems.map((item,i)=>(
            <Fragment key={i}>
                <Link to={item.href} style={{textDecoration:"none"}}>
                    <ListItemButton sx={{color:"#F4C542", backgroundColor:location === item.locationRef ? "#000000" : "#000000"}} onClick={item.pages?handleMenuOpen:null}>
                        <ListItemIcon>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} slotProps={{primary:{variant:"subtitle2"}}}/>
                        {item.pages && applicationMenuOpen ? item.openIcon : item.closeIcon}
                    </ListItemButton>          
                </Link>
                {
                    item.pages && applicationMenuOpen && item.pages.map((subpages,j)=>(
                    <Link key={j} to={subpages.href} style={{textDecoration:"none"}}>
                        <ListItemButton sx={{marginLeft:"20px",color:"white",backgroundColor:"#1A3B6B"}}>
                        <ListItemText primary={subpages.title} slotProps={{primary:{variant:"subtitle2"}}}/>
                        </ListItemButton>
                    </Link>
                    ))
                }
            </Fragment>
            ))
            }
        </List>
    </Grid>
    )
}

export default Sidebar