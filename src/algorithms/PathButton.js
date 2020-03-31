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
    const startNode =
      grid[this.props.START_NODE_ROW][this.props.START_NODE_COL];
    const finishNode =
      grid[this.props.FINISH_NODE_ROW][this.props.FINISH_NODE_COL];
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
