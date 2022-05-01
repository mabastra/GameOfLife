const EMPTY_BOARD = "EMPTY_BOARD";
const LOAD_BOARD = "LOAD_BOARD";
const SEED_BOARD = "SEED_BOARD";
const CLEAR_BOARD = "CLEAR_BOARD";
const NEXT_BOARD = "NEXT_BOARD";
const FLIP_CELL = "FLIP_CELL";



export const emptyBoard = (width, height) => {
  //build board and return in action payload
  let cells = [];
  for (let i=0; i<width; i++){
    cells.push([])
    for (let j=0; j<height; j++)
      cells[i].push({color: 'green', status: 'dead'});
  }

  return {
    type: EMPTY_BOARD,
    generation : {
      cells,
      age: 0,
    }
  }
}

export const clearBoard = () => {
  return {
    type: CLEAR_BOARD,
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

export const nextBoard = () => {
  return {
    type: NEXT_BOARD,
  }
}

export default function(state = {}, action) {
  
  switch (action.type) {
    case EMPTY_BOARD:
      return action.generation

    case CLEAR_BOARD: {
      const cells = [...state.cells]
      for (let x=0; x<cells.length; x++)
        for (let y=0; y<cells[x].length; y++)
          cells[x][y].status = 'dead'
      return { cells, age: 0 }
    }

    case LOAD_BOARD:
      return state

    case SEED_BOARD: {
      const cells = [...state.cells]
      for (let x=0; x<cells.length; x++)
        for (let y=0; y<cells[x].length; y++)
          cells[x][y].status = (Math.floor(Math.random() * 9)%5 === 0) ? 'alive' : 'dead';
      return { cells, age: 0}
    }

    case NEXT_BOARD: {
      const curr = [...state.cells]
      const age = state.age + 1
      let next = []
      // process rules
      for (let x=0; x<curr.length; x++) {
        next.push([])
        for (let y=0; y<curr[x].length; y++) {
          let neighbors = 0;
          // count up neighbors
          for (let _x = x-1; _x <= x+1; _x++) {
            for (let _y = y-1; _y <= y+1; _y++) {
              // neighbor must be in bounds, not self, and alive
              if (_x >= 0 && _y >= 0 &&
                  _x < curr.length && _y < curr[x].length)
                  if (curr[_x][_y].status === 'alive') {
                    if (!(_x === x && _y === y)) neighbors++;
                  }
            }
          }
          let cell = { color: 'green', status: '' }
          // dead or alive
          cell.status = (curr[x][y].status === 'alive')
            // dead this cell if necessary
            ? (neighbors < 2 || neighbors > 3)
              ?  'dead' : 'alive'
            // alive this cell if necessary
            : (neighbors === 3)
              ? 'alive' : 'dead';
          next[x].push(cell);
        }
      }
      return { cells: next, age }
    }

    case FLIP_CELL: {
      const cells = [...state.cells]
      cells[action.cell.x][action.cell.y].status =
        (cells[action.cell.x][action.cell.y].status === 'alive') 
          ? 'dead' 
          : 'alive';
      return {...state, cells}
    }

    default:
      return state
  }
}