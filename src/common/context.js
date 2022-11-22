import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../service/auth_service";


//1. createContext


let AuthContext = createContext(null)
export const AuthProvider =  ({children, ...rest}) => {

        /*
            <문제점>
            context api로 저장되는 userInfo를 통해. 
            Router Authentication 기능을 구현하려고 함.
            (Login 정보 없으면 로그인 화면으로 redirct )
            
            => 근데 로그인 정보가 있는 경우도 잠깐 로그인 화면이 보였다가 다시 정상 경로로 변경되는 경우가 있었음.

            

            <이유>
            useState를 통해 userInfo 정보를 관리하면 
            비동기이기 때문에 처음에는 null이 반환된다.

            <방법>
            아니면 그냥 return을 통제해서 userInfo가 null이어야 ??? return하는 걸로..?
                1. useState 사용
                2. useEffect 사용
            
        */

        console.log('Context.js 작동 =================================== ')

        // 방법1 - useState 사용 
        let [userInfo, setUserInfo] = useState(null)
        let [checkUserInfo, setCheckUserInfo] = useState(false)

        const afterSignInOutAction = (user) => {
            setUserInfo(user); // setState 콜백으로 보내기
        }
        getUserInfo(afterSignInOutAction) //
            .then(
                res => {
                    // setUserInfo(res)  
                    setCheckUserInfo(true)
                }
            )

        if(checkUserInfo === true ){
            console.log('====== context.js return 발생 =======')
            return (
                <AuthContext.Provider value={{ userInfo, ...rest }}>
                    {children}
                </AuthContext.Provider>
               )
        }

    }
    
   

export const useAuth = () => {
    return useContext(AuthContext);
    // return AuthContext
}
