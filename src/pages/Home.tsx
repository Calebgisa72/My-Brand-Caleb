import React, { useEffect, useState } from "react";
import { setBlogs } from "../Redux/Reducers/blogReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../Redux/Reducers/projectReducer";
import { setSkills } from "../Redux/Reducers/skillsReducer";
import { setmessages } from "../Redux/Reducers/messageReducer";
import { RootState } from "../Redux/store";
import SingleHomeElement from "../components/SingleHomeElement";
import {
  BadgeDollarSign,
  MessageCircle,
  Projector,
  SparkleIcon,
} from "lucide-react";
import SingleElementSkeleton from "../components/SingleElementSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { messages } = useSelector((state: RootState) => state.messages);
  const { projects } = useSelector((state: RootState) => state.projects);
  const { blogs } = useSelector((state: RootState) => state.blogs);
  const { skills } = useSelector((state: RootState) => state.skills);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
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

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/message`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setmessages(response.data));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        dispatch(setmessages([]));
      }
    };
    fetchMessages();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center gap-5 p-2 xmd:px-28">
      <div className="font-bold animate-bounceLong">
        Welcome Home Gisa M. Caleb
      </div>
      <p className="text-description underline">My website stats</p>
      {!loading ? (
        <div className="max-w-[1000px] flex gap-24 flex-wrap mt-5 items-center justify-center">
          <SingleHomeElement
            icon={<BadgeDollarSign className="w-full h-full" />}
            title="Blogs"
            total={blogs?.length}
          />
          <SingleHomeElement
            icon={<Projector className="w-full h-full" />}
            title="Projects"
            total={projects?.length}
          />
          <SingleHomeElement
            icon={<SparkleIcon className="w-full h-full" />}
            title="Skills"
            total={skills?.length}
          />
          <SingleHomeElement
            icon={<MessageCircle className="w-full h-full" />}
            title="Messages"
            total={messages?.length}
          />
        </div>
      ) : (
        <div className="max-w-[1000px] flex gap-24 flex-wrap mt-5 items-center justify-center">
          <SingleElementSkeleton />
          <SingleElementSkeleton />
          <SingleElementSkeleton />
          <SingleElementSkeleton />
        </div>
      )}
    </div>
  );
};

export default Home;
