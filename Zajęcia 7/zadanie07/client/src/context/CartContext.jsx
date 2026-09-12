import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, clearCart, total }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}