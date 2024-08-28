import React from "react";
import BlogForm from "../components/BlogForm";

const AddBlog = () => {
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div className="items-center underline">Add a New Blog Form</div>
      <BlogForm />
    </div>
  );
};

export default AddBlog;
