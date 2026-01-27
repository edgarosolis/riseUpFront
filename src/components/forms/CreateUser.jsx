import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { createUser } from "../../axios/axiosFunctions";

const defaultCreateUserForm = {
    firstName:"",
    lastName:"",
    email:"",
    password: "",
}

const CreateUser = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [createUserForm, setCreateUserForm] = useState(defaultCreateUserForm);
    const {firstName, lastName, email,password} = createUserForm;
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleForm = (e)=>{
        const {name, value} = e.target;
        setCreateUserForm({...createUserForm,[name]:value});
    }

    const validateForm = ()=>{
        return firstName !== "" && lastName !== "" && email !== "" && password !== "";
    }

    const handleSubmit = async()=>{

        if(!validateForm()){
            setMsg("Please fill all the fields");
            setShowMsg(true);
            setTimeout(() => {
              setShowMsg(false);
            }, 4000);
            return;
        }

        const res = await createUser(createUserForm);
        
        if(!res.user){
            setMsg(res.msg);
            setShowMsg(true);
            setTimeout(() => {
              setShowMsg(false);
            }, 4000);
            return;
        }
        
        setMsg(res.msg);
        setShowMsg(true);
        setAlertSeverity("success");
        setTimeout(() => {
            setCreateUserForm(defaultCreateUserForm);
            setShowMsg(false);
        }, 4000);

    }

    return (
    <Box sx={{marginTop:"40px",marginBottom:"100px"}}>
        <Grid container spacing={2}>
            <Grid size={6}>
                <Typography variant="h6" color="secondary">First Name</Typography>
                <TextField value={firstName} required fullWidth onChange={handleForm} name='firstName'/>
            </Grid>
            <Grid size={6}>
                <Typography variant="h6" color="secondary">Last Name</Typography>
                <TextField value={lastName} required fullWidth onChange={handleForm} name='lastName'/>
            </Grid>
            <Grid size={6}>
                <Typography variant="h6" color="secondary">Email</Typography>
                <TextField value={email} required fullWidth onChange={handleForm} name='email'/>
            </Grid>
            <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                    <Typography variant="h6" color="secondary">Password</Typography>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        name='password'
                        value={password}
                        required
                        onChange={handleForm}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            {
                showMsg &&
                <Grid size={12}>
                    <Alert sx={{marginTop:"20px"}} severity={alertSeverity}>
                        {msg}
                    </Alert>
                </Grid>
            }
            <Button onClick={handleSubmit} variant="contained">CREATE</Button>
        </Grid>
    </Box>
    )
}

export default CreateUser