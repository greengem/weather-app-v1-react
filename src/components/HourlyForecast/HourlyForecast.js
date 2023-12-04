import React from 'react';

function HourlyForecast({ data }) {
  return (
    <div className="hourlyforecast-info">
      <h2>Hourly Forecast</h2>
      <p>{data}</p>
    </div>
  );
}

export default HourlyForecast;
