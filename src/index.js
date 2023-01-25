import "./index.css";
import { WrappingRouter } from "./router/router";
import ReactDOM from "react-dom/client";
import React from "react";
import { AuthProvider } from "./common/context";
import { HelmetProvider } from 'react-helmet-async';
import { hydrate, render } from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rootElement = document.getElementById('root');

const app = (
    <React.StrictMode>
    {/* <App /> */}
    <HelmetProvider>
    <AuthProvider>
        <WrappingRouter/>
    </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
)

if(rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
}else {
  render(app, rootElement);
}

// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <HelmetProvider>
//     <AuthProvider>
//         <WrappingRouter/>
//     </AuthProvider>
//     </HelmetProvider>
//   </React.StrictMode>
// );