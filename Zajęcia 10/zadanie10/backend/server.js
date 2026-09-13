const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/weather', async (req, res) => {
    const lat = req.query.lat || 50.06; // domyślnie Kraków
    const lon = req.query.lon || 19.94;
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data.current_weather);
    } catch (err) {
        res.status(500).json({ error: 'Nie udało się pobrać pogody' });
    }
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Backend działa na porcie ${PORT}`));