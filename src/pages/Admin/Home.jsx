import { useState, useEffect } from "react";
import { getAllUsers } from "../../axios/axiosFunctions";
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@mui/material";
import { homeColumns } from "../../utils/homeCols";

const Home = () => {

  const [rows, setRows] = useState([{id:1}]);

  useEffect(() => {
    const getUsers = async()=>{
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
    }
    getUsers();
  }, []);

  return (
    <>
      <Typography variant="h3" fontWeight={500} color="secondary" sx={{marginBottom:"50px"}}>Home</Typography> 
      <DataGrid columns={homeColumns} rows={rows} showToolbar/>
    </>
  )
}

export default Home