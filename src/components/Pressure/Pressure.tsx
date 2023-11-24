interface PressureProps {
  data: number;
}

function Pressure({ data }: PressureProps) {
  return (
    <div className="pressure-info todays-highlights-item">
      <h2 className='uppercase text-xs'>Pressure</h2>
      <p className='mb-5'>{data} hPa</p>
    </div>
  );
}

export default Pressure;
