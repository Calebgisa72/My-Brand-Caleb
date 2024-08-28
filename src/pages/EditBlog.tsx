import React from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const EditBlog = () => {
  const { id } = useParams();
  const { blogs } = useSelector((state: RootState) => state.blogs);
  const blogToEdit = blogs && blogs.find((blog) => blog._id === id);
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div>Edit Blog</div>
      {blogToEdit ? (
        <BlogForm blog={blogToEdit} />
      ) : (
        <p className="text-destructive text-center">No blog to edit found</p>
      )}
    </div>
  );
};

export default EditBlog;
