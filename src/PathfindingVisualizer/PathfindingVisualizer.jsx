
import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 14;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 55;

export default class PathfindingVisualizer extends Component {
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
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
      // const start = nodesInShortestPathOrder[0];
      //  document.getElementById(`node-${start.row}-${start.col}`).className =
      //     'node node-start';
      // const stop = nodesInShortestPathOrder[nodesInShortestPathOrder.length-1];
      //   document.getElementById(`node-${stop.row}-${stop.col}`).className =
      //     'node node-finish';
    }
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
          'node node';
    }
    const start = visitedNodesInOrder[0];
    document.getElementById(`node-${start.row}-${start.col}`).className =
          'node node-start';
    const stop = visitedNodesInOrder[visitedNodesInOrder.length-1];
    document.getElementById(`node-${stop.row}-${stop.col}`).className =
          'node node-finish';
    this.componentDidMount();
  }

  clearPath(){
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    for (let i =0; i<visitedNodesInOrder.length; i++){
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node';
    }
    const start = visitedNodesInOrder[0];
    document.getElementById(`node-${start.row}-${start.col}`).className =
          'node node-start';
    const stop = visitedNodesInOrder[visitedNodesInOrder.length-1];
    document.getElementById(`node-${stop.row}-${stop.col}`).className =
          'node node-finish';
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
      <div class="navbar">
        <ul>
          <li class="text"><a onClick={() => window.location.reload()}> Pathfinding Visualizer</a></li>
          <li class="nav"><a onClick={() => this.clearBoard()}>
          Clear Board
        </a></li>
        <li class="nav"><button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button></li>
        <li class="nav"><a onClick={() => this.clearPath()}>
          Clear Path
        </a></li>
        <li class="nav"><a onClick={() => this.componentDidMount()}>
          Clear Walls
        </a></li>
        </ul>
      </div>
        <div className="grid">
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
        <div class="footer">
          <ul>
            <li class="f"><img src={require('./start.png')} />    Start Node</li>
            <li class="f"><img src={require('./end.png')} />    Target Node</li>
            <li class="f"><img src={require('./unvisited.png')} />    Unvisited Node</li>
            <li class="f"><img src={require('./visited.png')} />    Visited Nodes</li>
            <li class="f"><img src={require('./short.png')} />    Shortest Path Node</li>
            <li class="f"><img src={require('./wall.png')} />   Wall Node</li>
          </ul>
        </div>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 29; row++) {
    const currentRow = [];
    for (let col = 0; col < 76; col++) {
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