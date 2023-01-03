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
    closeFrame,
    frameId,
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
        const modal_ani = document.querySelector(`.${styles.modal__ani}`);
        const frame = document.querySelector(`.${styles.frame}`)
        const absoluteTop = window.scrollY + frame.getBoundingClientRect().top;
        const absoluteLeft = frame.getBoundingClientRect().left;

        modal_ani.style.top = absoluteTop;
        modal_ani.style.left = absoluteLeft;

        modal_ani.style.display = 'flex'
        modal.style.display = 'flex'
    }

    const closeOption = () => {
        const modal = document.querySelector(`.${styles.modal}`);
        const modal_ani = document.querySelector(`.${styles.modal__ani}`);

        modal.style.display = 'none';
        modal_ani.style.display = 'none';
    }
    
    const submitFrameId = () => {
        closeFrame(frameId);
    }

    return (
            <>
                <div className={wrapping}>
                    <div className={styles.button}>
                        <div className={styles.button__timer}>
                            <button>Timer</button>
                        </div>
                        <div className={styles.button__alarm}>
                            <button>Alarm</button>
                        </div>
                    </div>
                    <div className={styles.frame}>
                        <div className={styles.frame__header}>

                        </div>
                        <div className={styles.frame__timer}>
                            <Timer frameId={frameId}/>
                        </div>
                    </div>
                </div>
                
                {/* Modal */}
                {/* <div className={modal}>
                    <div className={styles.modal__close}>
                        <button onClick={closeOption}>Close</button>
                    </div>
                </div> */}

                {/* Modal Animation */}
                {/* <div className={styles.modal__ani}/> */}
            </>
            
        
    );
}
