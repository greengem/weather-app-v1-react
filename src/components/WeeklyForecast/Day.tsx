import { format } from 'date-fns';

interface DayData {
    valid_date: string;
    max_temp: number;
    min_temp: number;
    precip: number;
    wind_dir: number;
    wind_spd: number;
    weather: {
      icon: string;
    };
  }
  
  interface DayProps {
    day: DayData;
    isFirst: boolean;
  }

  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'eee');
}

const Day: React.FC<DayProps> = ({ day, isFirst }) => {

    return (
      <tr className='text-sm font-semibold'>
        <td className='w-1/4 pr-4 py-2'>{isFirst ? 'Today' : getDayOfWeek(day.valid_date)}</td>
        <td className='w-1/4 px-4 py-2'><img src={`https://cdn.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="Weather Icon" className='w-5 h-5' /></td>
        <td className='w-1/4 px-4 py-2'>{day.min_temp}°C</td>
        <td className='w-1/4 pl-4 py-2 text-right'>{day.max_temp}°C</td>
      </tr>
    );
}

export default Day;
