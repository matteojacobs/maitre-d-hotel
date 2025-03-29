import { useState } from 'react';

const TableStatus = ({ onStatusChange }) => {
  return (
    <button onClick={onStatusChange}>Change status</button>
  );
};

const MenuItem = ({ emoji, name, price, onCountChange, clickCount }) => {

  const handlePlus = () => {
    const newCount = clickCount + 1;
    onCountChange(name, newCount, price);
  };

  const handleMinus = () => {
    const newCount = clickCount - 1;
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

const MenuList = ({ menuItems, onOrderUpdate }) => {
  const handleCountChange = (index, name, newCount, price) => {
    const updatedItems = [...menuItems].map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: newCount,
          total: price * newCount
        };
      }
      return item;
    });
    
    onOrderUpdate(updatedItems);
  };

  const grandTotal = menuItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <MenuItem 
              emoji={item.emoji} 
              name={item.name} 
              price={item.price}
              clickCount={item.quantity || 0}
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

const TableDetail = ({ number, onStatusChange, orderedItems, onOrderUpdate, menuItems }) => {
  const [showBill, setShowBill] = useState(false);

  return (
    <div className="table-details">
      <h4>Table {number}</h4>
      <TableStatus onStatusChange={onStatusChange}/>

      <MenuList 
        menuItems={orderedItems.length > 0 ? orderedItems : menuItems.map(item => ({...item, quantity: 0, total: 0}))}
        onOrderUpdate={onOrderUpdate} 
      />

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