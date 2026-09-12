import { useState } from 'react';

function Payments() {
    const [cardName, setCardName] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payment = {
            productId: 1,
            amount: parseFloat(amount),
            cardName: cardName,
        };

        fetch('http://localhost:8080/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment),
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus('Payment sent successfully!');
            })
            .catch((err) => {
                setStatus('Error sending payment: ' + err.message);
            });
    };

    return (
        <div>
            <h2>Payments</h2>
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
                <div>
                    <label>Amount: </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Pay</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default Payments;