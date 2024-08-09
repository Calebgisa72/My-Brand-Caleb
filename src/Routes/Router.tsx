import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, To } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import NotFound from "./NotFound";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="Caleb's Brand" />
            <NotFound />
          </>
        }
      />
    </Routes>
  );
};

export default Router;
