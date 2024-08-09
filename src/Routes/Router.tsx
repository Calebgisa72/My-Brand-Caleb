import React, { useEffect } from "react";
import { Navigate, Route, Routes, To } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import NotFound from "./NotFound";
import DashboardLayout from "../DashboardLayout";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Caleb's Brand | Dashboard" />
            <DashboardLayout />
          </>
        }
      >
        <Route path="blog" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
