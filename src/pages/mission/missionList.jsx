import React, { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import Mission from '../../components/feature/mission';
import Button from '../../components/ui/button';
import styles from './missionList.module.css';

export default function MissionList (props) {
    const lang = navigator.language;
    const isKor = lang.substring(0,2) === 'ko';
    const [success, setSuccess] = useState([]);
    const [failed, setFailed] = useState([]);
    const [missionInfo, dispatchMission] = useReducer(manageMission, {h: '00', m: '00', todo: undefined});
    const [missionBox, dispatchBox] = useReducer(manageBox, {success: [], failed: [], changed: 0});
    const [updateBox, dispatchUpdate] = useReducer(manageUpdate, {boxInfo: [], focusBoxId: undefined});
    

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
                const newSuccess = missionBox.success.map((success) => {
                    const newProps =  {...success.props, setRunning: true, key: success.key}
                    return <Mission {...newProps}/>;
                })
                return {...missionBox, success: newSuccess, changed: missionBox.changed++};

            case 'setFirstBox':
                return {...missionBox, success: action.newSuccess};

        }
    }

    function manageUpdate(updateBox, action) {
        switch(action.type) {
            case 'dummyInfo':
                const prevBoxInfo = [...updateBox.boxInfo];
                const missionId = action.boxInfo.missionId;

                if(prevBoxInfo.some(prev => prev.missionId !== missionId) || prevBoxInfo.length === 0)
                    prevBoxInfo.push(action.boxInfo)

                return {...updateBox, boxInfo: prevBoxInfo}

            case 'stateChange':
                const beforeBoxInfo = [...updateBox.boxInfo];
                const newBoxInfo = beforeBoxInfo.map((boxInfo) => {
                    if(boxInfo.missionId === action.boxInfo.missionId) {
                        console.log('boxIsadnfo = ', action.boxInfo.state)
                        return {...boxInfo, state: action.boxInfo.state};
                    }else {
                        return {...boxInfo}
                    }
                })
                return {...updateBox, boxInfo: newBoxInfo}
            
            case 'updateFocusBoxId':
                let focusBoxId;

                // 정렬 
                const sortedBoxInfo = updateBox.boxInfo.sort(function(a, b) {
                    return b.missionId - a.missionId 
                })

                // 정렬된 missionId 중에서 state === 'proceed'인 가장 빠른 값.
                sortedBoxInfo.map((boxInfo) => {
                    if(boxInfo.state === 'proceed') focusBoxId = boxInfo.missionId;
                })
                return {...updateBox, focusBoxId: focusBoxId};
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


    const start = () => {
        dispatchBox({type: 'start'});
    }

    useEffect(() => {
        console.log('focusBoxId = ', updateBox.focusBoxId)
        const newSuccess = missionBox.success.map((success, index) => {
            let newProps;
            console.log('success.props.missionId = ', success.props.missionId);
            
            if(success.props.missionId === updateBox.focusBoxId) {
                newProps = {...success.props, key: success.key, isFirst: true};
            }else {
                newProps = {...success.props, key: success.key};
            }
            return <Mission {...newProps}/>
        })

        dispatchBox({type: 'setFirstBox', newSuccess: newSuccess});
    }, [updateBox])
    // }, [updateBox.changed])


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
        }else {
            dispatchUpdate({type: 'dummyInfo', boxInfo: boxInfo });
        }
        dispatchUpdate({type: 'updateFocusBoxId'});
    }




    return (
        <>
            <div className={styles.container}>
                <div className={styles.registerContainer}>
                    <div className={styles.percent}>
                        <span>0%</span>
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
                        <div className={styles.register__button} onClick={registerMission}>
                            Register
                            {/* <Button 
                                type="text_shape"
                                text="Register"
                                font="eng_rubik_bubbles"
                                font_size="20px"
                                color="rgb(0, 129, 255)"
                            /> */}
                        </div>
                        <div className={styles.startButton} onClick={start}>
                            START
                            {/* <Button 
                                type="text_shape"
                                text="START"
                                font="eng_rubik_bubbles"
                                font_size="20px"
                                color="rgb(0, 184, 147)"
                                // onClick={() => closeRoutine(map.props.routineId)}
                            /> */}
                        </div>
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