import React, { useEffect, useState } from "react";
import {
  Proficiency,
  SkillsExtendedProps,
  SkillsProps,
  skillSchema,
} from "../utils/validation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import uploadImage from "../utils/uploadImage";

interface Skill {
  skill?: Partial<SkillsExtendedProps>;
}

const SkillForm = ({ skill }: Skill) => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SkillsProps>({
    defaultValues: {
      color: "",
      icon: "",
      proficiency: undefined,
      learntDate: undefined,
      relatedLibraries: "",
      shortDescription: "",
      title: "",
      ...skill,
    },
    resolver: zodResolver(skillSchema),
  });
  useEffect(() => {
    if (skill) {
      if (skill.icon) {
        const fileList = new DataTransfer();
        const file = new File([], skill.icon as string);
        fileList.items.add(file);
        const imageInput = document.querySelector(
          "input[type='file']"
        ) as HTMLInputElement;
        if (imageInput) {
          imageInput.files = fileList.files;
        }
      }
      setValue("learntDate", format(skill.learntDate!, "yyyy-MM-dd") as any);
    }
  }, [skill, setValue]);

  const onSubmit: SubmitHandler<SkillsProps> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("shortDescription", data.shortDescription);
      formData.append("proficiency", data.proficiency);
      formData.append("color", data.color);
      formData.append(
        "learntDate",
        data.learntDate instanceof Date
          ? data.learntDate.toISOString()
          : data.learntDate
      );
      if (data.icon && data.icon[0]) {
        formData.append("icon", data.icon[0]);
      }
      if (skill && data.icon instanceof FileList) {
        const iconUrl = await uploadImage(data.icon);
        data = { ...data, icon: iconUrl };
      }
      const response = skill
        ? await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/skills/${skill._id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
        : await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/skills`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
      if (response.status === 201 || response.status === 200) {
        toast.success(
          skill ? "Skill Updated Successfully" : "Skill Created Successfully"
        );
        setTimeout(() => {
          navigate("/skills");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit skill:", error);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-card rounded-xl shadow-sm w-full flex justify-center max-w-[900px] p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 xsm:gap-3 w-full sm:w-[600px]"
      >
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2">
          <label className="min-w-[125px] max-w-[125px]">Skill Icon:</label>
          <div className="flex flex-col gap-1">
            <input {...register("icon")} type="file" accept="image/*" />
            {errors.icon?.message && (
              <span className="text-red-500 text-sm">
                {errors.icon.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Skill Title:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              {...register("title")}
              placeholder="Enter Skill title"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {errors.title?.message && (
              <span className="text-red-500 text-sm">
                {errors.title.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Skill Short Description:
          </label>
          <div className="flex flex-col gap-1 w-full">
            <textarea
              placeholder="Enter short description"
              {...register("shortDescription")}
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
              rows={3}
            />
            {errors.shortDescription?.message && (
              <span className="text-red-500 text-sm">
                {errors.shortDescription.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2  flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Learnt Date: <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="date"
              {...register("learntDate")}
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2"
            />
            {errors.learntDate?.message && (
              <span className="text-red-500 text-sm">
                {errors.learntDate.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Skill proficiency:
          </label>
          <div className="flex flex-col gap-1 w-52">
            <select
              defaultValue="default"
              {...register("proficiency")}
              className="border-[1px] w-full xmd:w-52 border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            >
              <option value="default" disabled>
                Select Proficiency
              </option>
              {Object.values(Proficiency).map((proficiency) => (
                <option key={proficiency} value={proficiency}>
                  {proficiency}
                </option>
              ))}
            </select>
            {errors.proficiency?.message && (
              <span className="text-red-500 text-sm">
                {errors.proficiency.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Related libraries: <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1 w-full">
            <textarea
              {...register("relatedLibraries")}
              placeholder="Enter skill related libraries separate by ,"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
              rows={2}
            />
            {errors.relatedLibraries?.message && (
              <span className="text-red-500 text-sm">
                {errors.relatedLibraries.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Bg Color string:
          </label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              {...register("color")}
              placeholder="Enter background Color hex"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {errors.color?.message && (
              <span className="text-red-500 text-sm">
                {errors.color.message.toString()}
              </span>
            )}
          </div>
        </div>

        <button className="bg-primary hover:bg-secondary-muted flex items-center justify-center hover:text-white w-[150px] rounded-[10px] py-2 self-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : skill ? (
            "Edit Skill"
          ) : (
            "Add Skill"
          )}
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
