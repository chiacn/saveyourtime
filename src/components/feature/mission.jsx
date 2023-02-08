import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useReducer } from 'react';
import { useInterval } from '../../common/common';
import styles from './mission.module.css';

export default function Mission({
    color,
    time,
    todo,
    run,
    setRunning=false,
    focused=false,
    stateCallback,
    missionId,
    isFailed = false
}) {
    // console.log(` missionId = ${missionId} / setRunning = ${setRunning} /focused = ${focused} / isFailed = ${isFailed} / time = ${time.m}`)
    const [isRunning, setIsRunning] = useState();
    const ref_text = useRef();
    const ref_container = useRef();
    const ref_percent__bar = useRef();
    const ref_success = useRef();
    const ref_completed = useRef();
    const ref_failed = useRef();

    const ref_percent_value = useRef(180);

    const [timeInfo, dispatchTime] = useReducer(manageTime, {h: time.h, m: time.m, s: '00', time: `${time.h}:${time.m}:00`, state: 'proceed'});
    function manageTime(timeInfo, action) {
        switch(action.type) {
            case 'init':
                return
            case 'success':
                stateCallback({missionId: missionId, state: 'success'}, 'stateChange');
                return {...timeInfo, state: 'success'};
            case 'failed':
                stateCallback({missionId: missionId, state: 'failed'}, 'failed');
                return {...timeInfo, state: 'failed'}
            case 'run':
                return {...timeInfo, h: action.h, m: action.m, s: action.s};
            }
    }


    // 작동 로직
    useInterval(
        run,
        isRunning ? 1000 : null
    )

    function run() {
        if(isFailed) return;
        
        const totalTime = calculateTime(1);
        if(totalTime === 0 || !focused || timeInfo.state !== 'proceed' ) {
            setIsRunning(false);

            // 시간 내에 Success 버튼을 누르지 못했을 경우
            (totalTime === 0 && timeInfo.state !== 'success') && dispatchTime({type: 'failed'});
            
            return
        }
        // 정수로 바꿔주기 위해 parseInt
        const h = parseInt(totalTime / 3600).toString().padStart(2,"0");
        const remaining_hour = parseInt(totalTime % 3600).toString().padStart(2,"0");
        const m = parseInt(remaining_hour / 60).toString().padStart(2,"0");
        const s = parseInt(remaining_hour % 60).toString().padStart(2,"0");

        dispatchTime({type: 'run', h:h, m:m, s:s})
    }

    // 계산 로직
    function calculateTime(minusNum=false) {
        const h = timeInfo.h == undefined ? 0 : Number(timeInfo.h);
        const m = timeInfo.m == undefined ? 0 : Number(timeInfo.m);
        const s = timeInfo.s == undefined ? 0 : Number(timeInfo.s);

        const total = (h*3600 + m*60 + s);

        if(total === 0) return total;

        if(minusNum) {
            return total - minusNum;
        }else {
            return total;
        }
    }

    const changeState = (e) => {
        if(e.target.innerHTML === 'Success') {
            dispatchTime({type: 'success'})
        }
    }

    useEffect(() => {
        const lang = navigator.language;
        if(lang.substring(0,2) === 'ko') {
            ref_text.current.style["font-family"] = "'Jua', sans-serif";
            ref_text.current.style["font-size"] = '20px';
        }

        if(isFailed) {
            ref_failed.current.style.display = 'flex';
            ref_success.current.style.display = 'none';
            ref_container.current.style.color = 'rgb(228, 54, 69)';
            ref_percent__bar.current.style["background-color"] = 'rgb(228, 54, 69)';
        }else {
            ref_failed.current.style.display = 'none';
        }
    }, [])

    useEffect(() => {
        if(timeInfo.state === 'success') {
            ref_container.current.style.color = 'black';
            ref_percent__bar.current.style["background-color"] ='black';
            
            ref_success.current.style.display = 'none';
            ref_completed.current.style.display = 'flex';
        }

        // focussing Box Check
        stateCallback({missionId: missionId, state: timeInfo.state});
    }, [timeInfo.state])

    useEffect(() => {
        (timeInfo.state === 'proceed') && setIsRunning(setRunning ? true : false)
    })

    useEffect(() => {
        if(focused && !isFailed) {
            ref_success.current.style.display = 'flex';
        }else {
            ref_success.current.style.display = 'none';
        }
    }, [focused])

    useEffect(() => {
        // 시간에 따라 줄어드는 bar UI 
        const originWidth = ref_percent__bar.current.style.width.replace('px', '');
        const minusWidth = originWidth / calculateTime();
        ref_percent_value.current = ref_percent_value.current - minusWidth
        ref_percent__bar.current.style.width = ref_percent_value.current + 'px';
    }, [timeInfo])


    return (
        <div className={styles.container} ref={ref_container}>
            <div className={styles.contents}>
                <div className={styles.text} ref={ref_text}>
                    {todo}
                </div>
                <div className={styles.time}>
                    {`${timeInfo.h} : ${timeInfo.m} : ${timeInfo.s} / ${timeInfo.time} `}
                </div>            
                <div className={styles.percent}>
                    <span>Time :</span> <div className={styles.percent__bar} ref={ref_percent__bar}/>
                </div>
            </div>
            <div className={styles.success} onClick={changeState} ref={ref_success}>
                Success
            </div>
            <div className={styles.completed} ref={ref_completed}>
                Completed
            </div>
            <div className={styles.failed} ref={ref_failed}>
                Failed
            </div>
        </div>
    );
}