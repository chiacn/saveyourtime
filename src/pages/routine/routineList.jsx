import React, { useState } from 'react';
import Routine from '../../components/feature/routine';
import Button from '../../components/ui/button';
import styles from './routineList.module.css'

 export default function RoutineList(props) {

    const [routines, setRoutines] = useState([<Routine routineId='routine1' key='routine1' />]);

    const addRoutine = () => {
        const routineId = createRoutineId();
        setRoutines((prevRoutines) => [...prevRoutines, <Routine routineId={routineId} key={routineId} />])
    }

    const closeRoutine = (closeRoutineId) => {
        console.log('closeRoutine 실헹')
        setRoutines(routines.filter((routine) => routine.props.routineId !== closeRoutineId))
    }

    function createRoutineId() {
        return new Date().getTime().toString();
    }

    return (
        <>
            <div className={styles.wrapping}>
                <div className={styles.main}>
                    {routines.map(
                        map => {
                                return ( 
                                        <div className={styles.main__routineFrame} key={map.props.routineId}> 
                                            {map}
                                            <div className={styles.main__closeButton}>
                                                { (map.props.routineId === 'routine1') ?
                                                    <div className={styles.dummyDiv} />
                                                    :
                                                    <Button 
                                                        type="text_shape"
                                                        text="X"
                                                        font="eng_rubik_bubbles"
                                                        font_size="30px"
                                                        color="rgb(0, 184, 147)"
                                                        onClick={() => closeRoutine(map.props.routineId)}
                                                        key={map.props.routineId}
                                                    />
                                                }
                                            </div>
                                            
                                        </div>
                                    
                                    )
                               }
                    )}

                    <div className={styles.addButton}>
                        {/* <Button onClick={addFrame} type="plus"/> */}
                        <Button 
                            onClick={addRoutine} 
                            type="plus" 
                            text="Add"
                            font="eng_rubik_bubbles" 
                            font_size="24px"
                        />
                </div>
                </div>
            </div>
        </>
    );
 }