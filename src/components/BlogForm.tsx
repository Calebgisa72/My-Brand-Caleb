import React, { useEffect, useState } from "react";
import { blogSchemaProps, blogSchema, blogProps } from "../utils/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Blog {
  blog?: Partial<blogProps>;
}

const BlogForm = ({ blog }: Blog) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<blogSchemaProps>({
    defaultValues: blog || {
      bImage: "",
      bTitle: "",
      bShortDesc: "",
      bLongDesc: "",
    },
    resolver: zodResolver(blogSchema),
  });

  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (blog) {
      setValue("bLongDesc", blog.bLongDesc!);
      if (blog.bImage) {
        const fileList = new DataTransfer();
        const file = new File([], blog.bImage as string);
        fileList.items.add(file);
        const imageInput = document.querySelector(
          "input[type='file']"
        ) as HTMLInputElement;
        if (imageInput) {
          imageInput.files = fileList.files;
        }
      }
    }
  }, [blog, setValue]);

  const onSubmit: SubmitHandler<blogSchemaProps> = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("bTitle", data.bTitle);
      formData.append("bShortDesc", data.bShortDesc);
      formData.append("bLongDesc", data.bLongDesc);

      if (data.bImage && data.bImage[0]) {
        formData.append("bImage", data.bImage[0]);
      }

      const response = blog
        ? await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/blogs/${blog._id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
        : await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/blogs`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

      if (response.status === 201 || response.status === 200) {
        toast.success(
          blog ? "Blog Updated Successfully" : "Blog Created Successfully"
        );
        setTimeout(() => {
          navigate("/blogs");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm w-full flex justify-center max-w-[900px] p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 xsm:gap-3 w-full sm:w-[600px]"
      >
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2">
          <label className="w-28">Blog Image:</label>
          <div className="flex flex-col gap-1">
            <input type="file" {...register("bImage")} accept="image/*" />
            {errors.bImage?.message && (
              <span className="text-red-500 text-sm">
                {errors.bImage.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="w-28">Blog Title:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              {...register("bTitle")}
              placeholder="Enter blog title"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {errors.bTitle && (
              <span className="text-red-500 text-sm">
                {errors.bTitle.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="w-28">Blog Short Description:</label>
          <div className="flex flex-col gap-1 w-full">
            <textarea
              {...register("bShortDesc")}
              placeholder="Enter short description"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
              rows={3}
            />
            {errors.bShortDesc && (
              <span className="text-red-500 text-sm">
                {errors.bShortDesc.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
            Blog Body:{" "}
            {errors.bLongDesc && (
              <span className="text-red-500 text-sm">
                {errors.bLongDesc.message}
              </span>
            )}
          </p>
          <FroalaEditor
            model={watch("bLongDesc")}
            onModelChange={(e: string) => setValue("bLongDesc", e)}
            config={{
              placeholderText: "Enter blog body/description",
              imageEditButtons: ["imageReplace", "imageAlign", "imageRemove"],
            }}
            tag="textarea"
          />
        </div>

        <button className="bg-primary hover:bg-secondary-muted flex items-center justify-center hover:text-white w-[150px] rounded-[10px] py-2 self-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : blog ? (
            "Edit Blog"
          ) : (
            "Add Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
