import React, { useState } from 'react';
import Table from './Table';

function TableList() {
  const [tables, setTables] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track collapse

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };

  return (
    <div>
      <h1>Tablelist</h1>
      <button onClick={toggleCollapse}>
        {isCollapsed ? 'Show Tablelist' : 'Hide Tablelist'}
      </button>
      {!isCollapsed && ( // Conditionally render the table list and "Add Table" button
        <div>
          <div>
            {tables.sort((a, b) => a - b).map((tableNumber) => (
              <Table
                key={tableNumber}
                number={tableNumber}
                removeTable={removeTable}
              />
            ))}
          </div>
          <button onClick={addTable}>Add Table</button>
        </div>
      )}
    </div>
  );
}

export default TableList;