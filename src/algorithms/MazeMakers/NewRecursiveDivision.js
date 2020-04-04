export default function NewRecursiveDivision(
  grid,
  old_start_row,
  old_start_col,
  old_finish_row,
  old_finish_col,
) {
  grid[old_start_row][old_start_col].isStart = false;
  grid[old_finish_row][old_finish_col].isFinish = false;
  grid[0][0].isStart = true;
  grid[grid.length - 1][grid[0].length - 1].isFinish = true;
  divide(
    grid,
    grid.reduce((a, b) => a.concat(b)),
  );
  return [grid, grid.length - 1, grid[0].length - 1];
}

function divide(grid, region) {
  if (region.length < 22) return;
  let seeds = [];
  const randA = Math.floor(Math.random() * (region.length - 1));
  let subregion_A = [region[randA]];
  region.splice(randA, 1);
  seeds.push(subregion_A[0]);

  const randB = Math.floor(Math.random() * (region.length - 1));
  let subregion_B = [region[randB]];
  seeds.push(subregion_B[0]);

  while (seeds.length > 0) {
    const randIdx = Math.floor(Math.random() * (seeds.length - 1));
    const curr = seeds[randIdx];
    seeds.splice(randIdx, 1);
    const inSubA = subregion_A.includes(curr);
    for (const neighbor of getNeighbors(grid, region, curr)) {
      if (subregion_A.includes(neighbor) || subregion_B.includes(neighbor))
        continue;
      seeds.push(neighbor);
      if (inSubA) subregion_A.push(neighbor);
      else subregion_B.push(neighbor);
    }
  }

  const barrierList = findBarrier(grid, subregion_A, subregion_B);
  const randomHoleIdx = Math.floor(Math.random() * (barrierList.length - 2));
  const randomHole = [
    barrierList[randomHoleIdx],
    barrierList[randomHoleIdx + 1],
  ];
  for (const bCell of barrierList) {
    if (randomHole.includes(bCell)) continue;
    grid[bCell.row][bCell.col].isWall = true;
    subregion_A.splice(subregion_A.indexOf(bCell), 1);
  }
  // First sub region
  divide(grid, subregion_A);

  // Second sub region
  divide(grid, subregion_B);
}

function getNeighbors(grid, region, node) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0 && region.includes(grid[row - 1][col]))
    neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1 && region.includes(grid[row + 1][col]))
    neighbors.push(grid[row + 1][col]);
  if (col > 0 && region.includes(grid[row][col - 1]))
    neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1 && region.includes(grid[row][col + 1]))
    neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function findBarrier(grid, subA, subB) {
  const barrierCells = [];
  for (const cellA of subA) {
    const {row, col} = cellA;
    if (row > 0 && subB.includes(grid[row - 1][col])) {
      barrierCells.push(cellA);
      continue;
    }
    if (row < grid.length - 1 && subB.includes(grid[row + 1][col])) {
      barrierCells.push(cellA);
      continue;
    }
    if (col > 0 && subB.includes(grid[row][col - 1])) {
      barrierCells.push(cellA);
      continue;
    }
    if (col < grid[0].length - 1 && subB.includes(grid[row][col + 1])) {
      barrierCells.push(cellA);
      continue;
    }
  }
  return barrierCells;
}
