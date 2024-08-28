import { createSlice } from "@reduxjs/toolkit";
import { blogProps } from "../../utils/validation";

interface blogReducerProps {
  blogs: null | blogProps[];
}

const initialState: blogReducerProps = {
  blogs: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
