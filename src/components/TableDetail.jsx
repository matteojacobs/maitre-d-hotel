import "../styles/TableDetail.css"

const TableStatus = ({ onStatusChange }) => {
  return (
    <button className="tableDetail__status--btn" onClick={onStatusChange}>Change status</button>
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
        <span className="menuItem__title">{emoji} {name} (€{price})</span>
        <span className="menuItem__amount">amount bought: {clickCount} </span>
      </button>
      {clickCount > 0 && (<button className="menuItem__button" onClick={handleMinus}>remove item</button>)}
      <span className="menuItem__totalPrice">Total price: €{totalPrice}</span>
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
    <div className="menuList">
      <ul className="menuList__items">
        {menuItems.map((item, index) => (
          <li className="menuList__item" key={index}>
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
      <div className="menuList__total">Total: €{total}</div>
    </div>
  );
};

const Bill = ({ orderedItems }) => {
  const total = orderedItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bill">
      <h3 className="bill__title">Bill</h3>
      <ul className="bill__items">
        {orderedItems.filter(item => item.quantity > 0).map((item, index) => (
          <li lassName="bill__item" key={index}>
            {item.name} - {item.quantity} x €{item.price} = €{item.total}
          </li>
        ))}
      </ul>
      <div lassName="bill__total">Total: €{total}</div>
    </div>
  );
};

const TableDetail = ({ number, status, onStatusChange, orderedItems, onOrderUpdate, menuItems }) => {
  

  const shouldShowMenu = ['seated', 'orderTaken', 'foodDelivered'].includes(status);
  const shouldShowBill = status === 'foodDelivered';

  return (
    <div className="tableDetails">
      <h4 className="tableDetails__title" >Table {number}</h4>
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