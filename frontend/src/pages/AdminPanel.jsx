import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminPanel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'veg',
    image: ''
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        await api.put(`/menu/${editingItem._id}`, formData);
        alert('Item updated successfully!');
      } else {
        await api.post('/menu', formData);
        alert('Item added successfully!');
      }
      
      fetchMenuItems();
      resetForm();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/menu/${id}`);
        alert('Item deleted successfully!');
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'veg',
      image: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <h1>Admin Panel</h1>
        
        <div className="admin-actions">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Add New Item'}
          </button>
        </div>

        {showForm && (
          <div className="admin-form">
            <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="drinks">Drinks</option>
                  <option value="desserts">Desserts</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="menu-items-list">
          <h2>Menu Items</h2>
          <div className="items-grid">
            {menuItems.map(item => (
              <div key={item._id} className="admin-item-card">
                <img src={item.image || '/placeholder.jpg'} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">₹{item.price}</p>
                  <p className="category">{item.category}</p>
                </div>
                <div className="item-actions">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;