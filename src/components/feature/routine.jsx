import React from 'react';
import styles from './routine.module.css'

export default function Routine({
    routineId,
}) {

    return (
        <div className={styles.routineFrame}>         
            <div className={styles.routine__memo}>

            </div>
            <div className={styles.routine__option}>

            </div>
            <div className={styles.routine__input}>

            </div>
            <div className={styles.routine__time}>

            </div>
        </div>
    );
}
            