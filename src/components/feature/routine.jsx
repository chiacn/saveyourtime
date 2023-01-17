import React from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import styles from './routine.module.css'

export default function Routine({
    routineId,
}) {

    const [timeInfo, dispatchTimes] = useReducer(manageTimes, {h: '00', m: '00', isRunning: false});

    const [checkText, setCheckText] = useState();
    const [checkLink, setCheckLink] = useState();

    function manageTimes(timeInfo, action) {
        switch(action.type) {
            case 'setHour':
                return {...timeInfo, h: action.h};
            case 'setMinute':
                return {...timeInfo, m: action.m};
        }
    }

    const start = () => {

    }

    const handleOptionCheck = () => {

    }

    const handleInputText = () => {
        
    }

    const onChange = (e) => {
        console.log('onChange 작동 -- ')
        if(e.target.name === 'hour') {
            const hour = setFormat(e.target.value);
            dispatchTimes({type:'setHour', h:hour});
        }
            
        if(e.target.name === 'minute') {
            const minute = setFormat(e.target.value)
            dispatchTimes({type:'setMinute', m:minute});
        }
    }

    function setFormat(num, type=false) {
        let formattedNum;
        formattedNum = num.toString().padStart(2, "0"); 

        if(num.length > 2) {
            formattedNum = num.substr(-2,2);
        }
    
        if(!type) {
            // 1. 59일 때 대체  -> 일의 자리만 대체
            if(formattedNum > 59) formattedNum = '59';
            if(num.substr(0,2) == '59') formattedNum = '5' + num.substr(-1,1);
        }else if(type == 'alarm_hour_am' || type == 'alarm_hour_pm') {
            // if(type === 'alarm_hour_am') {
            //     if(formattedNum > 11) formattedNum = '11';
            //     if(num.substr(0,2) == '11') formattedNum = '1' + (num.substr(-1,1) <=1 ? num.substr(-1,1) : '1');    
            // }else {
            //     if(formattedNum > 12) formattedNum = '12';
            //     if(num.substr(0,2) == '12') formattedNum = '1' + (num.substr(-1,1) <=1 ? num.substr(-1,1) : '2');
            // }
            if(formattedNum > 12) formattedNum = '12';
            if(num.substr(0,2) == '12') formattedNum = '1' + (num.substr(-1,1) <=1 ? num.substr(-1,1) : '2');
        }
         
        return formattedNum;
    }

    return (
        <div className={styles.entireFrame}>
        <div className={styles.routine__memo}>
            <div className={styles["routine__memo--label"]}>
                Memo : 
            </div>
             [ <input/> ]
        </div>

        <div className={styles.routineFrame}>

            <div className={styles.routine__time}>
                <div className={styles["routine__time--hour"]}>
                    <p>Hour</p>
                    <input 
                        type="number"
                        name="hour"
                        placeholder="00" 
                        value={timeInfo.h || ''} 
                        onChange={onChange} 
                        maxLength="2"
                        max="30"
                        min="0"
                        pattern="\d*"
                    />
                </div>
                <div className={styles["routine__time--colon"]}>:</div>
                <div className={styles["routine__time--minute"]}>
                    <p>Minute</p>
                    <input 
                        type="number" 
                        name="minute"
                        placeholder="00" 
                        value={timeInfo.m || ''}
                        onChange={onChange} 
                        maxLength="2" 
                        max="59"
                        min="0"
                    /> 
                </div>
            </div>

            <div className={styles.routine__wrappingOption}>
                <div className={styles.routine__option}>
                    <div className={styles["checkbox-wrapper-19"]}>
                        <input type="checkbox" id={"cbtest-19-text" + routineId} checked={checkText} onChange={handleOptionCheck}/>
                        <label htmlFor={"cbtest-19-text" + routineId} className={styles["check-box"]} name={'check-box' + routineId} /> 
                    </div>

                    <p>Text</p>   
                                        
                    <div className={styles["checkbox-wrapper-19"]}>
                        <input type="checkbox" id={"cbtest-19-link" + routineId} checked={checkLink} onChange={handleOptionCheck}/>
                        <label htmlFor={"cbtest-19-link" + routineId} className={styles["check-box"]} name={'check-box' + routineId}/> 
                    </div>
                    
                    <p>Link</p>
                </div>

                <div className={styles.routine__input}>
                    <input 
                        type="text"
                        onChange={handleInputText}
                    />
                </div>
            </div>

            <div className={styles.routine__button}>
                <div className={styles["routine__button--start"]} id={"btn_start" + routineId} onClick={start} >
                    START
                    {/* { !alarmMode ? 
                        (isRunning && (hour + minute + second) > 0 ? 'STOP' : 'START') : 
                        (alarmRunning ? 'STOP' : 'START')
                    } */}
                </div>
            </div>
        </div>
        </div>
    );
}
            