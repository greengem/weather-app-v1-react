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
         <div className='text-sm flex w-full justify-between py-2'>
            <div className='w-10'>
                {isFirst ? 'Today' : getDayOfWeek(day.valid_date)}
            </div>
            <img src={`https://cdn.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="Weather Icon" className='w-4 h-4' />
            <div>{day.min_temp}°C</div>
            <div>{day.max_temp}°C</div>
        </div>
    );
}

export default Day;
