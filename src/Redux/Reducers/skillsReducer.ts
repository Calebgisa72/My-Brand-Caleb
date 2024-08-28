import { createSlice } from "@reduxjs/toolkit";
import { SkillsExtendedProps } from "../../utils/validation";

interface skillReducerProps {
  skills: null | SkillsExtendedProps[];
}

const initialState: skillReducerProps = {
  skills: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState: initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
  },
});

export const { setSkills } = skillSlice.actions;
export default skillSlice.reducer;
