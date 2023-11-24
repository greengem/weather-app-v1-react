import { useState, useEffect } from 'react';
import { fetchCurrentWeatherData, fetchDailyForecast } from './utils/WeatherService';
import { WeatherData, CurrentWeatherData } from '../types/weatherTypes';
import { SearchParams } from '../types/searchTypes';
import { format } from 'date-fns';

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
      const [currentWeather, dailyForecast] = await Promise.all([
        fetchCurrentWeatherData(searchParams),
        fetchDailyForecast(searchParams)
      ]);
      
      setWeatherData({
        current: currentWeather.data[0],
        forecast: dailyForecast.data,
        usingMockData: false
      });
    } catch (error: any) {
      setWeatherData({
        current: mockWeatherData.current.data[0],
        forecast: mockWeatherData.daily.data,
        usingMockData: true
      });
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
    <div className="mx-auto max-w-screen-lg">
      {weatherData.usingMockData && <div className="mock-data-warning">Displaying Mock Data</div>}
      <div className='container mx-auto bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl sm:rounded-2xl mt-0 sm:mt-10'>
        <WeatherSearch onSearch={handleLocationSearch} />
        <CurrentWeatherHeader data={weatherData.current} />
        <div className='grid grid-cols-1 md:grid-cols-6'>
          <div className='px-4 pt-4 sm:px-10 sm:pt-10 dailyforecast-info col-span-2'>
            <WeatherDetails data={weatherData.current} />
          </div>
          <div className='col-span-4'>
            <WeeklyForecast data={weatherData.forecast} />
            <TodayHighlights data={weatherData.current} />
          </div>
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
    <div className='col-span-3 row-span-2 p-4 sm:p-10  dailyforecastsummary-info'>
      <h4 className='font-semibold text-lg mb-3'>Today's Highlights</h4>
      <div className='grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4'>
        <UVIndex data={data.uv} />
        <Wind data={data} />
        <SunriseSunset data={data} />
        <Humidity data={data.rh} />
        <Visibility data={data.vis} />
        <AirPollution data={data.aqi} />
      </div>
    </div>
  );
}

export default App
