import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { clone } from '../../common/common';
import Frame from '../../components/main/frame';
import Button from '../../components/ui/button';
import styles from './home.module.css'

 const Home = (props) => {

    const [frames, setFrames] = useState([<Frame timer frameId="frame1" key="frame1" closeFrame={closeFrame} changeMode={changeMode}/>]);
    const [closeFrameId, setCloseFrameId] = useState();
    const addButton = useRef();
    const [addButtonColor, setAddButtonColor] = useState();

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
    console.log('dummyFrames = ', dummyFrames)

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
                </div>
            </div>
        </>
    )
 }


export default Home;