import { useState } from 'react';

const TableStatus = ({onStatusChange}) => {
    return (
        <button onClick={onStatusChange}>Change status</button>
    );
}

const MenuItem = ({ emoji, name, price, onCountChange }) => {
  const [clickCount, setClickCount] = useState(0);

  const handlePlus = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    onCountChange(price * newCount);
  };

  const handleMinus = () => {
    const newCount = clickCount - 1;
    setClickCount(newCount);
    onCountChange(price * newCount);
  };

  let totalPrice = price * clickCount;

  return (
    <div>
      <button className="menuItem" onClick={handlePlus}>
        <span>{emoji} {name} (€{price})</span>
        <span>amount bought: {clickCount} </span>
      </button>
      {clickCount > 0 && (<button onClick={handleMinus}>remove item</button>)}
      <span>Total price: €{totalPrice}</span>
    </div>
  );
};

const MenuList = () => {
  const [items, setItems] = useState([
    { emoji: "🍝", name: "Spaghetti", price: 17, total: 0 },
    { emoji: "🍟", name: "French fries", price: 1, total: 0 },
    { emoji: "🍗", name: "Roasted chicken", price: 17, total: 0 }
  ]);

  const handleCountChange = (index, newTotal) => {
    const updatedItems = [...items];
    updatedItems[index].total = newTotal;
    setItems(updatedItems);
  };

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <MenuItem 
              emoji={item.emoji} 
              name={item.name} 
              price={item.price}
              onCountChange={(newTotal) => handleCountChange(index, newTotal)}
            />
          </li>
        ))}
      </ul>
      <div>Grand Total: €{grandTotal}</div>
    </div>
  );
};




const TableDetail = ({ number, onStatusChange }) => (
  <div className="table-details">
    <h4>Table {number}</h4>
    <TableStatus onStatusChange={onStatusChange}/>
    <MenuList />
    {/* Add more details here as needed */}
  </div>
);

export default TableDetail;
