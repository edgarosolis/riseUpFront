import { useEffect, useState } from 'react';
import Separator from './Banners/Separator';
import SectionReportBanner from './Banners/SectionReportBanner';
import { Container, Typography } from '@mui/material';
import Results from './Cards/Results';
import QuestionsReportSections from './QuestionsReportSections';

const SectionsReport = ({section, index, reportInfo}) => {
    
    const [currentSection, setCurrentSection] = useState();

    useEffect(() => {
        const s = reportInfo.find(r=>r.section === section.customId);
        setCurrentSection(s); 
    }, [section]);
    
    return (
        <>
            <Separator sectionColor={section?.color}/>
            <SectionReportBanner sectionColor={section?.color} title={section?.title} index={index} intro={section?.report?.intro}/>
            {
                section?.report?.hasTable && 
                <Container maxWidth="xl" sx={{padding:"50px 0px"}}>
                    <Typography>INSERT TABLE</Typography>
                </Container>
            }
            <Results sectionColor={section?.color} title={section?.title} currentSection={currentSection}/>
            <QuestionsReportSections questions={section?.report?.questions}/>
        </>
    )
}

export default SectionsReport