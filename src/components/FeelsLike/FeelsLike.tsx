import React from 'react';

function FeelsLike({ data }) {
  return (
    <div className="feelslike-info todays-highlights-item mb-5">
      <h2 className='text-xs uppercase'>Feels Like</h2>
      <p>{data}°C</p>
    </div>
  );
}

export default FeelsLike;
