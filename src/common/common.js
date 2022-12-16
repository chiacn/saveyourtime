
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

//https://velog.io/@longroadhome/%EB%AA%A8%EB%8D%98JS-%EC%8B%AC%ED%99%94-%ED%94%84%EB%A0%88%EC%9E%84%EA%B3%BC-%EC%9C%88%EB%8F%84%EC%9A%B0
// 팝업창 관련 정보. ex. 오늘 날 브라우저는 유저에 의해 열리지 
