import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Payments from './components/Payments';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import OAuthSuccess from './components/OAuthSuccess';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <h1>Shop – Task 8</h1>
          <nav>
            <Link data-cy="nav-products" to="/">Products</Link> |{' '}
            <Link data-cy="nav-cart" to="/cart">Cart</Link> |{' '}
            <Link data-cy="nav-payments" to="/payments">Payments</Link> |{' '}
            <Link data-cy="nav-register" to="/register">Register</Link> |{' '}
            <Link data-cy="nav-login" to="/login">Login</Link>
          </nav>
          <hr />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;