import { useState } from "react";
import TableDetail from "./TableDetail"
import "../styles/TableList.css"





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

    <li className="tablesList__item"><button className="tablesList__button" onClick={handleClick} style={statusButtonStyles[status]}>
        <p className="tablesList__name"> table: {number} ({status}) </p>
    </button></li>
    );
}


export const List = ({tables, onTableSelect}) => (
    <ul className="tablesList">
        {tables.map((table) =>(
            <Table key={table.number} number={table.number} onSelect={onTableSelect} status={table.status}/>
        ))}
            
        
        <p className="tablesList__count">Tables count: = {tables.length}</p>
    </ul>
);





const TableList = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableOrders, setTableOrders] = useState({});
  const [menuItems] = useState([
  // Starters (5)
  { emoji: "🧀", name: "Cheese platter", price: 12, category: "starter" },
  { emoji: "🥗", name: "Caesar salad", price: 10, category: "starter" },
  { emoji: "🍤", name: "Garlic shrimp", price: 14, category: "starter" },
  { emoji: "🧆", name: "Falafel", price: 8, category: "starter" },
  { emoji: "🥣", name: "Soup of the day", price: 7, category: "starter" },

  // Main Dishes (10)
  { emoji: "🍝", name: "Spaghetti Bolognese", price: 17, category: "main" },
  { emoji: "🍗", name: "Roasted chicken", price: 15, category: "main" },
  { emoji: "🍔", name: "Gourmet burger", price: 14, category: "main" },
  { emoji: "🍕", name: "Margherita pizza", price: 16, category: "main" },
  { emoji: "🍛", name: "Chicken curry", price: 15, category: "main" },
  { emoji: "🥘", name: "Beef stir-fry", price: 18, category: "main" },
  { emoji: "🌮", name: "Taco trio", price: 12, category: "main" },
  { emoji: "🍣", name: "Sushi platter", price: 22, category: "main" },
  { emoji: "🍜", name: "Ramen", price: 13, category: "main" },
  { emoji: "🥩", name: "Grilled steak", price: 25, category: "main" },

  // Desserts (5)
  { emoji: "🍰", name: "Chocolate cake", price: 9, category: "dessert" },
  { emoji: "🍨", name: "Vanilla ice cream", price: 6, category: "dessert" },
  { emoji: "🍮", name: "Crème brûlée", price: 8, category: "dessert" },
  { emoji: "🥧", name: "Apple pie", price: 7, category: "dessert" },
  { emoji: "🍫", name: "Chocolate mousse", price: 7, category: "dessert" },

  // Soft Drinks (5)
  { emoji: "🥤", name: "Cola", price: 3, category: "softDrink" },
  { emoji: "🧃", name: "Orange juice", price: 4, category: "softDrink" },
  { emoji: "🧋", name: "Bubble tea", price: 6, category: "softDrink" },
  { emoji: "☕", name: "Coffee", price: 4, category: "softDrink" },
  { emoji: "🍵", name: "Green tea", price: 3, category: "softDrink" },

  // Alcoholic Beverages (5)
  { emoji: "🍺", name: "Craft beer", price: 7, category: "alcoholic" },
  { emoji: "🍷", name: "Red wine", price: 9, category: "alcoholic" },
  { emoji: "🥃", name: "Whiskey", price: 12, category: "alcoholic" },
  { emoji: "🍹", name: "Mojito", price: 10, category: "alcoholic" },
  { emoji: "🍸", name: "Martini", price: 11, category: "alcoholic" }
]);

  const handleTableSelect = (number) => {
    {/* if number is not equal to selectedTable or null then it sets setSelectedTable to number otherwise it deselects table */}
    setSelectedTable(number === selectedTable ? null : number)
  }

  const handleAddTable = () => {
    const currentNumbers = tables.map(table => table.number);
    let newNumber = 1;

    while (currentNumbers.includes(newNumber)) {newNumber++;}

    const newTable = {
      number: newNumber,
      status: 'reserved'
    };
    // creates a new array with all existing tables (...tables) and the newTable and updates the state
    setTables([...tables, newTable]);

    //adds a new empty array(the order for the new table) mapped to a key [newNumber](table) in an object.
    //initializes a new empty order for new table
    setTableOrders(prev => ({
      ...prev,
      [newNumber]: menuItems.map(item => ({
        ...item,
        quantity: 0,
        total: 0
      }))
    }));
  };

  ////Learn this shit matteo!!!
  const handleUpdateTableStatus = (tableNumber) => {
    setTables(prevTables => {
      const updatedTables = prevTables.map(table => {
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
      
      // If the selected table was removed, clear the selection
      if (!updatedTables.some(table => table.number === tableNumber)) {
        setSelectedTable(null);

        setTableOrders(prev => {
          const newOrders = {...prev};
          delete newOrders[tableNumber];
          return newOrders;
        });
      }
      return updatedTables;
    });
  };

  ////look at this an extra time matteo
  const handleOrderUpdate = (tableNumber, items) => {
    setTableOrders(prev => ({
      ...prev,
      [tableNumber]: items
    }));
  };

  return (
    <section className="tablesSection">
        <h3 className="tablesSection__title">This is the list of tables</h3>
        <button className="tablesSection__button" onClick={handleAddTable}>Add table</button>
        <List tables={tables} onTableSelect={handleTableSelect}/>

        {/* only shows when a table is selected */}
        {selectedTable && 
        <TableDetail 
        number={selectedTable} 
        status={tables.find(table => table.number === selectedTable)?.status || 'reserved'}
        onStatusChange={() => handleUpdateTableStatus(selectedTable)}
        orderedItems={tableOrders[selectedTable] || []}
        onOrderUpdate={(items) => handleOrderUpdate(selectedTable, items)}
        />}

    </section>
  );
};

export default TableList;
