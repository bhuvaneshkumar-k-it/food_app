import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { user, isLoggedIn, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const cartCount = getCartItemsCount();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Food App
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
          
          <Link to="/cart" className="cart-link">
            🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          
          {isLoggedIn ? (
            <div className="user-dropdown">
              <button 
                className="user-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                👤 {user?.name || 'User'}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={logout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;