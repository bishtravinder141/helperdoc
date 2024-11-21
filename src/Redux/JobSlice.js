import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postJobId: "",
};
export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setPostJobId: (state, action) => {
      state.postJobId = action.payload;
    },
  },
});

export const { setPostJobId } = jobSlice.actions;

export default jobSlice.reducer;
