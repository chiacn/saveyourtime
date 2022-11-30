
// Component CSS
export const setCSS = (originCSS, tailwind) => {
    console.log('common.js / setCSS / tailwind = ', tailwind)
    for(let originKey in originCSS) { // for(let key in Object) {}
        for(let twKey in tailwind) {
            if(originKey === twKey) {
                originCSS[originKey] = tailwind[twKey];
            }
        }
    }
    return originCSS;
}