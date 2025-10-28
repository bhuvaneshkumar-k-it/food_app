import { Routes, Route } from 'react-router-dom';
import './simple-styles.css';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Product from './pages/Product';
import Hotel from './pages/Hotel';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
            <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;