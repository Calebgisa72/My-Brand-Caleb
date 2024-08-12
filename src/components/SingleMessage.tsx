import React, { useState } from "react";
import { Trash } from "lucide-react";
import ConfirmDeletePopup from "../popups/ConfirmDeletePopup";

const SingleMessage = () => {
  const message =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="px-2 py-2 bg-card gap-5 w-full xsm:w-[48%] lg:gap-10 xmd:justify-between flex flex-col xmd:flex-row xmd:w-full border-[1px] border-neutral-400 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-[10px] xmd:w-[100px] items-center w-full">
        <div className="font-medium text-[15px] text-[rgb(103, 103, 103)] flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
          Test Message
        </div>
        <div className="text-[13px] text-[rgb(33, 33, 33)] flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
          Kigali Rwanda
        </div>
      </div>

      <div className="flex flex-col xmd:flex-1 gap-[10px] w-full items-center xmd:items-start text-center xmd:text-start">
        <div className="font-medium text-[15px] text-[#3e3e3e]">
          testessage@gmail.com
        </div>
        <div className="text-[16px] text-[#131313] mb-[6px] font-[450]">
          {message.length > 240
            ? showMore
              ? message
              : message.substring(0, 237) + " " + "..."
            : message}
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <div className="text-[12px] text-[#4c4b4b]">23-43-2023</div>
        <ConfirmDeletePopup
          trigger={
            <Trash className="hover:text-destructive bg-red-50 cursor-pointer" />
          }
          title={`Confirm deleting this message`}
          body={`Are you sure deleting this message?`}
          onSubmit={() => console.log("deleted")}
        />
        {message.length > 240 && (
          <p
            onClick={() => setShowMore((prev) => !prev)}
            className="hover:underline text-[13px] cursor-pointer"
          >
            {!showMore ? "Show more" : "Show less"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleMessage;
