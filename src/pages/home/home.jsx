import React from 'react';
import { useState } from 'react';
import Frame from '../../components/main/frame';
import styles from './home.module.css'

 const Home = (props) => {

    const [frames, setFrames] = useState([<Frame timer id="frame1"/>])

    const addFrame = () => {
        setFrames((prevFrames) => [...prevFrames, <Frame timer id={'frame'+(frames.length + 1)}/>])
    }

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