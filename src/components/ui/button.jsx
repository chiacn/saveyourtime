import React from 'react';
import styles from './button.module.css'

export default function Button({ 
  text, 
  onClick,
  tailwind=false,
}) {

  /*
    tailwind 사용해서 동적 css 만들기?
   */
  
  let className;
  if(tailwind) {
    className = tailwind;
  }else {
    className = styles.button;
  }
  

  return (

    <button
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
