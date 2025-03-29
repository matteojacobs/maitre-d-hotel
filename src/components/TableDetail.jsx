import { useState } from 'react';

const TableStatus = ({ onStatusChange }) => {
  return (
    <button onClick={onStatusChange}>Change status</button>
  );
};

const MenuItem = ({ emoji, name, price, onCountChange }) => {
  const [clickCount, setClickCount] = useState(0);

  const handlePlus = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    onCountChange(name, newCount, price);
  };

  const handleMinus = () => {
    const newCount = Math.max(0, clickCount - 1);
    setClickCount(newCount);
    onCountChange(name, newCount, price);
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

const MenuList = ({ onOrderUpdate }) => {
  const [items, setItems] = useState([
    { emoji: "🍝", name: "Spaghetti", price: 17, total: 0 },
    { emoji: "🍟", name: "French fries", price: 1, total: 0 },
    { emoji: "🍗", name: "Roasted chicken", price: 17, total: 0 }
  ]);

  const handleCountChange = (index, name, newCount, price) => {
    const updatedItems = [...items];
    updatedItems[index].total = price * newCount;
    setItems(updatedItems);
    
    // Create an array of ordered items with quantities
    const orderedItems = items.map((item, i) => ({
      name: item.name,
      quantity: i === index ? newCount : item.total / item.price || 0,
      price: item.price,
      total: i === index ? price * newCount : item.total
    }));
    
    onOrderUpdate(orderedItems);
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
              onCountChange={(name, newCount, price) => handleCountChange(index, name, newCount, price)}
            />
          </li>
        ))}
      </ul>
      <div>Grand Total: €{grandTotal}</div>
    </div>
  );
};

const Bill = ({ orderedItems, onClose }) => {
  const grandTotal = orderedItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bill">
      <h3>Bill</h3>
      <button onClick={onClose}>Close Bill</button>
      <ul>
        {orderedItems.filter(item => item.quantity > 0).map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x €{item.price} = €{item.total}
          </li>
        ))}
      </ul>
      <div>Total: €{grandTotal}</div>
    </div>
  );
};

const TableDetail = ({ number, onStatusChange, orderedItems, onOrderUpdate }) => {
  const [showBill, setShowBill] = useState(false);

  return (
    <div className="table-details">
      <h4>Table {number}</h4>
      <TableStatus onStatusChange={onStatusChange}/>
      <MenuList onOrderUpdate={onOrderUpdate} />
      {orderedItems.some(item => item.quantity > 0) && (
        <button onClick={() => setShowBill(true)}>Show Bill</button>
      )}
      {showBill && (
        <Bill 
          orderedItems={orderedItems} 
          onClose={() => setShowBill(false)} 
        />
      )}
    </div>
  );
};

export default TableDetail;