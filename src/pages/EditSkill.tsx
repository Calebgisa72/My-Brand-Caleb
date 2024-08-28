import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import SkillForm from "../components/SkillForm";

const EditSkill = () => {
  const { id } = useParams();
  const { skills } = useSelector((state: RootState) => state.skills);
  const skillToEdit = skills && skills.find((skill) => skill._id === id);
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div>Edit Skill</div>
      {skillToEdit ? (
        <SkillForm skill={skillToEdit} />
      ) : (
        <p className="text-destructive text-center">No skill to edit found</p>
      )}
    </div>
  );
};

export default EditSkill;
