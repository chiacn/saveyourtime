import React from 'react';
import { useState } from 'react';
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

    const [alarmMode, setAlarmMode] = useState(false)
    
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

    const changeFormat = (e) => {
        const wrapping = document.getElementById('wrapping' + frameId);
        const frame__header = document.getElementById('frame__header' + frameId)
        const timer = document.getElementById(frameId)
        console.log(timer)
        console.log('frame__header = ', frame__header)
        if(e.target.innerHTML === 'Timer') {
            wrapping.style.color = 'rgb(0, 129, 255)';
            wrapping.style["border-color"] = 'rgb(0, 129, 255)';
            frame__header.style["background-color"] = 'rgb(0, 129, 255)';
            setAlarmMode(false);
        }else {
            wrapping.style.color = 'rgb(0, 184, 147)';
            wrapping.style["border-color"] = 'rgb(0, 184, 147)';
            frame__header.style["background-color"] = 'rgb(0, 184, 147)';
            setAlarmMode(true);
        }
    }

    return (
            <>
                <div className={wrapping} id={'wrapping' + frameId}>
                    <div className={styles.button}>
                        <div className={styles.button__timer} onClick={changeFormat}>
                            Timer
                        </div>
                        <div className={styles.button__alarm} onClick={changeFormat}>
                            Alarm
                        </div>
                    </div>
                    <div className={styles.frame}>
                        <div className={styles.frame__header} id={'frame__header' + frameId}>

                        </div>
                        <div className={styles.frame__timer}>
                            <Timer frameId={frameId} alarmMode={alarmMode}/>
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
