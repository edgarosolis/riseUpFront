import { Box, Button, Container, Typography } from "@mui/material"
import { BannerContainer } from "./BannerContainer"

const WaveBanner = ({title,subtitle,button,buttonText,imageUrl}) => {
  return (
    <BannerContainer>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: {xs: 2, md: 3},
        }}>
          {/* Text */}
          <Box sx={{ py: {xs: 1, md: 2} }}>
            <Typography
              color="primary"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.75rem' },
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: {xs: '0.9rem', sm: '1rem', md: '1.15rem'},
                mt: 1,
                letterSpacing: '0.02em',
                opacity: 0.85,
              }}
            >
              {subtitle}
            </Typography>
            {button && (
              <Button
                variant="contained"
                size="medium"
                sx={{
                  bgcolor: 'white',
                  color: '#0057FF',
                  px: 3,
                  py: 1,
                  fontSize: '0.875rem',
                  '&:hover': { bgcolor: '#e0e0e0' },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  mt: 2,
                }}
              >
                {buttonText}
              </Button>
            )}
          </Box>

          {/* Icon at the right end */}
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              alt=""
              sx={{
                display: {xs: 'none', sm: 'block'},
                width: {sm: '80px', md: '110px'},
                height: 'auto',
                opacity: 0.9,
                flexShrink: 0,
              }}
            />
          )}
        </Box>
      </Container>
    </BannerContainer>
  )
}

export default WaveBanner
