import { APIAxios } from "../../Config/APIConfig";
import {
  APPLY_JOB,
  CONTACT_US,
  GET_ALL_ACTIVE_JOBS_LIST,
  GET_ALL_JOBS,
  GET_ALL_MESSAGES,
  GET_APPLICANTS,
  GET_FAQ,
  GET_FAVORITES_APPLICANTS,
  GET_IMAGES,
  GET_JOBS_BY_STATUS,
  GET_POSTED_JOBS,
  GET_PROFILE_PERCENTAGE,
  POST_JOB,
  SAVE_JOB,
} from "../../Config/APIUrls";

// Get the UserId
function getUserId() {
  return localStorage.getItem("userId");
}

// Get All Jobs List
export const getJobsList = (param) =>
  APIAxios.get(`${GET_ALL_ACTIVE_JOBS_LIST}${param}`);

// Get Single Job Details
export const getJobDetails = (id) => APIAxios.get(`${GET_ALL_JOBS}/${id}`);

// Apply for the job
export const applyJob = (userId, payload) =>
  APIAxios.post(APPLY_JOB(userId), payload);

// Save the job
export const saveJob = (userId, payload) =>
  APIAxios.post(SAVE_JOB(userId), payload);

//unsave the job
export const unSaveJob = (userId, jobId) =>
  APIAxios.post(`/users/${userId}/unsave-job/${jobId}`);

// Get profile completion percentage
export const getProfilePercentage = (userId) =>
  APIAxios.get(GET_PROFILE_PERCENTAGE(userId));

// Get jobs by status
export const getJobsByStatus = (userId, param) =>
  APIAxios.get(`${GET_JOBS_BY_STATUS(userId)}${param}`);
//get all messages
export const getAllMessages = (param) =>
  APIAxios.get(`/messages/${getUserId()}${param}`);

// get message of one user
export const getMessageById = (param) => APIAxios.get(`/messages/${param}`);

// Get setting details
export const getSettingDetails = () =>
  APIAxios.get(`/users/${getUserId()}/settings`);

//delete account
export const deleteAccount = (userId) =>
  APIAxios.put(`/users/delete-account/${userId}`);

//update notiications
export const updateNotifications = (userId, payload) =>
  APIAxios.put(`/users/update-notifications/${userId}`, payload);
export const updatePassword = (userId, payload) =>
  APIAxios.put(`/users/update-password/${userId}`, payload);

// Post Job
export const postJob = (payload) => APIAxios.post(POST_JOB, payload);

//Post Job By id
export const editJobById = (id, payload) =>
  APIAxios.put(`/job-postings/${id}`, payload);

// Get job by userID
export const getJobByUserId = (param) =>
  APIAxios.get(`${GET_POSTED_JOBS}${param}`);

// Get job by jobId
export const getJobByJobId = (jobId) => APIAxios.get(`/job-postings/${jobId}`);

// Publish Job
export const publishJob = (id) => APIAxios.put(`${POST_JOB}/${id}/publish`);

// Delete Job
export const deletePostJob = (id) => APIAxios.delete(`${POST_JOB}/${id}`);

// Get Job profile
export const getImages = () => APIAxios.get(GET_IMAGES);

//get all applicants
export const getApplicants = (query) =>
  APIAxios.get(`/job-postings/applicants/${getUserId()}?${query}`);

// get all users list
export const getAllUsersList = (query) =>
  APIAxios.get(`/users/helpers/list/?${query}`);

// Decline applicant
export const declineApplicant = (jobId, applicantId) =>
  APIAxios.post(`/job-postings/${jobId}/decline-application/${applicantId}`);

// Add to favorites
export const addApplicantToFavorites = (applicantId) =>
  APIAxios.post(`users/${getUserId()}/add-to-favorites/${applicantId}`);

// Get favorites
export const getFavoritesApplicants = (param) =>
  APIAxios.get(`${GET_FAVORITES_APPLICANTS(getUserId())}${param}`);

// get Faqs
export const getFaqs = () => APIAxios.get('/faqs');

// post Faqs
export const postFaqs = (payload) => APIAxios.post('/faqs',payload)

// edit faq'
export const editFaq = (id,payload) => APIAxios.put(`/faqs/${id}`,payload)

// get single faq
export const getSingleFaq = (id) => APIAxios.get(`/faqs/${id}`);

// Delete faq
export const deleteFaq = (id) =>  APIAxios.delete(`/faqs/${id}`)

//contact us
export const SendContactInfo = (payload) => APIAxios.post(CONTACT_US,payload);

// get featured jobs
export const getFeatureJobs = (query) => (APIAxios.get(`/job-postings/active-jobs-list?${query}`));
