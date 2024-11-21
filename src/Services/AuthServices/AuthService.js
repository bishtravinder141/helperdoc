import { authAxios } from "../../Config/APIConfig";
import {
  FORGOT_PASSWORD,
  LOGIN,
  RESET_OTP,
  SIGNUP,
  VERIFY_OTP,
} from "../../Config/APIUrls";

export const registerUser = (payload) => authAxios.post(SIGNUP, payload);

export const loginUser = (payload) => authAxios.post(LOGIN, payload);

export const forgotPassword = (payload) =>
  authAxios.post(FORGOT_PASSWORD, payload);

export const verifyOtp = (payload) => authAxios.post(VERIFY_OTP, payload);
export const resetPassword = (payload) => authAxios.post(RESET_OTP,payload);
