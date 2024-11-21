import { APIAxios } from "../../Config/APIConfig";
import {
  ADD_PAYMENT,
  GET_SUBSCRIPTION_PLANS,
  GET_SUBSCRIPTION_PLANS_BY_ID,
  SUCCESS_PAYMENT,
} from "../../Config/APIUrls";

// Get SubscriptionPlans
export const getSubscriptionPlans = () => APIAxios.get(GET_SUBSCRIPTION_PLANS);

// Get SubscriptionPlans  by id
export const getSubscriptionPlansByID = (id) =>
  APIAxios.get(`${GET_SUBSCRIPTION_PLANS_BY_ID}/${id}`);

// Complete Payment
export const addPayments = (payload) => APIAxios.post(ADD_PAYMENT, payload);

// Payment successfull
export const paymentSuccess = (query) =>
  APIAxios.get(`${SUCCESS_PAYMENT}${query}`);
