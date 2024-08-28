import { combineReducers } from "@reduxjs/toolkit";
import currentTabReducer from "./currentTabReducer";
import blogReducer from "./blogReducer";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import messageReducer from "./messageReducer";
import skillReducer from "./skillsReducer";

const rootReducer = combineReducers({
  tab: currentTabReducer,
  blogs: blogReducer,
  auth: authReducer,
  projects: projectReducer,
  messages: messageReducer,
  skills: skillReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
