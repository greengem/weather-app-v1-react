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
    <>
    <nav className='nav bg-gray-900 border-b-2 border-gray-800 px-5 py-4 text-white shadow-md flex items-center justify-between'>
      <p className='tracking-tight font-semibold text-xl'>WeatherApp</p>
      <div className='flex gap-2'>
        <WeatherSearch onSearch={handleLocationSearch} />
      </div>
    </nav>
    <div className='h-100 w-100 text-white'>
      {weatherData.usingMockData && <div className="bg-red-500 hidden text-xs rounded-md px-2 py-1 absolute top-5 right-5">Displaying Mock Data</div>}
      <div className='grid grid-cols-1 lg:grid-cols-5 justify-center items-center'>
          <div className='p-3 lg:p-5 dailyforecast-info col-span-1 lg:text-right'>
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
    </>
  );
}

function CurrentWeatherHeader({ data }: { data: CurrentWeatherData }) {
  return (
    <>
      <h1 className='font-semibold text-4xl'>{data.city_name}</h1>
      <h1>{data.country_code}</h1>
      <p className='text-xs text-gray-500'>{getFormattedDate()}</p>
    </>
  );
}

function WeatherDetails({ data }: { data: CurrentWeatherData }) {
  return (
    <>
      <CurrentWeather data={data.temp} />
      <div className='grid grid-cols-3 lg:grid-cols-1'>
        <FeelsLike data={data.app_temp} />
        <Rainfall data={data.precip} />
        <Pressure data={data.pres} />
      </div>
    </>
  );
}

function TodayHighlights({ data }: { data: CurrentWeatherData }) {
  return (
    <div className='col-span-3 dailyforecastsummary-info p-3 lg:p-5'>
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
