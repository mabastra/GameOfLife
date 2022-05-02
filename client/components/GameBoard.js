import React from 'react';
import {connect} from 'react-redux';

import Cell from './Cell';
import { emptyBoard, seedBoard, nextBoard, flipCell } from '../store/cells'
import { resetLoop, toggleLoop } from '../store/loop'

const width = 60;
const height = 60;

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    console.log('interrupt')
    this.props.setup(width, height);
    this.props.seedBoard();
    this.cellClick = this.cellClick.bind(this);
  }

  cellClick(x, y) {
    if (!this.props.active) this.props.clickCell(x, y)
  }

  componentWillUnmount() {
    //empty board out for refresh
    this.props.destroy()

  }

  render () {
    const cells = this.props.cells || [];
    const active = this.props.active || false;
    const changed = this.props.changed || false;
    
    if (active === true && changed === false) this.props.toggle();
    if (active) setTimeout(this.props.play, 100);

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
    age: state.generation.age,
    changed: state.generation.changed,
    active: state.loop,
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadBoard: () => dispatch(loadBoard()),
    setup: (width, height) => { dispatch(emptyBoard(width, height)); dispatch(resetLoop()); },
    seedBoard: () => dispatch(seedBoard()),
    clickCell: (x, y) => dispatch(flipCell(x, y)),
    play: () => dispatch(nextBoard()),
    toggle: () => { dispatch(toggleLoop()) },
    destroy: () => { dispatch(clearBoard()); dispatch(resetLoop()); },
  }
  
}
export default  connect(mapState, mapDispatch)(GameBoard);
