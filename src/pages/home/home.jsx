import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import { clone, getFromLocalStorage } from '../../common/common';
import Frame from '../../components/main/frame';
import Button from '../../components/ui/button';
import styles from './home.module.css'
import { useWindowSize } from 'react-use';

 const Home = () => {
    const lang = navigator.language
    const localStorageInfo = getFromLocalStorage(closeFrame);
    const [lastAddBtn, setLastAddBtn] = useState();
    const [frames, setFrames] = useState([]);
    const [closeFrameId, setCloseFrameId] = useState();
    const addButton = useRef();


    // Add버튼 flex-wrap
    const {width, height} = useWindowSize();
    const ref_main = useRef();
    const [lastDummyPoint, setLastDummyPoint] = useState();

    // memo
    const [memo, setMemo] = useState();
    const [foldMemo, setFoldMemo] = useState(true);
    const ref_memoArea = useRef();
    const ref_memoButton__window = useRef();
    const ref_memoButton__windowFold = useRef();

    // help 창
    const ref_help = useRef();
    const ref_example_count = useRef(0);
    const [exampleFrame, setExampleFrame] = useState(
        <Frame 
            timer 
            frameId="example" 
            key="example" 
            closeFrame={closeFrame} 
            example={false}
            example_count={ref_example_count.current}
        />
    );

    const addFrame = () => {
        const frameId = createFrameId();
        setFrames(
            (prevFrames) => [...prevFrames, 
                                <Frame 
                                    timer 
                                    frameId={frameId} 
                                    key={frameId} 
                                    closeFrame={closeFrame} 
                                />
                            ]
        )
    }

    function closeFrame(frameId) {
        setCloseFrameId(frameId);
    }

    function createFrameId() {
        // frameId를 frame1 frame2 frame3 이런식으로하면 중간에 frame2가 삭제되고 그러면 뒤죽박죽됨.
        return new Date().getTime().toString();
    }

    useEffect(() => {
        const newFrames = frames.filter((frame) => frame.props.frameId !== closeFrameId);
        setFrames(newFrames);
    }, [closeFrameId])

    useEffect(() => {
        if(frames.length > 1) {
            addButton.current.style = 'margin-left: -10px'
        }else {
            addButton.current.style = 'margin-left: 20px'
        }
    }, [frames])

    useEffect(() => {
        let browserWidth;
        if(foldMemo) {
            browserWidth = width;
        }else {
            browserWidth = width - 450;
        }
     
        const element_addBtn = document.querySelector(`.${styles.addButton}`);
        const element_dummyPoint = document.getElementById('dummyPoint');
        
        // distanceAddBtn 에 추가분량의 크기를 주는 이유 : Add버튼이 접히기 전에 wrapping을 일으켜야하므로.
        const addBtnRect =  element_addBtn.getBoundingClientRect();
        const distance_addBtn = addBtnRect.right + 30;
        const distance_dummyPoint = element_dummyPoint.getBoundingClientRect().right;
        const width_addBtn = addBtnRect.right - addBtnRect.left;

        if( distance_addBtn > browserWidth ) { // 1. dummyPoint + add 를 브라우저 width가 침범.
            ref_main.current.style.width = `${browserWidth - (width_addBtn + 60)}px`
            setLastAddBtn(distance_addBtn);
            setLastDummyPoint(distance_dummyPoint);

        // distance_originAddBtn을 width가 침범하자마자 distance_originAddBtn < width가 됨. 
        }else if(lastDummyPoint > browserWidth || lastAddBtn <= browserWidth) { 
            ref_main.current.style.width = `${browserWidth}px`;
        }

        //추가 help 창 조절
        if(width < 1400) ref_help.current.style.display = 'none';
    })

    // local storage
    useEffect(() => {
        window.localStorage.setItem('lastAddBtn', JSON.stringify(lastAddBtn));
        window.localStorage.setItem('memo', JSON.stringify(memo));
    }, [lastAddBtn, memo])

    // local storage update
    useEffect(() => {
        if(localStorageInfo.storedFrames.length > 0) {
            setFrames(localStorageInfo.storedFrames);
        }else {
            setFrames(     
                [          
                    <Frame 
                        timer 
                        frameId="frame1" 
                        key="frame1" 
                        closeFrame={closeFrame} 
                    />
                ]
            )
        }
        setLastAddBtn(localStorageInfo.homeData.lastAddBtn);
        setMemo(localStorageInfo.homeData.memo);
    }, [])

    // memo 기능
    const unfoldMemo =() => {
        // arrow 버전
        // if(ref_memoButton__arrow.current.style.transform !== 'none') {
        //     ref_memoButton__arrow.current.style.transform = 'none';
        //     ref_memoArea.current.style.display = 'none';
        // }else {
        //     ref_memoButton__arrow.current.style.transform = 'rotate(180deg)';
        //     ref_memoArea.current.style.display = 'flex';
        // }

       
        // window버전
        if(foldMemo) {
            ref_memoButton__window.current.style.display = 'none';
            ref_memoButton__windowFold.current.style.display = 'flex';
            ref_memoArea.current.style.display = 'flex';
            setFoldMemo(false);
        }else {
            ref_memoButton__window.current.style.display = 'flex';
            ref_memoButton__windowFold.current.style.display = 'none';
            ref_memoArea.current.style.display = 'none';
            setFoldMemo(true);
        }

    }

    const changeMemo = (e) => {
        setMemo(e.target.value);
    }

    // Help
    const openHelp = () => {
        ref_help.current.style.display = 'flex';
    }

    const closeHelp = () => {
        ref_help.current.style.display = 'none';
    }

    const example = (e) => {
        switch(e.target.innerHTML) {
            case 'Example 1':
                const num = ref_example_count.current++
                setExampleFrame(
                    <Frame 
                        timer 
                        frameId="example" 
                        key="example" 
                        closeFrame={closeFrame}
                        example={true}
                        example_count={num}
                    />
                )
                break;
        }
    }

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
                            type="plus" 
                            text="Add"
                            font="eng_rubik_bubbles" 
                            font_size="24px"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.memo_container}>
                <div className={styles.memoButton} onClick={unfoldMemo}>
                    <p>memo</p>
                    <div className={styles.memoButton__window} onClick={unfoldMemo} ref={ref_memoButton__window} />
                    <div className={styles["memoButton__window--fold"]} onClick={unfoldMemo} ref={ref_memoButton__windowFold} />
                </div>
                <div className={styles.memoArea} ref={ref_memoArea}>
                    <textarea value={memo} maxLength="500" onChange={changeMemo}/>
                </div>
            </div>
            <div className={styles.help__button}>
                <Button
                    type="text"
                    text="Help"
                    font="eng_rubik_bubbles"
                    color="rgb(0, 184, 147)"
                    font_size="35px"
                    onClick={openHelp}
                />
            </div>
            <div className={styles.help__window} ref={ref_help}>
                <div className={styles["help__window--close"]}>
                    <Button
                        type="text"
                        text="Close"
                        font="eng_rubik_bubbles"
                        color="rgb(0, 184, 147)" 
                        font_size="35px"
                        onClick={closeHelp}
                    />
                </div>
                <div className={styles["help__window--exampleFrame"]}>
                    { exampleFrame }
                </div>
                <div className={styles["help__window--description"]}>
                    {
                        (lang.substring(0,2) === 'ko') ?
                        <div>
                            1. Text - 타이머가 종료되면 기입한 텍스트를 보여줍니다. <br/>
                            2. Link - 타이머가 종료되면 기입한 링크를 자동으로 띄워줍니다. <br/>
                            3. Repeat - 타이머 시간을 설정하고 Repeat 버튼을 체크하면, 타이머가 반복됩니다. <br/>
                            4. Alarm - 특정 시간에 팝업이 작동되도록합니다. AM/PM을 클릭하면 바뀝니다.
                        </div> 
                        :
                        <div>
                            1. Text - Show Text when the timer runs out. <br/>
                            2. Link - Show Link you put in when the timer runs out. <br/>
                            3. Repeat - If you set timer and click Repeat button, the timer repeats. <br/>
                            4. Alarm - Set the popup work at a specific time. Click AM/PM to change. <br/>
                        </div>
                        
                    }
                </div>
                <div className={styles["help__window--example"]}> 
                    <span onClick={example}>Example 1</span>
                </div>
                <div className={styles["help__window--info"]}>
                    문의 : devsaepo@gmail.com
                </div>
            </div>
        </>
    )
 }


export default Home;