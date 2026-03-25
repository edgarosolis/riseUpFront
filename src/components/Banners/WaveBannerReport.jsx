import { Box, Container, Grid, Typography } from "@mui/material"
import { WaveOverlay } from "./WaveOverlay"
import { BannerContainerReport } from "./BannerContainerReport"
import { useContext } from "react"
import { UserContext } from "../../context/user"

const WaveBannerReport = ({title, subtitle, completedAt}) => {

    const {currentUser} = useContext(UserContext);
    const yourDate = completedAt ? new Date(completedAt) : new Date();

    return (
      <BannerContainerReport>
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            {/* Columna de Texto */}
            <Grid size={{xs:12,md:12}}>
              <Box sx={{ zIndex: 2, position: 'relative' }}>
                <Typography
                  variant="h2" 
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: '2.5rem', md: '4rem' },
                  }}
                >
                  {title} Assessment
                </Typography>
                <Typography 
                  variant="h3"
                  color="primary" 
                  sx={{ 
                    fontWeight: 400,
                    mt:2,
                    maxWidth:"600px"
                  }}
                >
                  {subtitle || "SELF-ASSESSMENT REPORT"}
                </Typography>
                <Box sx={{mt:5,mb:8}}>
                    <Typography variant="h6">
                        Prepared for: {currentUser?.firstName} {currentUser?.lastName}
                    </Typography>
                    <Typography variant="h6">
                        Date: {yourDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        {/* Onda SVG (Wave Effect) */}
        {/* <WaveOverlay>
          <svg 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,224C672,245,768,235,864,208C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </WaveOverlay> */}
      </BannerContainerReport>
    )
  }

export default WaveBannerReport