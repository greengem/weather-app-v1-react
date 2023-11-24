import React from 'react';
import * as d3 from 'd3';
import Day from './Day';
import TemperatureLine from './TemperatureLine';

function WeeklyForecast({ data }) {
  const yScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.min_temp) - 2, d3.max(data, d => d.max_temp) + 2])
    .range([150, 0]);

  const createLineGenerator = yValue => d3.line()
    .x((d, i) => i * (700/3))
    .y(d => yScale(d[yValue]))
    .curve(d3.curveMonotoneX);

  return (
    <div className="weeklyforecast-info relative">
      <div className="flex pt-4 px-4 sm:px-10 sm:pt-10 pb-0 mx-auto">
      {data.slice(0, 5).map((day, index) => (
        <Day day={day} isFirst={index === 0} key={day.valid_date} />
      ))}
        <TemperatureLine 
          maxTempPathData={createLineGenerator('max_temp')(data)} 
          minTempPathData={createLineGenerator('min_temp')(data)} 
        />
      </div>
    </div>
  );
}

export default WeeklyForecast;
