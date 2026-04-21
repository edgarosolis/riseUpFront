import { useContext } from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { AssessmentContext } from '../../context/assessment';

const WelcomeIntro = () => {
  const { currentAssessment } = useContext(AssessmentContext);
  const wi = currentAssessment?.welcomeIntro || {};

  const headingStyle = { marginBottom: { xs: "12px", md: "20px" }, fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } };
  const bodyStyle = { marginBottom: { xs: "8px", md: "12px" }, fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.05rem" } };

  const headings = wi.headings || [];
  const bullets = wi.bullets || [];
  const closingParagraphs = wi.closingParagraphs || [];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      {headings.map((h, i) => (
        <Typography key={i} variant='h5' color='primary' sx={headingStyle}>{h}</Typography>
      ))}

      {wi.intro && <Typography variant='body1' sx={bodyStyle}>{wi.intro}</Typography>}

      {wi.bulletsLead && <Typography variant='body1' sx={bodyStyle}>{wi.bulletsLead}</Typography>}

      {bullets.length > 0 && (
        <List component={"ul"} sx={{ listStyle: "disc", pl: { xs: 2, md: 4 } }}>
          {bullets.map((b, i) => (
            <ListItem key={i} component={"li"} sx={{ display: "list-item", py: { xs: 0.5, md: 1 } }}>
              <ListItemText primary={
                <Typography variant='h6' sx={bodyStyle}>
                  {b.bold && <b>{b.bold}</b>}{b.text}
                </Typography>
              } />
            </ListItem>
          ))}
        </List>
      )}

      {closingParagraphs.map((p, i) => (
        <Typography key={i} variant='h6' sx={bodyStyle}>{p}</Typography>
      ))}

      {wi.callToAction && (
        <Typography variant='h6' fontWeight={600} sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" } }}>
          {wi.callToAction}
        </Typography>
      )}
    </Container>
  );
};

export default WelcomeIntro;
