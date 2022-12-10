import React from 'react';
import { setCSS } from '../../common/common';
import styles from './button.module.css'

export default function Button({ 
  text, 
  onClick,
  defaultTailwind = false,
  tailwind = false,
}) {

  const originCSS = !defaultTailwind ? {
    // CSS
    button: styles.button, } :
  {
    // defaultTailwind
    button: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110'
  }

  //customTailwind
  const assignCSS = setCSS(originCSS, tailwind);

  // assignCSS
  const {button} = assignCSS;


  return (
    <button
      className={button}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
