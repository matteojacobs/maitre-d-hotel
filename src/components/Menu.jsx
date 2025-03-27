import React, { useState } from 'react';

const menuData = {
  starters: [
    { id: 1, name: 'Bruschetta', price: 5.99 },
    { id: 2, name: 'Soup of the Day', price: 4.99 },
  ],
  mainCourse: [
    { id: 3, name: 'Steak', price: 15.99 },
    { id: 4, name: 'Pasta', price: 12.99 },
  ],
  desserts: [
    { id: 5, name: 'Cheesecake', price: 6.99 },
    { id: 6, name: 'Ice Cream', price: 4.99 },
  ],
  drinks: [
    { id: 7, name: 'Water', price: 1.99 },
    { id: 8, name: 'Wine', price: 8.99 },
  ],
};

function Menu({ tableId }) {
  const [activeTab, setActiveTab] = useState('starters');
  const [orders, setOrders] = useState([]);

  const addToOrder = (item) => {
    const existingOrder = orders.find((order) => order.id === item.id);
    if (existingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === item.id ? { ...order, quantity: order.quantity + 1 } : order
        )
      );
    } else {
      setOrders([...orders, { ...item, quantity: 1, comments: '' }]);
    }
  };

  const updateComment = (id, comment) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, comments: comment } : order
      )
    );
  };

  return (
    <div>
      <h2>Menu for Table {tableId}</h2>
      <div>
        <button onClick={() => setActiveTab('starters')}>Starters</button>
        <button onClick={() => setActiveTab('mainCourse')}>Main Course</button>
        <button onClick={() => setActiveTab('desserts')}>Desserts</button>
        <button onClick={() => setActiveTab('drinks')}>Drinks</button>
      </div>
      <div>
        {menuData[activeTab].map((item) => (
          <div key={item.id}>
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => addToOrder(item)}>Add to Order</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Order Summary</h3>
        {orders.map((order) => (
          <div key={order.id}>
            <span>
              {order.name} (x{order.quantity}) - ${order.price * order.quantity}
            </span>
            <input
              type="text"
              value={order.comments}
              onChange={(e) => updateComment(order.id, e.target.value)}
              placeholder="Add comment"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;