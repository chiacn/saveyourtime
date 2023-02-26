import React from 'react';
import { useEffect } from 'react';
import styles from './time.module.css'

export default function Time({
    alarmMode=false,
    themeColor,
    timeChange,
    hour,
    minute,
    second,
    alarmInfo=false,
    type="timer"
}) {

    const handleTimeChange = (e) => {
        let formattedNum;
        if(e.target.id === 'alarmDay') {
            const type = ((e.target.innerHTML == 'AM') ? 'alarm_hour_am' : 'alarm_hour_pm');
            formattedNum = setFormat(e.target.innerHTML, type);
        }else {
            formattedNum = setFormat(e.target.value);
        }
        timeChange(e, formattedNum);
    }

    // Util
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
            if(formattedNum > 12) formattedNum = '12';
            if(num.substr(0,2) == '12') formattedNum = '1' + (num.substr(-1,1) <=1 ? num.substr(-1,1) : '2');
        }
         
        return formattedNum;
    }

    return (
        <>
        {(type === "timer") &&
            <>
                {!alarmMode &&
                    <div className={styles.timer}>
                        <div className={styles.timer__hourArea}>
                            <input 
                                type="number"
                                id="hour"
                                name="hour"
                                placeholder="00" 
                                value={hour || ''} 
                                onChange={handleTimeChange} 
                                maxLength="2"
                                max="30"
                                min="0"
                                pattern="\d*"
                            /> :
                        </div> 

                        <div className={styles.timer__minuteArea}>
                            <input 
                                type="number"
                                id="minute"
                                name="minute"
                                placeholder="00" 
                                value={minute || ''}
                                onChange={handleTimeChange} 
                                maxLength="2" 
                                max="59"
                                min="0"
                            /> :
                        </div>

                        <div className={styles.timer__secondArea}>
                            <input 
                                type="number"
                                id="second"
                                name="second"
                                placeholder="00" 
                                value={second || ''}
                                onChange={handleTimeChange} 
                                maxLength="2"
                                max="59"
                                min="0"
                            />
                        </div>
                    </div>
                }
                {alarmMode &&
                    <div className={styles.alarm}>
                        <div className={styles.alarm__day}>
                            <div className={styles["alarm__day--text"]} id="alarmDay" onClick={timeChange}>
                                {alarmInfo.DAY}
                            </div>
                        </div>
                        <div className={styles.alarm__wrapping_time}>
                            <div className={styles.alarm__hour}>
                                <input 
                                    type="number"
                                    id="alarmHour"
                                    value={alarmInfo.HOUR}
                                    onChange={handleTimeChange}
                                    placeholder="00"
                                    maxLength="2"
                                    max="59"
                                    min="0"
                                />
                            </div>
                            <div className={styles.alarm__hour_colon}>
                                :
                            </div>
                            
                            <div className={styles.alarm__minute}>
                                <input
                                    type="number"
                                    id="alarmMinute"
                                    value={alarmInfo.MINUTE}
                                    onChange={handleTimeChange}
                                    placeholder="00"
                                    maxLength="2"
                                    max="59"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>                    
                }
            </>
        }
        {(type === 'mission') &&
            <>
                <div className={styles["mission__hour"]}>
                <p>Hour</p>
                <input 
                    type="number"
                    name="hour"
                    placeholder="00" 
                    value={hour || ''} 
                    onChange={handleTimeChange} 
                    maxLength="2"
                    max="30"
                    min="0"
                    pattern="\d*"
                />
                </div>
                <div className={styles["mission__minute"]}>
                    <p>Minute</p>
                    <input 
                        type="number" 
                        name="minute"
                        placeholder="00" 
                        value={minute || ''}
                        onChange={handleTimeChange} 
                        maxLength="2" 
                        max="59"
                        min="0"
                    /> 
                </div>
            </>
        }
        </>
    );      
}