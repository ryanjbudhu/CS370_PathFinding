export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // const pairs = getHeuristics(grid, finishNode);
  for (const row of grid) for (const node of row) node.distance = Infinity;
  startNode.distance = 0;
  const open = [startNode];
  while (open) {
    sortOpenList(open);
    const cur = open.shift();
    if (cur.isWall) continue;
    if (cur === finishNode) return visitedNodesInOrder;
    console.log(cur);
    cur.isVisited = true;
    if (cur !== startNode) visitedNodesInOrder.push(cur);
    updateUnvisitedNeighbors(cur, grid, open, visitedNodesInOrder, finishNode);
  }
  console.log('failure');
  return visitedNodesInOrder;
}

// eslint-disable-next-line
function sortOpenList(open) {
  open.sort(
    (nodeA, nodeB) => nodeA.distance + nodeA.h - (nodeB.distance + nodeB.h),
  );
}

function updateUnvisitedNeighbors(
  node,
  grid,
  open,
  visitedNodesInOrder,
  finishNode,
) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const tentativeScore = node.distance + 1;
    console.log(!visitedNodesInOrder.includes(neighbor));
    if (tentativeScore < neighbor.distance) {
      neighbor.distance = tentativeScore;
      neighbor.h =
        Math.abs(neighbor.col - finishNode.col) +
        Math.abs(neighbor.row - finishNode.row);
      neighbor.previousNode = node;
      if (!visitedNodesInOrder.includes(neighbor)) {
        open.push(neighbor);
      }
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
// eslint-disable-next-line
function getHeuristics(grid, finishNode) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      const heuristic =
        Math.abs(node.col - finishNode.col) +
        Math.abs(node.row - finishNode.row);
      node.distance = Infinity;
      node.h = heuristic;
      // nodes.push({node: node, g: Infinity, h: heuristic});
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder_astar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
