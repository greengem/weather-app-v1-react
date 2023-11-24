function CurrentWeather({ data }) {
  return (
    <div className="currentweather-info mb-10">
      <h1 className='font-semibold text-5xl tracking-tight from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b'>{data}°C</h1>
    </div>
  );
}

export default CurrentWeather;
