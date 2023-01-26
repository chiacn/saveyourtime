// import firebaseApp from "./firebase";
// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   GithubAuthProvider,
//   onAuthStateChanged,
//   signOut
// } from "firebase/auth";

//   const auth = getAuth(firebaseApp)

//   // 로그인
//   export async function login(providerName) {
//     // provideName === ex. GoogleAuthProvider()
    

//     let loginProviderName;
//     switch (providerName) {
//       case "Google":
//         loginProviderName = GoogleAuthProvider;
//         break;

//       case "Github":
//         loginProviderName = GithubAuthProvider;
//         break;
//       default:
//         console.log("Error : 일치하는 providerName이 없습니다.");
//     }

//     const authProvider = new loginProviderName();

//     return signInWithPopup(auth, authProvider); // 프라미스 객체 반환
//   }

//   export async function logout() {
//     return signOut(auth) //
//       .then(() => {
//         console.log('Sign-Out successful')
//       })
//       .catch((error) => {
//         console.log('An error happened', error)
//       })
//   }

  
//   export function getUserInfo(afterSignInOutAction) {
//     console.log('AuthService / getUserInfo작동 ============================ ')
//     // 프라미스화 
//     return new Promise((resolve, reject) => {
//       onAuthStateChanged(auth, (user) => {
//         if(user) {
//           console.log('state : definitely signed in')
//           afterSignInOutAction(user);
//           resolve(user);
//         }else {
//           console.log('state : definitely signed out')
//           // reject();
//           afterSignInOutAction(null);
//           resolve(null)
//         }
//       })
//     })

//   }



