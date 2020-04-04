import React, {Component} from 'react';
import {dijkstra, getNodesInShortestPathOrder_dijkstra} from './Dijkstra';
import {astar, getNodesInShortestPathOrder_astar} from './AStar';

export default class DijkstraButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // ADD ALGORITHM NAME IN SWITCH
  visualize() {
    const grid = this.props.grid;
    const startNode = grid
      .reduce((a, b) => a.concat(b))
      .filter(node => node.isStart)[0];
    const finishNode = grid
      .reduce((a, b) => a.concat(b))
      .filter(node => node.isFinish)[0];
    console.log(startNode, finishNode);
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
