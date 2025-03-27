import { useState } from "react";

const Table = ({number}) => (
    <li className="table">
        <p> table: {number} </p>
    </li>
);


export const List = ({nTables}) => (
    <ul>
        {Array.from({length: nTables}).map((_, index) => (
            <Table key={index} number={index + 1} />
        ))}
        <p>amountTables = {nTables}</p>
    </ul>
);





const TableList = () => {
  const [amountTables, setAmountTables] = useState(0);
  //function to add or remove tables
  //component for a table
  return (
    <section>
        <h3>This is the list of tables</h3>
        <button onClick={() => setAmountTables(amountTables + 1)}>Add table</button>
        <List nTables={amountTables} />
    </section>
  );
};

export default TableList;
