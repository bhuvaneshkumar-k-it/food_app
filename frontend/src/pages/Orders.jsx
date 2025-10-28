import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { userOrders, isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return (
      <div className="orders-page">
        <div className="container">
          <h1>My Orders</h1>
          <div className="no-orders">
            <p>Please <Link to="/login">login</Link> to view your orders.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        
        {userOrders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <Link to="/" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {userOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id.slice(-6)}</h3>
                  <span className="status confirmed">
                    {order.status}
                  </span>
                </div>
                
                <div className="order-details">
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p><strong>Items:</strong> {order.items.join(', ')}</p>
                  {order.deliveryInfo && (
                    <p><strong>Address:</strong> {order.deliveryInfo.address}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;