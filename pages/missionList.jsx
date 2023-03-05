import React, { useEffect } from 'react';
import { useState } from 'react';
import { useReducer } from 'react';
import { getMissionLocalInfo } from '../common/common';
import Mission from '../components/feature/mission';
import styles from './missionList.module.css';
import { GrPowerReset } from "react-icons/gr";
import { useFocusReducer } from '../common/context';
import Time from '../components/ui/time';

export default function MissionList (props) {
    const [lang, setLang] = useState();
    const [localStorageInfo, setLocalStorageInfo] = useState();

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


    const timeChange = (e, formattedNum) => {
        if(e.target.name === 'hour') {
            const hour = formattedNum;
            dispatchMission({type:'setHour', h:hour});
        }
            
        if(e.target.name === 'minute') {
            const minute = formattedNum;
            dispatchMission({type:'setMinute', m:minute});
        }
    }

    const todoChange = (e) => {
        dispatchMission({type: 'setTodo', todo: e.target.value});
    }

    const registerMission = () => {
        if(missionInfo.h == '00' && missionInfo.m == '00') {alert((lang?.substring(0,2) === 'ko') ? '시간을 입력해주세요' : 'Please input time'); return;}
        if(missionInfo.todo == undefined || missionInfo.todo == '') {alert((lang?.substring(0,2) === 'ko') ? '도전 과제를 입력해주세요' : 'Please input a challenge message'); return;}
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
        //setLang
        setLang(navigator.language);

        setLocalStorageInfo(getMissionLocalInfo());
    }, [])

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
    }, [localStorageInfo])

    useEffect(() => {
        dispatchBox({type: 'updateBox'})
    }, [focusInfo.missionList])


    // Util
    function createMissionId() {
        return new Date().getTime().toString();
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
                            {focusInfo.savedTime}{(lang?.substring(0,2) === 'ko') ? '분' : 'min'}
                        </div>
                    </div>
                    <div className={styles.register}>
                        <div className={styles.register__time}> 
                            <Time
                                type="mission"
                                hour={missionInfo.h}
                                minute={missionInfo.m}
                                timeChange={timeChange}
                            />
                        </div>
                        <div className={styles.register__input}>
                            Todo :   
                            <input 
                                value={missionInfo.todo}
                                onChange={todoChange}
                                placeholder={(lang?.substring(0,2) === 'ko') ? ' 도전 과제를 입력해주세요' : '  Please input a Challenge'}
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