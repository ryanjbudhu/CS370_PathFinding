export default function EllersMaze(
    grid, 
    old_start_row,
    old_start_col,
    old_finish_row,
    old_finish_col,
  ) {
    // Move start and end points
    grid[old_start_row][old_start_col].isStart = false;
    grid[old_finish_row][old_finish_col].isFinish = false;
    grid[0][0].isStart = true;
    grid[grid.length - 1][grid[0].length - 1].isFinish = true;
    
    let cellsInSet = {},
    setWithCells = {};
    for (var i = 0; i < grid[0].length; ++i){
        cellsInSet[grid[0][i].col] = i;
        setWithCells[i] = [grid[0][i].col];
    }
    randomMergeCells(cellsInSet, setWithCells, grid[0]);
    for (i = 2; i < grid[0].length-1; ++i){
        if (setWithCells[i].length >= 2){
            grid[0][i].isWall = true;
        }
    }

    console.log(cellsInSet, setWithCells);

    for (var row = 1; row < grid.length; ++row){
        for (var col = 0; col < grid[row].length; ++col){
            if (Math.floor(Math.random()*20) < 5){
                grid[row][col].isWall = true;
                continue;
            }
        }
    }

    return [grid, grid.length - 1, grid[0].length - 1];
}

function randomPass(grid, rowIdx, set) {
    
}

function randomMergeCells(cellsInSet, setWithCells, row){
    const randomList = getRandArray(row.length);
    for (var i = 0; i < randomList.length; ++i){
        if (randomList[i] !== row.length-1){
            mergeCellSets(cellsInSet, setWithCells, row[randomList[i]].col, row[randomList[i]+1].col);
        }
    }
}

function mergeCellSets(cellsInSet, setWithCells, cell1, cell2) {
    // Get the set numbers for each cell
    const whatSetToAdd = cellsInSet[cell1],
    whatSetToRemove = cellsInSet[cell2];
    // Remove the cell2 from the list of cells in original set
    setWithCells[whatSetToRemove].splice(setWithCells[whatSetToRemove].indexOf(cell2),1);
    // Change which set cell2 is in
    cellsInSet[whatSetToRemove] = whatSetToAdd;
    // Add cell2 to cell1's set
    setWithCells[whatSetToAdd].push(cell2);
}

const getRandArray = (rowLength) => [...Array(
    Math.floor(Math.random() * rowLength) + 1)]
    .map(_=>Math.floor(Math.random() * rowLength));