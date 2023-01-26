import "./index.css";
import { WrappingRouter } from "./router/router";
import ReactDOM from "react-dom/client";
import React from "react";
// import { AuthProvider } from "./common/context";
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <HelmetProvider>
    {/* <AuthProvider> */}
        <WrappingRouter/>
    {/* </AuthProvider> */}
    </HelmetProvider>
  </React.StrictMode>
);