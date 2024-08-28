import React, { useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import SingleComment from "./SingleComment";
import ConfirmDeletePopup from "../popups/ConfirmDeletePopup";
import { useNavigate } from "react-router-dom";
import { blogProps } from "../utils/validation";
import { formatRelativeDate } from "../utils/dateFormater";
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../Redux/Reducers/blogReducer";
import axios from "axios";
import toast from "react-hot-toast";

const SingleBlog = ({ blog }: { blog: blogProps }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { blogs } = useSelector((state: RootState) => state.blogs);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = blog._id;

  function handleEdit() {
    navigate(`edit/${blog._id}`);
  }
  const handleCommentPopup = () => setIsCommentOpen((prev) => !prev);
  return (
    <div className="px-2 bg-card py-2 gap-5 w-full xsm:w-[48%] lg:gap-10 justify-between items-center flex flex-col xmd:flex-row xmd:w-full border-[1px] border-neutral-400 rounded-2xl shadow-sm">
      <div className="flex flex-col items-center m-0 p-0 gap-1 w-full xmd:w-[200px]">
        <div className="overflow-hidden rounded-xl w-full smd:w-48 xmd:w-32 lg:w-48 h-28 ">
          <img
            className="w-full h-full object-cover"
            src={blog.bImage}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
        <p className="font-bold text-lg text-wrap">{blog.bTitle}</p>
        <p className="text-description text-[14px] text-wrap">
          {blog.bShortDesc}
        </p>
        <div className="flex gap-3 items-center">
          <p className="text-gray-500 text-[12px] m-0 p-0 text-wrap">
            {formatRelativeDate(blog.bDate)}
          </p>
          <div title="Comments" className="flex items-center">
            <MessageCircle
              onClick={handleCommentPopup}
              className="cursor-pointer text-description w-5 hover:text-primary"
            />
          </div>
          <p className="text-description text-[14px]">
            {blog.bNumOfLike} {blog.bNumOfLike > 1 ? "Likes" : "Like"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleEdit}
          className="px-6 py-2 bg-primary hover:bg-blue-400 rounded-[8px]"
        >
          Edit
        </button>
        <ConfirmDeletePopup
          trigger={
            <button className="px-6 py-2 bg-[#e6ca6d] hover:bg-destructive rounded-[8px]">
              {loading ? <Loader2 className="animate-spin" /> : "Delete"}
            </button>
          }
          title={`Confirm deleting this blog`}
          body={`Are you sure deleting this blog?`}
          onSubmit={async () => {
            try {
              setLoading(true);
              const response = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/api/blogs/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              setLoading(false);
              if (response.status === 200) {
                const updatedBlogs: blogProps[] = blogs!.filter(
                  (blogg) => blogg._id != blog._id
                );
                dispatch(setBlogs(updatedBlogs));
                toast.success(`Blog successfully deleted`);
              }
            } catch (error) {
              console.log("Error deleteting blog", error);
            }
          }}
        />
      </div>

      {isCommentOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out">
          <button
            className="close-btn"
            id="closeBtn"
            onClick={handleCommentPopup}
          >
            &times;
          </button>
          <div className="w-[92%] bg-card max-w-[800px] rounded-[10px] min-h-[500px] max-h-[520px] py-3 px-4 xmd:px-6 xmd:py-4 overflow-y-auto">
            {!blog.bComments || blog.bComments.length === 0 ? (
              <p className="text-center py-6">
                There are no comments on this blog
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="underline">Comments</p>
                {blog.bComments.map((comment) => (
                  <SingleComment
                    key={comment._id}
                    comment={comment}
                    blogId={blog._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
