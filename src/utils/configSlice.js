import { createSlice } from "@reduxjs/toolkit";

const configSlic = createSlice({
  name: "config",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLanguage } = configSlic.actions;
export default configSlic.reducer;
