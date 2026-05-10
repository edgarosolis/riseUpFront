import { Typography } from "@mui/material"
import CreateUser from "../../components/forms/CreateUser"

const Users = () => {

    return (
    <>
      <Typography variant="h3" fontWeight={500} color="secondary" sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}>Create User</Typography>
      <CreateUser/>
    </>
    )
}

export default Users