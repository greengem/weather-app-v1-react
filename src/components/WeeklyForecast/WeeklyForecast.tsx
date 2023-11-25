import * as d3 from 'd3';
import Day from './Day';
import TemperatureLine from './TemperatureLine';

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

  const padding = 10;
  const yScale = d3.scaleLinear()
    .domain([minTemp - padding, maxTemp + padding])
    .range([150, 0]);
  


    const totalWidth = 461;
    const createLineGenerator = () => d3.line<[number, number]>()
      .x((_, i) => i * (totalWidth / (data.length - 1)))
      .y(d => yScale(d[1]))
      .curve(d3.curveMonotoneX);
    
    



  const maxTempLineGenerator = createLineGenerator();
  const minTempLineGenerator = createLineGenerator();

  const maxTempPathData = maxTempLineGenerator(data.map((d, i) => [i, d.max_temp])) || '';
  const minTempPathData = minTempLineGenerator(data.map((d, i) => [i, d.min_temp])) || '';

  return (
    <div className='overflow-x-scroll no-scrollbar p-5'>
    <div className="w-[461px] weeklyforecast-info relative mx-auto">
      <div className="grid grid-cols-6">
        {data.slice(0, 6).map((day, index) => (
          <Day day={day} isFirst={index === 0} key={day.valid_date} />
        ))}
        <TemperatureLine 
          maxTempPathData={maxTempPathData} 
          minTempPathData={minTempPathData} 
        />
      </div>
    </div>
    </div>
  );
}

export default WeeklyForecast;
