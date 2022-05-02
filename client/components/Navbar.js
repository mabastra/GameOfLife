import React, { useState } from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'

import {logout} from '../store'

import { clearBoard, seedBoard, saveBoard, loadBoard, sampleBoard } from '../store/cells';
import { toggleLoop, resetLoop } from '../store/loop';

const Navbar = ({randomize, clear, saveLocal, loadLocal, loadPattern, toggle, active, age}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>

      <nav>
        <ul className="left-nav">
          <li><h1><Link to='/'>Game of Life</Link></h1></li>
          <li>generation: {age}</li>
        </ul>

        <ul className="right-nav"l>
          <li>
            <button onClick={handleShow} type="button">info</button>
          </li>
          <li>
            <button onClick={randomize} disabled={active} type="button">random</button>
          </li>
          <li>
            <button onClick={clear} disabled={active} type="button">clear</button>
          </li>
          <li>
            <button onClick={loadLocal} disabled={active} type="button">load</button>
          </li>
          <li>
            <button onClick={saveLocal} disabled={active} type="button">save</button>
          </li>
          <li>
            <button onClick={toggle} type="button">{active ? 'stop' : 'play'}</button>
          </li>
        </ul>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Conway's Game of Life</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>About</h5>
          <p>The Game of Life is an example of a cellular automaton, a way to mathematically model life evolving over time on a grid. Also known simply as Life, the rules for evolution were invented in 1970 by mathematician John Horton Conway.</p>
          <h5>Rules</h5>
          <p>Life begins with a starting arrangement of cells, and continues without input (making Life a zero player game) according to the following rules:
          </p>
          <ol>
            <li>Any live cell with fewer than two live neighbours dies (loneliness) </li>
            <li>Any live cell with two or three live neighbours lives on to the next generation (contentment)</li>
            <li>Any live cell with more than three live neighbours dies (overcrowding)</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell (reproduction)</li>
          </ol>
          <h5>Demos</h5>
          <ul>
            <li><button onClick={()=>loadPattern('oscillators')} type="button">oscillators</button></li>
            <li><button onClick={()=>loadPattern('spaceships')} type="button">spaceships</button></li>
          </ul>
          
          <h5>Quote</h5>
          <p>People think that mathematics is complicated. Mathematics is the simple bit, it’s the stuff that we can understand. It’s cats that are complicated.<br />-John Horton Conway</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={handleClose}>
            close
          </button>
        </Modal.Footer>
      </Modal>

  </>
)}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    age: state.generation.age,
    active: state.loop,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout()),
    randomize: () => {dispatch(seedBoard()); dispatch(resetLoop())},
    clear: () => {dispatch(clearBoard()); dispatch(resetLoop())},
    toggle: () => {dispatch(toggleLoop());},
    saveLocal: () => {dispatch(saveBoard());},
    loadLocal: () => {dispatch(loadBoard());},
    loadPattern: (pattern) => {dispatch(sampleBoard(pattern));},
  }
}

export default connect(mapState, mapDispatch)(Navbar)
