import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { Helmet } from 'react-helmet-async';

function App() {

  return (
      <>
        <Helmet>
          <title>Save Your Time - Timer for self-study</title>
          <meta name="title" content="Save Your Time - Manage self-study timer by using timer web"/>
          <meta name="description" content ="정해진 시간이 되면 특정 링크 또는 텍스트가 열리도록 설정할 수 있습니다. 공부 시간을 정해 두고 정해진 시간에 동기부여 영상을 열리게 하거나, 수강신청 사이트가 열리게 하는 등 다양하게 활용할 수 있습니다."/>
          <meta name="keyword" content="timer, 타이머, 공부 타이머, 동기부여, 수강신청, motivation, study, learn"/>
        </Helmet>
        <Navbar/>
        <Outlet/>
      </>
  
  );
}

export default App;
