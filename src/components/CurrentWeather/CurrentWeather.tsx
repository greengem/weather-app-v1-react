interface CurrentWeatherProps {
  data: number;
}

function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
      <h1 className='font-semibold text-5xl tracking-tighter from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b mb-5'>{data}°C</h1>
  );
}

export default CurrentWeather;
