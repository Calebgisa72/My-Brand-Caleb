import React, { useEffect } from "react";
import SingleSkill from "../components/SingleSkill";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import axios from "axios";
import { setSkills } from "../Redux/Reducers/skillsReducer";
import { Loader2 } from "lucide-react";

const Skills = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { skills } = useSelector((state: RootState) => state.skills);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/skills`
        );
        dispatch(setSkills(response.data));
      } catch (error) {
        console.error("Failed to fetch Skills:", error);
        dispatch(setSkills([]));
      }
    };
    fetchSkills();
  }, [dispatch]);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full items-center justify-between shadow-sm pb-3">
        <p className="text-xl ">My Skills</p>
        <button
          onClick={() => navigate("add")}
          className="bg-foreground hover:bg-primary hover:text-foreground text-background px-4 py-2 rounded-xl"
        >
          Add New Skill
        </button>
      </div>
      {skills === null ? (
        <p className="flex gap-2">
          Loading <Loader2 className="animate-spin" />
        </p>
      ) : !skills || skills.length === 0 ? (
        <p>No skills available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 pt-8 shadow-sm overflow-y-auto h-[calc(100vh-186px)]">
          {skills.map((skill) => {
            return <SingleSkill key={skill._id} skill={skill} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Skills;
