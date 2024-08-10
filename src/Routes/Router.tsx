import React from "react";
import { Navigate, Route, Routes, To } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import NotFound from "./NotFound";
import DashboardLayout from "../DashboardLayout";
import Login from "../pages/Login";
import Blog from "../pages/Blogs";
import Projects from "../pages/Projects";
import Skills from "../pages/Skills";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import DashboarInnerLayout from "../components/DashboarInnerLayout";
import EditSkill from "../pages/EditSkill";
import AddSkill from "../pages/AddSkill";
import AddProject from "../pages/AddProject";
import EditProject from "../pages/EditProject";
import AddBlog from "../pages/AddBlog";
import EditBlog from "../pages/EditBlog";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Caleb's Brand | Dashboard" />
            <DashboardLayout />
          </>
        }
      >
        <Route
          path=""
          element={
            <>
              <PageTitle title="Caleb's Brand | Dashboard" />
              <Home />
            </>
          }
        />

        <Route
          path="blogs"
          element={
            <>
              <PageTitle title="Caleb's Brand | Blogs" />
              <DashboarInnerLayout />
            </>
          }
        >
          <Route
            path=""
            element={
              <>
                <Blog />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <AddBlog />
              </>
            }
          />
          <Route
            path="edit/:id"
            element={
              <>
                <EditBlog />
              </>
            }
          />
        </Route>

        <Route
          path="projects"
          element={
            <>
              <PageTitle title="Caleb's Brand | projects" />
              <DashboarInnerLayout />
            </>
          }
        >
          <Route
            path=""
            element={
              <>
                <Projects />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <AddProject />
              </>
            }
          />
          <Route
            path="edit/:id"
            element={
              <>
                <EditProject />
              </>
            }
          />
        </Route>

        <Route
          path="skills"
          element={
            <>
              <PageTitle title="Caleb's Brand | Skills" />
              <DashboarInnerLayout />
            </>
          }
        >
          <Route
            path=""
            element={
              <>
                <Skills />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <AddSkill />
              </>
            }
          />
          <Route
            path="edit/:id"
            element={
              <>
                <EditSkill />
              </>
            }
          />
        </Route>

        <Route
          path="messages"
          element={
            <>
              <PageTitle title="Caleb's Brand | Messages" />
              <Messages />
            </>
          }
        />
        <Route
          path="profile"
          element={
            <>
              <PageTitle title="Caleb's Brand | Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path=""
          element={
            <>
              <PageTitle title="Caleb's Brand | Profile" />
              <Profile />
            </>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
