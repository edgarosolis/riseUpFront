import { Box, Container, Typography } from "@mui/material"

const ReportResults = ({reportInfo}) => {

    return (
        <Container maxWidth="xl">
            <Box display={"flex"} justifyContent={"space-around"} sx={{padding:"40px 0px"}}>
                <Box>
                    <Typography variant="h4" fontWeight={"600"} color="yellow1.main">Sphere:</Typography>
                    <Typography variant="subtitle1" fontWeight={"600"}>{reportInfo[0].keyUsed[0]}</Typography>
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight={"600"} color="yellow2.main">5-Fold Leaning</Typography>
                    <Typography variant="subtitle1" fontWeight={"600"}>{reportInfo[1].keyUsed[0]}</Typography>
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight={"600"} color="yellow3.main">Biblical DNA</Typography>
                    <Typography variant="subtitle1" fontWeight={"600"}>{reportInfo[2].keyUsed[0]}</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default ReportResults