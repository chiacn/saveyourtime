import React, { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { getMissionLocalInfo } from '../../common/common';
import Mission from '../../components/feature/mission';
import Button from '../../components/ui/button';
import styles from './missionList.module.css';
import { GrPowerReset } from "react-icons/gr";
import { useFocusReducer } from '../../common/context';

export default function MissionList (props) {
    const localStorageInfo = getMissionLocalInfo();
    const lang = navigator.language;
    const isKor = lang.substring(0,2) === 'ko';

    // Context API 
    const [focusInfo, dispatchFocus] = useFocusReducer();
    const [isStart, setIsStart]= useState(false);
    const [missionInfo, dispatchMission] = useReducer(manageMission, {h: '00', m: '00', todo: undefined});
    const [missionBox, dispatchBox] = useReducer(manageBox, {success: [], failed: [], changed: 0});

    function manageMission(missionInfo, action) {
        switch(action.type) {
            case 'setHour':
                return {...missionInfo, h: action.h};
            case 'setMinute':
                return {...missionInfo, m: action.m};
            case 'setTodo':
                return {...missionInfo, todo: action.todo};
            case 'reset':
                return {...missionInfo, h: '00', m: '00', todo: ''}
            case 'localStorage':
                return {...missionInfo};
        }
    }

    function manageBox(missionBox, action) {
        switch(action.type) {
            case 'register':
                const missionKey = createMissionId();
                const h = missionInfo.h;
                const m = missionInfo.m;
                const todo = missionInfo.todo;
                dispatchMission({type: 'reset'});
                return {...missionBox, 
                           success: [
                            ...missionBox.success, 
                            <Mission 
                                key={missionKey} 
                                time={{h:h, m:m}} 
                                todo={todo} 
                                missionId={missionKey}
                            />
                           ], 
                           changed: missionBox.changed++}

            case 'start':
                let setStart = (action.value === 'START')
                if(action.value === 'START') {
                    setIsStart(true);
                }else {
                    setIsStart(false);
                }
                const newSuccess = missionBox.success.map((success) => {
                    const newProps =  {...success.props, setRunning: setStart, key: success.key}
                    return <Mission {...newProps}/>;
                })
                return {...missionBox, success: newSuccess, changed: missionBox.changed++};


            case 'updateBox':
                if(focusInfo?.missionList.length === 0) return {...missionBox}

                const unifiedList = [...missionBox.success, ...missionBox.failed];
                const successMissionList = focusInfo?.missionList.filter(mission => mission.state !== 'failed');
                const failedMissionList = focusInfo?.missionList.filter(mission => mission.state === 'failed');
                let updatedSuccess = [];
                let updatedFailed = [];
                
                unifiedList.map((list) => {
                    if(successMissionList.some(mission => mission.missionId === list.props.missionId)) updatedSuccess.push(list);
                    if(failedMissionList.some(mission => mission.missionId === list.props.missionId)) updatedFailed.push(list);
                })

                let newFailed = [];
                if(updatedFailed.length !== 0) {
                    for(let i in updatedFailed) {
                        const failedMissionProps = {...updatedFailed[i]?.props, key: updatedFailed.key, isFailed: true}
                        newFailed.push(<Mission {...failedMissionProps} />);
                    }
                }
                return {...missionBox, success: updatedSuccess, failed: newFailed, changed: missionBox.changed++}
            
            case 'localStorage':
                return {...missionBox, success: action.info.success, failed: action.info.failed};
            
            case 'reset':
                return {...missionBox, success: [], failed: [], changed: 0};

        }
    }


    const inputChange = (e) => {
        if(e.target.name === 'hour') {
            const hour = setFormat(e.target.value);
            dispatchMission({type:'setHour', h:hour});
        }
            
        if(e.target.name === 'minute') {
            const minute = setFormat(e.target.value)
            dispatchMission({type:'setMinute', m:minute});
        }
    }

    const todoChange = (e) => {
        dispatchMission({type: 'setTodo', todo: e.target.value});
    }

    const registerMission = () => {
        if(missionInfo.h == '00' && missionInfo.m == '00') {alert(isKor ? '시간을 입력해주세요' : 'Please input time'); return;}
        if(missionInfo.todo == undefined || missionInfo.todo == '') {alert(isKor ? '도전 과제를 입력해주세요' : 'Please input a challenge message'); return;}
        dispatchBox({type: 'register'});
    }


    const start = (e) => {
        dispatchBox({type: 'start', value: e.target.innerHTML});
    }

    const reset = () => {
        window.localStorage.removeItem('isStart');
        window.localStorage.removeItem('missionInfo');
        for( let mission of focusInfo.missionList) {
            window.localStorage.removeItem(JSON.stringify('mission' + mission.missionId));
        }

        setIsStart(false);
        dispatchMission({type: 'reset'});
        dispatchBox({type: 'reset'});
        dispatchFocus({type:'reset'});
    }

    // local storage
    useEffect(() => {
        window.localStorage.setItem('isStart', JSON.stringify(isStart));
        window.localStorage.setItem('missionInfo', JSON.stringify(missionInfo));
        window.localStorage.setItem('focusInfo', JSON.stringify(focusInfo));
    }, [isStart, missionInfo, missionBox, focusInfo])

    useEffect(() => {
        if(localStorageInfo?.missionBox !== undefined) {
            dispatchBox({type: 'localStorage', info: localStorageInfo.missionBox});
        }else {
            return;
        }

        if(
            localStorageInfo?.missionListData !== undefined && 
            localStorageInfo.missionListData.isStart !== null &&
            localStorageInfo.missionListData.missionInfo !== null &&
            localStorageInfo.missionListData.focusInfo !== null
          ) {
            dispatchMission({type: 'localStorage', info: localStorageInfo.missionListData.missionInfo});
            dispatchFocus({type: 'localStorage', info: localStorageInfo.missionListData.focusInfo});
        }else {
            return;
        }
    }, [])

    useEffect(() => {
        dispatchBox({type: 'updateBox'})
    }, [focusInfo.missionList])


    // Util
    function createMissionId() {
        return new Date().getTime().toString();
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
            if(formattedNum > 12) formattedNum = '12';
            if(num.substr(0,2) == '12') formattedNum = '1' + (num.substr(-1,1) <=1 ? num.substr(-1,1) : '2');
        }
         
        return formattedNum;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.registerContainer}>
                    {/* <div className={styles.percent}>
                        <span>0%</span>
                    </div> */}
                    <div className={styles.savedTime}>
                        <span>Saved Time</span>
                        <div className={styles.savedTime__time}>
                            {focusInfo.savedTime}{isKor ? '분' : 'min'}
                        </div>
                    </div>
                    <div className={styles.register}>
                        <div className={styles.register__time}> 
                            <div className={styles["register__time--hour"]}>
                                <p>Hour</p>
                                <input 
                                    type="number"
                                    name="hour"
                                    placeholder="00" 
                                    value={missionInfo.h || ''} 
                                    onChange={inputChange} 
                                    maxLength="2"
                                    max="30"
                                    min="0"
                                    pattern="\d*"
                                />
                            </div>
                            {/* <div className={styles["register__time--colon"]}>:</div> */}
                            <div className={styles["register__time--minute"]}>
                                <p>Minute</p>
                                <input 
                                    type="number" 
                                    name="minute"
                                    placeholder="00" 
                                    value={missionInfo.m || ''}
                                    onChange={inputChange} 
                                    maxLength="2" 
                                    max="59"
                                    min="0"
                                /> 
                            </div>
                        </div>
                        <div className={styles.register__input}>
                            Todo :   
                            <input 
                                value={missionInfo.todo}
                                onChange={todoChange}
                                placeholder={(isKor) ? ' 도전 과제를 입력해주세요' : '  Please input a Challenge'}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        { !isStart ?
                            <>
                                <div className={styles.register__button} onClick={registerMission}>
                                    Register
                                </div>
                                <div className={styles.startButton} onClick={start}>
                                    START
                                </div>
                            </>
                            :
                            <div className={styles.stopButton} onClick={start}>
                                STOP
                            </div>
                        }
                    </div>
                    <div className={styles.reset} onClick={reset}>
                        <GrPowerReset className={styles.reset__icon}/>
                    </div>
                </div>

 
                <div className={styles.missionContainer}>
                    <div className={styles.success}>
                        <div className={styles.success__title}>
                            Success
                        </div>                    
                        {missionBox.success.map(mission => mission)}
                    </div>
                    <div className={styles.failed}>
                        <div className={styles.failed__title}>
                            Failed
                        </div>
                        {missionBox.failed.map(mission => mission)}
                    </div>
                </div>
            </div>
        </>
    );
}