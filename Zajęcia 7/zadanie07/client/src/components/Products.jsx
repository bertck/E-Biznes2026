import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Products</h2>
            <ul data-cy="product-list">
                {products.map((p) => (
                    <li key={p.id} data-cy="product-item">
                        <span data-cy="product-name">{p.name}</span> –{' '}
                        <span data-cy="product-price">{p.price}</span> zł{' '}
                        <button data-cy="add-to-cart-btn" onClick={() => addToCart(p)}>
                            Add to cart
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;