import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "../App";
import { router, routerProvider } from "../router/router";


/*
  이전 프로젝트의 구조를 따라해보기 위해 마운트되는 
  Root를 두 개 둔 것 (일반 화면 / 로그인 화면)
  => 근데 로그인화면은 그냥 하나의 Root 상에서 구현해도 될듯함.
*/



const createApp = function () {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );


};



export { createApp };
