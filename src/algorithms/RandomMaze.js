export default function RandomMaze(grid) {
  // Find start and end node
  const [startNode, finishNode] = grid
    .reduce((a, b) => a.concat(b))
    .filter(node => node.isStart || node.isFinish);
  const path = getRandomPath(grid, startNode, finishNode);
  const newGrid = addRandomWalls(grid, path, startNode, finishNode);
  return newGrid;
}

const addRandomWalls = (grid, path, startNode, finishNode) => {
  for (const row of grid) {
    for (const node of row) {
      if (path.includes(node) || node === startNode || node === finishNode)
        continue;
      const addWall = Math.floor(Math.random() * 10);
      if (addWall < 4) {
        node.isWall = true;
      }
    }
  }
  return grid;
};

const getRandomPath = (options, startNode, finishNode) => {
  const path = [];
  while (path[path.length - 1] !== finishNode) {
    const cur = pickRandomNeighbor(options, startNode);
    path.push(cur);
    options = options.filter(node => node !== cur);
    break;
  }
  return path;
};

const pickRandomNeighbor = (options, node) => {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(options[row - 1][col]);
  if (row < options.length - 1) neighbors.push(options[row + 1][col]);
  if (col > 0) neighbors.push(options[row][col - 1]);
  if (col < options[0].length - 1) neighbors.push(options[row][col + 1]);
  const neighborNum = Math.floor(Math.random() * (neighbors.length - 1));
  return neighbors[neighborNum];
};
