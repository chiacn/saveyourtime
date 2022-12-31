import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { clone } from '../../common/common';
import Frame from '../../components/main/frame';
import styles from './home.module.css'

 const Home = (props) => {

    const [frames, setFrames] = useState([<Frame timer frameId="frame1" closeFrame={closeFrame}/>]);
    const [closeFrameId, setCloseFrameId] = useState();

    const addFrame = () => {
        setFrames((prevFrames) => [...prevFrames, <Frame timer frameId={createFrameId()} closeFrame={closeFrame}/>])
    }

    function closeFrame(frameId) {
        console.log('지워진 frameId = ', frameId)
        setCloseFrameId(frameId)
    }

    function createFrameId() {
        return new Date().getTime().toString();
    }

    useEffect(() => {
        setFrames( frames.filter((frame) => frame.props.frameId != closeFrameId));
    },[closeFrameId])


    return (
        <>
            <div className={styles.main}>
                <div className={styles.frames}>
                    {frames.map((frame) => frame)}
                </div>
                <div className={styles.add}>
                    <button onClick={addFrame}>Add</button>
                </div>
            </div>
        </>
    )
 }


export default Home;