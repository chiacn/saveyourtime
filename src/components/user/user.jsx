import React from 'react';
import { setCSS } from '../../common/common';
import styles from './user.module.css'

export default function User({
    // user: {photoURL, displayName}, <--- 안에 photoURL등의 값이 없을 경우 에러나므로 그냥 user로 받기.
    user,
    defaultTailwind = false,
    tailwind = false,
}) {
    
    // 값이 있는 경우만 할당되도록 
    const photoURL = user?.photoURL || null; // ?. : Optional Chaining
    const displayName = user?.displayName || null;


    const originCSS = !defaultTailwind ? {
        // CSS
        div: styles.div,
        div__img: styles.div__img,
        div__name: styles.div__name, } :
    {
        // defaultTailwind
        div: 'flex items-center shrink-0',
        div__img: 'w-10 h-10 rounded-full mr-2',
        div__name: 'hidden md:block',
    }

    // customTailwind
    const assignCSS = setCSS(originCSS, tailwind);
    
    // assignCSS
    const { div, 
            div__img, 
            div__name, } = assignCSS;

    return (
        <div className={div}>
            {user &&
                <>
                    <img
                        className={div__img}
                        src={photoURL}
                        alt={displayName}
                        onerror="this.style.display='none';"
                    />
                    <span className={div__name}>{displayName}</span>
                </>
            }
        </div>
    );

}

