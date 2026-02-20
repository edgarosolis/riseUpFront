import { useState, useEffect } from "react";
import { getAllUsers } from "../../axios/axiosFunctions";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { homeColumns } from "../../utils/homeCols";
import CreateUser from "../../components/forms/CreateUser";

const Home = () => {

  const [rows, setRows] = useState([{id:1}]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const fetchUsers = async()=>{
    const users = await getAllUsers();
    if(users){
      const tempRows = users.map((u)=>({
        id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
      }));
      setRows(tempRows);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserCreated = () => {
    fetchUsers();
    setTimeout(() => {
      setOpenCreateDialog(false);
    }, 2000);
  };

  return (
    <>
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"50px"}}>
        <Typography variant="h3" fontWeight={500} color="secondary">Home</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd/>}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create User
        </Button>
      </Box>
      <DataGrid columns={homeColumns} rows={rows} showToolbar/>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <CreateUser onUserCreated={handleUserCreated}/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Home