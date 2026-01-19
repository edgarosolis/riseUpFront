import axios from "axios";

//DEVELOPMENT URL
export const BASE_URL = "http://localhost:8080/api/";
export const FRONT_URL = "http://localhost:3000/";

//AUTH

export const loginUser = async (data) => {
    try {
      const resp = await axios.post(BASE_URL + "auth/login", data);
      return resp.data;
    } catch (error) {
      //TO DO: HANDLE ERROR
      return {
        user: undefined,
        msg: error.response.data.msg,
      };
    }
};

//ASSESSMENTS

export const getAllAssessments = async()=>{
  try {
    const resp = await axios.get(BASE_URL + `assessment/`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}


//SUBMISSION

export const getActiveUserSubmission = async(assessmentId,userId)=>{
  try {
    const resp = await axios.get(BASE_URL + `submission/active/user/${userId}/assessmet/${assessmentId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const saveProgress = async(submissionId,data)=>{
  try {
    const resp = await axios.put(BASE_URL + `submission/${submissionId}`, data);
    return resp.data;
  } catch (error) {    
    return {
      submission: undefined,
      msg: error.response.data.msg,
    };
  }
}
