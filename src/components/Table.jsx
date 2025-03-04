import React from 'react';

function Table({ number, removeTable }) {
  const handleClick = () => {
    removeTable(number);
  };

  return (
    <div className="table">
      <div>Table {number}</div>
      <button onClick={handleClick}>Remove</button>
    </div>
  );
}

export default Table;