import { Box, Container, Typography } from '@mui/material'

const ResultCard = ({sectionColor, title, currentSection}) => (
    <Box sx={{ borderRadius: "12px", overflow: "hidden", height: "100%" }}>
      <Box sx={{ backgroundColor: sectionColor, px: 3, py: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: 700, mt: 0.5 }}
        >
          {currentSection?.content.title}
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#FFF8E1", px: 3, py: 2, height: "100%" }}>
        <Typography
          component="div"
          variant="subtitle1"
          sx={{ color: "#333", "& p": { mb: 1.5 }, "& br": { display: "block", content: '""', mt: 1 } }}
          dangerouslySetInnerHTML={{__html: currentSection?.content?.content}}
        />
      </Box>
    </Box>
)

const Results = ({sectionColor, title, currentSection, noWrapper}) => {
    if (noWrapper) {
        return <ResultCard sectionColor={sectionColor} title={title} currentSection={currentSection} />
    }

    return (
    <Container maxWidth="xl">
        <Box sx={{ mx: { xs: 1, sm: 3, md: 5 }, my: 3 }}>
            <ResultCard sectionColor={sectionColor} title={title} currentSection={currentSection} />
        </Box>
    </Container>
    )
}

export default Results