interface PressureProps {
  data: number;
}

function Pressure({ data }: PressureProps) {
  return (
    <div className="pressure-info todays-highlights-item">
      <h2 className='uppercase text-xs'>Pressure</h2>
      <p>{data} hPa</p>
    </div>
  );
}

export default Pressure;
