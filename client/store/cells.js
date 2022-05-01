const EMPTY_BOARD = "EMPTY_BOARD";
const LOAD_BOARD = "LOAD_BOARD";
const SEED_BOARD = "SEED_BOARD";
const FLIP_CELL = "FLIP_CELL";

export const emptyBoard = (width, height) => {
  //build board and return in action payload
  const protoCell = {creature: '🦠', status: 'dead'}
  let cells = [];
  for (let i=0; i<width; i++){
    cells.push([])
    for (let j=0; j<height; j++)
      cells[i].push({creature: '🦠', status: 'dead'});
  }
  // const cells = Array(height).fill().map(() => Array(width).fill(protoCell));

  return {
    type: EMPTY_BOARD,
    cells
  }
}
export const seedBoard = () => {
  return {
    type: SEED_BOARD,
  }
}
export const flipCell = (x, y) => {
  return {
    type: FLIP_CELL,
    cell: {x, y}
  }
}

export default function(state = [], action) {
  
  switch (action.type) {
    case EMPTY_BOARD:
      return action.cells

    case LOAD_BOARD:
      return state

    case SEED_BOARD: {
      const cells = [...state]
      for (let x=0; x<cells.length; x++)
        for (let y=0; y<cells[x].length; y++)
          cells[x][y].status = (Math.floor(Math.random() * 9)%5 === 0) ? 'alive' : 'dead';
      return cells
    }

    case FLIP_CELL: {
      const cells = [...state]
      cells[action.cell.x][action.cell.y].status =
        (cells[action.cell.x][action.cell.y].status === 'alive') 
          ? 'dead' 
          : 'alive';
      return cells
    }

    default:
      return state
  }
}