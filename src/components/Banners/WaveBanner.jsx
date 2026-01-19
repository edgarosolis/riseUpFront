import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { BannerContainer } from "./BannerContainer"
import { WaveOverlay } from "./WaveOverlay"

const WaveBanner = ({title,subtitle,button,buttonText,imageUrl}) => {
  return (
    <BannerContainer>
      <Container maxWidth="xl">
        <Grid container spacing={5} aligs="center">
          {/* Columna de Texto */}
          <Grid size={{xs:12,md:9}}>
            <Box sx={{ zIndex: 2, position: 'relative' }}>
              <Typography 
                variant="h2"
                color="primary"
                sx={{ 
                  fontWeight: 600, 
                  fontSize: { xs: '2.5rem', md: '6rem' },
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 400,
                  maxWidth:"600px"
                }}
              >
                {subtitle}
              </Typography>
              {button && (
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#0057FF', 
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    '&:hover': { bgcolor: '#e0e0e0' },
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: '50px' // Estilo redondeado moderno
                  }}
                >
                  {buttonText}
                </Button>
              )}
            </Box>
          </Grid>

          {/* Columna de Imagen */}
          <Grid size={{xs:12,md:3}}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                zIndex: 2,
                position: 'relative'
              }}
            >
              <Box 
                component="img"
                src={imageUrl}
                alt="Banner Illustration"
                sx={{
                  width: '200%',                  
                  height: 'auto',
                  filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.1))'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Onda SVG (Wave Effect) */}
      <WaveOverlay>
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
      </WaveOverlay>
    </BannerContainer>
  )
}

export default WaveBanner