export default function RecursiveDivision(
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
    0,
    0,
    grid.length,
    grid[0].length,
    pick_orientation(grid[0].length, grid.length),
  );
  return [grid, 0, 0, grid.length - 1, grid[0].length - 1];
}

function divide(grid, x, y, width, height, orientation) {
  if (width < 8 || height < 8) return;

  const isHorizontal = orientation === 'H';

  let wallx = x + (isHorizontal ? 0 : Math.floor(Math.random() * (width - 2)));
  let wally = y + (isHorizontal ? Math.floor(Math.random() * (height - 2)) : 0);

  const openingx =
    wallx + (isHorizontal ? Math.floor(Math.random() * width) : 0);
  const openingy =
    wally + (isHorizontal ? 0 : Math.floor(Math.random() * height));

  const dirx = isHorizontal ? 1 : 0;
  const diry = isHorizontal ? 0 : 1;

  const wallLength = isHorizontal ? width : height;

  for (let i = 0; i < wallLength; ++i) {
    if (wallx !== openingx || wally !== openingy) {
      grid[wallx][wally].isWall = true;
    }
    wallx += dirx;
    wally += diry;
  }

  let [newx, newy] = [x, y];
  let [newWidth, newHeight] = isHorizontal
    ? [width, wally - y + 1]
    : [wallx - x + 1, height];
  divide(
    grid,
    newx,
    newy,
    newWidth,
    newHeight,
    pick_orientation(newWidth, newHeight),
  );

  [newx, newy] = isHorizontal ? [x, wally + 1] : [wallx + 1, y];
  [newWidth, newHeight] = isHorizontal
    ? [width, y + height - wally - 1]
    : [x + width - wallx - 1, height];
  divide(
    grid,
    newx,
    newy,
    newWidth,
    newHeight,
    pick_orientation(newWidth, newHeight),
  );
}

function pick_orientation(width, height) {
  if (width < height) return 'H';
  else if (height < width) return 'V';
  return Math.floor(Math.random() * 2) ? 'H' : 'V';
}
