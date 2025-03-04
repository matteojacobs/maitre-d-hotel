import React, { useState } from 'react';
import Table from './Table';

function TableList() {
  const [tables, setTables] = useState([]);

  const addTable = () => {
    const tableNumber = tables.length + 1; 
    setTables([...tables, <Table key={tableNumber} number={tableNumber} />]);
  };

  return (
    <div>
      <button onClick={addTable}>Add Table</button>
      <div>{tables}</div>
    </div>
  );
}

export default TableList;