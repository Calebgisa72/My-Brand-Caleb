import React from "react";
import ProjectForm from "../components/ProjectForm";

const AddProject = () => {
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div className="items-center underline">Add a New Project Form</div>
      <ProjectForm />
    </div>
  );
};

export default AddProject;
