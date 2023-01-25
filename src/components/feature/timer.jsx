import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { useInterval } from '../../common/common';
import Button from '../ui/button';
import styles from './timer.module.css';
import { FiRepeat } from "react-icons/fi";

export default function Timer({
    frameId,
    alarmMode=false,
    themeColor,
    localStorage,
}) {
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [second, setSecond] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [inputText, setInputText] = useState();

    // Checkbox 관련 
    const [checkLink, setCheckLink] = useState(false);
    const [checkText, setCheckText] = useState(true);

    //useRef
    const refCheckBox = useRef();
    const refBtnStart = useRef();
    const refBtnReset = useRef();
    const refLoadingBtn = useRef();
    const refRepeat = useRef();

    // alarmMode 관련
    const [alarmRunning, setAlarmRunning] = useState(false);
    const [alarmInfo, dispatchAlarm] = useReducer(manageAlarm, {DAY:'AM', HOUR: '00', MINUTE: '00'});

    // repeat버튼
    const [isRepeat, setIsRepeat] = useState(false);


    const start = (e) => {
        if(!alarmMode) {
            if(e.target.innerHTML === 'START') {
                if(calculateTime() > 0) {
                    setIsRunning(true);
                }
            }else {
                setIsRunning(false);
            }
        }else {
            if(e.target.innerHTML === 'START') {
                // Button 변경
                refLoadingBtn.current.style.display = 'flex';
                setAlarmRunning(true);
            }else {
                refLoadingBtn.current.style.display = 'none';
                setAlarmRunning(false);
            }
        }
    }

    useInterval(
        run,
        isRunning ? 1000 : null
    )     

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setHour(0);
        setMinute(0);
        setSecond(0);
        setIsRunning(false);
        setIsRepeat(false);
    }

    function run() {

        if(isRunning) {
            const totalTime = calculateTime(1);

            // 정수로 바꿔주기 위해 parseInt
            const hour = parseInt(totalTime / 3600).toString().padStart(2,"0");
            const remaining_hour = parseInt(totalTime % 3600).toString().padStart(2,"0");
            const minute = parseInt(remaining_hour / 60).toString().padStart(2,"0");
            const second = parseInt(remaining_hour % 60).toString().padStart(2,"0");

            if(totalTime < 0) {
                setIsRunning(false)
                popupBrowser();

                // repeat 기능 추가
                if(isRepeat) {
                    // 최소 10분 이상이어야 수행되는 로직? (안전성을 위해서)
                    if(Number(isRepeat.h)*3600 + Number(isRepeat.m)*60 + Number(isRepeat.s) >= 600) {
                        setHour(isRepeat.h);
                        setMinute(isRepeat.m);
                        setSecond(isRepeat.s);
                        setIsRunning(true);
                    }
                }

                return;
            };

            setHour(hour);
            setMinute(minute);
            setSecond(second);

        }else if(alarmRunning) {
            const date = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            const presentTime = new Intl.DateTimeFormat('en-US', options).format(date);
            const settingTime = alarmInfo.HOUR + ':' + alarmInfo.MINUTE + ' ' + alarmInfo.DAY;

            if(presentTime == settingTime) {
                refLoadingBtn.current.style.display = 'none';
                setAlarmRunning(false);
                popupBrowser();
            }
        }
    }

    function calculateTime(minusNum=false) {
        const h = hour == undefined ? 0 : Number(hour);
        const m = minute == undefined ? 0 : Number(minute);
        const s = second == undefined ? 0 : Number(second);
        if(minusNum) {
            return (h*3600 + m*60 + s) - minusNum;
        }else {
            return (h*3600 + m*60 + s);
        }
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
            setSecond(second);
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

    // checkbox 관련 로직
    const handleOptionCheck = (e) => {
        if(e.target.id === 'cbtest-19-link' + frameId) { // Link 클릭할 때
            !checkLink && setCheckLink(true) 
            if(!checkLink) {
                setCheckLink(true); 
                setCheckText(false);
            }
        }else {
            if(!checkText) {
                setCheckText(true);
                setCheckLink(false);
            }
        }
    }

    // InputText
    const handleInputText = (e)  => {
        setInputText(e.target.value);
    }

    // Mode Change
    useEffect(() => {
        const checkBox = document.getElementsByName('check-box' + frameId);
        // const btnStart = document.getElementById("btn_start" + frameId);
        // const btnReset = document.getElementById("btn_reset" + frameId);
        // const btnLoading = document.getElementById("btn_loading" + frameId);
        if(alarmMode) {
            checkBox[0].style["border-color"] = themeColor.alarm;
            checkBox[1].style["border-color"] = themeColor.alarm;
            refBtnStart.current.style["background-color"] = themeColor.alarm;
            refBtnReset.current.style.display = 'none';
            refLoadingBtn.current.style["background-color"] = themeColor.alarm;
            alarmRunning && (refLoadingBtn.current.style.display = 'flex');
        }else {
            checkBox[0].style["border-color"] = themeColor.timer;
            checkBox[1].style["border-color"] = themeColor.timer;
            refBtnStart.current.style["background-color"] = themeColor.timer;
            refBtnReset.current.style["background-color"] = themeColor.timer;
            refLoadingBtn.current.style.display = 'none';
            refLoadingBtn.current.style["background-color"] = themeColor.timer;
        }
    }, [alarmMode])

    // Button 관련
    useEffect(() => { 
    //     const btnStart = document.getElementById("btn_start" + frameId);
    //     const btnReset = document.getElementById("btn_reset" + frameId);
        if(calculateTime() === 0 && !isRunning) {
            refBtnReset.current.style.display = 'none';
            refBtnStart.current.style["margin-right"] = '0px';
        }else if(isRunning && !alarmMode) {
            refBtnReset.current.style.display = 'flex';
        }
    })


    // themeColor Change
    /*
        자바스크립트에서 동적으로 CSS Pseudo element를 제어할 수는 없는듯 함. 
        theme color가 변경되면 
        CSS에서 .checkbox-wrapper-19 .check-box::after 의 background-color를 변경해주기
     */


    // Alarm Mode 관련 로직
    
    useInterval(
        run,
        alarmRunning ? 1000 : null
    )     

    function manageAlarm(alarmInfo, action) {
        switch(action.type) {
            case 'DAY':
                alarmInfo.HOUR = '00';
                alarmInfo.MINUTE = '00';
                return {...alarmInfo, DAY: (action.value == 'AM' ? 'PM' : 'AM')}

            case 'HOUR':
                const type = ((alarmInfo.DAY == 'AM') ? 'alarm_hour_am' : 'alarm_hour_pm');
                return {...alarmInfo, HOUR: setFormat(action.value, type)}

            case 'MINUTE':
                return {...alarmInfo, MINUTE: setFormat(action.value)}

            case 'localStorage':
                return {...alarmInfo, DAY: action.value.DAY, HOUR: action.value.HOUR, MINUTE: action.value.MINUTE};

        }
    }

    const changeAlarm = (e) => {
        switch(e.target.id) {
            case 'alarmDay':
                dispatchAlarm({type:'DAY', value: e.target.innerHTML});
                break;
            case 'alarmHour':
                dispatchAlarm({type:'HOUR', value: e.target.value});
                break;
            case 'alarmMinute':
                dispatchAlarm({type:'MINUTE', value: e.target.value});
                break;
        }
    }

    // Popup
    function popupBrowser() {
        if(checkText) {
            const text = (inputText === undefined) ? '' : inputText;
            const popup = window.open();
            popup.document.write(
                `
                    <style>
                        .container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        p {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: rgb(0, 129, 255);
                            font-size: 100px;
                            overflow-wrap: break-word;
                            height: 200px;
                            width: 100%;
                        }
                    </style>
                    <div class="container">
                        <p>${text}</p>
                    </div>
                `
            )
            popup.alert(text)
        }else {
            // Link format
            let formattedInputText = inputText;
            if(inputText.indexOf('https://') === -1 && inputText.indexOf('http://') === -1) {
                formattedInputText = `https://${inputText}`;
            }
            const popup = setTimeout(window.open(formattedInputText));
        }
    }

    //Repeat
    const repeat = () => {

        if((calculateTime() < 600 )&& isRepeat === false) {
            let message;
            let lang = navigator.language;
            if(lang.substring(0,2) === 'ko') {
                message = '반복 기능은 10분 이상일 경우만 사용할 수 있습니다.';
            }else {
                message = 'Please set repeat time more than 10 minutes';
            }
            alert(message);
            return;
        }

        if(!isRunning ) {
            // isRepeat이 설정됐을 때 repeat 버튼을 누르면 해제 / 설정 안 됐을 때 누르면 설정.
            isRepeat ? setIsRepeat(false) : setIsRepeat({h: format(hour), m: format(minute), s: format(second)});
        }else {
            return;
        }

        function format(time) {
            return (time === undefined || time == '0') ? '00' : time;
        }
    }

    useEffect(() => {
        
        if(isRunning) {
            refRepeat.current.style.opacity = '0.6';
        }else {
            refRepeat.current.style.opacity = '1';
        }

        if(!alarmMode) {
            refRepeat.current.style.display = 'flex';
        }else {
            refRepeat.current.style.display = 'none';
        }

        if(isRepeat) {
            refRepeat.current.style.opacity = '1';
        }else {
            refRepeat.current.style.opacity = '0.6';
        }


    }, [isRepeat, alarmMode, isRunning])


    // local storage
    useEffect(() => {
        const storeKey = JSON.stringify(frameId);
        const storeValue = JSON.stringify({
            frameId: frameId,
            alarmMode: alarmMode,
            hour: hour,
            minute: minute,
            second: second,
            isRunning: isRunning,
            inputText: inputText,
            checkLink: checkLink,
            checkText: checkText,
            alarmRunning: alarmRunning,
            alarmInfo: alarmInfo,
            isRepeat: isRepeat
        });
        window.localStorage.setItem(storeKey, storeValue)
    }, [alarmMode, hour, minute, second, isRunning, inputText, checkLink, checkText, alarmRunning, alarmInfo, isRepeat])

    useEffect(() => {
        if(localStorage) {
            setHour(localStorage.hour);
            setMinute(localStorage.minute);
            setSecond(localStorage.second);
            setIsRunning(localStorage.isRunning);
            setInputText(localStorage.inputText);
            setCheckLink(localStorage.checkLink);
            setCheckText(localStorage.checkText);
            setAlarmRunning(localStorage.alarmRunning);
            setIsRepeat(localStorage.isRepeat);
            dispatchAlarm({type:'localStorage', value:localStorage.alarmInfo})
        }
    }, [])

    return (
        <div className={styles.frame}>
            {!alarmMode &&
                <div className={styles.timer}>
                    <div className={styles.timer__hourArea}>
                        <input 
                            type="number"
                            name="hour"
                            placeholder="00" 
                            value={hour || ''} 
                            onChange={onChange} 
                            maxLength="2"
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
            }
            {alarmMode &&
                <div className={styles.alarm}>
                    <div className={styles.alarm__day}>
                        {/* <div className={styles["alarm__day--btnUp"]}/> */}
                        <div className={styles["alarm__day--text"]} id="alarmDay" onClick={changeAlarm}>
                            {alarmInfo.DAY}
                        </div>
                        {/* <div className={styles["alarm__day--btnDown"]}/> */}
                    
                    </div>
                    <div className={styles.alarm__wrapping_time}>
                        <div className={styles.alarm__hour}>
                            <input 
                                type="number"
                                id="alarmHour"
                                value={alarmInfo.HOUR}
                                onChange={changeAlarm}
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
                                onChange={changeAlarm}
                                placeholder="00"
                                maxLength="2"
                                max="59"
                                min="0"
                            />
                        </div>
                    </div>
                </div>                    
            }
            <div className={styles["timer__feature"]}>
                <div className={styles.timer__option}>
                    <div className={styles["checkbox-wrapper-19"]}>
                        <input type="checkbox" id={"cbtest-19-text" + frameId} checked={checkText} onChange={handleOptionCheck}/>
                        { !alarmMode ?
                            <label htmlFor={"cbtest-19-text" + frameId} className={styles["check-box"]} name={'check-box' + frameId} ref={refCheckBox}/> :
                            <label htmlFor={"cbtest-19-text" + frameId} className={styles["check-box-alarmMode"]} name={'check-box' + frameId}/>
                        }
                    </div>

                    <p>Text</p>   
                                     
                    <div className={styles["checkbox-wrapper-19"]}>
                        <input type="checkbox" id={"cbtest-19-link" + frameId} checked={checkLink} onChange={handleOptionCheck}/>
                        { !alarmMode ? 
                            <label htmlFor={"cbtest-19-link" + frameId} className={styles["check-box"]} name={'check-box' + frameId}/> :
                            <label htmlFor={"cbtest-19-link" + frameId} className={styles["check-box-alarmMode"]} name={'check-box' + frameId}/>
                        }
                    </div>
                    
                    <p>Link</p>
                </div>
           
                <div className={styles["timer__input"]}>
                    <input 
                        type="text"
                        onChange={handleInputText}
                        value={inputText}
                    />
                </div>

                <div className={styles.timer__button}>
                    
                    <div className={styles["timer__button--loading"]} id={"btn_loading" + frameId} ref={refLoadingBtn}>
                        <div className={styles["loading-button1"]} />
                        <div className={styles["loading-button2"]} />
                        <div className={styles["loading-button3"]} />
                    </div>
                    
                    
                    <div className={styles["timer__button--start"]} id={"btn_start" + frameId} onClick={start} ref={refBtnStart}>
                        { !alarmMode ? 
                            (isRunning && (hour + minute + second) > 0 ? 'STOP' : 'START') : 
                            (alarmRunning ? 'STOP' : 'START')
                        }
                    </div>

                    <div className={styles["timer__button--reset"]} id={"btn_reset" + frameId} onClick={reset} ref={refBtnReset}>
                        Reset
                    </div>
                </div>
                
                
                <div className={styles.timer__repeatBtn} ref={refRepeat}>
                    <div className={styles["timer__repeatBtn--text"]}>
                        {isRepeat ? `Repeat - ${isRepeat.h}:${isRepeat.m}:${isRepeat.s}` : 'Repeat'}
                    </div>
                    <div className={styles["timer__repeatBtn--icon"]} onClick={repeat}>
                        <FiRepeat />
                    </div>
                    <div className={styles["timer__repeatBtn--time"]}>
                        
                    </div>
                </div>
                
            </div>
        </div>

    );
} 

