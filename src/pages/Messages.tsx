import React, { useEffect } from "react";
import SingleMessage from "../components/SingleMessage";
import axios from "axios";
import { setmessages } from "../Redux/Reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Loader2 } from "lucide-react";

const Messages = () => {
  const { messages } = useSelector((state: RootState) => state.messages);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/message`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setmessages(response.data));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        dispatch(setmessages([]));
      }
    };
    fetchMessages();
  }, [dispatch]);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center shadow-sm pb-3">
        <p className="text-xl ">All Messages</p>
      </div>
      {messages === null ? (
        <p className="flex gap-2">
          Loading <Loader2 className="animate-spin" />
        </p>
      ) : !messages || messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <div className="flex flex-col xsm:flex-row xmd:flex-col gap-3 xmd:gap-0 xmd:space-y-5 gap-x-2 xsm:flex-wrap xmd:flex-nowrap shadow-sm overflow-y-auto h-[calc(100vh-186px)] ">
          {messages.map((message) => {
            return <SingleMessage key={message._id} message={message} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;
