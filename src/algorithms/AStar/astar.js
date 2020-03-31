export function astar(grid, startNode, finishNode) {
  // const visitedNodesInOrder = [];
  // startNode.distance = 0;
  // const unvisitedNodes = getAllNodes(grid);
  // while (!!unvisitedNodes.length) {
  //   sortNodesByDistance(unvisitedNodes);
  //   const closestNode = unvisitedNodes.shift();
  //   // If we encounter a wall, we skip it.
  //   if (closestNode.isWall) continue;
  //   // If the closest node is at a distance of infinity,
  //   // we must be trapped and should therefore stop.
  //   if (closestNode.distance === Infinity) return visitedNodesInOrder;
  //   closestNode.isVisited = true;
  //   visitedNodesInOrder.push(closestNode);
  //   if (closestNode === finishNode) return visitedNodesInOrder;
  //   updateUnvisitedNeighbors(closestNode, grid);
  // }
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
