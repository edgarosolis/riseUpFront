import { Fragment, useEffect, useState } from 'react';
import Separator from './Banners/Separator';
import SectionReportBanner from './Banners/SectionReportBanner';
import { Box, Container, Grid, Typography } from '@mui/material';
import Results from './Cards/Results';
import QuestionsReportSections from './QuestionsReportSections';

const SectionsReport = ({section, index, reportInfo,userSubmission,refreshData,saveFn,reviewerSection}) => {

    const [currentSection, setCurrentSection] = useState();

    useEffect(() => {
        const s = reportInfo.find(r=>r.section === section.customId);
        setCurrentSection(s);
    }, [section]);

    return (
        <>
            <Separator sectionColor={section?.color}/>
            <SectionReportBanner sectionColor={section?.color} title={section?.title} index={index} intro={section?.report?.intro} image={section?.image}/>
            <Results sectionColor={section?.color} title={section?.title} currentSection={currentSection}/>
            {reviewerSection && (
                <Box sx={{ backgroundColor: "#f5f5f5" }}>
                    <Results sectionColor={section?.color} title={`Reviewer Perspective: ${section?.title}`} currentSection={reviewerSection}/>
                </Box>
            )}
            {
                section?.report?.hasTable &&
                <Container maxWidth="xl" sx={{padding:"50px 0px"}}>
                    <Grid container spacing={2}>
                        <Grid size={3} sx={{backgroundColor:"#F4C542", display:"flex", justifyContent:"center", padding:"10px 0px"}}>
                            <Typography fontWeight={600} variant='h6' color='white'>Sphere</Typography>
                        </Grid>
                        <Grid size={9} sx={{backgroundColor:"#F4C542", display:"flex", justifyContent:"center", padding:"10px 0px"}}>
                            <Typography fontWeight={600} variant='h6' color='white'>Definition</Typography>
                        </Grid>
                        {
                            section?.report?.tableInfo.map((row,i)=>(
                                <Fragment key={i}>
                                    <Grid size={3} sx={{backgroundColor:"backSections.main",padding:"30px 30px", display:"flex", alignItems:"center"}}>
                                        <Typography fontWeight={600}>{row.sphere}</Typography>
                                    </Grid>
                                    <Grid size={9} sx={{backgroundColor:"backSections.main",padding:"30px 30px", display:"flex", alignItems:"center"}}>
                                        <Typography>{row.definition}</Typography>
                                    </Grid>
                                </Fragment>
                            ))
                        }
                        <Grid size={12} sx={{backgroundColor:"backSections.main", display:"flex",flexDirection:"column", justifyContent:"center", padding:"30px 30px"}}>
                            <Typography>Your dominant sphere helps answer:</Typography>
                            <br/>
                            <Typography>· Where are you most fruitful in leadership?</Typography>
                            <Typography>· Where does your presence bring the most impact?</Typography>
                        </Grid>
                    </Grid>
                </Container>
            }
            <QuestionsReportSections questions={section?.report?.questions} answers={userSubmission?.answers} submissionId={userSubmission?._id} callUserSubmission={refreshData} saveFn={saveFn}/>
        </>
    )
}

export default SectionsReport