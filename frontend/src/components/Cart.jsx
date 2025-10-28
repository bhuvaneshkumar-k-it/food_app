import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image || '/placeholder.jpg'} alt={item.name} />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                ₹{item.price * item.quantity}
              </div>
              
              <button 
                onClick={() => removeFromCart(item._id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="total">
            <h3>Total: ₹{getCartTotal()}</h3>
          </div>
          
          <div className="cart-actions">
            <button onClick={clearCart} className="btn btn-secondary">
              Clear Cart
            </button>
            <button 
              onClick={() => {
                if (!isLoggedIn) {
                  alert('Please login to proceed to checkout!');
                  navigate('/login');
                  return;
                }
                navigate('/checkout');
              }}
              className="btn btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;