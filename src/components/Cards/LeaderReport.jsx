import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router"

const LeaderReport = ({title,info,button=false,buttonText,buttonLink,cardColor,titleColor,buttonColor,infoColor="black"}) => {
  return (
    <Grid container spacing={4} sx={{backgroundColor:cardColor,padding:"20px 30px", margin:"20px 0px"}}>
        <Grid size={button?10:12}>
            <Typography variant='h6' color={titleColor} fontWeight={600} sx={{margin:"20px 0px"}}>{title}</Typography>
            <Typography variant='subtitle1' color={infoColor} sx={{margin:"20px 0px"}}>{info}</Typography>
        </Grid>
        {
            button &&
            <Grid size={2} sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                <Button component={Link} to={`${buttonLink}`} target={"_blank"} color={buttonColor} variant="contained">{buttonText}</Button> 
            </Grid>
        }
    </Grid>
  )
}

export default LeaderReport