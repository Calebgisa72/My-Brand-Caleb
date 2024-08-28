import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ProjectForm from "../components/ProjectForm";

const EditProject = () => {
  const { id } = useParams();
  const { projects } = useSelector((state: RootState) => state.projects);
  const projectToEdit =
    projects && projects.find((project) => project._id === id);
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div>Edit Project</div>
      {projectToEdit ? (
        <ProjectForm project={projectToEdit} />
      ) : (
        <p className="text-destructive text-center">No project to edit found</p>
      )}
    </div>
  );
};

export default EditProject;
