import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectExtendedProps } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ConfirmDeletePopup from "../popups/ConfirmDeletePopup";
import { setProjects } from "../Redux/Reducers/projectReducer";
import toast from "react-hot-toast";
import { formatRelativeDate } from "../utils/dateFormater";
import { object } from "zod";

const SingleProject = ({ project }: { project: projectExtendedProps }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { projects } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();
  function handleEdit() {
    navigate(`edit/${project._id}`);
  }

  Object.entries;

  return (
    <div className="px-2 bg-card py-2 gap-5 w-full xsm:w-[48%] lg:gap-10 justify-between items-center flex flex-col xmd:flex-row xmd:w-full border-[1px] border-neutral-400 rounded-2xl shadow-sm">
      <div className="flex flex-col items-center m-0 p-0 gap-1 w-full xmd:w-[200px]">
        <div className="overflow-hidden rounded-xl w-full smd:w-48 xmd:w-32 lg:w-48 h-28 ">
          <img
            className="w-full h-full object-cover"
            src={project.pImage}
            alt=""
          />
        </div>
        <p className="text-gray-500 text-[12px] m-0 p-0">
          {formatRelativeDate(project.createdAt)}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full items-center xmd:items-start text-center xmd:text-start">
        <p className="font-bold text-lg text-wrap">{project.pTitle}</p>
        <p className="text-description text-[14px] text-wrap w-full">
          {project.pShortDesc}
        </p>
        <p className="text-description text-[14px] w-full text-wrap">
          Tech: {project.pTechnologies.join(", ")}
        </p>
        {project.pLink && (
          <p className="text-description text-[14px] flex gap-1 text-wrap">
            Link:{" "}
            <Link
              to={`${project.pLink}`}
              className="hover:underline justify-start text-secondary-muted"
            >
              {project.pLink}
            </Link>
          </p>
        )}
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
          title={`Confirm deleting this project`}
          body={`Are you sure deleting this project?`}
          onSubmit={async () => {
            try {
              setLoading(true);
              const response = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/api/project/${
                  project._id
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
                const updatedProjects: projectExtendedProps[] =
                  projects!.filter((projectt) => projectt._id != project._id);
                dispatch(setProjects(updatedProjects));
                toast.success(`Project successfully deleted`);
              }
            } catch (error) {
              console.log("Error deleteting Project", error);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SingleProject;
