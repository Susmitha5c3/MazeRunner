
import React, {Component} from 'react';
import Node from './NodeDragon/NodeDragon';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import styles from './PathfinderDragon.module.css';
import nodeStyles from'./NodeDragon/NodeDragon.module.css';

const START_NODE_ROW = 3;
const START_NODE_COL = 8;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 44;

export default class PathfinderDragon extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const start = nodesInShortestPathOrder[0];
    document.getElementById(`node-${start.row}-${start.col}`).className =
          `${nodeStyles.node} ${nodeStyles.nodeStart}`;
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
        `${nodeStyles.node} ${nodeStyles.nodeVisited}`;
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`;
      }, 50 * i);
    }
    const start = nodesInShortestPathOrder[0];
    document.getElementById(`node-${start.row}-${start.col}`).className =
          `${nodeStyles.node} ${nodeStyles.nodeStart}`;
    const stop = nodesInShortestPathOrder[nodesInShortestPathOrder.length-1];
    document.getElementById(`node-${stop.row}-${stop.col}`).className =
          `${nodeStyles.node} ${nodeStyles.nodeFinish}`;
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }


  clearBoard(){
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    for (let i =0; i<visitedNodesInOrder.length; i++){
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
          `${nodeStyles.node} ${nodeStyles.node}`;
    }
    const start = visitedNodesInOrder[0];
    document.getElementById(`node-${start.row}-${start.col}`).className =
          `${nodeStyles.node} ${nodeStyles.nodeStart}`;
    const stop = visitedNodesInOrder[visitedNodesInOrder.length-1];
    document.getElementById(`node-${stop.row}-${stop.col}`).className =
          `${nodeStyles.node} ${nodeStyles.nodeFinish}`;
    this.componentDidMount();
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <body class={styles.body}>
      <div class={styles.navbar}>
        <ul>
          <li class={styles.starwarslogo}><img src={require('../Images/dragonball1.png')} /> </li>
          <li class={styles.text}><a class={styles.a} onClick={() => window.location.reload()}> Maze Runner</a></li>
          <li class={styles.nav}><button class={styles.button} onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button></li>
          <li class={styles.nav}><a class={styles.a} onClick={() => this.clearBoard()}>
          Clear Board
        </a></li>
        </ul>
      </div>
        <div className={styles.grid}>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div class={styles.footer}>
          <ul>
            <li class={styles.f}><img src={require('../Images/Goku.png')} />    Start Node</li>
            <li class={styles.f}><img src={require('../Images/ball.png')} />    Target Node</li>
            {/* <li class={styles.f}><img src={require('../Images/unvisitedS.png')} />    Unvisited Node</li> */}
            {/* <li class={styles.f}><img src={require('../Images/visitedS.png')} />   Visited Node</li> */}
            <li class={styles.f}><img src={require('../Images/short.png')} />    Shortest Path Node</li>
            <li class={styles.f}><img src={require('../Images/dragon1.png')} />   Wall Node</li>
          </ul>
        </div>
      </body>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
