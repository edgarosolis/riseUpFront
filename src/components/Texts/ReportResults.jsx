import { Box, Container, Typography } from "@mui/material"

const ReportResults = ({reportInfo}) => {

    if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return null;

    const sphere = reportInfo.find(r => r.section === "s1");
    const fiveFold = reportInfo.find(r => r.section === "s2");
    const biblicalDna = reportInfo.find(r => r.section === "s3");

    return (
        <Container maxWidth="xl">
            <Box display={"flex"} justifyContent={"space-around"} sx={{padding:"40px 0px", flexWrap:"wrap", gap:"16px"}}>
                {sphere && <Box>
                    <Typography variant="h4" fontWeight={"600"} color="yellow1.main">Sphere:</Typography>
                    <Typography variant="subtitle1" fontWeight={"600"}>{sphere.content?.title}</Typography>
                </Box>}
                {fiveFold && <Box>
                    <Typography variant="h4" fontWeight={"600"} color="yellow2.main">5-Fold Leaning</Typography>
                    <Typography variant="subtitle1" fontWeight={"600"}>{fiveFold.content?.title}</Typography>
                </Box>}
                {biblicalDna && <Box>
                    <Typography variant="h4" fontWeight={"600"} color="yellow3.main">Biblical DNA</Typography>
                    <Typography variant="subtitle1" fontWeight={"600"}>{biblicalDna.content?.title}</Typography>
                </Box>}
            </Box>
        </Container>
    )
}

export default ReportResults