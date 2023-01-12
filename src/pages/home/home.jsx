import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { clone } from '../../common/common';
import Frame from '../../components/main/frame';
import Button from '../../components/ui/button';
import styles from './home.module.css'
import { useWindowSize } from 'react-use';

 const Home = (props) => {

    const [frames, setFrames] = useState([<Frame timer frameId="frame1" key="frame1" closeFrame={closeFrame} changeMode={changeMode}/>]);
    const [closeFrameId, setCloseFrameId] = useState();
    const addButton = useRef();
    const [addButtonColor, setAddButtonColor] = useState();

    const [dummyFrames, dispatchDummy] = useReducer(manageDummy, [{frameId: 'frame1', alarmMode: false}]);

    const {width, height} = useWindowSize();
    const dummyDiv = useRef();

    function manageDummy(dummyFrames, action) {
        switch(action.type) {
            case 'add':
                selectBtnColor();
                return [...dummyFrames, action.frame];

            case 'delete':
                // mode 변경 시, Add버튼을 마지막 Frame의 색과 같게 지정.
                selectBtnColor();
                return dummyFrames.filter((frame) => frame.frameId != action.frameId);
                
            case 'changeMode':
                for(let i in dummyFrames) {
                    if(dummyFrames[i].frameId === action.frameId) {
                        dummyFrames[i].alarmMode = action.alarmMode;

                        // mode 변경 시, Add버튼을 마지막 Frame의 색과 같게 지정.
                        selectBtnColor();
                    }
                }
                return dummyFrames
        }

        function selectBtnColor() {
            if(dummyFrames[dummyFrames.length -1].alarmMode === true) {
                return setAddButtonColor('rgb(0, 184, 147)');
            }else {
                return setAddButtonColor('rgb(0, 129, 255)');
            }
        }
    }

    const addFrame = () => {
        const frameId = createFrameId();
        setFrames((prevFrames) => [...prevFrames, <Frame timer frameId={frameId} key={frameId} closeFrame={closeFrame} changeMode={changeMode}/>])
        dispatchDummy({
            type: 'add',
            frame: {frameId: frameId, alarmMode: false}
        })
    }

    function closeFrame(frameId) {
        setCloseFrameId(frameId)
        dispatchDummy({
            type: 'delete',
            frameId: frameId
        })
    }

    function changeMode(frameId, alarmMode) {
        dispatchDummy({
            type: 'changeMode',
            frameId: frameId,
            alarmMode: alarmMode
        })
    }

    function createFrameId() {
        return new Date().getTime().toString();
    }

    useEffect(() => {
        setFrames( frames.filter((frame) => frame.props.frameId != closeFrameId));
    },[closeFrameId])

    useEffect(() => {
        if(frames.length > 1) {
            addButton.current.style = 'margin-left: -10px'
        }else {
            addButton.current.style = 'margin-left: 20px'
        }
    }, [frames])

    useEffect(() => {
        if(dummyFrames[dummyFrames.length -1].alarmMode === true) {
            setAddButtonColor('rgb(0, 184, 147)');
        }else {
            setAddButtonColor('rgb(0, 129, 255)');
        }
    })

    /**
        브라우저 크기에 따른 wrapping 조절

        <도입 목적>
        1. [Add 버튼]의 경우 frame 컴포넌트들과 같은 층위로 나열됨.
            => 즉 flex-wrap: wrap이 적용될 때, Add 버튼만 개별적으로 적용된다는 것.
        2. Add버튼을 마지막 wrap과 묶는 등의 방법은 특정 타이머를 close할 때, Add버튼과 묶이는 frame 객체가 변동되어 불변성에 영향이 가는 것으로 보임.
           (타이머의 state 값들이 초기화되는 등 문제가 생김)
        3. 상태관리에 최대한 영향이 안 가게끔 ui 측면에서만 이 문제를 해결하면 좀 더 안정성이 확보 되지 않을까 하는 생각이 들었음.

        <해결방안>
        1. [브라우저의 크기]와 [브라우저 좌측 끝에서 Add버튼 끝까지의 거리를 구한다]
        2. 브라우저 크기가 Add버튼 까지의 거리를 넘어 설 때, 인위적으로 flex-wrap이 일어나게 만든다.
            => (addButton의 css에 width 값을 주고, dummyDiv의 margin-left를 마이너스 값으로 넣어서 순간적으로 침범하게 조정한다.)
        3. 이후 flex-wrap이 일어나서 다시 브라우저 크기 > Add버튼까지의 거리가 되면 원상복귀시킨다.
     */
    useEffect(() => {
        const addBtn = document.querySelector(`.${styles.addButton}`);
        const distanceAddBtn = addBtn.getBoundingClientRect().right;
        
        // distanceAddBtn 에 추가분량의 크기를 주는 이유 : Add버튼이 접히기 전에 wrapping을 일으켜야하므로.
        if(distanceAddBtn + 30 >= width) { 
            dummyDiv.current.style.width = '20px'   
            dummyDiv.current.style["margin-left"] = '-100px'
        }else {
            dummyDiv.current.style.width = '0px';
            dummyDiv.current.style["margin-left"] = '0px'
        }
    })

    return (
        <>
            <div className={styles.main}>
                <div className={styles.frames}>
                    {frames.map((frame) => frame)}
                    {/* <button onClick={addFrame}>Add</button> */}
                    <div className={styles.addButton}  ref={addButton}>
                        {/* <Button onClick={addFrame} type="plus"/> */}
                        <Button 
                            onClick={addFrame} 
                            type="text_shape" 
                            text="Add"
                            font="eng_rubik_bubbles" 
                            color={addButtonColor}
                            font_size="24px"
                        />
                    </div>
                    <div className={styles.dummyDiv} ref={dummyDiv}/>
                </div>
            </div>
        </>
    )
 }


export default Home;