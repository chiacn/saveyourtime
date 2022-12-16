import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './timer.module.css';

export default function Timer() {
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [second, setSecond] = useState();
    
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);


    // 총합.
    
    const start = () => {
        
    }

    const add = (time) => {

    }

    const reset = () => {
        
    }



    function setFormat(num) {
        return num.toString().padStart(2, "0");        
    }

    const onChange = (e) => {
        /*
            로직
            1. input 값 바뀜 -> onChange -> setState 
            2. state 값 바뀜 -> useEffect 실행 ---(숫자 format 바꿔줌.)
         */
        if(e.target.name === 'hour')
            setHour(e.target.value);
        if(e.target.name === 'minute')
            setMinute(e.target.value);
        if(e.target.name === 'second')
            setSecond(e.target.value);
    }

    useEffect(() => {
        console.log('hour = ', hour)
        console.log('minute = ', minute)
        console.log('second = ', second)
        if(hour > 0) {
            setHour(setFormat(hour))
        }
        if(minute > 0) {
            setMinute(setFormat(minute));
        }
        if(second > 0) {
            setSecond(setFormat(second));
        }
    })

   

    return (

        // 클릭하면 아래로 이동하고 위에 뜨도록??
        <div className={styles.frame}>
            <div className={styles.hourArea}>
                <input 
                    type="number"
                    name="hour"
                    placeholder="00" 
                    value={hour} 
                    onChange={onChange} 
                    maxLength="2" 
                    min="0"
                /> :
            </div> 

            <div className={styles.minuteArea}>
                <input 
                    type="number" 
                    name="minute"
                    placeholder="00" 
                    value={minute}
                    onChange={onChange} 
                    maxLength="2" 
                    max="59"
                    min="0"
                /> :
            </div>

            <div className={styles.secondArea}>
                <input 
                    type="number" 
                    name="second"
                    placeholder="00" 
                    value={second}
                    onChange={onChange} 
                    maxLength="2"
                    max="59"
                    min="0"
                />
            </div>
            <div>
            </div>

        </div>
    );
} 

