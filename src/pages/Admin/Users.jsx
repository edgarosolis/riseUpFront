import { Typography } from "@mui/material"
import CreateUser from "../../components/forms/CreateUser"

const Users = () => {

    return (
    <>
      <Typography variant="h3" fontWeight={500} color="secondary">Create User</Typography>
      <CreateUser/>
    </>
    )
}

export default Users