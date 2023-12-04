import React, { useState, useEffect } from 'react';
import { fetchCurrentWeatherData, fetchDailyForecast } from './utils/WeatherService';
import mockWeatherData from './utils/mockData';

import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import Wind from './components/Wind/Wind';
import Humidity from './components/Humidity/Humidity';
import Visibility from './components/Visibility/Visibility';
import UVIndex from './components/UV Index/UV Index';
import Rainfall from './components/Rainfall/Rainfall';
import Pressure from './components/Pressure/Pressure';
import FeelsLike from './components/FeelsLike/FeelsLike';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import SunriseSunset from './components/SunriseSunset/SunriseSunset';
import AirPollution from './components/AirPollution/AirPollution';

function getFormattedDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const today = new Date();
  
  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const date = today.getDate();
  
  return `${dayName}, ${date} ${monthName}`;
}


function App() {
  const [weatherData, setWeatherData] = useState({ current: null, forecast: null, usingMockData: false });

  const handleLocationSearch = (location) => {
    const searchParams = {};
    if (location.includes(',')) {
      const [city, state, country] = location.split(',').map(param => param.trim());
      searchParams.city = city;
      if (state) searchParams.state = state;
      if (country) searchParams.country = country;
    } else {
      searchParams.city = location.trim();
    }
    fetchData(searchParams);
  }

  const fetchData = async (searchParams) => {
    try {
      const [currentWeather, dailyForecast] = await Promise.all([
        fetchCurrentWeatherData(searchParams),
        fetchDailyForecast(searchParams)
      ]);
      
      setWeatherData({
        current: currentWeather.data[0],
        forecast: dailyForecast.data,
        usingMockData: false
      });
    } catch (error) {
      setWeatherData({
        current: mockWeatherData.current.data[0],
        forecast: mockWeatherData.forecast.data,
        usingMockData: true
      });
    }
  };

  useEffect(() => {
    fetchData({ lat: 51.5074, lon: -0.1278 });
  }, []);

  if (!weatherData.current || !weatherData.forecast) return <div>Loading...</div>;

  return (
    <div className="App mx-auto max-w-screen-lg">
      {weatherData.usingMockData && <div className="mock-data-warning">Displaying Mock Data</div>}
      <div className='container mx-auto bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl sm:rounded-2xl mt-0 sm:mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-6'>
          <div className='px-4 pt-4 sm:px-10 sm:pt-10 dailyforecast-info col-span-2' >
          <WeatherSearch onSearch={handleLocationSearch} />
            <h1 className='font-semibold text-4xl mb-1 '>{weatherData.current.city_name}, {weatherData.current.country_code}</h1>
            <p className='text-xs text-gray-400 mb-5'>{getFormattedDate()}</p>
            <CurrentWeather data={weatherData.current.temp} />
            <div className='grid grid-cols-3 lg:grid-cols-1'>
            <FeelsLike data={weatherData.current.app_temp} />
            <Rainfall data={weatherData.current.precip} />
            <Pressure data={weatherData.current.pres} />
            </div>
        </div>
        <div className='col-span-4'>
          <WeeklyForecast data={weatherData.forecast} />
          <div className='col-span-3 row-span-2 p-4 sm:p-10  dailyforecastsummary-info'>
                <h4 className='font-semibold text-lg mb-3'>Today's Highlights</h4>
                <div className='grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4'>
                  <UVIndex data={weatherData.current.uv} />
                  <Wind data={weatherData.current} />
                  <SunriseSunset data={weatherData.current} />
                  <Humidity data={weatherData.current.rh} />
                  <Visibility data={weatherData.current.vis} />
                  <AirPollution data={weatherData.current.aqi} />
                </div>
              </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
