import React from 'react';
import styles from './inputText.module.css'

export default function InputText({
    inputText,
    changeInputText,
    alarmMode=false,
    placeholder,
}) {

    const handleInputText = (e) => {
        changeInputText(e);
    }

    return (
        <>
        { !alarmMode ?
            <div className={styles["timer__input"]}>
                <input 
                    type="text"
                    onChange={handleInputText}
                    value={inputText}
                    placeholder={placeholder}
                />
            </div>
            :
            <div className={styles["timer__input--alarmMode"]}>
                <input 
                    type="text"
                    onChange={handleInputText}
                    value={inputText}
                    placeholder={placeholder}
                />
            </div>    
        }
        </>
    );
}
