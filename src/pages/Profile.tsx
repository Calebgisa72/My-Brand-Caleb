import React from "react";
import ProfileForm from "../components/ProfileForm";
import { profileProps } from "../utils/validation";

const Profile = () => {
  const initialProfile: profileProps = {
    welcomeText: "",
    name: "",
    frontDescription: "",
    aboutTitle: "",
    aboutDescription: "",
    school: "",
    currentCourse: "",
    experience: "",
  };
  return (
    <div className="flex flex-col gap-3 items-center w-full overflow-hidden">
      <div className="items-center font-bold text-[15px] xmd:text-lg">
        My Profile
      </div>
      <ProfileForm profile={initialProfile} />
    </div>
  );
};

export default Profile;
