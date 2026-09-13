import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function OAuthSuccess() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const token = searchParams.get('token');
        const emailParam = searchParams.get('email');

        if (token && emailParam) {
            localStorage.setItem('sessionToken', token);
            localStorage.setItem('userEmail', emailParam);
            setEmail(emailParam);
        }
    }, [searchParams]);

    return (
        <div>
            <h2>Login successful</h2>
            {email ? (
                <p data-cy="oauth-success-message">Logged in as {email}</p>
            ) : (
                <p>Missing login data.</p>
            )}
        </div>
    );
}

export default OAuthSuccess;