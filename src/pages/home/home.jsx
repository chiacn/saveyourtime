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

    // Add버튼 flex-wrap 관련
    const {width, height} = useWindowSize();
    const ref_main = useRef();
    const [lastAddBtn, setLastAddBtn] = useState();
    const [lastDummyPoint, setLastDummyPoint] = useState();

    const [dummyFrames, dispatchDummy] = useReducer(manageDummy, [{frameId: 'frame1', alarmMode: false}]);

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

    useEffect(() => {

        const element_addBtn = document.querySelector(`.${styles.addButton}`);
        const element_dummyPoint = document.getElementById('dummyPoint');
        
        // distanceAddBtn 에 추가분량의 크기를 주는 이유 : Add버튼이 접히기 전에 wrapping을 일으켜야하므로.
        const addBtnRect =  element_addBtn.getBoundingClientRect();
        const distance_addBtn = addBtnRect.right + 30;
        const distance_dummyPoint = element_dummyPoint.getBoundingClientRect().right;

        const width_addBtn = addBtnRect.right - addBtnRect.left;

        /*
            작동방식
                <문제>
                1. Add버튼 - <Home> 컴포넌트, Close 버튼 - <Frame> 컴포넌트임.
                2. flex-wrap은 Home 컴포넌트에서 적용되는데,
                    <Frame/> <Frame/> <Frame/> ... Add 이런식으로 Frame 컴포넌트와 Add버튼에 개별 적용됨.
                    그래서 Add버튼만 따로 접히는 경우가 생긴다.
                    => Add버튼과 Frame 컴포넌트가 동시에 접히게 해야 한다.
                <해결>
                1.  Home 컴포넌트에서 dummyDiv를 만들고 브라우저 너비가 Add버튼을 침범하면 
                    main div의 크기(width값)를 조절해서 Add버튼과 Frame 컴포넌트가 함께 접히도록 한다.

                2. 다시 main div의 width값을 원상복구 시킬 때도
                   Add버튼과 Frame 컴포넌트가 개별적으로 움직이지 않게하기 위해서, 
                   [Add버튼 + Frame 컴포넌트]가 접힐 당시의 Add버튼과 Frame 컴포넌트의 위치값을 useState로 저장.
                   이 구간 사이에 브라우저 width값이 위치했을 땐 main div의 width값이 원상복구되지 않도록 한다.
            
         */

        if( distance_addBtn > width ) { // 1. dummyPoint + add 를 브라우저 width가 침범.
            ref_main.current.style.width = `${width - (width_addBtn + 60)}px`
            setLastAddBtn(distance_addBtn);
            setLastDummyPoint(distance_dummyPoint);

        // distance_originAddBtn을 width가 침범하자마자 distance_originAddBtn < width가 됨. 
        }else if(lastDummyPoint > width || lastAddBtn <= width) { 
            ref_main.current.style.width = `${width}px`;
        }
    })

    return (
        <>
            <div className={styles.main} ref={ref_main}>
                <div className={styles.frames}>
                    {frames.map((frame) => frame)}
                    <div className={styles.dummyPoint} id="dummyPoint"/>
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
                </div>
            </div>
        </>
    )
 }


export default Home;