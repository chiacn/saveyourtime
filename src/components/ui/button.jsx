import React from 'react';
import { setCSS } from '../../common/common';
import styles from './button.module.css'

export default function Button({ 
  text, 
  onClick,
  defaultTailwind = false,
  tailwind = false,
  type='text',
  shape='round',
}) {

  const originCSS = !defaultTailwind ? {
    // CSS
    button: styles.button, 
    backgroundColor: styles["background-color"],
    icon_background: styles.icon_background,} :
  {
    // defaultTailwind
    button: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110',
    backgroundColor: '',
    icon_background: '',
  }

  //customTailwind
  const assignCSS = setCSS(originCSS, tailwind);

  // assignCSS
  const {button, backgroundColor, icon_background} = assignCSS;


  return (
      //  (type == 'text') ?
      //   <button
      //     className={button}
      //     onClick={onClick}
      //   >
      //     {text}
      //   </button>
      //   :
      //   <button
      //     className={button}
      //     onClick={onClick}
      //   >
      //     {text}
      //   </button>
      <>
      {
        (() => {
            switch(type) {
              case 'text':
                return ( 
                  <button
                    className={button}
                    onClick={onClick}
                  >
                    {text}
                  </button>
                )

              case 'plus':
                return (
                  <div className={icon_background} onClick={onClick}>
                        <div className={styles.plus}/>
                  </div>
                )
              
            }
        })()
      }
      </>
      
  );
}
