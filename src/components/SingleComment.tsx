import { Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import ConfirmDeletePopup from "../popups/ConfirmDeletePopup";
import { blogProps, comment } from "../utils/validation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setBlogs } from "../Redux/Reducers/blogReducer";

const SingleComment = ({
  comment,
  blogId,
}: {
  comment: comment;
  blogId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { blogs } = useSelector((state: RootState) => state.blogs);
  const { userToken } = useSelector((state: RootState) => state.auth);
  return (
    <div className="px-2 bg-white py-2 gap-5 w-full lg:gap-10 justify-between items-center flex xmd:w-full border-[1px] border-neutral-400 rounded-[8px] shadow-sm">
      <div className="w-full px-2 py-1 text-wrap">
        <p className="text-description text-[12px]">{comment.sender}</p>
        <p className="text-description text-[15px]">{comment.comment}</p>
      </div>
      <ConfirmDeletePopup
        trigger={
          loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash className="hover:text-destructive bg-red-50 cursor-pointer" />
          )
        }
        title={`Confirm deleting this comment`}
        body={`Are you sure deleting this comment?`}
        onSubmit={async () => {
          try {
            setLoading(true);
            console.log(comment._id);
            const response = await axios.delete(
              `${
                import.meta.env.VITE_APP_API_URL
              }/api/blogs/${blogId}/comments/${comment._id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setLoading(false);
            if (response.status === 200) {
              const updatedBlogs =
                blogs &&
                blogs.map((blogg) => {
                  if (blogg._id === blogId) {
                    const updatedComments = blogg.bComments.filter(
                      (commentt) => commentt._id != comment._id
                    );
                    return { ...blogg, bComments: updatedComments };
                  }
                  return blogg;
                });
              dispatch(setBlogs(updatedBlogs));
            }
          } catch (error) {
            console.log("Error deleteting comment", error);
          }
        }}
      />
    </div>
  );
};

export default SingleComment;
