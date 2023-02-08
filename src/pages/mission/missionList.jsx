import React, { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import Mission from '../../components/feature/mission';
import Button from '../../components/ui/button';
import styles from './missionList.module.css';

export default function MissionList (props) {
    const lang = navigator.language;
    const isKor = lang.substring(0,2) === 'ko';
    const [isStart, setIsStart]= useState(false);
    const [missionInfo, dispatchMission] = useReducer(manageMission, {h: '00', m: '00', todo: undefined});
    const [missionBox, dispatchBox] = useReducer(manageBox, {success: [], failed: [], changed: 0});
    const [dummyBox, dispatchUpdate] = useReducer(manageUpdate, {boxInfo: [], focusBoxId: undefined});
    const [stats, dispatchStats] = useReducer(manageStats, {savedTime: 0})
    

    function manageMission(missionInfo, action) {
        switch(action.type) {
            case 'setHour':
                return {...missionInfo, h: action.h};
            case 'setMinute':
                return {...missionInfo, m: action.m};
            case 'setTodo':
                return {...missionInfo, todo: action.todo};
        }
    }

    function manageBox(missionBox, action) {
        switch(action.type) {
            case 'register':
                const missionKey = createMissionId();
                return {...missionBox, 
                           success: [
                            ...missionBox.success, 
                            <Mission 
                                key={missionKey} 
                                time={{h:missionInfo.h, m:missionInfo.m}} 
                                todo={missionInfo.todo} 
                                stateCallback={stateCallback}
                                missionId={missionKey}
                            />
                           ], 
                           changed: missionBox.changed++}

            case 'start':
                if(action.value === 'START') {
                    setIsStart(true);
                }else {
                    setIsStart(false);
                }
                
                const newSuccess = missionBox.success.map((success) => {
                    const newProps =  {...success.props, setRunning: isStart, key: success.key}
                    return <Mission {...newProps}/>;
                })
                return {...missionBox, success: newSuccess, changed: missionBox.changed++};

            case 'setFocusBox':
                return {...missionBox, success: action.newSuccess, changed: missionBox.changed++};

            case 'updateBox':
                const updatedSuccess = missionBox.success.filter((success) => success.props.missionId !== action.boxInfo.missionId);
                const failedMission = missionBox.success.filter((success) => success.props.missionId === action.boxInfo.missionId);
                const failedMissionProps = {...failedMission[0]?.props, key: failedMission.key, isFailed: true}
                const updatedFailed = [...missionBox.failed, <Mission {...failedMissionProps} />]
                return {...missionBox, success: updatedSuccess, failed: updatedFailed, changed: missionBox.changed++}
        }
    }

    function manageUpdate(dummyBox, action) {
        const prevBoxInfo = [...dummyBox.boxInfo];
        switch(action.type) {
            case 'dummyInfo':
                const missionId = action.boxInfo.missionId;

                // some - 요소 중 하나라도 true면 true반환 -> 여기선 하나라도 일치하는게 없어야하므로 prev.missionId === missionId가 false가 나와야함. => !붙여줌
                if(!prevBoxInfo.some(prev => prev.missionId === missionId) || prevBoxInfo.length === 0) {
                    prevBoxInfo.push(action.boxInfo)
                }
                return {...dummyBox, boxInfo: prevBoxInfo}

            case 'stateChange':
                const newBoxInfo = prevBoxInfo.map((boxInfo) => {
                    if(boxInfo.missionId === action.boxInfo.missionId) {
                        return {...boxInfo, state: action.boxInfo.state, time:action.boxInfo?.time};
                    }else {
                        return {...boxInfo}
                    }
                })
                return {...dummyBox, boxInfo: newBoxInfo}
            
            case 'failed':
                const removedBoxInfo = prevBoxInfo.filter((boxInfo) => boxInfo.missionId !== action.boxInfo.missionId);
                return {...dummyBox, boxInfo: removedBoxInfo}
            
            case 'updateFocusBoxId':
                let focusBoxId;

                // 정렬 
                const sortedBoxInfo = dummyBox.boxInfo.sort(function(a, b) {
                    return b.missionId - a.missionId 
                })

                // 정렬된 missionId 중에서 state === 'proceed'인 가장 빠른 값.
                sortedBoxInfo.map((boxInfo) => {
                    if(boxInfo.state === 'proceed') focusBoxId = boxInfo.missionId;
                })
                return {...dummyBox, focusBoxId: focusBoxId};
        }
    }

    function manageStats(stats, action) {
        switch(action.type) {
            case 'updateSavedTime':
                let savedTime = 0;
                dummyBox.boxInfo.map((box) => {
                    if(box.state === 'success') {
                        savedTime = savedTime + (Number(box.time.h)*60 + Number(box.time.m));
                    }
                })
                return {...stats, savedTime: savedTime}
        }
    }


    const onChange = (e) => {
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
        dispatchBox({type: 'register'});
    }


    const start = (e) => {
        dispatchBox({type: 'start', value: e.target.innerHTML});
    }

    useEffect(() => {
        const newSuccess = missionBox.success.map((success, index) => {
            let newProps;
            if(success.props.missionId === dummyBox.focusBoxId) {
                newProps = {...success.props, key: success.key, focused: true, setRunning: isStart};
            }else {
                newProps = {...success.props, key: success.key};
            }
            return <Mission {...newProps}/>
        })
        dispatchBox({type: 'setFocusBox', newSuccess: newSuccess});
    }, [dummyBox, isStart])
    // }, [updateBox.changed])

    useEffect(() => {
        if(!dummyBox.boxInfo.some(box => box.state === 'proceed')) setIsStart(false);
    }, [dummyBox.boxInfo])


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

    function stateCallback(boxInfo, type) {
        if(type === 'stateChange') {
            dispatchUpdate({type: 'stateChange', boxInfo: boxInfo });
            dispatchStats({type: 'updateSavedTime'})
        }else if(type === 'failed') {
            dispatchUpdate({type: 'failed', boxInfo: boxInfo});
            dispatchBox({type: 'updateBox', boxInfo: boxInfo});
        }else {
            dispatchUpdate({type: 'dummyInfo', boxInfo: boxInfo });
        }
        dispatchUpdate({type: 'updateFocusBoxId'});
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
                            {stats.savedTime}{isKor ? '분' : 'min'}
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
                                    onChange={onChange} 
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
                                    onChange={onChange} 
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