import React from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Link} from 'react-router-dom'

import {logout} from '../store'

import { clearBoard, seedBoard, nextBoard } from '../store/cells'

const Navbar = ({handleClick, isLoggedIn, randomize, clear, start, age}) => (
  <div className="navbar">
    <div>
      <h1>Game of Life</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <ul>
            {/* The navbar will show these links before you log in */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li>cycle: {age}</li>
          </ul>
        </div>
      )}
    </nav>
    <div>
      {isLoggedIn ? (
        <h1>welcome back</h1>
      ): (
        <ul>
          <li>
            <button onClick={randomize} type="button">random</button>
          </li>
          <li>
            <button onClick={clear} type="button">clear</button>
          </li>
          <li>
            <button onClick={start} type="button">start</button>
          </li>
          <li>
            <button onClick={clear} type="button">pause</button>
          </li>

        </ul>
      )}
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    age: state.generation.age
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout()),
    randomize: () => dispatch(seedBoard()),
    clear: () => dispatch(clearBoard()),
    start: () => dispatch(nextBoard()),
  }
}

export default connect(mapState, mapDispatch)(Navbar)
