import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import AssessmentPDF from "./PDF/AssessmentPDF"
import PrintIcon from '@mui/icons-material/Print';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const DownloadSection = ({ fetchData, sections, userSubmission, userName, is360 }) => {

  const [apiData, setApiData] = useState(null);
  const [isFetchingAPI, setIsFetchingAPI] = useState(false);
  const [lastProcessedSubmission, setLastProcessedSubmission] = useState(null);

  const handleFetchData = async () => {
    setIsFetchingAPI(true);
    try {
      const data = await fetchData(true);
      if (data.report && data.submission) {
        setApiData(data);
        setLastProcessedSubmission(data.submission);
      }
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    } finally {
      setIsFetchingAPI(false);
    }
  };

  useEffect(() => { 
    if (apiData && userSubmission !== lastProcessedSubmission) {
      setApiData(null);
    }
  }, [userSubmission]);

  console.log(apiData);

  return (
    <Container maxWidth="xl">
      {!apiData ? (
        <Box>
          <Button 
            variant="contained" 
            onClick={handleFetchData}
            disabled={isFetchingAPI}
            startIcon={isFetchingAPI ? <CircularProgress size={20} /> : <CloudDownloadIcon />}
          >
            {isFetchingAPI ? "LOADING..." : "PREPARE PDF REPORT"}
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Download report - Your report will be generated with your latest answers.
          </Typography>
        </Box>
      ) : (
        <PDFDownloadLink 
          document={<AssessmentPDF data={apiData} sections={sections} userName={userName} is360={is360}/>}
          fileName={`Report.pdf`}
        >
          {({ loading }) => (
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<PrintIcon />} 
              sx={{ color: "white" }}
              disabled={loading}
            >
              {loading ? "GENERATING PDF..." : "DOWNLOAD"}
            </Button>
          )}
        </PDFDownloadLink>
      )}
    </Container>
  )
}

export default DownloadSection