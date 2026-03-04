import { Box, Grid, Typography } from "@mui/material"

const sectionColors = {
    sphere: "#FFC700",
    fiveFold: "#CDA310",
    dna: "#907000",
};

const buildCards = (reportInfo) => {
    if (!reportInfo || !Array.isArray(reportInfo) || reportInfo.length === 0) return [];
    const sphere = reportInfo.find(r => r.section === "s1");
    const fiveFold = reportInfo.find(r => r.section === "s2");
    const biblicalDna = reportInfo.find(r => r.section === "s3");
    return [
        { data: sphere, label: "Sphere:", color: sectionColors.sphere },
        { data: fiveFold, label: "5-Fold Leaning:", color: sectionColors.fiveFold },
        { data: biblicalDna, label: "Biblical DNA:", color: sectionColors.dna },
    ].filter(c => c.data);
};

const ResultCard = ({ card }) => (
    <Box
        sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            p: 3,
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
                fontSize: "0.85rem",
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
);

const ResultsColumn = ({ reportInfo, title, bgColor }) => {
    const cards = buildCards(reportInfo);
    if (cards.length === 0) return null;

    return (
        <Box sx={{ backgroundColor: bgColor, borderRadius: "12px", p: { xs: 2, sm: 3 }, flex: 1, minWidth: 0 }}>
            <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ mb: 2.5, color: "#333" }}>
                {title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cards.map((card, i) => (
                    <ResultCard key={i} card={card} />
                ))}
            </Box>
        </Box>
    );
};

const ReportResults = ({ reportInfo, title, variant }) => {
    const cards = buildCards(reportInfo);
    if (cards.length === 0) return null;
    const bgColor = variant === "others" ? "#F5F0E1" : "#FFF8E1";

    return (
        <Box sx={{ backgroundColor: bgColor, py: 4, px: { xs: 2, sm: 4 } }}>
            {title && (
                <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ mb: 3, color: "#333" }}>
                    {title}
                </Typography>
            )}
            <Grid container spacing={3} justifyContent="center">
                {cards.map((card, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                        <ResultCard card={card} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export const ReportResultsSideBySide = ({ selfReport, reviewerReport }) => {
    if (!selfReport && !reviewerReport) return null;

    return (
        <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 0,
            backgroundColor: "#FFF8E1",
        }}>
            {selfReport && (
                <ResultsColumn reportInfo={selfReport} title="How you see yourself:" bgColor="#FFF8E1" />
            )}
            {selfReport && reviewerReport && (
                <Box sx={{
                    display: { xs: "flex", md: "flex" },
                    justifyContent: "center",
                    alignItems: "stretch",
                    py: { xs: 1, md: 0 },
                    px: { xs: 0, md: 0 },
                }}>
                    <Box sx={{
                        width: { xs: "60%", md: "2px" },
                        height: { xs: "2px", md: "auto" },
                        backgroundColor: "#D4AF37",
                        borderRadius: "1px",
                        alignSelf: { xs: "center", md: "stretch" },
                    }} />
                </Box>
            )}
            {reviewerReport && reviewerReport.length > 0 && (
                <ResultsColumn reportInfo={reviewerReport} title="How others see you:" bgColor="#F5F0E1" />
            )}
        </Box>
    );
};

export default ReportResults