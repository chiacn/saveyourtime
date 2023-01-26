// import React from "react";
// import styles from "./login.module.css";
// import { redirect, useLocation, useNavigate } from "react-router-dom";
// import { useAuth, useAuthAction } from "../../common/context";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useContext } from "react";
// import { login } from "../../service/auth_service";

// const Login = () => {

//   const userInfo = useAuth().userInfo; // Context API / userAuth는 {userInfo: 결과값}라는 객체이므로 안의 userInfo를 짚어서 사용해줘야함.  
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Redirect를 위한 pathname 지정.
//   /*
//       1. 로그인 x -> Redirect 안 되게 해야함.
//       2. 로그인 o / 다른 page에서 온 경우(location.state.from 있음) -> location.state.from 
//       3. 로그인 o / 바로 로그인창으로 온 경우 (location.state.from 없음) -> /main 

//       이미 로그인 된 상태에서 url로 접근한 경우 - 이건 그냥 login을 url로 접근 못하게 해야할듯..?
//   */
// console.log('login.jsx / userInfo = ', userInfo)
//   let pathname
//   if(userInfo === null) {
//     console.log('userInfo null이다.')
//     pathname = null;
//   }else if(userInfo !== null && location.state?.from) { // ?. : Optional Chaining
//     pathname = location.state.from.pathname;
//   }else if(userInfo !== null && ! location.state?.from){
//     pathname = "/home"
//   }

//   console.log('pathname = ', pathname)


//   //그냥 login 페이지로 넘어왔을 때
//   useEffect(() => {
//     console.log('useEffect 작동==================')
//     if(pathname !== null) {
//       navigate(pathname);
//     }
//   })


//   const onLogin = (event) => {
//       login(event.currentTarget.textContent)
//   };

//   return (
//     <section className={styles.login}>
//       <section>
//         <h1>Login</h1>
//         <ul className={styles.list}>
//           <li className={styles.item}>
//             <button className={styles.button} onClick={onLogin}>
//               Google
//             </button>
//           </li>
//           <li className={styles.item}>
//             <button className={styles.button} onClick={onLogin}>
//               Github
//             </button>
//           </li>
//         </ul>
//       </section>
//     </section>
//   );
// };

// export default Login;
