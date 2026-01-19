import { useContext, useState } from "react";
import { Alert, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { getAllAssessments, loginUser } from "../../axios/axiosFunctions";
import { AssessmentContext } from "../../context/assessment";

const defaultLoginForm = {
    email : "",
    password : "",
}

const LoginForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {setCurrentUser}  = useContext(UserContext);
    const {setCurrentAssessment} = useContext(AssessmentContext);
    const [loginForm, setLoginForm] = useState(defaultLoginForm);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const {email,password} = loginForm;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLoginChange = (e)=>{
        const {name,value} = e.target;
        setLoginForm({...loginForm,[name]:value});
    };

    const handleLoginSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            email,
            password
        };

        let logInfo;
        if(location.pathname === "/admin"){
            /* logInfo = await loginAdmin(data); */  
        }else{
            logInfo = await loginUser(data);
        }
        const {user,msg} = logInfo;

        if(!user){
            setError(msg);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 4000);
            return;
        }

        setLoginForm(defaultLoginForm);
        setCurrentUser(user);
        localStorage.setItem('userRiseUp',JSON.stringify(user));

        //TO DO CHECK !!!!!!
        const assessmet = await getAllAssessments();
        if(assessmet){
            setCurrentAssessment(assessmet[0])
        }
        // !!!!!

        navigate('/');
        return;
    }

    return (
    <Box sx={{margin:"20px 0px"}}>
        <form onSubmit={handleLoginSubmit}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField required fullWidth onChange={handleLoginChange} name='email' label="Email address" color="primary"/>
                </Grid>
                <Grid size={12}>
                    <FormControl fullWidth variant="outlined">
                    <InputLabel>Password*</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        name='password'
                        required
                        onChange={handleLoginChange}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password*"
                    />
                    </FormControl>
                </Grid>
            </Grid>
            <Button type='submit' sx={{marginTop:{xs:"20px",sm:"50px"}, marginBottom:"10px"}} size="large" fullWidth variant="contained" color="secondary">LOG IN</Button>
            {
              showError &&
              <Alert sx={{marginTop:"20px"}} severity="error">
                {error}
              </Alert>
            }
        </form>
    </Box>
    )
}

export default LoginForm