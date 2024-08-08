import React from "react";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div>
      <Layout />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
