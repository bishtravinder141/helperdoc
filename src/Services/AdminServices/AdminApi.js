import { APIAxios } from "../../Config/APIConfig";
// get employers list for admin's employer page
export const getEmployersList = (query) =>
  APIAxios.get(`/users/admin/employers/?${query}`);

// get agency list
export const getAgencyList = (query) =>
  APIAxios.get(`users/admin/agencies/?${query}`);

// get job seeker list
export const getJobSeekerList = (query) =>
  APIAxios.get(`users/admin/helpers/?${query}`);

// verify document

export const VerifyUser = (userId, payload) =>
  APIAxios.post(`/users/admin/verify-user?userId=${userId}`, payload);

// get all transactions
export const getTransactionList = (query) =>
  APIAxios.get(`/payments/admin/all?${query}`);

//   post subscription plan
export const postSubscriptionPlan = (payload) =>
  APIAxios.post(`/subscription/plan`, payload);

// get terms and conditions
export const getTermsAndConditions = () =>
  APIAxios.get("/terms-and-conditions");

// post terms and conditions
export const postTermsAndConditions = (payload) =>
  APIAxios.post("/terms-and-conditions", payload);

// edit terms and conditions
export const editTermsAndConditions = (id, payload) =>
  APIAxios.put(`/terms-and-conditions/${id}`, payload);

// get privacy policy
export const getPrivacyPolicy = () => APIAxios.get("/privacy-policy");

// post privacy policy
export const postPrivacyPolicy = (payload) =>
  APIAxios.post("/privacy-policy", payload);

// edit privacy policies

export const editPrivacyPolicy = (id, payload) =>
  APIAxios.put(`privacy-policy/${id}`, payload);
