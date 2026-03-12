import { useContext, useState } from "react";
import { Alert, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { getAllAssessments, loginAdmin, loginUser, resetAdminPassword } from "../../axios/axiosFunctions";
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
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotMsg, setForgotMsg] = useState("");
    const [forgotMsgType, setForgotMsgType] = useState("success");
    const [forgotLoading, setForgotLoading] = useState(false);
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
            logInfo = await loginAdmin(data);
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

    const handleForgotPassword = async(e)=>{
        e.preventDefault();
        setForgotLoading(true);
        setForgotMsg("");

        const resp = await resetAdminPassword(forgotEmail);

        setForgotMsg(resp.msg);
        setForgotMsgType(resp.success === false ? "error" : "success");
        setForgotLoading(false);

        setTimeout(() => {
            setForgotMsg("");
        }, 5000);
    }

    if (showForgotPassword && location.pathname === "/admin") {
        return (
            <Box sx={{margin:"20px 0px"}}>
                <form onSubmit={handleForgotPassword}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                name='email'
                                label="Admin Email"
                                color="primary"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        disabled={forgotLoading}
                        sx={{marginTop:{xs:"20px",sm:"50px"}, marginBottom:"10px"}}
                        size="large"
                        fullWidth
                        variant="contained"
                        color="secondary"
                    >
                        {forgotLoading ? "SENDING..." : "SEND NEW PASSWORD"}
                    </Button>
                    <Button
                        onClick={() => { setShowForgotPassword(false); setForgotMsg(""); }}
                        sx={{marginBottom:"10px"}}
                        size="small"
                        fullWidth
                        color="primary"
                    >
                        Back to Login
                    </Button>
                    {forgotMsg &&
                        <Alert sx={{marginTop:"20px"}} severity={forgotMsgType}>
                            {forgotMsg}
                        </Alert>
                    }
                </form>
            </Box>
        )
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
            {location.pathname === "/admin" &&
                <Button
                    onClick={() => setShowForgotPassword(true)}
                    sx={{marginBottom:"10px"}}
                    size="small"
                    fullWidth
                    color="primary"
                >
                    Forgot Password?
                </Button>
            }
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