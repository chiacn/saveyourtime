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
        // modal.style.display = 'flex'

        // 여기다 animation 정의해야할듯.
        /*
            Option클릭 시, 해당 element와 똑같은 위치, 크기의 div를 만든 후,
            애니메이션 효과로 커지면서 중앙으로 이동하는 모달창을 만들 것임.
            
            1. 먼저 기존 element와 똑같은 속성을 갖는 div를 만들어줌
            2. 기존 element의 절대 위치값 정한 후, 새로 만든 div에도 적용해줌.
            3. keyframe으로 기존 element의 위치에서 중앙으로 이동하면서 커지는 모달창을 만듦
         */


        /*
            <설계>
            1. querySelectorAll을 이용해서 frame 객체를 특정할 경우 id값이 필요하다.
                => (방법)
                Option을 클릭하면 openOption에서 id 값을 받을 수 있도록 한 후,
                

                const targetFrameId = "my-frame";
                const frames = document.querySelectorAll(`.${styles.frame}`)

                for (const frame of frames) {
                if (frame.id === targetFrameId) {

                위와 같은 식으로 전개

            2. 그러려면 먼저 home 컴포넌트에서 +(Add)를 누를 때마다 frame가 생성되면 id가 자동 할당되는 코드를 짜야한다.
                    => id는 home 컴포넌트에서 Frame 컴포넌트에 props로 자동생성된 id를 넘겨준 후 -> 그걸 다시 frame div에 넘겨눈 형식
                    (왜냐면 우리는 frame div의 id 값이 필요한 것이기 때문)

            3. 그리고 이 경우 생성된 정보들을 cookie나 session에 저장한다..?
         */

        
        // 아니면 그냥 modal창이 아니라 새로운 애니메이션 전용 객체를 만들어서 나중에 사라지게 하면 될듯.

        // ( getBouondingClientRect()를 함수 밖에서 전역변수로 빼놓으면 undefined가 되는데 호이스팅 때문인듯. )
        const modal_ani = document.querySelector(`.${styles.modal__ani}`);
        const frame = document.querySelector(`.${styles.frame}`)
        const absoluteTop = window.scrollY + frame.getBoundingClientRect().top;
        const absoluteLeft = frame.getBoundingClientRect().left;

        modal_ani.style.top = absoluteTop;
        modal_ani.style.left = absoluteLeft;

        modal_ani.style.display = 'flex'
        // modal_ani.style['background-color'] = 'blue'

        // 애니메이션 효과 중 최종단계 modal 창
        modal.style.display = 'flex'

        console.log('absoluteTop = ', absoluteTop)
        console.log('absoluteLeft = ', absoluteLeft)
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
        <>
        <div className={wrapping}>
            {text && <p>{text}</p>}
            <div className={frame}>
                <div className={styles.close}>
                    <button onClick={submitFrameId}>Close</button>
                </div>
                {timer &&
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

        </>
        
    );
}
