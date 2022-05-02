import React, { useState, setState } from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import {logout} from '../store'

import { clearBoard, seedBoard, nextBoard } from '../store/cells'
import { toggleLoop, resetLoop } from '../store/loop'

const Navbar = ({randomize, clear, toggle, active, age}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <div className="navbar">
        <div>
          <h1><Link to='/'>Game of Life</Link></h1>
          <button onClick={handleShow} type="button">info</button>
        </div>
        <nav>
        generation: {age}

          <ul>
              <li>
                <button onClick={randomize} type="button">random</button>
              </li>
              <li>
                <button onClick={clear} type="button">clear</button>
              </li>
              <li>
                <button onClick={toggle} type="button">{active ? 'pause' : 'play'}</button>
              </li>
          </ul>
        </nav>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conway's Game of Life</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={handleClose}>
            Save Changes
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
    randomize: () => {dispatch(seedBoard()); dispatch(setupLoop())},
    clear: () => {dispatch(clearBoard()); dispatch(resetLoop())},
    toggle: () => {dispatch(toggleLoop());},
  }
}

export default connect(mapState, mapDispatch)(Navbar)
