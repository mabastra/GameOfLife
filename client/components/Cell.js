import React from 'react';

const Cell = ({x, y, status, cellClick}) => {
  return (
    <div className={status} onClick={() => cellClick(x, y)}> </div>
  )
}

export default Cell;