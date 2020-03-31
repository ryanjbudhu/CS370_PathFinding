import React, {Component} from 'react';
import Node from './Node/Node';
// import DijkstraButton from '../algorithms/Dijkstra/DijkstraButton';
// import AStarButton from '../algorithms/AStar/AstarButton';
import PathButton from '../algorithms/PathButton';

import './PathfindingVisualizer.css';

const START_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const START_NODE_COL = Math.floor((window.innerWidth * 0.25) / 25);
const FINISH_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const FINISH_NODE_COL = Math.floor((window.innerWidth * 0.75) / 25);

const algorithms = ['A*', 'Dijkstra'];

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

  resetGrid() {
    const grid = getInitialGrid();
    const visitedNodes = document.getElementsByClassName('node-visited');
    while (visitedNodes.length > 0) {
      visitedNodes[0].classList.remove('node-visited');
    }
    const pathNodes = document.getElementsByClassName('node-shortest-path');
    while (pathNodes.length > 0) {
      pathNodes[0].classList.remove('node-shortest-path');
    }
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

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.add('node-visited');
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.replace('node-visited', 'node-shortest-path');
      }, 50 * i);
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
                animate={this.animate}
                animateShortestPath={this.animateShortestPath}
              />
            ))}
            {/* <DijkstraButton
              grid={grid}
              animate={this.animate}
              animateShortestPath={this.animateShortestPath}
            />
            <AStarButton
              grid={grid}
              animate={this.animate}
              animateShortestPath={this.animateShortestPath}
            /> */}
          </div>
        ) : (
          <h1>Wait</h1>
        )}
        <br />
        <button className="resetButton" onClick={() => this.resetGrid()}>
          Reset
        </button>
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
