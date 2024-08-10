import React from "react";
import SingleSkill from "../components/SingleSkill";

const Skills = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center justify-between shadow-sm pb-3">
        <p className="text-xl ">My Skills</p>
        <button className="bg-foreground hover:bg-primary hover:text-foreground text-background px-4 py-2 rounded-xl">
          Add New Skill
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 pt-8 shadow-sm overflow-y-auto h-[calc(100vh-186px)]">
        <SingleSkill />
        <SingleSkill />
        <SingleSkill />
        <SingleSkill />
        <SingleSkill />
      </div>
    </div>
  );
};

export default Skills;
