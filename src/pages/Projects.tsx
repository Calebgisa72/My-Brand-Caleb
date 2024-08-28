import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingleProject from "../components/SingleProject";
import axios from "axios";
import { setProjects } from "../Redux/Reducers/projectReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Loader2 } from "lucide-react";
import { date } from "zod";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.projects);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/project`
        );
        dispatch(setProjects(response.data.data));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        dispatch(setProjects([]));
      }
    };
    fetchProjects();
  }, [dispatch]);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center justify-between shadow-sm pb-3">
        <p className="text-xl ">My Projects</p>
        <button
          onClick={() => navigate("add")}
          className="bg-foreground hover:bg-primary hover:text-foreground text-background px-4 py-2 rounded-xl"
        >
          Add New Project
        </button>
      </div>
      {projects === null ? (
        <p className="flex gap-2">
          Loading <Loader2 className="animate-spin" />
        </p>
      ) : !projects || projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="flex flex-col xsm:flex-row xmd:flex-col gap-3 xmd:gap-0 xmd:space-y-5 gap-x-2 xsm:flex-wrap xmd:flex-nowrap shadow-sm overflow-y-auto h-[calc(100vh-186px)] ">
          {projects.map((project) => {
            return <SingleProject key={project._id} project={project} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Projects;
