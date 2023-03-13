import { useEffect, useRef } from "react";
import Mission from "../components/feature/mission";
import Frame from "../components/main/frame";

// Component CSS
export const setCSS = (originCSS, addCSS) => {
    // addCSS : tailwind
    if(addCSS) {
        for(let originKey in originCSS) { // for(let key in Object) {}
            for(let addKey in addCSS) {
                if(originKey === addKey) {
                    originCSS[originKey] = addCSS[addKey];
                }
            }
        }
    }
    return originCSS;
}


export const useInterval = (callback, delay) => {
// export default function useInterval(callback, delay) {
    const savedCallback = useRef<any>();
    
    useEffect(() => {
        savedCallback.current = callback;
    },[callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}   

//깊은 복사
export const clone = (obj) => {
    let output = [];
    for(let i in obj) {
        output[i] = obj[i]
    }
    return output;
}

// local storage
export const getFromLocalStorage = (closeFrame) => {
    const localStorage = window.localStorage;
    let localStorageData = [];
    let homeData = {addButtonColor: 'rgb(0, 184, 147)', lastAddBtn: undefined, memo: undefined};
    let storedFrames = [];

    for(let key in localStorage) {
        if(
            // (
            //     key == 'darkyState' ||
            //     key == 'darkyMode' ||
            //     key == 'darkySupported' ||
            //     key == 'length' ||
            //     key == 'clear' ||
            //     key == 'getItem' ||
            //     key == 'removeItem' ||
            //     key == 'key' ||
            //     key == 'setItem' ||

            //     key == 'addButtonColor' ||
            //     key == 'lastAddBtn' ||
            //     key == 'memo' ||
            //     key == 'google_experiment_mod44'
            // ) &&
            // (
            //     key != 'timerframe1' ||
            //     key.length != '18'
            // )
            (
                key != 'timerframe1' ||
                key.length != 18
            ) &&
            (
                key == 'darkyState' ||
                key == 'darkyMode' ||
                key == 'darkySupported' ||
                key == 'length' ||
                key == 'clear' ||
                key == 'getItem' ||
                key == 'removeItem' ||
                key == 'key' ||
                key == 'setItem' ||

                key == 'addButtonColor' ||
                key == 'lastAddBtn' ||
                key == 'memo' ||
                key == 'google_experiment_mod44'
            )
        ) continue;

        if(!key.includes('timer') ) continue;
        let gettedItem = localStorage.getItem(key);
        localStorageData.push(((gettedItem !== 'undefined') ? JSON.parse(gettedItem) : gettedItem));
    }

    homeData.addButtonColor = (localStorage.getItem('addButtonColor') != 'undefined') && JSON.parse(localStorage.getItem('addButtonColor'));
    homeData.lastAddBtn = (localStorage.getItem('lastAddBtn') != 'undefined') && JSON.parse(localStorage.getItem('lastAddBtn'));
    homeData.memo = (localStorage.getItem('memo') != 'undefined') && JSON.parse(localStorage.getItem('memo'));

    // localStorageData frameId에 따라 정렬.
    localStorageData.sort(function(a, b) {
        return ((a.frameId == 'frame1') ? '1' : a.frameId)  -  ((b.frameId == 'frame1') ? '1' : b.frameId);
    });


    // home 컴포넌트에서 frames 배열에 넣어줄 Frame 컴포넌트 배열 설정.
    localStorageData.map(data => {
        storedFrames.push(<Frame key={data.frameId} frameId={data.frameId} closeFrame={closeFrame} localStorage={data}/>)
    })

    return {storedFrames: storedFrames, homeData: homeData};
}

export const getMissionLocalInfo = () => {
    const localStorage = window.localStorage;
    let localStorageData = [];
    let missionBox = {success: [], failed: []};
    let missionListData = {isStart: false, missionInfo: undefined, focusInfo: undefined, stats: undefined};
    for(let key in localStorage) {
        if(
            (
                key == 'darkyState' ||
                key == 'darkyMode' ||
                key == 'darkySupported' ||
                key == 'length' ||
                key == 'clear' ||
                key == 'getItem' ||
                key == 'removeItem' ||
                key == 'key' ||
                key == 'setItem' ||

                key == 'addButtonColor' ||
                key == 'lastAddBtn' ||
                key == 'memo' ||
                key == 'google_experiment_mod44' ||
                key.length != 22
            )
        ) continue;

        if(!key.includes('mission')) continue;

        let gettedItem = localStorage.getItem(key);
        localStorageData.push(((gettedItem !== 'undefined') ? JSON.parse(gettedItem) : gettedItem));
    }

    missionListData.isStart = (localStorage.getItem('isStart') != 'undefined') && JSON.parse(localStorage.getItem('isStart'));
    missionListData.missionInfo = (localStorage.getItem('missionInfo') != 'undefined') && JSON.parse(localStorage.getItem('missionInfo'));
    missionListData.focusInfo = (localStorage.getItem('focusInfo') != 'undefined') && JSON.parse(localStorage.getItem('focusInfo'));
    missionListData.stats = (localStorage.getItem('stats') != 'undefined') && JSON.parse(localStorage.getItem('stats'));

    // localStorageData frameId에 따라 정렬.
    localStorageData.sort(function(a, b) {
        return a.missionId - b.missionId;
    });

    localStorageData.map(data => {
        const time = data.time?.split(':');
        const time_h = time[0];
        const time_m = time[1];

        if(data.state !== 'failed') {
            missionBox.success.push(
                <Mission 
                    key={data.missionId} 
                    missionId={data.missionId} 
                    time={{h: time_h, m: time_m, s: "00"}} 
                    todo={data.todo}  
                    localStorage={data}
                />
            )
        }else {
            missionBox.failed.push(
                <Mission 
                    key={data.missionId} 
                    missionId={data.missionId} 
                    time={{h: time_h, m: time_m, s: "00"}} 
                    todo={data.todo} 
                    isFailed={data.state}
                    localStorage={data}
                />
            )
        }
    })




    return {missionListData: missionListData ,missionBox: missionBox};
}