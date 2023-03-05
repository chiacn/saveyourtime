import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styles from './checkBox.module.css'

export default function CheckBox({
    text,
    alarmMode=false,
    themeColor,
    optionCheck,
    setCheck=false,
    frameId
}) {
    
    const handleOptionCheck = () => {
        optionCheck(text);
    }

    useEffect(() => {
        const checkBox = document.getElementsByName('check-box' + frameId + text);
        if(alarmMode) {
            checkBox[0].style["border-color"] = themeColor.alarm;
            checkBox[1].style["border-color"] = themeColor.alarm;
        }else {
            checkBox[0].style["border-color"] = themeColor.timer;
            checkBox[1].style["border-color"] = themeColor.timer;
        }
    }, [alarmMode])

    return (
        <>
            <div className={styles["checkbox-wrapper-19"]}>
                <input type="checkbox" id={"cbtest-19-text" + frameId + text} name={'check-box' + frameId + text} checked={setCheck} onChange={handleOptionCheck}/>
                { !alarmMode ?
                    <label htmlFor={"cbtest-19-text" + frameId + text} className={styles["check-box"]} name={'check-box' + frameId + text}/> :
                    <label htmlFor={"cbtest-19-text" + frameId + text} className={styles["check-box-alarmMode"]} name={'check-box' + frameId + text}/>
                }
            </div>
            <p>{text}</p> 
        </>
    );
}