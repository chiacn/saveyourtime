import React from 'react';
import { useEffect } from 'react';
import { setCSS } from '../../common/common';
import styles from './button.module.css'

export default function Button({ 
  text, 
  onClick,
  defaultTailwind = false,
  tailwind = false,
  type='text',
  shape='round',
  font=null,
  color=null,
  font_size=null,
}) {

  const originCSS = !defaultTailwind ? {
    // CSS
    button: styles.button, 
    backgroundColor: styles["background-color"],
    text_shape_background: styles.text_shape_background,
    icon_background: styles.icon_background,} :
  {
    // defaultTailwind
    button: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110',
    backgroundColor: '',
    text_shape_background: '',
    icon_background: '',
  }

  //customTailwind
  const assignCSS = setCSS(originCSS, tailwind);

  // assignCSS
  const {button, backgroundColor, text_shape_background, icon_background} = assignCSS;

  // set custom CSS

  const style_common_setting = setCustomStyle();

  function setCustomStyle() {
      const COMMON_FONT = font && selectFont();
      const COMMON_COLOR = color;
      const COMMON_FONT_SIZE = font_size;

      function selectFont() {
        switch(font) {
          case 'eng_roboto':
            return "'Roboto', 'sans-serif'";
          case 'eng_press_start_2p':
            return "'Press Start 2P', cursive";
          case 'eng_rubik_bubbles':
            return "'Rubik Bubbles', cursive";
        }
      }

      return {
        'font-family': COMMON_FONT,
        color: COMMON_COLOR,
        'font-size': COMMON_FONT_SIZE
      }
  }

  return (
      <>
        <div className={styles.common_setting} style={style_common_setting}>
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

                case 'text_shape': 
                    return (
                        <div className={text_shape_background} onClick={onClick}>
                            {text}
                        </div>
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
        </div>
      </>
      
      
  );
}
