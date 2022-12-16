import React from 'react';
import Frame from '../../components/main/frame';
import styles from './home.module.css'




 const Home = (props) => 
        <>
            {/* <p>UMUL Main Page</p> */}
            <div className={styles.frames}>
                <Frame timer/>
                <Frame timer/>
                <Frame timer/>
            </div>
        </>


export default Home;