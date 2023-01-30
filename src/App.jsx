import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { Helmet } from 'react-helmet-async';
import RouteChangeTracker from "./RouteChangeTracker";

function App() {
  RouteChangeTracker();
  return (
      <>
        <Helmet>
          <title>Save Your Time - Alarm Timer for work and study</title>
          <meta name="title" content="Save Your Time - Alarm Timer for work and study"/>
          <meta name="description" content ="정해진 시간이 되면 특정 링크 또는 텍스트가 열리도록 설정할 수 있습니다. 공부 시간을 정해 두고 정해진 시간에 동기부여 영상을 열리게 하거나, 수강신청 사이트가 열리게 하는 등 다양하게 활용할 수 있습니다."/>
          <meta name="keyword" content="timer, 타이머, 공부 타이머, 동기부여, 수강신청, motivation, study, learn"/>

          <meta property="og:type" content="website" /> 
          <meta property="og:title" content="Save your time - 타이머를 이용한 시간관리" />
          <meta property="og:description" content="정해진 시간이 되면 특정 링크 또는 텍스트가 열리도록 설정할 수 있습니다. 공부 시간을 정해 두고 정해진 시간에 동기부여 영상을 열리게 하거나, 수강신청 사이트가 열리게 하는 등 다양하게 활용할 수 있습니다." />
          <meta property="og:url" content="https://www.holdyourtime.com" />
        </Helmet>
        <Navbar/>
        <Outlet/>
      </>
  
  );
}

export default App;
