import { useEffect, useRef } from "react";
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
    const savedCallback = useRef();
    
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
export const getFromLocalStorage = (closeFrame, changeMode) => {
    const localStorage = window.localStorage;
    let localStorageData = [];
    let homeData = {addButtonColor: 'rgb(0, 184, 147)', lastAddBtn: undefined, memo: undefined};
    let storedFrames = [];

    for(let key in localStorage) {
        if(
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
            key == 'memo'
        ) continue;

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
        storedFrames.push(<Frame timer key={data.frameId} frameId={data.frameId} closeFrame={closeFrame} changeMode={changeMode} localStorage={data}/>)
    })

    return {storedFrames: storedFrames, homeData: homeData};
}