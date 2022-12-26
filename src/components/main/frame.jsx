import React from 'react';
import { setCSS } from '../../common/common';
import Timer from '../feature/timer';
import styles from './frame.module.css';

export default function Frame({
    text = true, 
    onClick,
    defaultTailwind = false,
    tailwind = false,
    timer=false,
}) {

    const originCSS = !defaultTailwind ? {
    // CSS
    frame: styles.frame,
    wrapping: styles.wrapping,
    frame__option: styles.frame__option,
    frame__timer: styles.frame__timer,
    modal: styles.modal, } :
    {
    // defaultTailwind
    frame: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110',
    wrapping: '',
    frame__option: '',
    frame__timer: '',
    modal: '',
    }

    //customTailwind
    const assignCSS = setCSS(originCSS, tailwind);

    // assignCSS
    const {
        frame, 
        wrapping, 
        frame__option,
        frame__timer,
        modal,
    } = assignCSS;

    const openOption = () => {
        const modal = document.querySelector(`.${styles.modal}`);
        modal.style.display = 'flex'
    }

    const closeOption = () => {
        const modal = document.querySelector(`.${styles.modal}`);
        modal.style.display = 'none';
    }

    return (
        <>
        <div className={wrapping}>
            {text && <p>{text}</p>}
            <div className={frame}>
                {timer &&
                    <div className={frame__timer}>
                        <Timer />  
                    </div>
                }
                
                <div className={frame__option} onClick={openOption}>
                    <button>
                        Option
                    </button>
                </div>
            </div>
        </div>

        {/* Modal */}
        <div className={modal}>
            <div className={styles.modal__close}>
                <button onClick={closeOption}>Close</button>
            </div>
        </div>

        </>
        
    );
}
