import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { clone } from '../../common/common';
import Frame from '../../components/main/frame';
import Button from '../../components/ui/button';
import styles from './home.module.css'

 const Home = (props) => {

    const [frames, setFrames] = useState([<Frame timer frameId="frame1" key="frame1" closeFrame={closeFrame}/>]);
    const [closeFrameId, setCloseFrameId] = useState();
    const addButton = useRef();

    const addFrame = () => {
        setFrames((prevFrames) => [...prevFrames, <Frame timer frameId={createFrameId()} key={createFrameId()} closeFrame={closeFrame}/>])
    }

    function closeFrame(frameId) {
        setCloseFrameId(frameId)
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
                            color="rgb(0, 129, 255)" 
                            font_size="24px"
                        />
                    </div>
                </div>
            </div>
        </>
    )
 }


export default Home;