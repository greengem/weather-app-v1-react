import * as d3 from 'd3';
import Day from './Day';
import TemperatureLine from './TemperatureLine';

// Make sure this interface matches with the one expected in Day.tsx
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
  const minTemp = d3.min(data, d => d.min_temp) ?? 0;
  const maxTemp = d3.max(data, d => d.max_temp) ?? 0;

  const yScale = d3.scaleLinear()
    .domain([minTemp - 2, maxTemp + 2])
    .range([150, 0]);

  const createLineGenerator = () => d3.line<[number, number]>()
    .x((_, i) => i * (700 / data.length))
    .y(d => yScale(d[1]))
    .curve(d3.curveMonotoneX);

  const maxTempLineGenerator = createLineGenerator();
  const minTempLineGenerator = createLineGenerator();

  const maxTempPathData = maxTempLineGenerator(data.map((d, i) => [i, d.max_temp])) || '';
  const minTempPathData = minTempLineGenerator(data.map((d, i) => [i, d.min_temp])) || '';

  return (
    <div className="weeklyforecast-info relative">
      <div className="flex pt-4 px-4 sm:px-10 sm:pt-10 pb-0 mx-auto">
        {data.slice(0, 5).map((day, index) => (
          <Day day={day} isFirst={index === 0} key={day.valid_date} />
        ))}
        <TemperatureLine 
          maxTempPathData={maxTempPathData} 
          minTempPathData={minTempPathData} 
        />
      </div>
    </div>
  );
}

export default WeeklyForecast;
