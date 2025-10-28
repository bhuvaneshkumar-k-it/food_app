import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUser } from '../context/UserContext';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [hotels, searchTerm, selectedCuisine]);

  const fetchHotels = async () => {
    try {
      const response = await api.get('/hotels');
      setHotels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setLoading(false);
    }
  };

  const filterHotels = () => {
    let filtered = hotels;

    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(hotel => hotel.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()));
    }

    setFilteredHotels(filtered);
  };

  if (loading) return <LoadingSpinner message="Loading restaurants..." />;

  return (
    <div className="home">
      <div className="container">
        <h1>Zwiggato Restaurants</h1>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Search restaurants or cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="category-select"
          >
            <option value="all">All Cuisines</option>
            <option value="south indian">South Indian</option>
            <option value="north indian">North Indian</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="fast food">Fast Food</option>
            <option value="desserts">Desserts & Bakery</option>
          </select>
        </div>

        <div className="hotels-grid">
          {filteredHotels.map(hotel => (
            <div key={hotel._id} className="hotel-card" onClick={() => {
              if (!isLoggedIn) {
                alert('Please login to browse restaurant menus!');
                navigate('/login');
                return;
              }
              navigate(`/hotel/${hotel._id}`);
            }}>
              <img src={hotel.image} alt={hotel.name} />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p className="cuisine">{hotel.cuisine}</p>
                <div className="hotel-meta">
                  <span className="rating">⭐ {hotel.rating}</span>
                  <span className="delivery-time">🕒 {hotel.deliveryTime}</span>
                </div>
                <p className="menu-count">{hotel.menuItems.length} items available</p>
                {!isLoggedIn && (
                  <div className="login-prompt">
                    <p style={{color: 'var(--secondary-magenta)', fontSize: '0.9rem', marginTop: '0.5rem'}}>Login to order</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="no-items">No restaurants found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default Home;