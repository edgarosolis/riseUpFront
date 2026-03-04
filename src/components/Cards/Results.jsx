import { Box, Container, Typography } from '@mui/material'

const Results = ({sectionColor,title,currentSection}) => {

    return (
    <Container maxWidth="xl">
        <Box sx={{ mx: { xs: 1, sm: 3, md: 5 }, my: 3, borderRadius: "12px", overflow: "hidden" }}>
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
          <Box sx={{ backgroundColor: "#FFF8E1", px: 3, py: 2 }}>
            <Typography
              component="div"
              variant="subtitle1"
              sx={{ color: "#333", "& p": { mb: 1.5 }, "& br": { display: "block", content: '""', mt: 1 } }}
              dangerouslySetInnerHTML={{__html: currentSection?.content?.content}}
            />
          </Box>
        </Box>
    </Container>
    )
}

export default Results