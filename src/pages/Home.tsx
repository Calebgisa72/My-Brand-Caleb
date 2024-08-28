import React, { useEffect } from "react";
import { setBlogs } from "../Redux/Reducers/blogReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProjects } from "../Redux/Reducers/projectReducer";

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
  }, [dispatch]);

  return <div className="">Welcome Home Gisa M. Caleb</div>;
};

export default Home;
