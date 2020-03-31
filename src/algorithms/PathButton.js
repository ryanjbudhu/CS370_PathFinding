import React, {Component} from 'react';
import {dijkstra, getNodesInShortestPathOrder_dijkstra} from './Dijkstra';
import {astar, getNodesInShortestPathOrder_astar} from './AStar';

const START_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const START_NODE_COL = Math.floor((window.innerWidth * 0.25) / 25);
const FINISH_NODE_ROW = Math.floor((window.innerHeight * 0.35) / 25);
const FINISH_NODE_COL = Math.floor((window.innerWidth * 0.75) / 25);

export default class DijkstraButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  visualize() {
    const grid = this.props.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;
    let nodesInShortestPathOrder;
    switch (this.props.alg) {
      case 'A*':
        visitedNodesInOrder = astar(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrder_astar(
          finishNode,
        );
        break;
      case 'Dijkstra':
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrder_dijkstra(
          finishNode,
        );
        break;
      default:
        return;
    }
    this.props.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.visualize()}>
          Visualize {this.props.alg}'s Algorithm
        </button>
      </div>
    );
  }
}
