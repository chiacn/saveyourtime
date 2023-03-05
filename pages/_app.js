import styles from "../styles/global.css"
import Layout from "../components/Layout"
import { FocusBoxProvider } from "../common/context"
/*
    _app은 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트. 페이지에 적용할 공통 레이아웃 역할.
    Component 속성값은 서버에 요청한 페이지가 됨.

   ** 예를 들어
   "/" 루트 주소로 접근하면 <Component {...pageProps} /> 는 index.js의 내용이 된다.
*/

// Layout 컴포넌트에서 children prop을 사용하여 nested route 구현
export default function MyApp({ Component, pageProps }) { 
  return (
    <Layout>
        <FocusBoxProvider>
          <Component {...pageProps} /> 
        </FocusBoxProvider>
    </Layout>
  )
}