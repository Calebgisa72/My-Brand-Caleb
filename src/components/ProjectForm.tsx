import React, { useEffect, useState } from "react";
import {
  projectExtendedProps,
  projectProps,
  projectSchema,
} from "../utils/validation";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadImage from "../utils/uploadImage";

interface project {
  project?: projectExtendedProps;
}

const ProjectForm = ({ project }: project) => {
  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    if (selectedDate) {
      setEndDate(new Date(selectedDate));
    } else {
      setEndDate(undefined);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setEndDate("present");
    } else {
      setEndDate(undefined);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<projectProps>({
    defaultValues: project || {
      pImage: "",
      pTitle: "",
      pShortDesc: "",
      pLongDesc: "",
      pEndDate: undefined,
      pLink: "",
      pStartDate: undefined,
      pTechnologies: "",
    },
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (project) {
      setValue("pLongDesc", project.pLongDesc!);
      if (project.pImage) {
        const fileList = new DataTransfer();
        const file = new File([], project.pImage as string);
        fileList.items.add(file);
        const imageInput = document.querySelector(
          "input[type='file']"
        ) as HTMLInputElement;
        if (imageInput) {
          imageInput.files = fileList.files;
        }
      }
      setValue("pTechnologies", project.pTechnologies.join(", "));
      setValue("pStartDate", format(project.pStartDate, "yyyy-MM-dd") as any);
      setValue("pEndDate", project.pEndDate);
    }
  }, [project, setValue]);

  const [endDate, setEndDate] = useState<Date | "present" | undefined>(
    project ? watch("pEndDate") : undefined
  );

  useEffect(() => {
    if (endDate) {
      setValue("pEndDate", endDate === "present" ? "present" : endDate);
    }
  }, [endDate, setValue]);

  const onSubmit: SubmitHandler<projectProps> = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pTitle", data.pTitle);
      formData.append("pShortDesc", data.pShortDesc);
      formData.append("pLongDesc", data.pLongDesc);
      formData.append("pTechnologies", data.pTechnologies);
      formData.append(
        "pStartDate",
        data.pStartDate instanceof Date
          ? data.pStartDate.toISOString()
          : data.pStartDate
      );
      formData.append(
        "pEndDate",
        data.pEndDate instanceof Date
          ? data.pEndDate.toISOString()
          : data.pEndDate
      );

      if (data.pImage && data.pImage[0]) {
        formData.append("pImage", data.pImage[0]);
      }

      if (data.pLink) {
        formData.append("pLink", data.pLink);
      }

      if (project && data.pImage instanceof FileList) {
        const pImageUrl = await uploadImage(data.pImage);
        data = {...data, pImage: pImageUrl}
      }

      const response = project
        ? await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/project/${project._id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
        : await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/project`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

      if (response.status === 201 || response.status === 200) {
        toast.success(
          project
            ? "Project Updated Successfully"
            : "Project Created Successfully"
        );
        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm w-full flex justify-center max-w-[900px] py-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 xsm:gap-3 w-full sm:w-[600px]"
      >
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2">
          <label className="min-w-[125px] max-w-[125px]">
            Project Image: <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1">
            <input type="file" {...register("pImage")} accept="image/*" />
            {errors.pImage?.message && (
              <span className="text-red-500 text-sm">
                {errors.pImage.message.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Project Title: <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              {...register("pTitle")}
              placeholder="Enter project title"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {errors.pTitle && (
              <span className="text-red-500 text-sm">
                {errors.pTitle.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Project Short Description:{" "}
            <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1 w-full">
            <textarea
              {...register("pShortDesc")}
              placeholder="Enter short description"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
              rows={3}
            />
            {errors.pShortDesc && (
              <span className="text-red-500 text-sm">
                {errors.pShortDesc.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2  flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Start Date: <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="date"
              {...register("pStartDate")}
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2"
            />
            {errors.pStartDate && (
              <span className="text-red-500 text-sm">
                {errors.pStartDate.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px]">
            End Date: <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-1 w-full">
              <input
                type="date"
                {...register("pEndDate")}
                value={
                  endDate === "present"
                    ? ""
                    : endDate
                    ? format(endDate, "yyyy-MM-dd")
                    : ""
                }
                onChange={handleDateChange}
                className="border-[1px] max-w-[200px] xmd:w-[400px] border-gray-700 rounded-[5px] p-2"
              />
              {errors.pEndDate && (
                <span className="text-red-500 text-sm">
                  {errors.pEndDate.message}
                </span>
              )}
            </div>
            <p className="text-xl">or</p>
            <label className="flex gap-2 items-center text-[17px] cursor-pointer">
              <input
                type="checkbox"
                name="present"
                style={{ width: "30px", height: "20px", cursor: "pointer" }}
                checked={endDate === "present"}
                onChange={handleCheckboxChange}
              />
              Present
            </label>
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">
            Project Technologies: <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-col gap-1 w-full">
            <textarea
              {...register("pTechnologies")}
              placeholder="Enter Project Technologies separate by ,"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
              rows={2}
            />
            {errors.pTechnologies && (
              <span className="text-red-500 text-sm">
                {errors.pTechnologies.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
          <label className="min-w-[125px] max-w-[125px]">Project Link:</label>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              {...register("pLink")}
              placeholder="Enter project link"
              className="border-[1px] w-full xmd:w-[400px] border-gray-700 rounded-[5px] p-2 placeholder:text-sm"
            />
            {errors.pLink && (
              <span className="text-red-500 text-sm">
                {errors.pLink.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex gap-1 gap-x-5 items-start xsm:items-center w-full p-2 flex-col xsm:flex-row">
            Project Body: <span className="text-destructive">*</span>{" "}
            {errors.pLongDesc && (
              <span className="text-red-500 text-sm">
                {errors.pLongDesc.message}
              </span>
            )}
          </p>
          <FroalaEditor
            model={watch("pLongDesc")}
            onModelChange={(e: string) => setValue("pLongDesc", e)}
            config={{
              placeholderText: "Enter project body/description",
              imageEditButtons: ["imageReplace", "imageAlign", "imageRemove"],
            }}
            tag="textarea"
          />
        </div>

        <button className="bg-primary hover:bg-secondary-muted flex items-center justify-center hover:text-white w-[150px] rounded-[10px] py-2 self-center">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : project ? (
            "Edit Project"
          ) : (
            "Add Project"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
