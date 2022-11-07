

import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, redirect, Route, RouterProvider, Routes, useLocation, useNavigate } from "react-router-dom";
import context, { contextWrapping, useAuth } from "../common/context";
import Login from "../components/login/login";
import Main from "../components/main/main";
import Maker from "../components/maker/maker";

import React from 'react';
import AuthService from "../service/auth_service";
import App from "../App";
import Posts from "../components/Post/post";
import NotFound from "../components/error/notFound";
import ProtectedRoutes from "./protectedRoutes";



export const WrappingRouter = (props) => {

  console.log('WrappingRouter 작동 =======================')
  const authService = new AuthService();


/*
    createBrowserRouter를 사용하는 것보다 
    그냥 <Route>형태로 하는게 Auth체크 중 useLocation도 사용할 수 있고 여러모로 좋은듯..?
 */
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: Auth(<Main />), // <------------여기다 App을 하면 안 됨. ..  ★ App 컴포넌트(최상위) 내에서★ 렌더링 하는것이므로.
  //     children: [
  //       {
  //         path: "maker",
  //         element: <Maker />
  //       },
  //     ]
  //   },
  //   {
  //     path:"login",
  //     element: <Login authService={authService}/>
  //   }

  // ]
  // );
  // const routerProvider= <RouterProvider router={router}/>

  // function Auth(Component, authCheck=false, ...rest) {
  //   if(!authCheck) {
  //     return (
  //       (userInfo.userInfo !== null) ?  
  //       Component :
  //       <Navigate to="/login" replace={false} /> // replace : history에 이력을 남길 것인가 아닌가.
  //       )
          
  //   }else {
  //     // 유저별 권한체크
      
  //   }
  // }



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
              <Route path="/" element={<Navigate to="/main"/>}/>
              <Route path="main" element={<Main/>}/>

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
          <Route path="*" element={<NotFound/>}/>
          <Route path="login" element={<Login authService={authService}/>}/>
            
        </Route>
    )
  );
  const routerProvider= <RouterProvider router={router}/>



  return routerProvider
}
