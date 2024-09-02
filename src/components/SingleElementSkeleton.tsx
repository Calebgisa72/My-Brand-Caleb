import React from "react";

const SingleElementSkeleton = () => {
  return (
    <div className="bg-[#ece8e8] p-4 gap-4 rounded-[8px] flex shadow-lg items-center w-40 h-20 animate-pulse">
      <div className="w-10"></div>
      <div className="flex flex-col gap-1 items-center text-xl">
        <p className="font-medium text-description"></p>
        <p className="font-bold font-serif"></p>
      </div>
    </div>
  );
};

export default SingleElementSkeleton;
