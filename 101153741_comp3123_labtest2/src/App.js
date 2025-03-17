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
      <div className='container mt-5 text-center'>
        <h1 className='text-light'>Loading...</h1>
      </div>
    )
  }

  const getWeekDay = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
  }

  return (
    <div className="container pt-5">
      <SearchBar onSearch={fetchWeather} />

      <div className="row mt-4 mb-5 align-items-stretch">
        {/* Left Column */}
        <div className="col-md-4 d-flex">
          <div className="card bg-transparent border-light text-left p-4 w-100 d-flex flex-column justify-content-between">

            <div>
              <p className="card-text text-light">{getWeekDay()}</p>
              <p className="card-text text-light">{getDate()}</p>
            </div>
            
            <div className=''>
              <img className='w-50' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              <p className="card-text text-light">{Math.round(weather.main.temp)}°C</p>
              <p className="card-text text-light">{weather.weather[0].main}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-8 d-flex flex-column">
          {/* Current Weather */}
          <div className="card bg-transparent border-light flex-fill p-4 mb-3">
            <h1 className="card-title text-light ps-3 mb-5">{weather.name}, {weather.sys.country}</h1>
            <p className="card-text text-light"><strong><span className='float-start'>Temp</span></strong><span className='float-end'>{weather.main.temp}°C</span></p>
            <p className="card-text text-light"><strong><span className='float-start'>Humidity</span></strong><span className='float-end'>{weather.main.humidity}%</span></p>
            <p className="card-text text-light"><strong><span className='float-start'>Air Pressure</span></strong><span className='float-end'>{weather.main.pressure} mb</span></p>
            <p className="card-text text-light"><strong><span className='float-start'>Max Temp</span></strong><span className='float-end'>{weather.main.temp_max}°C</span></p>
            <p className="card-text text-light"><strong><span className='float-start'>Min Temp</span></strong><span className='float-end'>{weather.main.temp_min}°C</span></p>
          </div>

          {/* Weekly Forecast */}
          <div className="card bg-transparent border-light p-4">
            {/* <p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              <img src={`http://openweathermap.org/img/wn/${weather.weather[1].icon}@2x.png`} />
              <img src={`http://openweathermap.org/img/wn/${weather.weather[2].icon}@2x.png`} />
              <img src={`http://openweathermap.org/img/wn/${weather.weather[3].icon}@2x.png`} />
              <img src={`http://openweathermap.org/img/wn/${weather.weather[4].icon}@2x.png`} />
            </p>
            <p>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
            </p> */}
            <div className='text-center'>
              <h2 className='card-title text-light pt-3'>
                Weekly Forecast
              </h2>
              <p className='card-text text-light pb-4'>
                Coming Soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default App;
