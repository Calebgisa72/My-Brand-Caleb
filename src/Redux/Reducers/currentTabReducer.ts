import { createSlice } from "@reduxjs/toolkit";

export enum tabs {
  "home",
  "projects",
  "skills",
  "blog",
  "profile",
  "message",
}

export interface sessionInfo {
  currentTab: tabs;
}

const initialState: sessionInfo = {
  currentTab: tabs.home,
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setTab } = tabsSlice.actions;
export default tabsSlice.reducer;
