import { useState } from "react";
import TableDetail from "./TableDetail"





const Table = ({number, status, onSelect}) => {
    const statusButtonStyles = {
        reserved: { backgroundColor: "lightblue", color: 'black' },
        seated: { backgroundColor: "#FA8072", color: 'black' },
        orderTaken: { backgroundColor: "#FAD6A5", color: 'black' },
        foodDelivered: { backgroundColor: "#D8E4BC", color: 'black' },
    }

    const handleClick = () => {
        onSelect(number);

    }

    return (

    <li><button onClick={handleClick} style={statusButtonStyles[status]} className="table">
        <p> table: {number} ({status}) </p>
    </button></li>
    );
}


export const List = ({tables, onTableSelect}) => (
    <ul>
        {tables.map((table) =>(
            <Table key={table.number} number={table.number} onSelect={onTableSelect} status={table.status}/>
        ))}
            
        
        <p>Tables count: = {tables.length}</p>
    </ul>
);





const TableList = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  //function to add or remove tables
  //component for a table

  const handleTableSelect = (number) => {
    {/* if number is not equal to selectedTable or null then it sets setSelectedTable to number otherwise it deselects table */}
    setSelectedTable(number === selectedTable ? null : number)
  }

  const handleAddTable = () => {
    const newTable = {
      number: tables.length + 1,
      status: 'reserved'
    };
    // creates a new array with all existing tables (...tables) and the newTable and updates the state
    setTables([...tables, newTable]);
  };


  const handleUpdateTableStatus = (tableNumber) => {
    setTables(prevTables => {
      return prevTables.map(table => {
        if (table.number === tableNumber) {
          const statusOrder = ['reserved', 'seated', 'orderTaken', 'foodDelivered'];
          const currentIndex = statusOrder.indexOf(table.status);
          const nextStatus = statusOrder[currentIndex + 1] || 'remove';
          
          return nextStatus === 'remove' 
            ? null // Mark for removal
            : { ...table, status: nextStatus };
        }
        return table;
      }).filter(Boolean); // Remove null tables
    });
  };


  return (
    <section>
        <h3>This is the list of tables</h3>
        <button onClick={handleAddTable}>Add table</button>
        <List tables={tables} onTableSelect={handleTableSelect}/>

        {/* only shows when a table is selected */}
        {selectedTable && <TableDetail number={selectedTable} onStatusChange={() => handleUpdateTableStatus(selectedTable)}/>}

    </section>
  );
};

export default TableList;
