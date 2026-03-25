import { CloudUpload, Download } from "@mui/icons-material";
import { Alert, Box, Button, Grid, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, FormControlLabel, Switch } from "@mui/material"
import { useState } from "react";
import { createUser, bulkUploadUsers } from "../../axios/axiosFunctions";

const defaultCreateUserForm = {
    firstName:"",
    lastName:"",
    email:"",
    has360: false,
}

const CreateUser = ({onUserCreated}) => {

    const [createUserForm, setCreateUserForm] = useState(defaultCreateUserForm);
    const {firstName, lastName, email, has360} = createUserForm;
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");

    // Bulk upload state
    const [openBulkDialog, setOpenBulkDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResults, setUploadResults] = useState(null);

    const handleForm = (e)=>{
        const {name, value} = e.target;
        setCreateUserForm({...createUserForm,[name]:value});
    }

    const validateForm = ()=>{
        return firstName !== "" && lastName !== "" && email !== "";
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
        if(onUserCreated) onUserCreated();
        setTimeout(() => {
            setCreateUserForm(defaultCreateUserForm);
            setShowMsg(false);
        }, 4000);

    }

    // Bulk upload handlers
    const handleOpenBulkDialog = () => {
        setOpenBulkDialog(true);
        setSelectedFile(null);
        setUploadResults(null);
    };

    const handleCloseBulkDialog = () => {
        setOpenBulkDialog(false);
        setSelectedFile(null);
        setUploadResults(null);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            alert('Please select a valid CSV file');
        }
    };

    const downloadTemplate = () => {
        const headers = "firstName,lastName,email";
        const example = "John,Doe,john@example.com";
        const csv = `${headers}\n${example}`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users-template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleBulkUpload = async () => {
        if (!selectedFile) {
            alert('Please select a CSV file first');
            return;
        }

        setIsUploading(true);
        const result = await bulkUploadUsers(selectedFile);
        setIsUploading(false);
        setUploadResults(result);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'success': return '#4caf50';
            case 'duplicate': return '#ff9800';
            case 'error': return '#f44336';
            default: return '#000';
        }
    };

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
            <Grid size={6} sx={{display:"flex", alignItems:"center"}}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={has360}
                            onChange={(e) => setCreateUserForm({...createUserForm, has360: e.target.checked})}
                        />
                    }
                    label="Enable 360 Review"
                />
            </Grid>
            {
                showMsg &&
                <Grid size={12}>
                    <Alert sx={{marginTop:"20px"}} severity={alertSeverity}>
                        {msg}
                    </Alert>
                </Grid>
            }
            <Grid size={12} sx={{display:"flex", gap:"10px", marginTop:"20px"}}>
                <Button onClick={handleSubmit} variant="contained">CREATE</Button>
                <Button
                    onClick={handleOpenBulkDialog}
                    variant="contained"
                    startIcon={<CloudUpload/>}
                    sx={{backgroundColor:"#1976d2"}}
                >
                    BULK UPLOAD
                </Button>
            </Grid>
        </Grid>

        {/* Bulk Upload Dialog */}
        <Dialog open={openBulkDialog} onClose={handleCloseBulkDialog} maxWidth="md" fullWidth>
            <DialogTitle>Bulk Upload Users</DialogTitle>
            <DialogContent>
                <Box sx={{padding:"20px 0"}}>
                    <Typography variant="body1" sx={{marginBottom:"20px"}}>
                        Upload a CSV file with columns: firstName, lastName, email
                    </Typography>

                    <Box sx={{display:"flex", gap:"20px", alignItems:"center", marginBottom:"20px"}}>
                        <Button
                            variant="outlined"
                            startIcon={<Download/>}
                            onClick={downloadTemplate}
                        >
                            Download Template
                        </Button>

                        <Button
                            variant="contained"
                            component="label"
                        >
                            Select CSV File
                            <input
                                type="file"
                                accept=".csv"
                                hidden
                                onChange={handleFileSelect}
                            />
                        </Button>

                        {selectedFile && (
                            <Typography variant="body2" color="primary">
                                Selected: {selectedFile.name}
                            </Typography>
                        )}
                    </Box>

                    {isUploading && (
                        <Box sx={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px"}}>
                            <CircularProgress size={24}/>
                            <Typography>Uploading users...</Typography>
                        </Box>
                    )}

                    {uploadResults && (
                        <Box>
                            <Alert
                                severity={uploadResults.successCount > 0 ? "success" : "error"}
                                sx={{marginBottom:"20px"}}
                            >
                                {uploadResults.msg || `${uploadResults.successCount} users created, ${uploadResults.failedCount} failed`}
                            </Alert>

                            {uploadResults.results && uploadResults.results.length > 0 && (
                                <TableContainer component={Paper} sx={{maxHeight:"300px"}}>
                                    <Table stickyHeader size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Row</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Message</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {uploadResults.results.map((result, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{result.row}</TableCell>
                                                    <TableCell>{result.email}</TableCell>
                                                    <TableCell sx={{color: getStatusColor(result.status), fontWeight:"bold"}}>
                                                        {result.status.toUpperCase()}
                                                    </TableCell>
                                                    <TableCell>{result.message}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseBulkDialog}>Close</Button>
                <Button
                    onClick={handleBulkUpload}
                    variant="contained"
                    disabled={!selectedFile || isUploading}
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    )
}

export default CreateUser
