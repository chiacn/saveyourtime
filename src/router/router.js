

import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, redirect, Route, RouterProvider, Routes, useLocation, useNavigate } from "react-router-dom";
import context, { contextWrapping, useAuth } from "../common/context";
import Home from "../pages/home/home";
import Maker from "../components/maker/maker";

import React from 'react';
import Posts from "../components/Post/post";
import NotFound from "../pages/error/notFound";
import ProtectedRoutes from "./protectedRoutes";
import Login from "../pages/login/login";



export const WrappingRouter = (props) => {

/*
    createBrowserRouter만 사용하는 것보다 
    createRoutesFromElements를 사용해서 <Route> 컴포넌트 형태로 정의하는 것이
    Auth체크 중 useLocation도 사용할 수 있고 여러모로 좋은듯..?

 */
  const router = createBrowserRouter(
    createRoutesFromElements(
 
        // <Route>
        //   <Route path="/" element={Auth(<Main/>)} />
        //   <Route path="maker" element={<Maker/>}/> 
        //   <Route path="login" element={<Login/>}/>
        // </Route>
        
        <Route >
          <Route element={<ProtectedRoutes/>}>
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
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
            
        </Route>
    )
  );
  const routerProvider= <RouterProvider router={router}/>





  return routerProvider
}




