import { APIAxios } from "../../Config/APIConfig";
import {
  GET_ALL_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../../Config/APIUrls";

// Get All Notifications List
// export const getAllNotificationsList = (userId,params) => APIAxios.get(GET_ALL_NOTIFICATION(userId,params));

export const getAllNotificationsList = (userId, param) => APIAxios.get(`${GET_ALL_NOTIFICATION(userId)}${param}`);

export const removeNotification = (userId,notificationId) => APIAxios.delete(DELETE_NOTIFICATION(userId,notificationId));


