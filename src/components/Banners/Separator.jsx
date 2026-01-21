import { Box } from '@mui/material'

const Separator = ({sectionColor}) => {
  return (
    <Box sx={{backgroundColor:sectionColor,paddingTop:"20px",paddingBottom:"20px"}}></Box>
  )
}

export default Separator