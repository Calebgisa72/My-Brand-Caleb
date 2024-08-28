import React, { useEffect, useState } from "react";
import { profileProps, profileSchema } from "../utils/validation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";

interface Profile {
  profile: profileProps;
}

const ProfileForm = ({ profile }: Profile) => {
  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<profileProps>({
    defaultValues: { ...profile },
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile.profileImage) {
      const fileList = new DataTransfer();
      const file = new File([], profile.profileImage as string);
      fileList.items.add(file);
      const imageInput = document.querySelector(
        "input[type='file']"
      ) as HTMLInputElement;
      if (imageInput) {
        imageInput.files = fileList.files;
      }
    }
    setValue("aboutDescription", profile.aboutDescription);
    setValue("frontDescription", profile.frontDescription);
  }, [profile, setValue]);

  const onSubmit: SubmitHandler<profileProps> = async (data) => {
    console.log(data);
    // setLoading(true);
    // try {
    //   const formData = new FormData();
    //   formData.append("pTitle", data.pTitle);
    //   formData.append("pShortDesc", data.pShortDesc);
    //   formData.append("pLongDesc", data.pLongDesc);
    //   formData.append("pTechnologies", data.pTechnologies);
    //   formData.append(
    //     "pStartDate",
    //     data.pStartDate instanceof Date
    //       ? data.pStartDate.toISOString()
    //       : data.pStartDate
    //   );
    //   formData.append(
    //     "pEndDate",
    //     data.pEndDate instanceof Date
    //       ? data.pEndDate.toISOString()
    //       : data.pEndDate
    //   );
    //   if (data.pImage && data.pImage[0]) {
    //     formData.append("pImage", data.pImage[0]);
    //   }
    //   if (data.pLink) {
    //     formData.append("pLink", data.pLink);
    //   }
    //   const response = project
    //     ? await axios.put(
    //         `${import.meta.env.VITE_APP_API_URL}/api/project/${project._id}`,
    //         data,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${userToken}`,
    //           },
    //         }
    //       )
    //     : await axios.post(
    //         `${import.meta.env.VITE_APP_API_URL}/api/project`,
    //         formData,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${userToken}`,
    //           },
    //         }
    //       );
    //   if (response.status === 201 || response.status === 200) {
    //     toast.success(
    //       project
    //         ? "project Updated Successfully"
    //         : "project Created Successfully"
    //     );
    //     setTimeout(() => {
    //       navigate("/projects");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   console.error("Failed to submit project:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm w-full flex justify-center max-w-[900px] p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 xsm:gap-3 w-full sm:w-[600px]"
      >
        <div className="group relative">
          <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2">
            <label className="min-w-[125px] max-w-[125px]">Profile Icon:</label>
            <div className="flex flex-col gap-1">
              <input type="file" accept="image/*" />
            </div>
          </div>
          <div className="group-hover:flex hidden z-40 absolute h-[200px] w-[280px]  self-center overflow-hidden shadow-lg bg-fuchsia-100 items-center justify-center">
            <p>No profile image</p>
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Welcome text:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              placeholder="Enter welcome text"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Name:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              placeholder="Enter your name"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
            Profile Description: <span className="text-destructive">*</span>{" "}
            {/* {errors.pLongDesc && (
              <span className="text-red-500 text-sm">
                {errors.pLongDesc.message}
              </span>
            )} */}
          </p>
          <FroalaEditor
            model={"Welcome text here checking"}
            // onModelChange={(e: string) => setValue("pLongDesc", e)}
            config={{
              placeholderText: "Enter short profile description",
              imageEditButtons: ["imageReplace", "imageAlign", "imageRemove"],
            }}
            tag="textarea"
          />
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Experience:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              placeholder="eg: 2-4 Years"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Current School:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              placeholder="Enter you last school"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Current Course:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              placeholder="Enter university course"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
          </div>
        </div>

        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">About Title:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              placeholder="Enter about title"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
            About Description: <span className="text-destructive">*</span>{" "}
            {/* {errors.pLongDesc && (
              <span className="text-red-500 text-sm">
                {errors.pLongDesc.message}
              </span>
            )} */}
          </p>
          <FroalaEditor
            model={"Welcome text here checking"}
            // onModelChange={(e: string) => setValue("pLongDesc", e)}
            config={{
              placeholderText: "Enter about description",
              imageEditButtons: ["imageReplace", "imageAlign", "imageRemove"],
            }}
            tag="textarea"
          />
        </div>

        <button className="bg-primary hover:bg-secondary-muted flex items-center justify-center hover:text-white w-[150px] rounded-[10px] py-2 self-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : profile ? (
            "Edit profile"
          ) : (
            "Add profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
