import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
};

// Menu API
export const menuAPI = {
  getItems: () => api.get('/menu'),
  getItem: (id) => api.get(`/menu/${id}`),
  createItem: (itemData) => api.post('/menu', itemData),
  updateItem: (id, itemData) => api.put(`/menu/${id}`, itemData),
  deleteItem: (id) => api.delete(`/menu/${id}`),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
};

export default api;