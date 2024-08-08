import React from "react";
import Router from "./Routes/Router";

const Layout = () => {
  return (
    <div data-testid="layout-component">
      <main>
        <Router />
      </main>
    </div>
  );
};

export default Layout;
