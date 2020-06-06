import React from 'react';
import { Link } from "react-router-dom";
//import Link from 'react-router-dom/Link';
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
// import "./index.css"

const MainPage = () => {
    return (
        <body >
        <div>
            <ul>
                <li><Link to="/pathfinder">Click to redirect Pathfinder</Link></li>
                <li><Link to="/pathdragon">Click to redirect PathDragon</Link></li>
            </ul>
        </div>
        </body>
    )
};

export default MainPage;