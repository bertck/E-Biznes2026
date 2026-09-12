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
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} – {p.price} zł{' '}
                        <button onClick={() => addToCart(p)}>Add to cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;