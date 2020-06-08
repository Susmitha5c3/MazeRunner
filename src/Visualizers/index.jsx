import React from 'react';
import { Link } from "react-router-dom";
import styles from './index.module.css';

const MainPage = () => {
    return (
        
        <body class={styles.bodystyle}>
            {/* <div class={styles.whole}> */}
            <h1>Dijkstra's Maze Runner</h1>
                <div class={styles.container}>
                    <button class={styles.button1}><Link class={styles.link1} to="/pathstar">Star Wars</Link></button>
                    <button class={styles.button2}> <Link class={styles.link2} to="/pathdragon">Dragon Ball</Link></button>
                </div>
            {/* </div> */}
        </body>
    )
};

export default MainPage;



