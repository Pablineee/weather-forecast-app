import { useState, useEffect } from 'react';
import getWeatherData from './weatherApi';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
  const [ weather, setWeather ] = useState(null);   // State to hold weather data

  const fetchWeather = async (city) => {
    const data = await getWeatherData(city); // Fetch weather data for Toronto, by default
    if (data) {
      setWeather(data);
    } else {
      console.error('An error occurred. Please try again.');
    }
  }

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const data = await getWeatherData('Toronto'); // Fetch weather data for Toronto, by default
      if (data) {
        setWeather(data);
      } else {
        console.error('An error occurred. Please try again.');
      }
    }
    fetchDefaultWeather();
  }, []);

  if (!weather) {
    return (
      <div className='Loading'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <SearchBar onSearch={fetchWeather} />

      {/* Day Forecast Visual Display */}
      <div>

      </div>

      <div className='card ps-5 pb-5 pt-4'>
        <h1 className='mt-4 mb-5'>{weather.name}</h1>
        <p className='WeatherDataItem'><strong>Temp </strong><span className='float-end me-5'>{weather.main.temp}°C</span></p>
        <p className='WeatherDataItem'><strong>Humidity </strong><span className='float-end me-5'>{weather.main.humidity}%</span></p>
        <p className='WeatherDataItem'><strong>Air Pressure </strong><span className='float-end me-5'>{weather.main.pressure} mb</span></p>
        <p className='WeatherDataItem'><strong>Max Temp </strong><span className='float-end me-5'>{weather.main.temp_max}°C</span></p>
        <p className='WeatherDataItem'><strong>Min Temp </strong><span className='float-end me-5'>{weather.main.temp_min}°C</span></p>
      </div>

      <div>{/* Weekly Forecast */}

      </div>
    </div>
    
  );
};

export default App;
