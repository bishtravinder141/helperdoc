import { APIAxios } from "../../Config/APIConfig";
import {
  COMPLETE_AGENCY_PROFILE,
  GET_PROFILE_DETAILS,
  GET_PUBLIC_PROFILE,
} from "../../Config/APIUrls";

export const getProfileData = (userId) =>
  APIAxios.get(GET_PROFILE_DETAILS(userId));

export const completeProfileData = (userId, payload) =>
  APIAxios.put(GET_PROFILE_DETAILS(userId), payload);

export const getHelperPublicProfile = (id) =>
  APIAxios.get(GET_PUBLIC_PROFILE(id));

export function getUserId() {
  return localStorage.getItem("userId");
}

export const getUserProfile = (userId) => APIAxios.get(`users/${userId}`);
export const updateUserProfile = (userId, payload) =>
  APIAxios.put(`users/${userId}`, payload);

// add update agency profile
export const completeAgencyProfileDetail = (payload) =>
  APIAxios.post(`${COMPLETE_AGENCY_PROFILE}${getUserId()}`, payload);

// Get agency profile details
export const getAgencyProfile = () => APIAxios.get(`agency/user/${getUserId()}`);

// get agency profile by id for admin 
export const getAgencyProfileById = (id) => APIAxios.get(`agency/user/${id}`);

