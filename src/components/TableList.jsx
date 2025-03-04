import React, { useState } from 'react';
import Table from './Table';

function TableList() {
  const [tables, setTables] = useState([]);

  const addTable = () => {
    // Find the smallest missing table number
    let newTableNumber = 1;
    while (tables.includes(newTableNumber)) {
      newTableNumber++;
    }
    setTables([...tables, newTableNumber]);
  };

  const removeTable = (number) => {
    setTables(tables.filter((tableNumber) => tableNumber !== number));
  };

  return (
    <div>
      <button onClick={addTable}>Add Table</button>
      <div>
        {tables.sort((a, b) => a - b).map((tableNumber) => (
          <Table
            key={tableNumber}
            number={tableNumber}
            removeTable={removeTable}
          />
        ))}
      </div>
    </div>
  );
}

export default TableList;