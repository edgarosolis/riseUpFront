import { createContext, useCallback, useEffect, useState } from "react";
import { getAllAssessments } from "../axios/axiosFunctions";

export const AssessmentContext = createContext({
    currentAssessment:null,
    setCurrentAssessment:()=>null,
    isLoading:true,
});

export const AssessmentProvider = ({children})=>{
    const [currentAssessment,setCurrentAssessment] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchAssessments = useCallback(async () => {
        setIsLoading(true); // Establece el estado de carga al iniciar
        try {
            const assessmet = await getAllAssessments();
            setCurrentAssessment(assessmet[0]);
            return assessmet[0]; // Devuelve los datos para uso externo
        } catch (error) {
            console.error("Error while loading Assessments:", error);
            setCurrentAssessment([]);
            throw error; // Propaga el error para manejo externo
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refetchAssessments = useCallback(async () => {
        return fetchAssessments();
    }, [fetchAssessments]);    

    useEffect(() => {
        fetchAssessments();
    }, [fetchAssessments]);

    const getSectionById = useCallback((id) => {
        if (!currentAssessment) return null;
        const section = currentAssessment.sections.find(section=>section._id === id);
        return section;
    }, [currentAssessment]);
    
    const getNextSection = useCallback((id) => {
        if (!currentAssessment) return null;
        const index = currentAssessment.sections.findIndex(section=>section._id === id);
        return currentAssessment.sections[index+1];
    }, [currentAssessment]);

    const getSectionInfo = useCallback((id) => {
        if (!currentAssessment) return null;
        const index = currentAssessment.sections.findIndex(section=>section._id === id);
        const data = {
            section : currentAssessment.sections.find(section=>section._id === id),
            next : currentAssessment.sections[index+1],
            index
        }
        return data;
    }, [currentAssessment]);

    const value = {currentAssessment,setCurrentAssessment,isLoading,refetchAssessments,getSectionById,getNextSection,getSectionInfo};

    return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
}