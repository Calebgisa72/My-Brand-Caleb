import React, { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { profileProps } from "../utils/validation";
import { Edit } from "lucide-react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [initialProfile, setInitialProfile] = useState<profileProps>({
    profileImage: "",
    welcomeText: "",
    name: "",
    frontDescription: "",
    aboutTitle: "",
    aboutDescription: "",
    school: "",
    currentCourse: "",
    experience: "",
  });
  const handleEditToggler = () => {
    setEditMode((p) => !p);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/profile`
        );
        setInitialProfile(response.data.profile);
      } catch (error) {
        console.error("Failed to fetch Skills:", error);
      }
    };
    fetchSkills();
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div className="flex gap-3 items-center font-semibold text-[15px] xmd:text-lg">
        <p>My Profile</p>
        <div
          title={`${editMode ? "Stop" : "Start"} edit mode`}
          className="flex gap-2 items-center"
        >
          <Edit
            onClick={handleEditToggler}
            className="cursor-pointer hover:text-[#469f76]"
          />
          {editMode && (
            <p className="font-normal text-[#b4c236]">In edit mode</p>
          )}
        </div>
      </div>
      <ProfileForm profile={initialProfile} edit={editMode} setEdit={setEditMode}/>
    </div>
  );
};

export default Profile;
