import { toast } from "react-toastify";
import { successType } from "../Constant/Constant";

export const toastMessage = (msg, type) => {

  if (type === successType) {
    toast.dismiss();
    toast.success(msg);
  } else {
    toast.dismiss();
    toast.error(msg);
  }
};
