import React from "react";
import SingleBlog from "../components/SingleBlog";

const Blog = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center justify-between shadow-sm pb-3">
        <p className="text-xl ">Published Blogs</p>
        <button className="bg-foreground hover:bg-primary hover:text-foreground text-background px-4 py-2 rounded-xl">
          Add New Blog
        </button>
      </div>
      <div className="flex flex-col xsm:flex-row xmd:flex-col gap-3 xmd:gap-0 xmd:space-y-5 gap-x-2 xsm:flex-wrap xmd:flex-nowrap shadow-sm overflow-y-auto h-[calc(100vh-186px)] ">
        <SingleBlog />
        <SingleBlog />
        <SingleBlog />
      </div>
    </div>
  );
};

export default Blog;
