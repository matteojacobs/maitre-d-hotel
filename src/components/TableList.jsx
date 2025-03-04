import React, { useState } from 'react';
import Table from './Table';

function TableList() {
  const [tables, setTables] = useState([])

  const addTable = () => {


    setTables([...tables, <Table key={tables.length} />]);
  };



    return (
        <div>
            <button onClick={addTable}>Add Table</button>
            <div>{tables}</div>
        </div>
    )

 }

export default TableList;



