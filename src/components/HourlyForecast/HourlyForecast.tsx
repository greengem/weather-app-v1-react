interface HourlyForecastProps {
  data: string;
}

function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <div className="hourlyforecast-info">
      <h2>Hourly Forecast</h2>
      <p>{data}</p>
    </div>
  );
}

export default HourlyForecast;
