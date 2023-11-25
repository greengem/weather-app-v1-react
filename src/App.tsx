import { useState, useEffect } from 'react';
import { fetchCurrentWeatherData, fetchDailyForecast } from './utils/WeatherService';
import { WeatherData, CurrentWeatherData } from '../types/weatherTypes';
import { SearchParams } from '../types/searchTypes';
import { format } from 'date-fns';

import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

import Wind from './components/Wind/Wind';
import Humidity from './components/Humidity/Humidity';
import Visibility from './components/Visibility/Visibility';
import UVIndex from './components/UV Index/UV Index';
import Rainfall from './components/Rainfall/Rainfall';
import Pressure from './components/Pressure/Pressure';
import FeelsLike from './components/FeelsLike/FeelsLike';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import SunriseSunset from './components/SunriseSunset/SunriseSunset';
import AirPollution from './components/AirPollution/AirPollution';

function getFormattedDate(): string {
  const today = new Date();
  return format(today, 'EEEE, d MMM');
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>({ current: null, forecast: null, usingMockData: false });

  const handleLocationSearch = (location: string) => {
    const searchParams: SearchParams = {};
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


  const fetchData = async (searchParams: SearchParams) => {
    try {
      const [currentWeatherResult, dailyForecastResult] = await Promise.all([
        fetchCurrentWeatherData(searchParams),
        fetchDailyForecast(searchParams)
      ]);
  
      setWeatherData({
        current: currentWeatherResult.data.data[0],
        forecast: dailyForecastResult.data.data,
        usingMockData: currentWeatherResult.isMock || dailyForecastResult.isMock
      });
    } catch (error: any) {
      // Handle unexpected errors
    }
  };
  
  
  

  useEffect(() => {
    const defaultLocation = { lat: 51.5074, lon: -0.1278 };
    fetchData(defaultLocation);
  }, []);
  

  if (!weatherData.current || !weatherData.forecast) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen w-100 text-white'>
      <nav className='nav bg-black px-5 py-3 text-white'>
        <WeatherSearch onSearch={handleLocationSearch} />
      </nav>
      {weatherData.usingMockData && <div className="bg-red-500 hidden text-xs rounded-md px-2 py-1 absolute top-5 right-5">Displaying Mock Data</div>}
      <div className='grid grid-cols-1 md:grid-cols-5'>
          <div className='px-4 pt-4 dailyforecast-info col-span-1'>
            <CurrentWeatherHeader data={weatherData.current} />
            <WeatherDetails data={weatherData.current} />
          </div>
          <div className='col-span-3'>
            <WeeklyForecast data={weatherData.forecast} />
          </div>
          <div className='col-span-1'>
            <TodayHighlights data={weatherData.current} />
          </div>
      </div>
    </div>
  );
}

function CurrentWeatherHeader({ data }: { data: CurrentWeatherData }) {
  return (
    <>
      <h1 className='font-semibold text-4xl mb-1'>{data.city_name}, {data.country_code}</h1>
      <p className='text-xs text-gray-400 mb-5'>{getFormattedDate()}</p>
    </>
  );
}

function WeatherDetails({ data }: { data: CurrentWeatherData }) {
  return (
    <>
      <CurrentWeather data={data.temp} />
      <div className='grid grid-cols-3 md:grid-cols-1'>
        <FeelsLike data={data.app_temp} />
        <Rainfall data={data.precip} />
        <Pressure data={data.pres} />
      </div>
    </>
  );
}

function TodayHighlights({ data }: { data: CurrentWeatherData }) {
  return (
    <div className='col-span-3 dailyforecastsummary-info p-5'>
        <UVIndex data={data.uv} />
        <Wind data={data} />
        <SunriseSunset data={data} />
        <Humidity data={data.rh} />
        <Visibility data={data.vis} />
        <AirPollution data={data.aqi} />
    </div>
  );
}

export default App
