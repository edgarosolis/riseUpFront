import axios from "axios";

//DEVELOPMENT URL
export const BASE_URL = "http://localhost:8080/api/";
export const FRONT_URL = "http://localhost:3000/";

//DEVELOPMENT URL
//export const BASE_URL = "https://assessments.theriseupculture.com/api/";
//export const FRONT_URL = "https://assessments.theriseupculture.com/";

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

export const loginAdmin = async (data) => {
  try {
    const resp = await axios.post(BASE_URL + "auth/loginAdmin", data);
    return resp.data;
  } catch (error) {
    //TO DO: HANDLE ERROR
    return {
      user: undefined,
      msg: error.response.data.msg,
    };
  }
};

// Code-based login
export const requestLoginCode = async (data) => {
  try {
    const resp = await axios.post(BASE_URL + "auth/request-code", data);
    return resp.data;
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.msg || "Failed to send code",
    };
  }
};

export const verifyLoginCode = async (data) => {
  try {
    const resp = await axios.post(BASE_URL + "auth/verify-code", data);
    return resp.data;
  } catch (error) {
    return {
      user: undefined,
      msg: error.response?.data?.msg || "Verification failed",
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

//REPORT

export const getReportInfo = async(assessmentId,userId)=>{
  try {
    const resp = await axios.get(BASE_URL + `report/assessment/${assessmentId}/user/${userId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

//USER
export const getAllUsers = async()=>{
  try {
    const resp = await axios.get(BASE_URL + `user/allUserAdmin`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createUser = async(data)=>{
  try {
    const resp = await axios.post(BASE_URL + "user/", data);
    return resp.data;
  } catch (error) {
    //TO DO: HANDLE ERROR
    return {
      user: undefined,
      msg: error.response.data.msg,
    };
  }
}

export const updateUser = async(userId,data)=>{
  try {
    const resp = await axios.put(BASE_URL + `user/${userId}`, data);
    return resp.data;
  } catch (error) {
    //TO DO: HANDLE ERROR
    return {
      user: undefined,
      msg: error.response.data.msg,
    };
  }
}

export const deleteUser = async(userId)=>{
  try {
    const resp = await axios.delete(BASE_URL + `user/${userId}`);
    return resp.data;
  } catch (error) {
    //TO DO: HANDLE ERROR
    return undefined;
  }
}

export const bulkUploadUsers = async(csvFile)=>{
  try {
    const formData = new FormData();
    formData.append('csv', csvFile);
    const resp = await axios.post(BASE_URL + "user/bulk-upload", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return resp.data;
  } catch (error) {
    return {
      successCount: 0,
      failedCount: 0,
      results: [],
      msg: error.response?.data?.msg || "Upload failed"
    };
  }
}