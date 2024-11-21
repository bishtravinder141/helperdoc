import moment from "moment";

// calculate time ago from current time
export const calculateTimeAgo = (time) => {
  return moment(time).fromNow();
};
