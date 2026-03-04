import { Box, Grid, Typography } from "@mui/material"

const sectionColors = {
    sphere: "#FFC700",
    fiveFold: "#CDA310",
    dna: "#907000",
};

const ReportResults = ({ reportInfo, title, variant }) => {

    if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return null;

    const sphere = reportInfo.find(r => r.section === "s1");
    const fiveFold = reportInfo.find(r => r.section === "s2");
    const biblicalDna = reportInfo.find(r => r.section === "s3");

    const bgColor = variant === "others" ? "#F5F0E1" : "#FFF8E1";

    const cards = [
        { data: sphere, label: "Sphere:", color: sectionColors.sphere },
        { data: fiveFold, label: "5-Fold Leaning:", color: sectionColors.fiveFold },
        { data: biblicalDna, label: "Biblical DNA:", color: sectionColors.dna },
    ].filter(c => c.data);

    return (
        <Box sx={{ backgroundColor: bgColor, py: 4, px: { xs: 2, sm: 4 } }}>
            {title && (
                <Typography
                    variant="h5"
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 3, color: "#333" }}
                >
                    {title}
                </Typography>
            )}
            <Grid container spacing={3} justifyContent="center">
                {cards.map((card, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                        <Box
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: "12px",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                p: 3,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: card.color,
                                    color: "#fff",
                                    fontWeight: 700,
                                    fontSize: "0.8rem",
                                    px: 1.5,
                                    py: 0.4,
                                    borderRadius: "20px",
                                    lineHeight: 1.5,
                                }}
                            >
                                {card.label}
                            </Box>
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                sx={{ color: "#333", mt: 0.5 }}
                            >
                                {card.data.content?.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ReportResults