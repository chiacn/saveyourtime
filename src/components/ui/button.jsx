import React from 'react';
import { setCSS } from '../../common/common';
import styles from './button.module.css'

export default function Button({ 
  text, 
  onClick,
  defaultTailwind = false,
  tailwind = false,
}) {

  // let originCSS = !defaultTailwind ? {
  //   // CSS
  //   button: styles.button, } :
  // {
  //   // defaultTailwind
  //   button: 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110'
  // }
  // if(defaultTailwind) tailwind = defaultTailwind;

  let originCSS;
  if(!defaultTailwind) {
    // CSS
    originCSS = {button: styles.button,}
  }else {
    // defaultTailwind
    originCSS = {button: 'text-xl hover:brightness-200'}
    tailwind = defaultTailwind;
  }
  //customTailwind
  const assignCSS = setCSS(originCSS, tailwind);
  console.log(' button / assignCSS = ', assignCSS)
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
