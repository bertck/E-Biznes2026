import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Payments from './components/Payments';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <BrowserRouter>
      <div>
        <h1>Shop – Task 5</h1>
        <nav>
          <Link to="/">Products</Link> | <Link to="/cart">Cart</Link> |{' '}
          <Link to="/payments">Payments</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Products onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;