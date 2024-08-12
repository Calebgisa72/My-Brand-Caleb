import { combineReducers } from "@reduxjs/toolkit";
import currentTabReducer from "./currentTabReducer";

const rootReducer = combineReducers({
  tab: currentTabReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
