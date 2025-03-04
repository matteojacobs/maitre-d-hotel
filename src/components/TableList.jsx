import React, { useState } from 'react';
import Table from './Table';

function TableList() {
  const [tables, setTables] = useState([]);

  const addTable = () => {
    const tableNumber = tables.length + 1;
    setTables([...tables, tableNumber]);
  };

  const removeTable = (number) => {
    setTables(tables.filter((tableNumber) => tableNumber !== number));
  };

  return (
    <div>
      <button onClick={addTable}>Add Table</button>
      <div>
        {tables.map((tableNumber) => (
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