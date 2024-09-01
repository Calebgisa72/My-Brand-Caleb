import React, { useEffect } from "react";
import { setBlogs } from "../Redux/Reducers/blogReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProjects } from "../Redux/Reducers/projectReducer";
import { setSkills } from "../Redux/Reducers/skillsReducer";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/blogs`
        );
        dispatch(setBlogs(response.data));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();

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
    <div className="flex flex-col items-center gap-5">
      <div className="font-bold animate-bounceLong">
        Welcome Home Gisa M. Caleb
      </div>
      <p className="text-description underline">My website stats</p>
    </div>
  );
};

export default Home;
