import React, { useEffect, useState } from "react";
import SingleBlog from "../components/SingleBlog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setBlogs } from "../Redux/Reducers/blogReducer";
import { Loader2 } from "lucide-react";

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/blogs`
        );
        dispatch(setBlogs(response.data));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        dispatch(setBlogs([]));
      }
    };
    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center justify-between shadow-sm pb-3">
        <p className="text-xl">Published Blogs</p>
        <button
          onClick={() => navigate("add")}
          className="bg-foreground hover:bg-primary hover:text-foreground text-background px-4 py-2 rounded-xl"
        >
          Add New Blog
        </button>
      </div>
      {blogs === null ? (
        <p className="flex gap-2">
          Loading <Loader2 className="animate-spin" />
        </p>
      ) : !blogs || blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="flex flex-col xsm:flex-row xmd:flex-col gap-3 xmd:gap-0 xmd:space-y-5 gap-x-2 xsm:flex-wrap xmd:flex-nowrap shadow-sm overflow-y-auto h-[calc(100vh-186px)]">
          {blogs.map((blog) => {
            return <SingleBlog key={blog._id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Blog;
