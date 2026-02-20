import { useState, useEffect } from "react";
import { getAllAdmins, createAdmin } from "../../axios/axiosFunctions";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogTitle, DialogContent, Box, Grid, TextField, Alert } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { adminColumns } from "../../utils/adminCols";

const Admins = () => {

  const [rows, setRows] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [form, setForm] = useState({firstName:"",lastName:"",email:""});
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");

  const fetchAdmins = async()=>{
    const admins = await getAllAdmins();
    if(admins){
      const tempRows = admins.map((a)=>({
        id: a._id,
        firstName: a.firstName,
        lastName: a.lastName,
        email: a.email,
      }));
      setRows(tempRows);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleForm = (e)=>{
    const {name, value} = e.target;
    setForm({...form,[name]:value});
  }

  const handleSubmit = async()=>{
    if(!form.firstName || !form.lastName || !form.email){
      setMsg("Please fill all the fields");
      setAlertSeverity("error");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 4000);
      return;
    }

    const res = await createAdmin(form);

    if(!res.user){
      setMsg(res.msg);
      setAlertSeverity("error");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 4000);
      return;
    }

    setMsg(res.msg);
    setAlertSeverity("success");
    setShowMsg(true);
    fetchAdmins();
    setTimeout(() => {
      setForm({firstName:"",lastName:"",email:""});
      setShowMsg(false);
      setOpenCreateDialog(false);
    }, 2000);
  };

  return (
    <>
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"50px"}}>
        <Typography variant="h3" fontWeight={500} color="secondary">Admins</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd/>}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Admin
        </Button>
      </Box>
      <DataGrid columns={adminColumns} rows={rows} showToolbar/>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Admin</DialogTitle>
        <DialogContent>
          <Box sx={{marginTop:"20px"}}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="h6" color="secondary">First Name</Typography>
                <TextField value={form.firstName} required fullWidth onChange={handleForm} name='firstName'/>
              </Grid>
              <Grid size={6}>
                <Typography variant="h6" color="secondary">Last Name</Typography>
                <TextField value={form.lastName} required fullWidth onChange={handleForm} name='lastName'/>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" color="secondary">Email</Typography>
                <TextField value={form.email} required fullWidth onChange={handleForm} name='email'/>
              </Grid>
              {
                showMsg &&
                <Grid size={12}>
                  <Alert sx={{marginTop:"10px"}} severity={alertSeverity}>
                    {msg}
                  </Alert>
                </Grid>
              }
              <Grid size={12} sx={{display:"flex", gap:"10px", marginTop:"10px"}}>
                <Button onClick={handleSubmit} variant="contained">CREATE</Button>
                <Button onClick={() => setOpenCreateDialog(false)} variant="outlined">CANCEL</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Admins
