import { useAuth } from '../context/AuthContext';

const MenuCard = ({ item }) => {
  const { addToCart, user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(item);
  };

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />
      <div className="menu-card-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="price">${item.price.toFixed(2)}</div>
        <button onClick={handleAddToCart} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;