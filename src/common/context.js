// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { getUserInfo } from "../service/auth_service";

// let AuthContext = createContext(null)
// export const AuthProvider =  ({children, ...rest}) => {
//         let [userInfo, setUserInfo] = useState(null)
//         let [checkUserInfo, setCheckUserInfo] = useState(false)

//         const afterSignInOutAction = (user) => {
//             setUserInfo(user); // setState 콜백으로 보내기
//         }
//         getUserInfo(afterSignInOutAction) //
//             .then(
//                 res => {
//                     // setUserInfo(res)  
//                     setCheckUserInfo(true)
//                 }
//             )

//         if(checkUserInfo === true ){
//             console.log('====== context.js return 발생 =======')
//             return (
//                 <AuthContext.Provider value={{ userInfo, ...rest }}>
//                     {children}
//                 </AuthContext.Provider>
//                )
//         }

//     }
    
   

// export const useAuth = () => {
//     return useContext(AuthContext);
//     // return AuthContext
// }
