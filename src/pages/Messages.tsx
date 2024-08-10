import React from "react";
import SingleMessage from "../components/SingleMessage";

const Messages = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center shadow-sm pb-3">
        <p className="text-xl ">All Messages</p>
      </div>
      <div className="flex flex-col xsm:flex-row xmd:flex-col gap-3 xmd:gap-0 xmd:space-y-5 gap-x-2 xsm:flex-wrap xmd:flex-nowrap shadow-sm overflow-y-auto h-[calc(100vh-186px)] ">
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
      </div>
    </div>
  );
};

export default Messages;
