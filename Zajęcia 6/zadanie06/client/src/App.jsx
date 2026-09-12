import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Payments from './components/Payments';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <h1>Shop – Task 5</h1>
          <nav>
            <Link data-cy="nav-products" to="/">Products</Link> |{' '}
            <Link data-cy="nav-cart" to="/cart">Cart</Link> |{' '}
            <Link data-cy="nav-payments" to="/payments">Payments</Link>
          </nav>
          <hr />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;