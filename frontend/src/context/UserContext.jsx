import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadUserOrders(userData.email);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    loadUserOrders(userData.email);
  };

  const logout = () => {
    setUser(null);
    setUserOrders([]);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
  };

  const loadUserOrders = (userEmail) => {
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '{}');
    setUserOrders(allOrders[userEmail] || []);
  };

  const addOrder = (orderData) => {
    if (!user) return;
    
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toLocaleDateString(),
      ...orderData,
      status: 'Confirmed'
    };

    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '{}');
    if (!allOrders[user.email]) {
      allOrders[user.email] = [];
    }
    allOrders[user.email].unshift(newOrder);
    
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
    setUserOrders(allOrders[user.email]);
  };

  return (
    <UserContext.Provider value={{
      user,
      userOrders,
      login,
      logout,
      addOrder,
      isLoggedIn: !!user
    }}>
      {children}
    </UserContext.Provider>
  );
};