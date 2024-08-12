import React from "react";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <Layout />
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </Provider>
  );
};

export default App;
