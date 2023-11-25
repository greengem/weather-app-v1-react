import Day from './Day';

interface DayData {
  min_temp: number;
  max_temp: number;
  valid_date: string;
  precip: number;
  wind_dir: number;
  wind_spd: number;
  weather: {
    icon: string;
  };
}

interface WeeklyForecastProps {
  data: DayData[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {

  return (
      <table className='min-w-full table-auto'>
        <tbody>
          {data.slice(0, 10).map((day, index) => (
            <Day day={day} isFirst={index === 0} key={day.valid_date} />
          ))}
        </tbody>
      </table>
  );
}

export default WeeklyForecast;
