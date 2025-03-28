import { useState } from "react";
import TableDetail from "./TableDetail"





const Table = ({number, onSelect}) => {
    const handleClick = () => {
        onSelect(number);

    }

    return (

    <li><button onClick={handleClick} className="table">
        <p> table: {number} </p>
    </button></li>
    );
}


export const List = ({nTables, onTableSelect}) => (
    <ul>
        {Array.from({length: nTables}).map((_, index) => (
            <Table key={index} number={index + 1} onSelect={onTableSelect}/>
        ))}
        <p>amountTables = {nTables}</p>
    </ul>
);





const TableList = () => {
  const [amountTables, setAmountTables] = useState(0);
  const [selectedTable, setSelectedTable] = useState(null);
  //function to add or remove tables
  //component for a table

  const handleTableSelect = (number) => {
    {/* if number is not equal to selectedTable or null then it sets setSelectedTable to number otherwise it deselects table */}
    setSelectedTable(number === selectedTable ? null : number)
  }

  return (
    <section>
        <h3>This is the list of tables</h3>
        <button onClick={() => setAmountTables(amountTables + 1)}>Add table</button>
        <List nTables={amountTables} onTableSelect={handleTableSelect}/>

        {/* only shows when a table is selected */}
        {selectedTable && <TableDetail number={selectedTable} />}

    </section>
  );
};

export default TableList;
