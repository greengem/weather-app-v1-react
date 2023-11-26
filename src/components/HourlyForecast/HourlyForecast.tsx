import Hour from "./Hour";

interface HourData {
  timestamp_local: string;
  temp: number;
  weather: {
      icon: string;
  };
}


interface HourlyForecastProps {
  data: HourData[] | null;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  if (!data) {
    return <div>No hourly data available.</div>;
  }

  return (
    <div className="flex overflow-x-scroll no-scrollbar gap-5">
      {data.map((hour, index) => (
        <Hour key={index} hour={hour} />
      ))}
    </div>
  );
};

export default HourlyForecast;
