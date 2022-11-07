import firebaseApp from "./firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  checkActionCode,
} from "firebase/auth";
import { resolvePath } from "react-router-dom";


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


  getUserInfo() {
    const auth = this.getAuthObj();
    console.log('AuthService / getUserInfo작동 ============================ ')
    // 프라미스화 
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        console.log(user)
        if(user) {
          console.log('state : definitely signed in')
          resolve(user);
        }else {
          console.log('state : definitely signed out')
          // reject();
          resolve(null)
        }
      })
    })

  }


}

export default AuthService;
