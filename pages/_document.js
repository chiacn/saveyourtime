import Document, { Html, Head, Main, NextScript } from 'next/document'; 

/*
    Next.js에서 _document.js 파일의 역할
    (_app.js 다음에 실행되며 공통으로 활용할 <head>나 <body> 태그 안에 들어갈 내용들을 커스텀할 때 활용)

    1. _document.js파일도 _app.js파일처럼 Next.js 애플리케이션에서 각 페이지에 대한 글로벌한 초기화에 관여한다.
    2. 즉, 각 페이지가 초기화될 때 HTML 페이지 중 Document 부분에 대한 오버라이딩을 제공한다.
    3. 특히 <html>과 <body> 태그에 대한 오버라이드를 제공해줘서 원하는 방식으로 페이지를 제어할 수 있게해준다.
*/

/*
    <규칙>
    1. Document 클래스를 상속받는 클래스 컴포넌트로 작성해야한다. (extends Document)

    Head : 
        next/document에서 가져오는 Head는 next/head에서 가져오는 Head와 다른 컴포넌트임.
        next/document - 모든 페이지에 공통 사용
        next/head - 각 페이지별로 달라지는 태그 커스텀
*/

class MyDocument extends Document { 
  render() { 
    return ( 
      <Html lang="ko" >
        <Head>
          <title>Save Your Time - Alarm Timer for work and study</title>
          <meta name="title" content="Save Your Time - Alarm Timer for work and study"/>
          <meta name="description" content ="정해진 시간이 되면 특정 링크 또는 텍스트가 열리도록 설정할 수 있습니다. 공부 시간을 정해 두고 정해진 시간에 동기부여 영상을 열리게 하거나, 수강신청 사이트가 열리게 하는 등 다양하게 활용할 수 있습니다."/>
          <meta name="keyword" content="timer, 타이머, 공부 타이머, 동기부여, 수강신청, motivation, study, learn"/>

          <meta property="og:type" content="website" /> 
          <meta property="og:title" content="Save your time - 타이머를 이용한 시간관리" />
          <meta property="og:description" content="정해진 시간이 되면 특정 링크 또는 텍스트가 열리도록 설정할 수 있습니다. 공부 시간을 정해 두고 정해진 시간에 동기부여 영상을 열리게 하거나, 수강신청 사이트가 열리게 하는 등 다양하게 활용할 수 있습니다." />
          <meta property="og:url" content="https://www.holdyourtime.com" />
        </Head>
        <body> 
          <Main /> 
          <NextScript /> 
        </body> 
      </Html> 
    ) 
  } 
} 

export default MyDocument