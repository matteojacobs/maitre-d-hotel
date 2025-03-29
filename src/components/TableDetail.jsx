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

  const total = menuItems.reduce((sum, item) => sum + item.total, 0);

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
      <div>Total: €{total}</div>
    </div>
  );
};

const Bill = ({ orderedItems }) => {
  const total = orderedItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bill">
      <h3>Bill</h3>
      <ul>
        {orderedItems.filter(item => item.quantity > 0).map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} x €{item.price} = €{item.total}
          </li>
        ))}
      </ul>
      <div>Total: €{total}</div>
    </div>
  );
};

const TableDetail = ({ number, status, onStatusChange, orderedItems, onOrderUpdate, menuItems }) => {
  

  const shouldShowMenu = ['seated', 'orderTaken', 'foodDelivered'].includes(status);
  const shouldShowBill = status === 'foodDelivered';

  return (
    <div className="table-details">
      <h4>Table {number}</h4>
      <TableStatus onStatusChange={onStatusChange}/>

      {shouldShowMenu && (<MenuList 
        menuItems={orderedItems.length > 0 ? orderedItems : menuItems.map(item => ({...item, quantity: 0, total: 0}))}
        onOrderUpdate={onOrderUpdate} 
      />)}

      
      {shouldShowBill &&(
        <Bill 
          orderedItems={orderedItems} 
        />
      )}
    </div>
  );
};

export default TableDetail;