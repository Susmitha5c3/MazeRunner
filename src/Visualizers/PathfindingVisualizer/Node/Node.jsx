import React, {Component} from 'react';
import styles from'./Node.module.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'nodeFinish'
      : isStart
      ? 'nodeStart'
      : isWall
      ? 'nodeWall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${styles.node} ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}