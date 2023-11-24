interface FeelsLikeProps {
  data: number;
}

function FeelsLike({ data }: FeelsLikeProps) {
  return (
    <div className="feelslike-info todays-highlights-item mb-5">
      <h2 className='text-xs uppercase'>Feels Like</h2>
      <p>{data}°C</p>
    </div>
  );
}

export default FeelsLike;
