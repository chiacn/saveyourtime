import "./index.css";
import { WrappingRouter } from "./router/router";
import ReactDOM from "react-dom/client";
import React from "react";
// import { AuthProvider } from "./common/context";
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga';
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <>
    {/* <App /> */}
    <HelmetProvider>
    {/* <AuthProvider> */}
        <WrappingRouter/>
    {/* </AuthProvider> */}
    </HelmetProvider>
  </>
  // </React.StrictMode>

);