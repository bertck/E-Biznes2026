import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, total } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p data-cy="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <ul data-cy="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} data-cy="cart-item">
                {item.name} – {item.price} zł
              </li>
            ))}
          </ul>
          <p data-cy="cart-total">Total: {total.toFixed(2)} zł</p>
        </>
      )}
    </div>
  );
}

export default Cart;