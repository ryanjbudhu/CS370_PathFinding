import React, {Component} from 'react';
import Node from './Node/Node';
import PathButton from '../algorithms/PathButton';
import RandomMaze from '../algorithms/MazeMakers/RandomMaze';
import NewRecursiveDivsion from '../algorithms/MazeMakers/NewRecursiveDivision';

import './PathfindingVisualizer.css';

const START_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const START_NODE_COL = Math.floor((window.innerWidth * 0.25) / 25);
const FINISH_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const FINISH_NODE_COL = Math.floor((window.innerWidth * 0.75) / 25);

var new_start_row;
var new_start_col;
var new_finish_row;
var new_finish_col;

// ADD ALGORITHM NAMES HERE
const algorithms = ['A*', 'Dijkstra'];

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      sIsPressed: false,
      fIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  resetGrid() {
    new_start_row = Math.floor((window.innerHeight * 0.35) / 25);
    new_start_col = Math.floor((window.innerWidth * 0.25) / 25);
    new_finish_row = Math.floor((window.innerHeight * 0.35) / 25);
    new_finish_col = Math.floor((window.innerWidth * 0.75) / 25);
    const grid = getInitialGrid();
    this.resetColors();
    this.setState({grid});
  }

  resetColors() {
    const visitedNodes = document.getElementsByClassName('node');
    for (let i = 0; i < visitedNodes.length; ++i) {
      if (visitedNodes[i].classList.contains('node-wall')) continue;
      // console.log(visitedNodes[i].classList);
      visitedNodes[i].className = 'node';
    }
    const {grid} = this.state;
    for (const row of grid) {
      for (const node of row) {
        node.isVisited = false;
        node.distance = Infinity;
        if (node.isStart) {
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add('node-start');
        } else if (node.isFinish) {
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add('node-finish');
        }
      }
    }
    this.setState({grid});
  }

  generateRandomMaze() {
    const newGrid = RandomMaze(getInitialGrid());
    this.resetColors();
    this.setState({grid: newGrid});
  }

  generateRecursiveDivisionMaze() {
    new_start_row = 0;
    new_start_col = 0;
    const [newGrid, fX, fY] = NewRecursiveDivsion(
      getInitialGrid(),
      new_start_row || START_NODE_ROW,
      new_start_col || START_NODE_COL,
      new_finish_row || FINISH_NODE_ROW,
      new_finish_col || FINISH_NODE_COL,
    );
    new_finish_row = fX;
    new_finish_col = fY;
    newGrid[0][0].isStart = true;
    this.resetColors();
    this.setState({grid: newGrid});
    console.log(this.state.grid[new_finish_row][new_finish_col]);
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

  handleMouseClick(row, col) {
    if (this.state.sIsPressed) {
      new_start_row = row;
      new_start_col = col;
      const newGrid = getInitialGrid();
      this.setState({grid: newGrid});
    } else if (this.state.fIsPressed) {
      new_finish_row = row;
      new_finish_col = col;
      const newGrid = getInitialGrid();
      this.setState({grid: newGrid});
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 83: // s is pressed
        if (this.state.sIsPressed) return;
        this.setState({sIsPressed: true});
        break;
      case 70: // f is pressed
        if (this.state.fIsPressed) return;
        this.setState({fIsPressed: true});
        break;
      default:
        return;
    }
  }
  handleKeyUp(e) {
    switch (e.keyCode) {
      case 83: // s was released
        this.setState({sIsPressed: false});
        break;
      case 70: // f was released
        this.setState({fIsPressed: false});
        break;
      default:
        return;
    }
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(
            nodesInShortestPathOrder,
            visitedNodesInOrder,
          );
        }, 22 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.add('node-visited');
      }, 20 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder, visitedNodesInOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.replace('node-visited', 'node-shortest-path');
      }, 30 * i);
    }
    if (nodesInShortestPathOrder.length === 1) {
      // No path if this is reached
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        // setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.replace('node-visited', 'node-failed');
        // }, 30 * i);
      }
    }
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <>
        {grid ? (
          <div className="buttonList">
            {algorithms.map((alg, i) => (
              <PathButton
                key={i}
                alg={alg}
                grid={grid}
                START_NODE_ROW={new_start_row || START_NODE_ROW}
                START_NODE_COL={new_start_col || START_NODE_COL}
                FINISH_NODE_ROW={new_finish_row || FINISH_NODE_ROW}
                FINISH_NODE_COL={new_finish_col || FINISH_NODE_COL}
                animate={this.animate}
                animateShortestPath={this.animateShortestPath}
              />
            ))}
          </div>
        ) : (
          <h1>Wait</h1>
        )}
        <br />
        <button className="resetButton" onClick={() => this.resetGrid()}>
          Reset Walls
        </button>
        <button className="resetButton" onClick={() => this.resetColors()}>
          Reset Colors
        </button>
        <button
          className="resetButton"
          onClick={() => this.generateRandomMaze()}>
          Random Maze
        </button>
        <button
          className="resetButton"
          onClick={() => this.generateRecursiveDivisionMaze()}>
          Recursive Division Maze
        </button>
        <p className="showInstructions">Instructions </p>
        <div className="instructions">
          <p className="">
            Hold <strong>S</strong> and click to move start
          </p>
          <p className="">
            Hold <strong>F</strong> and click to move finish
          </p>
          <p className="">Click and drag to create walls</p>
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
                      onMouseClick={(row, col) =>
                        this.handleMouseClick(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const numWide = Math.floor(window.innerWidth / 25);
  const numHigh = Math.floor(window.innerHeight / 25);
  const grid = [];
  for (let row = 0; row < numHigh; row++) {
    const currentRow = [];
    for (let col = 0; col < numWide; col++) {
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
    isStart:
      row === (new_start_row || START_NODE_ROW) &&
      col === (new_start_col || START_NODE_COL),
    isFinish:
      row === (new_finish_row || FINISH_NODE_ROW) &&
      col === (new_finish_col || FINISH_NODE_COL),
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
