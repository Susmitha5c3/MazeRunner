import React, {Component} from 'react';
import styles from './NodeDragon.module.css';

export default class NodeDragon extends Component {
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
    ? `${styles.nodeFinish}`
    : isStart
    ? `${styles.nodeStart}`
    : isWall
    ? `${styles.nodeWall}`
    : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={` ${styles.node} ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}