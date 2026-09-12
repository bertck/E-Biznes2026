import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, total } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} – {item.price} zł
              </li>
            ))}
          </ul>
          <p>Total: {total.toFixed(2)} zł</p>
        </>
      )}
    </div>
  );
}

export default Cart;