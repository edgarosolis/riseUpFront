import { useState, useEffect } from "react";
import { getAllAdmins, createAdmin } from "../../axios/axiosFunctions";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, TextField, Alert } from "@mui/material";
import { PersonAdd, ContentCopy } from "@mui/icons-material";
import { adminColumns } from "../../utils/adminCols";

const Admins = () => {

  const [rows, setRows] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [form, setForm] = useState({firstName:"",lastName:"",email:""});
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");

  // Credentials dialog (shown after creating admin)
  const [credsOpen, setCredsOpen] = useState(false);
  const [credsData, setCredsData] = useState({ email: "", password: "", emailSent: false });
  const [copiedCreds, setCopiedCreds] = useState(false);

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

    fetchAdmins();
    setOpenCreateDialog(false);
    setForm({firstName:"",lastName:"",email:""});

    // Show credentials dialog
    setCredsData({
      email: form.email,
      password: res.tempPassword || "",
      emailSent: res.emailSent || false,
    });
    setCredsOpen(true);
    setCopiedCreds(false);
  };

  const handleCopyCredentials = () => {
    const text = `Email: ${credsData.email}\nPassword: ${credsData.password}\nLogin at: ${window.location.origin}/admin`;
    navigator.clipboard.writeText(text);
    setCopiedCreds(true);
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

      {/* Credentials Dialog */}
      <Dialog open={credsOpen} onClose={() => setCredsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Admin Account Created</DialogTitle>
        <DialogContent>
          {!credsData.emailSent && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              The welcome email could not be sent. Please share these credentials manually.
            </Alert>
          )}
          {credsData.emailSent && (
            <Alert severity="success" sx={{ mb: 2 }}>
              A welcome email with login credentials has been sent.
            </Alert>
          )}
          <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: 3, mt: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> {credsData.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Password:</strong> {credsData.password}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Login URL: {window.location.origin}/admin
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            Save these credentials — the password cannot be retrieved later. The admin can reset it from the login page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<ContentCopy />}
            onClick={handleCopyCredentials}
            color={copiedCreds ? "success" : "primary"}
          >
            {copiedCreds ? "Copied!" : "Copy Credentials"}
          </Button>
          <Button variant="contained" onClick={() => setCredsOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Admins
