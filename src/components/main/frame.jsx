import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { setCSS } from '../../common/common';
import Timer from '../feature/timer';
import Button from '../ui/button';
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
    const [themeColor, setThemeColor] = useState({timer:'rgb(0, 129, 255)', alarm:'rgb(0, 184, 147)'});
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

        if(e.target.innerHTML === 'Timer') {
            wrapping.style.color = themeColor.timer;
            wrapping.style["border-color"] = themeColor.timer;
            frame__header.style["background-color"] = themeColor.timer;
            setAlarmMode(false);
        }else {
            wrapping.style.color = themeColor.alarm;
            wrapping.style["border-color"] = themeColor.alarm;
            frame__header.style["background-color"] = themeColor.alarm;
            setAlarmMode(true);
        }
    }

    // themeColor Change
    useEffect(() => {
        const wrapping = document.getElementById('wrapping' + frameId);
        const button__timer = document.getElementById('button__timer' + frameId);
        const button__alarm = document.getElementById('button__alarm' + frameId);
        const frame__header = document.getElementById('frame__header' + frameId);

        wrapping.style.color = themeColor.timer;
        wrapping.style["border-color"] = themeColor.timer;
        button__timer.style["background-color"] = themeColor.timer;
        button__alarm.style["background-color"] = themeColor.alarm;
        frame__header.style["background-color"] = themeColor.timer;
    },[themeColor])

    return (
            <>
                <div className={styles.container}>
                    <div className={wrapping} id={'wrapping' + frameId}>
                        <div className={styles.button}>
                            <div className={styles.button__timer} onClick={changeFormat} id={'button__timer' + frameId}>
                                Timer
                            </div>
                            <div className={styles.button__alarm} onClick={changeFormat} id={'button__alarm' + frameId}>
                                Alarm
                            </div>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.frame__header} id={'frame__header' + frameId} />
                            <div className={styles.frame__timer}>
                                <Timer frameId={frameId} alarmMode={alarmMode} themeColor={themeColor}/>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.closeButton}>X</div> */}
                    { (frameId !== 'frame1') &&
                    <div className={styles.closeButton}>
                        <Button 
                            type="text_shape"
                            text='X'
                            font="eng_rubik_bubbles"
                            color={alarmMode ? themeColor.alarm : themeColor.timer}
                            onClick={submitFrameId}
                        />
                    </div>
                    }
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
