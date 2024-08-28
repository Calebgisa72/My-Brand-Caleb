import React, { useState } from "react";
import ConfirmDeletePopup from "../popups/ConfirmDeletePopup";
import { Trash, PenSquare, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import skillImage from "../../Images/Atom.svg";
import { SkillsExtendedProps, SkillsProps } from "../utils/validation";
import { timeAgo } from "../utils/dateFormater";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setSkills } from "../Redux/Reducers/skillsReducer";
import toast from "react-hot-toast";

const SingleSkill = ({ skill }: { skill: SkillsExtendedProps }) => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { skills } = useSelector((state: RootState) => state.skills);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  function handleEdit(id: string | number) {
    navigate(`edit/${id}`);
  }
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="relative px-5 pt-8 pb-[18px] rounded-[5px] flex flex-col justify-between w-[320px]"
      style={{ background: `${skill.color}` }}
    >
      <img className="w-[38px] absolute top-[-20px]" src={skill.icon} />
      <div className="flex flex-col gap-[4px]">
        <div className="flex gap-2 text-[#f9f9f9]">
          <div className="text-[13px]">{timeAgo(skill.learntDate)}</div>
          <span>&#183;</span>
          <div className="text-[13px] text-[rgb(237, 252, 227)]">
            Proficiency: {skill.proficiency}
          </div>
        </div>
        <div className="text-[16px] font-semibold text-[#f3eaea]">
          {skill.title}
        </div>
        <div className="text-[#e6e3e3] flex gap-2 items-center text-[13px]">
          {skill.shortDescription}
        </div>
      </div>
      <div className="text-[#fbfbfe] text-[14px] font-normal self-end mt-3 flex flex-col gap-2">
        <p>{skill.relatedLibraries}</p>
        <div className="self-end flex gap-3">
          <PenSquare
            onClick={() => handleEdit(skill._id)}
            className="cursor-pointer hover:text-[#a8e0de] w-5"
          />
          <ConfirmDeletePopup
            trigger={
              <div className="flex items-center justify-center">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash className="hover:text-destructive text-white cursor-pointer w-5" />
                )}
              </div>
            }
            title={`Confirm deleting this skill`}
            body={`Are you sure deleting this skill?`}
            onSubmit={async () => {
              try {
                setLoading(true);
                const response = await axios.delete(
                  `${import.meta.env.VITE_APP_API_URL}/api/skills/${skill._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                setLoading(false);
                if (response.status === 200) {
                  const updatedSkills: SkillsProps[] = skills!.filter(
                    (skillt) => skillt._id != skill._id
                  );
                  dispatch(setSkills(updatedSkills));
                  toast.success(`skill successfully deleted`);
                }
              } catch (error) {
                console.log("Error deleteting skill", error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleSkill;
