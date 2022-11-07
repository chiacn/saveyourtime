
import { BrowserRouter, createBrowserRouter, Link, redirect, Route, RouterProvider, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./common/context";
import Footer from "./components/footer/footer";
import { routerProvider, WrappingRouter } from "./router/router";
function App({ authService }) {

  
  //그냥 여기서 전해줄까??
  
  /*
      재사용의 측면에서 
      context.js
      router.js 
  */
 
  return (

      <>
        <AuthProvider>
          <WrappingRouter/>
        </AuthProvider>
      </>
  
  );
}

export default App;
