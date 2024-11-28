import axios from 'axios';

const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f6250545fce3e2537dc778b120f4e51b';

const api = axios.create({
    baseURL: openWeatherUrl,
    timeout: 5000,
});

const getWeatherData = async (city = 'Toronto') => {
    try {
        const response = await getCityData(city);
        return response.data;
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        return null;
    }
}

// API call to retrieve weather data for specific city, w/ metric units
const getCityData = (city) => api.get(`?q=${city}&units=metric&appid=${apiKey}`);

export default getWeatherData;