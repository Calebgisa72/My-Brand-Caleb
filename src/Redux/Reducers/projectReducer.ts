import { createSlice } from "@reduxjs/toolkit";
import { projectExtendedProps } from "../../utils/validation";

interface projectReducerProps {
  projects: null | projectExtendedProps[];
}

const initialState: projectReducerProps = {
  projects: null,
};

const projectslice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = projectslice.actions;
export default projectslice.reducer;
