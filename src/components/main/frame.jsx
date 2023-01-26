import React from 'react';
import { useRef } from 'react';
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
    changeMode,
    localStorage,
    example=false,
    example_count,
}) {
    const [themeColor, setThemeColor] = useState({timer:'rgb(0, 129, 255)', alarm:'rgb(0, 184, 147)'});
    const [alarmMode, setAlarmMode] = useState(false);

    const ref_wrapping = useRef();
    const ref_frame__header = useRef();
    
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

        //local storage에서도 해당 값 제거.
        window.localStorage.removeItem(JSON.stringify(frameId));
    }
    
    const changeFormat = (e) => {

        if(e.target.innerHTML === 'Timer') {
            ref_wrapping.current.style.color = themeColor.timer;
            ref_wrapping.current.style["border-color"] = themeColor.timer;
            ref_frame__header.current.style["background-color"] = themeColor.timer;
            setAlarmMode(false);
            changeMode(frameId, false)
        }else {
            ref_wrapping.current.style.color = themeColor.alarm;
            ref_wrapping.current.style["border-color"] = themeColor.alarm;
            ref_frame__header.current.style["background-color"] = themeColor.alarm;
            setAlarmMode(true);
            changeMode(frameId, true)
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

    // local storage update
    useEffect(() => {
        if(localStorage) {
            setAlarmMode(localStorage.alarmMode);
            if(!localStorage.alarmMode) {
                ref_wrapping.current.style.color = themeColor.timer;
                ref_wrapping.current.style["border-color"] = themeColor.timer;
                ref_frame__header.current.style["background-color"] = themeColor.timer;
            }else {
                ref_wrapping.current.style.color = themeColor.alarm;
                ref_wrapping.current.style["border-color"] = themeColor.alarm;
                ref_frame__header.current.style["background-color"] = themeColor.alarm;
            }
        }
    }, [])

    // example
    useEffect(() => {
        console.log('frame/ example 작동 === ')
        if(example === true) {
            setAlarmMode(false);
        }
    },[example])

    return (
            <>
                <div className={styles.container}>
                    <div className={wrapping} id={'wrapping' + frameId} ref={ref_wrapping}>
                        <div className={styles.button}>
                            <div className={styles.button__timer} onClick={changeFormat} id={'button__timer' + frameId}>
                                Timer
                            </div>
                            <div className={styles.button__alarm} onClick={changeFormat} id={'button__alarm' + frameId}>
                                Alarm
                            </div>
                        </div>
                        <div className={styles.frame}>
                            <div className={styles.frame__header} id={'frame__header' + frameId} ref={ref_frame__header}/>
                            <div className={styles.frame__timer}>
                                <Timer frameId={frameId} alarmMode={alarmMode} themeColor={themeColor} localStorage={localStorage} example={example} example_count={example_count}/>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.closeButton}>X</div> */}
                    { (frameId !== 'frame1' && frameId !== 'example') &&
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
            </>
            
        
    );
}
