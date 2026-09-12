import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Payments() {
    const { total, clearCart } = useCart();
    const [cardName, setCardName] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payment = {
            amount: total,
            cardName: cardName,
        };

        fetch('http://localhost:8080/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment),
        })
            .then((res) => res.json())
            .then(() => {
                setStatus('Payment sent successfully!');
                clearCart();
            })
            .catch((err) => {
                setStatus('Error sending payment: ' + err.message);
            });
    };

    return (
        <div>
            <h2>Payments</h2>
            <p>Amount to pay: {total.toFixed(2)} zł</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name on card: </label>
                    <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={total === 0}>
                    Pay
                </button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default Payments;