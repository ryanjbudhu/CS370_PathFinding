import React, {Component} from 'react';
import {dijkstra, getNodesInShortestPathOrder} from './dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class DijkstraButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  visualizeDijkstra() {
    const grid = this.props.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.props.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
      </div>
    );
  }
}
