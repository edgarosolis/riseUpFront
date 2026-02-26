import { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, Grid, IconButton, TextField, Typography, FormControlLabel, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser, updateUser, toggle360 } from "../../axios/axiosFunctions";

const defaultUser = {
    firstName: "",
    lastName:"",
    email: "",
    has360: false,
}

const ActionsUsers = ({row,api}) => {

    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [alertMsg, setAlertMsg] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [userForm, setUserForm] = useState(defaultUser);
    const { firstName, lastName, email, has360 } = userForm;
    const [toggling360, setToggling360] = useState(false);

    useEffect(() => {
        initUser();
    }, [row])

    const initUser = ()=>{
        setUserForm({
            firstName: row.firstName || "",
            lastName: row.lastName || "",
            email: row.email || "",
            has360: row.has360 || false,
        });
    }

    const handleCloseDialogEdit = ()=>{
        setOpenDialogEdit(false);
    }

    const handleCloseDialogDelete = ()=>{
        setOpenDialogDelete(false);
    }

    const handleEdit = ()=>{
        initUser();
        setOpenDialogEdit(true);
    }

    const handleOpenDelete = ()=>{
        setOpenDialogDelete(true);
    }

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUserForm({...userForm,[name]:value});
    }

    const handleToggle360 = async(e) => {
        setToggling360(true);
        const res = await toggle360(row.id);
        setToggling360(false);
        if (!res.error) {
            const newVal = !has360;
            setUserForm({...userForm, has360: newVal});
            api.updateRows([{id: row.id, has360: newVal}]);
        } else {
            setAlertMsg(res.msg);
            setAlertSeverity("error");
            setAlertOpen(true);
            setTimeout(() => setAlertOpen(false), 2000);
        }
    };

    const handleCancelEdit = ()=>{
        initUser();
        handleCloseDialogEdit();
    }
    
    const submitUser = async()=>{
        const dataUser = {
            firstName,
            lastName,
            email
        } 

        const resUser = await updateUser(row.id,dataUser);

        if(!resUser.user){
            setAlertMsg(resUser.msg);
            setAlertSeverity("error");
            setAlertOpen(true);
            setTimeout(() => {
              setAlertOpen(false);
            }, 2000);
            return;
        }
        api.updateRows([{id:row.id,firstName,lastName,email}]);
        handleCloseDialogEdit();
    }

    const handleDeleteUser = async()=>{        
        const res = await deleteUser(row.id);
        if(!res){
            setAlertMsg("Error while deleting, please try later or contact an admin");
            setAlertSeverity("error");
            setAlertOpen(true);
            setTimeout(() => {
              setAlertOpen(false);
            }, 2000);
            return;
        }
        api.updateRows([{ id: row.id, _action: "delete" }]);
        handleCloseDialogDelete();
    }

    return (
    <Box sx={{width: "100%",height: "100%",display: "flex",justifyContent: "space-evenly", alignItems: "center"}}>
        <IconButton onClick={handleEdit}>
            <EditIcon sx={{color:"orange"}}/>
        </IconButton>
        <IconButton onClick={handleOpenDelete}>
            <DeleteIcon sx={{color:"red"}}/>
        </IconButton>
        <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit}>
            <DialogContent>
                <Typography variant="h5" color="primary">EDIT</Typography>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Typography variant="subtitle1">First Name</Typography>
                        <TextField onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} value={firstName} name="firstName" fullWidth/>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle1">Last Name</Typography>
                        <TextField onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} value={lastName} name="lastName" fullWidth/>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle1">Email</Typography>
                        <TextField onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} value={email} name="email" fullWidth/>
                    </Grid>
                    <Grid size={6} sx={{display:"flex", alignItems:"center"}}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={has360}
                                    onChange={handleToggle360}
                                    disabled={toggling360}
                                />
                            }
                            label={toggling360 ? "Toggling..." : "Enable 360 Review"}
                        />
                    </Grid>
                    {
                        alertOpen &&
                        <Grid size={12}>
                            <Alert sx={{marginTop:"20px"}} severity={alertSeverity}>
                                {alertMsg}
                            </Alert>
                        </Grid>
                    }
                    <Grid size={12} sx={{display:"flex",justifyContent:"center"}}>
                        <Button variant="contained" onClick={submitUser}>SAVE</Button>
                        <Button variant="contained" onClick={handleCancelEdit} sx={{marginLeft:"20px"}}>CANCEL</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        <Dialog open={openDialogDelete} onClose={handleCloseDialogDelete}>
            <DialogContent>
                <Typography>Are you sure you want to DELETE this user?</Typography>
                {
                    alertOpen &&
                    <Grid size={12}>
                        <Alert sx={{marginTop:"20px"}} severity={alertSeverity}>
                            {alertMsg}
                        </Alert>
                    </Grid>
                }
                <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                    <Button onClick={handleDeleteUser} variant="contained" color="error">DELETE</Button>
                    <Button variant="contained" onClick={handleCloseDialogDelete} sx={{marginLeft:"20px"}}>CANCEL</Button>
                </Box>
            </DialogContent>
        </Dialog>
    </Box>
    )
}

export default ActionsUsers