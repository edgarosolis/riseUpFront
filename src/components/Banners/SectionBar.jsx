import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const SectionBar = ({title,subtitle,noQuestions}) => {
  return (
    <Box sx={{backgroundColor:"yellow1.main",paddingTop:"50px",paddingBottom:"50px"}}>
        <Container maxWidth="xl">
            <Typography variant='h6' color='white' fontWeight={600} sx={{fontSize:"1.7rem"}}>Section: {title}</Typography>
            <Typography variant='h6' fontWeight={600}>{subtitle} ({noQuestions} questions)</Typography>
        </Container>
    </Box>
  )
}

export default SectionBar