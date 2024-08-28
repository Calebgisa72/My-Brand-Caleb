import React from "react";
import SkillForm from "../components/SkillForm";

const AddSkill = () => {
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div className="items-center underline">Add a New Skill Form</div>
      <SkillForm />
    </div>
  );
};

export default AddSkill;
