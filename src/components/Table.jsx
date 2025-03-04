import React from 'react';



function Table({number}) {
  const handleClick = () => {};

  return (
    <div className="table" onClick={handleClick}>
      <div>Table {number}</div>
    </div>
  );
}

export default Table;