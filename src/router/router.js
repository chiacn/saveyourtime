

import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, redirect, Route, RouterProvider, Routes, useLocation, useNavigate } from "react-router-dom";
import context, { contextWrapping, useAuth } from "../common/context";
import Login from "../components/login/login";
import Main from "../components/main/main";
import Maker from "../components/maker/maker";

import React from 'react';
import Posts from "../components/Post/post";
import NotFound from "../components/error/notFound";
import ProtectedRoutes from "./protectedRoutes";



export const WrappingRouter = (props) => {

  //createBrowserRouter 배열 버전 구조
  const router = createBrowserRouter([
    {
      element: <ProtectedRoutes/>,
      children: [
        {
          path: "/",
          element: <Navigate to="/main"/>, // <------------여기다 App을 하면 안 됨. ..  ★ App 컴포넌트(최상위) 내에서★ 렌더링 하는것이므로.
        },
        {
          path: "main",
          element: <Main />
        },
        {
          path: "posts",
          element: 
            <div> This is Parent Component Example for Outlet Component
              <Outlet/>
            </div>,
          children: [
              {
                path: ":id",
                element: <Posts/>
              },
              {
                path: "1",
                element: <Posts/>
              }
          ] 
        }
      ]
    },
    {
      path:"/login",
      element: <Login/>
    }

  ]
  );
  const routerProvider= <RouterProvider router={router}/>


/*
    createBrowserRouter만 사용하는 것보다 
    createRoutesFromElements를 사용해서 <Route> 컴포넌트 형태로 정의하는 것이
    Auth체크 중 useLocation도 사용할 수 있고 여러모로 좋은듯..?

 */
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
 
  //       // <Route>
  //       //   <Route path="/" element={Auth(<Main/>)} />
  //       //   <Route path="maker" element={<Maker/>}/> 
  //       //   <Route path="login" element={<Login/>}/>
  //       // </Route>
        
  //       <Route >
  //         <Route element={<ProtectedRoutes/>}>
  //             <Route path="/" element={<Navigate to="/main"/>}/>
  //             <Route path="main" element={<Main/>}/>

  //             <Route path="maker" element={<Maker/>}/>
  //             <Route path="posts" element={
  //                 <div> This is Parent Component Example for Outlet Component 
  //                   <Outlet/> 
  //                 </div>
  //               }>
              
  //                 <Route path=":id" element={<Posts/>}/>
  //                 <Route path="1" element={<Posts/>}/>
  //             </Route>
  //         </Route>
  //         <Route path="*" element={<NotFound/>}/>
  //         <Route path="login" element={<Login/>}/>
            
  //       </Route>
  //   )
  // );
  // const routerProvider= <RouterProvider router={router}/>





  return routerProvider
}




