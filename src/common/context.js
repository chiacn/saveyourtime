import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const FocusBoxContext = createContext();

const initFocus = {
    missionList: [],
    focusMissionId: undefined,
    savedTime: 0,
}

const focusReducer = (focusInfo, action) => {
    let prevMissionList = [...focusInfo.missionList]
    let focusMissionId;
    switch(action.type) {
        case 'initListInfo':
            if(prevMissionList.length === 0 || !prevMissionList.some(prev => prev.missionId === action.missionInfo.missionId)) {
                prevMissionList.push(action.missionInfo);
                prevMissionList = prevMissionList.sort(function(a, b) {
                    return b.missionId - a.missionId 
                })
            }
            focusMissionId = selectFocusMissionId(prevMissionList);
            return {...focusInfo, missionList: prevMissionList, focusMissionId: focusMissionId};

        case 'updateState':
            const newMissionList = prevMissionList.map((missionInfo) => {
                if(missionInfo.missionId === action.missionInfo.missionId) {
                    return {...missionInfo, state: action.missionInfo.state};
                }else {
                    return {...missionInfo};
                }
            })
            focusMissionId = selectFocusMissionId(newMissionList);
            return {...focusInfo, missionList: newMissionList, focusMissionId: focusMissionId};
        
        case 'reset':
            return {...focusInfo, missionList: [], focusMissionId: undefined, savedTime: 0}

        case 'savedTime':
            const savedTime = focusInfo.savedTime + action.savedTime;
            return {...focusInfo, savedTime: savedTime}
        
        case 'localStorage':
            return {...focusInfo, missionList: action.info.missionList, focusMissionId: action.info.focusMissionId, savedTime:action.info.savedTime}
    }

    // focusBox 특정.
    function selectFocusMissionId(missionList) {
        let focusMissionId;
        missionList.map((missionInfo) => {
            if(missionInfo.state === 'proceed') focusMissionId = missionInfo.missionId;
        })
        return focusMissionId;
    }

}

export const FocusBoxProvider = ({children}) => {
    const [focusInfo, dispatchFocus] = useReducer(focusReducer, initFocus);

    const value = [focusInfo, dispatchFocus];

    return (
        <FocusBoxContext.Provider value={value}>
            {children}
        </FocusBoxContext.Provider>
    )
}

export const useFocusReducer = () => {
    return useContext(FocusBoxContext);
}



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


