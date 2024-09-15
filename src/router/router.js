import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  redirect,
  Route,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import context, { contextWrapping, FocusBoxProvider } from "../common/context";
import Home from "../pages/home/home";
import React from "react";
import NotFound from "../pages/error/notFound";
// import ProtectedRoutes from "./protectedRoutes";
// import Login from "../pages/login/login";
import App from "../App";
import MissionList from "../pages/mission/missionList";

export const WrappingRouter = (props) => {
  /**
      <설명>
      ProtectedRoutes의 하위 Route들은 로그인 관련 리다이렉트를 적용할 컴포넌트들.
      일반 App 컴포넌트가 최상위인 Route들은 ProtectedRoutes컴포넌트의 기능을 적용하지 않을 컴포넌트들.
   */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={`${process.env.PUBLIC_URL}/`} element={<App />}>
        {/* 루트 경로를 최상위로 설정하고, 기본적으로 home으로 이동 */}
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route
          path="mission"
          element={
            <FocusBoxProvider>
              <MissionList />
            </FocusBoxProvider>
          }
        />
        {/* 그 외 경로는 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  const routerProvider = <RouterProvider router={router} />;

  return routerProvider;
};
