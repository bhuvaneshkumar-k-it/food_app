import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Hotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    fetchHotel();
  }, [id]);

  useEffect(() => {
    if (hotel) {
      filterItems();
    }
  }, [hotel, selectedCategory]);

  const fetchHotel = async () => {
    try {
      const response = await api.get(`/hotels/${id}`);
      setHotel(response.data);
      setFilteredItems(response.data.menuItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = hotel.menuItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  };

  const updateQuantity = (itemId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }));
  };

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart!');
      navigate('/login');
      return;
    }
    const quantity = quantities[item._id] || 1;
    addToCart(item, quantity);
    alert(`${quantity} ${item.name}(s) added to cart!`);
    setQuantities(prev => ({ ...prev, [item._id]: 0 }));
  };

  if (loading) return <div className="loading">Loading restaurant...</div>;
  if (!hotel) return <div className="error">Restaurant not found</div>;

  return (
    <div className="hotel-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Restaurants
        </button>
        
        <div className="hotel-header">
          <img src={hotel.image} alt={hotel.name} className="hotel-banner" />
          <div className="hotel-details">
            <h1>{hotel.name}</h1>
            <p className="cuisine">{hotel.cuisine}</p>
            <div className="hotel-meta">
              <span className="rating">⭐ {hotel.rating}</span>
              <span className="delivery-time">🕒 {hotel.deliveryTime}</span>
            </div>
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-filters">
            <h2>Menu</h2>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="all">All Items</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="drinks">Drinks</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item._id} className="menu-card">
                <img src={item.image} alt={item.name} />
                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <div className="card-footer">
                    <span className="price">₹{item.price}</span>
                    <div className="card-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item._id, (quantities[item._id] || 0) - 1)}
                          className="qty-btn"
                          disabled={(quantities[item._id] || 0) <= 0}
                        >
                          -
                        </button>
                        <span className="quantity">{quantities[item._id] || 0}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, (quantities[item._id] || 0) + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                      {(quantities[item._id] || 0) > 0 && (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="btn btn-primary"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="no-items">No items found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotel;