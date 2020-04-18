// import {generate} from 'generate-maze';
var generate = require('generate-maze');

export default function RealEllersMaze(
  grid,
  old_start_row,
  old_start_col,
  old_finish_row,
  old_finish_col,
) {
  // Move start and end positions
  grid[old_start_row][old_start_col].isStart = false;
  grid[old_finish_row][old_finish_col].isFinish = false;
  grid[0][0].isStart = true;
  grid[grid.length - 1][grid[0].length - 1].isFinish = true;
  let randomMaze = generate(grid[0].length / 2, grid.length / 2);
  console.log(randomMaze);
  convertMaze(grid, randomMaze);
  return [grid, grid.length - 1, grid[0].length - 1];
}

function convertMaze(grid, randomMaze) {
  var gridRowIdx = 1;
  for (var row = 0; row < randomMaze.length - 1; ++row) {
    var gridColIdx = 2;
    for (var col = 0; col < randomMaze[0].length - 1; ++col) {
      if (gridRowIdx > 0) {
        if (randomMaze[row][col].top) {
          grid[gridRowIdx - 1][gridColIdx].isWall = true;
        }
      }
      if (gridRowIdx < grid.length - 1) {
        if (randomMaze[row][col].bottom) {
          grid[gridRowIdx + 1][gridColIdx].isWall = true;
        }
      }
      if (gridColIdx > 0) {
        if (randomMaze[row][col].left) {
          grid[gridRowIdx][gridColIdx - 1].isWall = true;
        }
      }
      if (gridColIdx < grid[0].length - 1) {
        if (randomMaze[row][col].right) {
          grid[gridRowIdx][gridColIdx + 1].isWall = true;
        }
      }
      gridColIdx += 2;
    }
    gridRowIdx += 2;
  }
}
