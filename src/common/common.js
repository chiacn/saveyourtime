import { useEffect, useRef } from "react";

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