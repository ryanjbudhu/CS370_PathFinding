import React, {Component} from 'react';
import {astar, getNodesInShortestPathOrder} from './astar';

const START_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const START_NODE_COL = Math.floor((window.innerWidth * 0.25) / 25);
const FINISH_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const FINISH_NODE_COL = Math.floor((window.innerWidth * 0.75) / 25);

export default class DijkstraButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  visualizeAStar() {
    const grid = this.props.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.props.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.visualizeAStar()}>
          Visualize A* Algorithm
        </button>
      </div>
    );
  }
}
