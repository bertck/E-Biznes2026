const BACKEND_URL = "https://zadanie10-backend-bl.azurewebsites.net";

async function getWeather() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = "Ładowanie...";
    try {
        const res = await fetch(`${BACKEND_URL}/weather`);
        const data = await res.json();
        resultDiv.textContent = `Temperatura: ${data.temperature}°C, wiatr: ${data.windspeed} km/h`;
    } catch (err) {
        resultDiv.textContent = "Błąd pobierania pogody";
    }
}