import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { Helmet } from 'react-helmet-async';

function App() {

  return (
      <>
        <Helmet>
          <title>Save Your Time</title>
          <meta name="title" content="Save Your Time - simple timer web"/>
          <meta name="description" content ="You can self study efficiently by using timer web. Let's manage your learning time!"/>
          <meta name="keyword" content="timer, motivation, study, learn"/>
        </Helmet>
        <Navbar/>
        <Outlet/>
      </>
  
  );
}

export default App;
