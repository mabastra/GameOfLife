import React from 'react';
import {connect} from 'react-redux';

import Cell from './Cell';
import { emptyBoard, seedBoard, flipCell } from '../store/cells'

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    const width = 60;
    const height = 60;
    this.props.emptyBoard(width, height);
    this.props.seedBoard();
    this.cellClick = this.cellClick.bind(this);
  }

  cellClick(x, y) {
    this.props.clickCell(x, y)
  }

  render () {
    const cells = this.props.cells || [];
    return (
      <div className="gameboard">
        {
          cells.map((row, x) => 
          <div key={x}>
            {row.map((cell, y)=> <Cell key={`${x}x${y}`} x={x} y={y} cellClick={this.cellClick} status={cell.status}/> )}
            </div>)
        }
      </div>
    )
  }
};

const mapState = (state) => {
  return {
    cells: state.generation.cells,
    age: state.generation.age
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadBoard: () => dispatch(loadBoard()),
    emptyBoard: (width, height) => dispatch(emptyBoard(width, height)),
    seedBoard: () => dispatch(seedBoard()),
    clickCell: (x, y) => dispatch(flipCell(x, y)),
  }
  
}
export default  connect(mapState, mapDispatch)(GameBoard);
