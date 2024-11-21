import { createSlice } from "@reduxjs/toolkit";
import { getMasterData } from "../Services/MasterServices/MasterService";
import { toastMessage } from "../Utils/toastMessages";
import { t } from "i18next";

const initialState = {
  accommodation: [],
  agencySubscriptionPlanFeatures:[],
  employerSubscriptionPlanFeatures:[],
  profilePercentage: 0,
  certificates: [],
  countriesList: [],
  daysOff: [],
  dutiesTasksList: [],
  educationLevel: [],
  genders: [],
  jobTypes: [],
  languageLevel: [],
  livingArrangement: [],
  maritalStatus: [],
  nationality: [],
  nativeLanguages: [],
  religion: [],
  requiredSpecialCare: [],
  shareRoomCoWorker: [],
  skillsList: [],
  yourExperince: [],
  jobProfileImages: [],
  sortBy:[],
  hasSubscription: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
    setMasterData: (state, action) => {
      for (let value in action.payload) {
        state[value] = action.payload[value];
      }
    },
    setJobProfileImages: (state, action) => {
      state.jobProfileImages = action.payload;
    },
    setSubscriptionDetails: (state, action) => {
      state.hasSubscription = action.payload;
    },
  },
});

export const { setProfilePercentage, setMasterData, setJobProfileImages, setSubscriptionDetails } =
  commonSlice.actions;

export default commonSlice.reducer;

export function getAllSeadersData() {
  return async (dispatch) => {
    try {
      const res = await getMasterData();
      console.log(res, "common slice");
      if (res.status === 200) {
        dispatch(setMasterData(res.data));
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        toastMessage(err.response.data?.message);
      } else {
        toastMessage(t("failure_message"));
      }
    }
  };
}
