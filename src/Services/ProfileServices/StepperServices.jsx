import { APIAxios } from "../../Config/APIConfig";
import { GET_ADD_STEP } from "../../Config/APIUrls";

export const getStepperData = (step, userId) =>
  step === 6
    ? APIAxios.get(`${GET_ADD_STEP}-${step}/${userId}`)
    : APIAxios.get(`${GET_ADD_STEP}${step}/${userId}`);
export const addStepperData = (step, payload, userID) =>
  step === 6
    ? APIAxios.post(`${GET_ADD_STEP}-${step}/${userID}`, payload)
    : APIAxios.post(`${GET_ADD_STEP}${step}/${userID}`, payload);
