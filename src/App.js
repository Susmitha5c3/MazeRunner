import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

//pages
import MainPage from "./Visualizers/index";
import PathfindingVisualizer from './Visualizers/PathfindingVisualizer/PathfindingVisualizer';
import PathfinderDragon from './Visualizers/PathfinderDragon/PathfinderDragon';

function App() {
  return (
    <body>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/pathstar" component={PathfindingVisualizer} />
          <Route exact path="/pathdragon" component={PathfinderDragon} />
        </Switch>
      </Router>
    </body>
  );
}

export default App;