

import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, redirect, Route, RouterProvider, Routes, useLocation, useNavigate } from "react-router-dom";
import context, { contextWrapping, useAuth } from "../common/context";
import Home from "../pages/home/home";
import Maker from "../components/maker/maker";

import React from 'react';
import Posts from "../components/Post/post";
import NotFound from "../pages/error/notFound";
import ProtectedRoutes from "./protectedRoutes";
import Login from "../pages/login/login";
import App from "../App";



export const WrappingRouter = (props) => {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route >
          <Route element={<ProtectedRoutes/>}>
            <Route element={<App/>}>
              <Route path="/" element={<Navigate to="/home"/>}/>
              <Route path="home" element={<Home/>}/>

              <Route path="maker" element={<Maker/>}/>
              <Route path="posts" element={
                  <div> This is Parent Component Example for Outlet Component 
                    <Outlet/> 
                  </div>
                }>
              
                  <Route path=":id" element={<Posts/>}/>
                  <Route path="1" element={<Posts/>}/>
              </Route>
            </Route>
          </Route> 
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
    )
  );
  const routerProvider= <RouterProvider router={router}/>


  return routerProvider
}




