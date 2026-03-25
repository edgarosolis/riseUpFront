import { Fragment, useEffect, useState } from 'react';
import Separator from './Banners/Separator';
import SectionReportBanner from './Banners/SectionReportBanner';
import { Box, Container, Grid, Typography } from '@mui/material';
import Results from './Cards/Results';
import QuestionsReportSections from './QuestionsReportSections';

const SectionsReport = ({section, index, reportInfo,userSubmission,refreshData,saveFn,reviewerSection,is360}) => {

    const [currentSection, setCurrentSection] = useState();

    useEffect(() => {
        const s = reportInfo.find(r=>r.section === section.customId);
        setCurrentSection(s);
    }, [section]);

    const displayTitle = section?.customId === 's1' ? section?.title?.replace('Sphere', 'Sphere(s)') : section?.title;

    // 360 report uses different titles for user vs reviewer results
    const getUserTitle = () => {
        if (!is360) return displayTitle;
        if (section?.customId === 's1') return "Where you see yourself:";
        return "How you see yourself:";
    };

    const getReviewerTitle = () => {
        if (!is360) return `Reviewer Perspective: ${displayTitle}`;
        if (section?.customId === 's1') return "Where others see you:";
        return "How others see you:";
    };

    // Reflection questions for 360 reports
    const reflectionQuestions = is360 ? [
        { customId: `${section?.customId}-reflect-1`, text: "What resonates most when you review how you see yourself and how others see you?" },
        { customId: `${section?.customId}-reflect-2`, text: "If others see you differently, what insights can you gain?" },
        ...(section?.customId === 's1' ? [{ customId: `${section?.customId}-reflect-3`, text: "What dreams or nudges keep coming up when you pray about where God wants to use you?" }] : []),
    ] : [];

    // Questions to exclude from 360 reports per section (partial match)
    const questionsToExclude360 = {
        s1: [
            "When and where do you feel most alive",
            "What environments seem to draw out your natural influence",
            "What dreams or nudges keep coming up",
        ],
        s2: [
            "How do people experience transformation",
            "Is there a part of your leadership style",
        ],
        s3: [
            "What aspect of your leadership feels uniquely anointed",
        ],
    };

    const getFilteredQuestions = () => {
        const questions = section?.report?.questions || [];
        if (!is360 || !questionsToExclude360[section?.customId]) return questions;
        const excludeList = questionsToExclude360[section.customId];
        return questions.filter(q => !excludeList.some(ex => q.text?.includes(ex)));
    };

    return (
        <>
            <Separator sectionColor={section?.color}/>
            <SectionReportBanner sectionColor={section?.color} title={displayTitle} index={index} intro={section?.report?.intro} image={section?.image}/>
            {reviewerSection ? (
                <Container maxWidth="xl">
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mx: { xs: 1, sm: 3, md: 5 }, my: 3 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Results sectionColor={section?.color} title={getUserTitle()} currentSection={currentSection} noWrapper />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Results sectionColor={section?.color} title={getReviewerTitle()} currentSection={reviewerSection} noWrapper />
                        </Box>
                    </Box>
                </Container>
            ) : (
                <Results sectionColor={section?.color} title={getUserTitle()} currentSection={currentSection}/>
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
            {(() => {
                const allQuestions = [...reflectionQuestions, ...getFilteredQuestions()];
                return allQuestions.length > 0 ? (
                    <QuestionsReportSections questions={allQuestions} answers={userSubmission?.answers} submissionId={userSubmission?._id} callUserSubmission={refreshData} saveFn={saveFn}/>
                ) : null;
            })()}
        </>
    )
}

export default SectionsReport