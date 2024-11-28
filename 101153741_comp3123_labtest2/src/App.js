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

      <div className="row mt-4 mb-5 w-100">
        {/* Left Column */}
        <div className="col-md-4 d-flex">
          <div className="card text-left p-4 w-100">
            <p className="card-text">Thursday</p>
            <p className="card-text">{() => {
              
            }}</p>
            <p className="card-text">Canada</p>
            <img className='w-50' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p className="card-text">{Math.round(weather.main.temp)}°C</p>
            <p className="card-text">{weather.weather[0].main}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-8 d-flex flex-column">
          {/* Current Weather */}
          <div className="card flex-fill p-4 mb-3">
            <h1 className="card-title mb-5">{weather.name}</h1>
            <p className="card-text"><strong><span className='float-start'>Temp</span></strong><span className='float-end'>{weather.main.temp}°C</span></p>
            <p className="card-text"><strong><span className='float-start'>Humidity</span></strong><span className='float-end'>{weather.main.humidity}%</span></p>
            <p className="card-text"><strong><span className='float-start'>Air Pressure</span></strong><span className='float-end'>{weather.main.pressure} mb</span></p>
            <p className="card-text"><strong><span className='float-start'>Max Temp</span></strong><span className='float-end'>{weather.main.temp_max}°C</span></p>
            <p className="card-text"><strong><span className='float-start'>Min Temp</span></strong><span className='float-end'>{weather.main.temp_min}°C</span></p>
          </div>

          {/* Weekly Forecast */}
          <div className="card p-4">
            <p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            </p>
            <p>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default App;
