import { useState, useEffect } from 'react';
import { fetchCurrentWeatherData, fetchDailyForecast, fetchHourlyForecast } from './utils/WeatherService';
import { WeatherData, CurrentWeatherData } from '../types/weatherTypes';
import { SearchParams } from '../types/searchTypes';

import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import UVIndex from './components/UV Index/UV Index';
import Card from './components/Layout/Card';
import { IconCalendar, IconDiamond, IconDropletFilled, IconEye, IconGrain, IconSun, IconSunrise, IconTemperature, IconUmbrella, IconWind } from '@tabler/icons-react';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>({ current: null, forecast: null, usingMockData: false, hourly: null });

  const fetchData = async (searchParams: SearchParams) => {
    try {
      const [currentWeatherResult, dailyForecastResult, hourlyForecastResult] = await Promise.all([
        fetchCurrentWeatherData(searchParams),
        fetchDailyForecast(searchParams),
        fetchHourlyForecast(searchParams)
      ]);
  
      setWeatherData({
        current: currentWeatherResult.data.data[0],
        forecast: dailyForecastResult.data.data,
        hourly: hourlyForecastResult.data.data,
        usingMockData: currentWeatherResult.isMock || dailyForecastResult.isMock || hourlyForecastResult.isMock
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
      <div className='h-100 w-100 text-white'>
        <CurrentWeatherHeader data={weatherData.current} />
        <div className='
          max-w-screen-xl mx-auto
          grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 
          p-4 md:p-5 
          gap-4 md:gap-5
        '>
          <Card title='Daily weatehr overview text' icon={<IconSun size={16} />} className='md:col-span-4'>
            <HourlyForecast data={weatherData.hourly} />
          </Card>
          <Card title='Precipitation' icon={<IconUmbrella size={16} />} className='md:row-span-2 md:col-span-2'>
              PRECIP MAP
          </Card>
          <Card title='10-Day Forecast' icon={<IconCalendar size={16} />} className='md:row-span-3 md:col-span-2'>
            <WeeklyForecast data={weatherData.forecast} />
          </Card>
          <Card title='Air Pollution' icon={<IconGrain size={16} />} className='md:col-span-2'>
            <p className='text-xl'>{weatherData.current.aqi}</p>
          </Card>
          <Card title='UV Index' icon={<IconSun size={16} />}>
            <UVIndex data={weatherData.current.uv} />
          </Card>
          <Card title='Sunset' icon={<IconSunrise size={12} />}>
            <p>Sunrise: {weatherData.current.sunrise}</p>
            <p>Sunset: {weatherData.current.sunset}</p>
          </Card>
          <Card title='Wind' icon={<IconWind size={16} />}>
            <p>Speed: {weatherData.current.wind_spd} m/s</p>
            <p>Direction: {weatherData.current.wind_dir}°</p>
          </Card>
          <Card title='Precipitation' icon={<IconDropletFilled size={16} />}>
            <p>{weatherData.current.precip} mm</p>
          </Card>
          <Card title='Feels Like' icon={<IconTemperature size={16} />}>
            {weatherData.current.app_temp}°C
          </Card>
          <Card title='Humidity' icon={<IconTemperature size={16} />}>
            <p>{weatherData.current.rh}%</p>
          </Card>
          <Card title='Visibility' icon={<IconEye size={16} />}>
            <p>{weatherData.current.vis} mi</p>
          </Card>
          <Card title='Pressure' icon={<IconDiamond size={16} />}>
            <p>{weatherData.current.pres} hPa</p>
          </Card>
        </div>
      </div>
    </>
  );
}

function CurrentWeatherHeader({ data }: { data: CurrentWeatherData }) {
  return (
    <div className='text-center mt-10'>
      <h1 className='text-3xl tracking-tight mb-3'>{data.city_name}, {data.country_code}</h1>
      <h1 className='text-5xl tracking-tight mb-5'>{data.temp}°C</h1>
      <p>Sunny</p>
      <p>H:6° L:1°</p>
    </div>
  );
}

export default App
