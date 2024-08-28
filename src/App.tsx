import React from "react";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <Layout />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Provider>
  );
};

export default App;
