import React, { useState } from "react";
import { Loader2, Trash } from "lucide-react";
import ConfirmDeletePopup from "../popups/ConfirmDeletePopup";
import { MessageProps, setmessages } from "../Redux/Reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { formatRelativeDate } from "../utils/dateFormater";

const SingleMessage = ({ message }: { message: MessageProps }) => {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const { messages } = useSelector((state: RootState) => state.messages);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="px-2 py-2 bg-card gap-5 w-full xsm:w-[48%] lg:gap-10 xmd:justify-between flex flex-col xmd:flex-row xmd:w-full border-[1px] border-neutral-400 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-[10px] xmd:w-[100px] items-center w-full">
        <div className="text-[14px] text-[rgb(103, 103, 103)] flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
          {message.sName}
        </div>
        {message.sLocation && (
          <div className="text-[13px] text-[rgb(33, 33, 33)] flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
            {message.sLocation}
          </div>
        )}
      </div>

      <div className="flex flex-col xmd:flex-1 gap-[10px] w-full items-center xmd:items-start text-center xmd:text-start">
        <div className="font-medium text-[14px] text-[#3e3e3e]">
          {message.sEmail}
        </div>
        <div className="text-[15px] text-[#131313] mb-[6px] font-[450]">
          {message.message.length > 240
            ? showMore
              ? message.message
              : message.message.substring(0, 237) + " " + "..."
            : message.message}
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <div className="text-[12px] text-[#4c4b4b]">
          {formatRelativeDate(message.dateSent)}
        </div>
        <ConfirmDeletePopup
          trigger={
            <button className="px-6 py-2 bg-[#e6ca6d] hover:bg-destructive rounded-[8px]">
              {loading ? <Loader2 className="animate-spin" /> : "Delete"}
            </button>
          }
          title={`Confirm deleting this message`}
          body={`Are you sure deleting this message?`}
          onSubmit={async () => {
            try {
              setLoading(true);
              const response = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/api/message/${
                  message._id
                }`,
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              setLoading(false);
              if (response.status === 200) {
                const updatedmessages: MessageProps[] = messages!.filter(
                  (messaget) => messaget._id != message._id
                );
                dispatch(setmessages(updatedmessages));
                toast.success(`message successfully deleted`);
              }
            } catch (error) {
              console.log("Error deleteting message", error);
            }
          }}
        />
        {message.message.length > 240 && (
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
