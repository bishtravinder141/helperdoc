import { getUserId } from "../Services/ProfileServices/ProfileService";

export const SIGNUP = "users/signup";
export const LOGIN = "users/login";
export const SOCIAL_LOGIN = "users/social-login";
export const FORGOT_PASSWORD = "/users/forgot-password";
export const VERIFY_OTP = "/users/verify-otp";
export const RESET_OTP = "/users/reset-password";

// Stepper API URLS
export const GET_ADD_STEP = "registration-step";

// Get Profile Data
export const GET_PROFILE_DETAILS = (userID) => `/complete-profile/${userID}`;
export const GET_PUBLIC_PROFILE = (userID) =>
  `/public-profiles/${getUserId()}`;

// Get All Job List
export const GET_ALL_JOBS = "job-postings";

// Get All Job List
export const GET_ALL_ACTIVE_JOBS_LIST = "job-postings/active-jobs-list";

// Get Job List by status
export const GET_JOBS_BY_STATUS = (userId) => `users/${userId}/get-jobs`;

// Apply for the job
export const APPLY_JOB = (jobId) => `users/${jobId}/apply-to-job`;

// Save job
export const SAVE_JOB = (jobId) => `users/${jobId}/save-job`;

// Get profile percentage
export const GET_PROFILE_PERCENTAGE = (userId) =>
  `/complete-profile/${userId}/profile-completion`;

// Upload file in s3
export const UPLOAD_FILE_IN_S3 = "upload/presigned-url";

// Get All Notifications List
export const GET_ALL_NOTIFICATION = (userId) => `notifications/${userId}`;

export const DELETE_NOTIFICATION = (userId, notificationId) =>
  `notifications/${userId}/${notificationId}`;
//get all messages
export const GET_ALL_MESSAGES = (userId) => `/messages/${userId}`;

// Post job
export const POST_JOB = `job-postings`;

// Get users posted jobs
export const GET_POSTED_JOBS = "job-postings/user-jobs-list";

// Get Images
export const GET_IMAGES = "images";

// Get subscriotin plans
export const GET_SUBSCRIPTION_PLANS = "subscription/plans";

// Get subscriotin plans by id
export const GET_SUBSCRIPTION_PLANS_BY_ID = "subscription";

// Complete payment
export const ADD_PAYMENT = "payments";

// success payment
export const SUCCESS_PAYMENT = "payments/success";

//get applicants
export const GET_APPLICANTS = "/job-postings/applicants/";

// get favorite applicant
export const GET_FAVORITES_APPLICANTS = (jobId) => `/users/${jobId}/favorites`;

// add agency profile details
export const COMPLETE_AGENCY_PROFILE = "agency/register/";

//get faqs
export const GET_FAQ = "/faqs";

// contact us
export const CONTACT_US = "/contact-us";
// export const AGENCY_LIST = "users/admin/helpers/"
// export const JOB_SEEKER_LIST = "users/admin/helpers/"
// export const EMPLOYER_LIST = "users/admin/helpers/"

