import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './timer.module.css';

export default function Timer() {
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [second, setSecond] = useState();
    
    // const [time, setTime] = useState({h:0, m:0, s:0});

    // 총합.

    const run = () => {
        const totalTime = calculateTime(1);

        const hour = parseInt(totalTime / 3600);
        const remaining_hour = parseInt(totalTime % 3600);
        const minute = parseInt(remaining_hour / 60);
        const second = parseInt(remaining_hour % 60);

        console.log('totalTime = ', totalTime)
        console.log('hour = ', hour)
        console.log('minute = ', minute)
        console.log('second = ', second)

        // totalTime 0이면 멈추는 로직 넣기
        
        
        setHour(hour);
        setMinute(minute);
        setSecond(second);

    }
    
    const start = () => {
        setInterval(run, 1000);
    }

    const stop = () => {

    }

    const add = (time) => {

    }

    const reset = () => {
        
    }


    function calculateTime(minusNum) {
        console.log('calculateTime / hour = ', Number(hour))
        const h = hour == undefined ? 0 : Number(hour);
        const m = minute == undefined ? 0 : Number(minute);
        const s = second == undefined ? 0 : Number(second);
        console.log((h*3600 + m*60 + s))

        return (h*3600 + m*60 + s) - minusNum;
    }



    const onChange = (e) => {

        if(e.target.name === 'hour') {
            const hour = setFormat(e.target.value);
            setHour(hour);
        }
            
        if(e.target.name === 'minute') {
            const minute = setFormat(e.target.value)
            setMinute(minute);
        }
        if(e.target.name === 'second') {
            const second = setFormat(e.target.value);
            setSecond(e.target.value);
        }
    }

    function setFormat(num) {
        let formattedNum;
        formattedNum = num.toString().padStart(2, "0"); 

        if(num.length > 2) {
            formattedNum = num.substr(-2,2);
        }
        
        // 1. 59일 때 대체  -> 일의 자리만 대체
        if(formattedNum > 59) formattedNum = '59';
        if(num.substr(0,2) == '59') formattedNum = '5' + num.substr(-1,1);
         
        return formattedNum;
    }

    return (
        <div className={styles.frame}>
            <div className={styles.timer}>
                <div className={styles.timer__hourArea}>
                    <input 
                        type="number"
                        name="hour"
                        placeholder="00" 
                        value={hour || ''} 
                        onChange={onChange} 
                        maxlength="2"
                        max="30"
                        min="0"
                        pattern="\d*"
                    /> :
                </div> 

                <div className={styles.timer__minuteArea}>
                    <input 
                        type="number" 
                        name="minute"
                        placeholder="00" 
                        value={minute || ''}
                        onChange={onChange} 
                        maxLength="2" 
                        max="59"
                        min="0"
                    /> :
                </div>

                <div className={styles.timer__secondArea}>
                    <input 
                        type="number" 
                        name="second"
                        placeholder="00" 
                        value={second || ''}
                        onChange={onChange} 
                        maxLength="2"
                        max="59"
                        min="0"
                    />
                </div>
            </div>
            <div className={styles["button__timer-btn"]}>
                <button onClick={start}>
                    START
                </button>
                <button>
                    Reset
                </button>
            </div>
            
            <div className={styles["button__timer-add"]}>
                <button>
                    +10s 
                </button>
                <button>
                    +30s 
                </button>
                <button>
                    +10m 
                </button>
                
                <button>
                    +30m 
                </button>
                <button>
                    +1h 
                </button>
            </div>

            <div className={styles.button__click}>
                <button>
                    Option
                </button>
            </div>

        </div>
    );
} 

