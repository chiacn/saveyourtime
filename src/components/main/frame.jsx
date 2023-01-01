import React from 'react';
import { setCSS } from '../../common/common';
import Timer from '../feature/timer';
import styles from './frame.module.css';

export default function Frame({
    text = true, 
    onClick,
    defaultTailwind = false,
    tailwind = false,
    timer=false,
    closeFrame,
    frameId,
}) {

    // Setting
    const unifiedTemplate = true;

    
    const originCSS = !defaultTailwind ? {
    // CSS
    frame: styles.frame,
    wrapping: styles.wrapping,
    frame__option: styles.frame__option,
    frame__timer: styles.frame__timer,
    modal: styles.modal, } :
    {
    // defaultTailwind
    frame: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110',
    wrapping: '',
    frame__option: '',
    frame__timer: '',
    modal: '',
    }

    //customTailwind
    const assignCSS = setCSS(originCSS, tailwind);

    // assignCSS
    const {
        frame, 
        wrapping, 
        frame__option,
        frame__timer,
        modal,
    } = assignCSS;

    console.log(`${frameId} Rendering ------------------------`)

    const openOption = () => {
        const modal = document.querySelector(`.${styles.modal}`);
        const modal_ani = document.querySelector(`.${styles.modal__ani}`);
        const frame = document.querySelector(`.${styles.frame}`)
        const absoluteTop = window.scrollY + frame.getBoundingClientRect().top;
        const absoluteLeft = frame.getBoundingClientRect().left;

        modal_ani.style.top = absoluteTop;
        modal_ani.style.left = absoluteLeft;

        modal_ani.style.display = 'flex'
        modal.style.display = 'flex'
    }

    const closeOption = () => {
        const modal = document.querySelector(`.${styles.modal}`);
        const modal_ani = document.querySelector(`.${styles.modal__ani}`);

        modal.style.display = 'none';
        modal_ani.style.display = 'none';
    }
    
    const submitFrameId = () => {
        closeFrame(frameId);
    }

    return (
        ( !unifiedTemplate ?
            <>
                <div className={wrapping}>
                    {text && <p>{text}</p>}
                    <div className={frame}>
                        {
                            (frameId == 'frame1') ?
                            <div className={styles.firstClose} /> :
                            <div className={styles.close}>
                                <button onClick={submitFrameId}>Close</button>
                            </div>
                        }
                        {
                            timer &&
                            <div className={frame__timer}>
                                <Timer />  
                            </div>
                        }
                        
                        <div className={frame__option} onClick={openOption}>
                            <button>
                                Option
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className={modal}>
                    <div className={styles.modal__close}>
                        <button onClick={closeOption}>Close</button>
                    </div>
                </div>

                {/* Modal Animation */}
                <div className={styles.modal__ani}/>

            </> :
        
            <>
                <div className={styles.uni_wrapping}>
                    <div className={styles.uni_button}>
                        <div className={styles.uni_button__timer}>
                            <button>Timer</button>
                        </div>
                        <div className={styles.uni_button__alarm}>
                            <button>Alarm</button>
                        </div>
                    </div>
                    <div className={styles.uni_frame}>
                        <div className={styles.uni_frame__header}>

                        </div>
                        <div className={styles.uni_frame__timer}>
                            <Timer unifiedTemplate={unifiedTemplate}/>
                        </div>
                    </div>
                </div>

            </>
        )
        
    );
}
