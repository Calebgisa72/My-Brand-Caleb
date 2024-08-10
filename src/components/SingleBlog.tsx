import React from "react";
import blogImage from "../../Images/unsplash_9anj7QWy-2f.svg";

const SingleBlog = () => {
  return (
    <div className="px-2 py-2 gap-5 w-full xsm:w-[48%] lg:gap-10 justify-between items-center flex flex-col xmd:flex-row xmd:w-full border-[1px] border-neutral-400 rounded-2xl shadow-sm">
      <div className="flex flex-col items-center m-0 p-0 gap-1 w-full xmd:w-[200px]">
        <div className="overflow-hidden rounded-xl w-full smd:w-48 xmd:w-32 lg:w-48 h-28 ">
          <img className="w-full h-full object-cover" src={blogImage} alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
        <p className="font-bold text-lg text-wrap">
          Cristiano Ronaldo Wins Ballon d'Or
        </p>
        <p className="text-description text-[14px] text-wrap">
          Football icon Cristiano Ronaldo secures another Ballon d'Or,
          reaffirming his legendary status in the sport.
        </p>
        <p className="text-gray-500 text-[12px] m-0 p-0 text-wrap">
          20-04-2024
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <button className="px-6 py-2 bg-primary hover:bg-blue-400 rounded-[8px]">
          Edit
        </button>
        <button className="px-6 py-2 bg-card hover:bg-destructive rounded-[8px]">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleBlog;
