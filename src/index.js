import "./index.module.css";
import { WrappingRouter } from "./router/router";
import ReactDOM from "react-dom/client";
import React from "react";
import { AuthProvider } from "./common/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
        <WrappingRouter/>
    </AuthProvider>
  </React.StrictMode>
);