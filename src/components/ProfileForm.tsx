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
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileForm = ({ profile, edit, setEdit }: Profile) => {
  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<profileProps>({
    resolver: zodResolver(profileSchema),
  });

  setValue("profileImage", profile.profileImage);

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
    setValue("welcomeText", profile.welcomeText);
    setValue("currentCourse", profile.currentCourse);
    setValue("experience", profile.experience);
    setValue("school", profile.school);
    setValue("name", profile.name);
    setValue("aboutTitle", profile.aboutTitle);
  }, [profile, setValue]);

  const onSubmit: SubmitHandler<profileProps> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile Updated Successfully");
        setEdit(false);
      }
    } catch (error) {
      console.error("Failed to submit project:", error);
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
        <div className="group relative">
          <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2">
            <label className="min-w-[125px] max-w-[125px]">Profile Icon:</label>
            <div className="flex flex-col gap-1">
              <input
                disabled={!edit}
                type="file"
                {...register("profileImage")}
                accept="image/*"
              />
            </div>
          </div>
          <div className="group-hover:flex hidden z-40 absolute h-[200px] w-[280px]  self-center shadow-lg bg-fuchsia-100 items-center justify-center">
            {profile.profileImage ? (
              <img src={profile.profileImage} />
            ) : (
              <p>No profile image</p>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Welcome text:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              disabled={!edit}
              {...register("welcomeText")}
              placeholder="Enter welcome text"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {edit && errors.welcomeText && (
              <span className="text-red-500 text-sm">
                {errors.welcomeText.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Name:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              disabled={!edit}
              {...register("name")}
              placeholder="Enter your name"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {edit && errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
            Profile Description: <span className="text-destructive">*</span>{" "}
            {edit && errors.frontDescription && (
              <span className="text-red-500 text-sm">
                {errors.frontDescription.message}
              </span>
            )}
          </p>
          <FroalaEditor
            model={watch("frontDescription")}
            onModelChange={(e: string) => setValue("frontDescription", e)}
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
              disabled={!edit}
              {...register("experience")}
              placeholder="eg: 2-4 Years"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {edit && errors.experience && (
              <span className="text-red-500 text-sm">
                {errors.experience.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Current School:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              disabled={!edit}
              {...register("school")}
              placeholder="Enter you last school"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {edit && errors.school && (
              <span className="text-red-500 text-sm">
                {errors.school.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Current Course:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              disabled={!edit}
              {...register("currentCourse")}
              placeholder="Enter university course"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {edit && errors.currentCourse && (
              <span className="text-red-500 text-sm">
                {errors.currentCourse.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">About Title:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              disabled={!edit}
              {...register("aboutTitle")}
              placeholder="Enter about title"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {edit && errors.aboutTitle && (
              <span className="text-red-500 text-sm">
                {errors.aboutTitle.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
            About Description: <span className="text-destructive">*</span>{" "}
            {edit && errors.aboutDescription && (
              <span className="text-red-500 text-sm">
                {errors.aboutDescription.message}
              </span>
            )}
          </p>
          <FroalaEditor
            model={watch("aboutDescription")}
            onModelChange={(e: string) => setValue("aboutDescription", e)}
            config={{
              placeholderText: "Enter about description",
              imageEditButtons: ["imageReplace", "imageAlign", "imageRemove"],
            }}
            tag="textarea"
          />
        </div>

        <button
          disabled={!edit}
          className={`${
            !edit
              ? "bg-primary hover:bg-secondary-muted hover:text-white"
              : "bg-primary"
          } flex items-center justify-center w-[150px] rounded-[10px] py-2 self-center`}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Edit profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
