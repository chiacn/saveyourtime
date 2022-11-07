import firebaseApp from "./firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  checkActionCode,
} from "firebase/auth";


class AuthService {
  getAuthObj() {
    return getAuth(firebaseApp)
  }

  // 로그인
  login(providerName) {
    // provideName === ex. GoogleAuthProvider()
    const auth = this.getAuthObj();

    let loginProviderName;
    switch (providerName) {
      case "Google":
        loginProviderName = GoogleAuthProvider;
        break;

      case "Github":
        loginProviderName = GithubAuthProvider;
        break;
      default:
        console.log("Error : 일치하는 providerName이 없습니다.");
    }

    const authProvider = new loginProviderName();

    return signInWithPopup(auth, authProvider); // 프라미스 객체 반환
  }

  // 로그인 정보
//  isLogin() {
//     const auth = this.getAuthObj();
//     onAuthStateChanged(auth, (user) => {
//       console.log(user.uid)

//       if (user) {
//         this.userInfoUpdate(auth)
//         console.log('state : definitely signed in')
//       } else {
//         console.log('state : definitely signed out')
//       }
//     })
    
    
//   }

isLogin() {
  const auth = this.getAuthObj();
  onAuthStateChanged(auth, (user) => {
    console.log(user.uid)

    if (user) {
      this.userInfoUpdate(auth)
      console.log('state : definitely signed in')
    } else {
      console.log('state : definitely signed out')
    }
  })
  
  
}

  userInfoUpdate(auth) {

  
    console.log('auth = ', auth)
    console.log('auth.currentUser = ', auth.user)
    console.log('JSON.stringify(auth.currentUser) = ', JSON.stringify(auth.user))
    console.log('auth.app = ', auth.app)

    if(auth.currentUser === true){
      console.log('OK')
    }else {
      console.log('NULL')
    }
  }


}

export default AuthService;
