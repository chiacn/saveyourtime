import React from 'react';
import { setCSS } from '../../common/common';
import Timer from '../feature/timer';
import styles from './frame.module.css';

export default function frame({
    text = true, 
    onClick,
    defaultTailwind = false,
    tailwind = false,
    timer=false,
}) {

    const originCSS = !defaultTailwind ? {
    // CSS
    frame: styles.frame,
    wrapping: styles.wrapping, } :
    {
    // defaultTailwind
    frame: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110',
    wrapping: '',
    }

    //customTailwind
    const assignCSS = setCSS(originCSS, tailwind);

    // assignCSS
    const {frame, wrapping} = assignCSS;


    return (
        <div className={wrapping}>
            {text && <p>{text}</p>}
            <div className={frame}>
                {timer &&
                    <Timer/>  
                }
            </div>
        </div>
        
    );
}
