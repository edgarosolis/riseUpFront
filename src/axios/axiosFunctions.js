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

// OTP Authentication
export const requestOTP = async (email) => {
  try {
    const resp = await axios.post(BASE_URL + "auth/request-otp", { email });
    return resp.data;
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.msg || "Failed to send verification code"
    };
  }
};

export const verifyOTP = async (email, code) => {
  try {
    const resp = await axios.post(BASE_URL + "auth/verify-otp", { email, code });
    return resp.data;
  } catch (error) {
    return {
      user: undefined,
      msg: error.response?.data?.msg || "Verification failed"
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

//ADMINS
export const getAllAdmins = async()=>{
  try {
    const resp = await axios.get(BASE_URL + `user/allAdmins`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createAdmin = async(data)=>{
  try {
    const resp = await axios.post(BASE_URL + "user/admin", data);
    return resp.data;
  } catch (error) {
    return {
      user: undefined,
      msg: error.response.data.msg,
    };
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

//RESULTS
export const getAllResults = async()=>{
  try {
    const resp = await axios.get(BASE_URL + `result/`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createResult = async(data)=>{
  try {
    const resp = await axios.post(BASE_URL + "result/", data);
    return resp.data;
  } catch (error) {
    return {
      result: undefined,
      msg: error.response?.data?.msg || "Error creating result",
    };
  }
}

export const updateResult = async(resultId, data)=>{
  try {
    const resp = await axios.put(BASE_URL + `result/${resultId}`, data);
    return resp.data;
  } catch (error) {
    return {
      result: undefined,
      msg: error.response?.data?.msg || "Error updating result",
    };
  }
}

export const deleteResult = async(resultId)=>{
  try {
    const resp = await axios.delete(BASE_URL + `result/${resultId}`);
    return resp.data;
  } catch (error) {
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

// ─── CHURCHES ───

export const getAllChurches = async()=>{
  try {
    const resp = await axios.get(BASE_URL + `church/`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createChurch = async(data)=>{
  try {
    const resp = await axios.post(BASE_URL + "church/", data);
    return resp.data;
  } catch (error) {
    return {
      church: undefined,
      msg: error.response?.data?.msg || "Error creating church",
    };
  }
}

export const updateChurch = async(churchId, data)=>{
  try {
    const resp = await axios.put(BASE_URL + `church/${churchId}`, data);
    return resp.data;
  } catch (error) {
    return {
      church: undefined,
      msg: error.response?.data?.msg || "Error updating church",
    };
  }
}

export const deleteChurch = async(churchId)=>{
  try {
    const resp = await axios.delete(BASE_URL + `church/${churchId}`);
    return resp.data;
  } catch (error) {
    return undefined;
  }
}

// ─── GROUPS ───

export const getGroupsByChurchId = async(churchId)=>{
  try {
    const resp = await axios.get(BASE_URL + `group/church/${churchId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createGroup = async(data)=>{
  try {
    const resp = await axios.post(BASE_URL + "group/", data);
    return resp.data;
  } catch (error) {
    return {
      group: undefined,
      msg: error.response?.data?.msg || "Error creating group",
    };
  }
}

export const updateGroup = async(groupId, data)=>{
  try {
    const resp = await axios.put(BASE_URL + `group/${groupId}`, data);
    return resp.data;
  } catch (error) {
    return {
      group: undefined,
      msg: error.response?.data?.msg || "Error updating group",
    };
  }
}

export const deleteGroup = async(groupId)=>{
  try {
    const resp = await axios.delete(BASE_URL + `group/${groupId}`);
    return resp.data;
  } catch (error) {
    return undefined;
  }
}

export const addMemberToGroup = async(groupId, data)=>{
  try {
    const resp = await axios.post(BASE_URL + `group/addMember/${groupId}`, data);
    return resp.data;
  } catch (error) {
    return {
      group: undefined,
      msg: error.response?.data?.msg || "Error adding member",
    };
  }
}

export const removeMemberFromGroup = async(groupId, userId)=>{
  try {
    const resp = await axios.put(BASE_URL + `group/removeMember/${groupId}/${userId}`);
    return resp.data;
  } catch (error) {
    return {
      group: undefined,
      msg: error.response?.data?.msg || "Error removing member",
    };
  }
}

// ─── GROUP 360 ───

export const getGroup360sByGroupId = async(groupId)=>{
  try {
    const resp = await axios.get(BASE_URL + `group360/group/${groupId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createGroup360 = async(data)=>{
  try {
    const resp = await axios.post(BASE_URL + "group360/", data);
    return resp.data;
  } catch (error) {
    return {
      group360: undefined,
      msg: error.response?.data?.msg || "Error creating group360",
    };
  }
}

export const deleteGroup360 = async(group360Id)=>{
  try {
    const resp = await axios.delete(BASE_URL + `group360/${group360Id}`);
    return resp.data;
  } catch (error) {
    return undefined;
  }
}

export const addReviewerToGroup360 = async(group360Id, data)=>{
  try {
    const resp = await axios.post(BASE_URL + `group360/addReviewer/${group360Id}`, data);
    return resp.data;
  } catch (error) {
    return {
      group360: undefined,
      msg: error.response?.data?.msg || "Error adding reviewer",
    };
  }
}

export const removeReviewerFromGroup360 = async(group360Id, reviewerId)=>{
  try {
    const resp = await axios.put(BASE_URL + `group360/removeReviewer/${group360Id}/${reviewerId}`);
    return resp.data;
  } catch (error) {
    return {
      group360: undefined,
      msg: error.response?.data?.msg || "Error removing reviewer",
    };
  }
}

export const getGroup360sByUserId = async(userId)=>{
  try {
    const resp = await axios.get(BASE_URL + `group360/user/${userId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// ─── SUBMISSION 360 ───

export const getActiveSubmission360 = async(reviewerId, revieweeId, groupId)=>{
  try {
    const resp = await axios.get(BASE_URL + `submission360/active/reviewer/${reviewerId}/reviewee/${revieweeId}/group/${groupId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const updateSubmission360 = async(submissionId, data)=>{
  try {
    const resp = await axios.put(BASE_URL + `submission360/${submissionId}`, data);
    return resp.data;
  } catch (error) {
    return {
      submission: undefined,
      msg: error.response?.data?.msg || "Error updating submission",
    };
  }
}

// ─── PUBLIC REVIEW (no auth) ───

export const getReviewByToken = async(token)=>{
  try {
    const resp = await axios.get(BASE_URL + `group360/review/${token}`);
    return resp.data;
  } catch (error) {
    return {
      msg: error.response?.data?.msg || "Invalid review link",
      error: true,
    };
  }
}

export const saveReviewProgress = async(token, data)=>{
  try {
    const resp = await axios.put(BASE_URL + `group360/review/${token}/save`, data);
    return resp.data;
  } catch (error) {
    return {
      submission: undefined,
      msg: error.response?.data?.msg || "Error saving progress",
    };
  }
}

export const completeReview = async(token, data)=>{
  try {
    const resp = await axios.put(BASE_URL + `group360/review/${token}/complete`, data);
    return resp.data;
  } catch (error) {
    return {
      msg: error.response?.data?.msg || "Error completing review",
      error: true,
    };
  }
}