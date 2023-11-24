interface RainfallProps {
  data: number;
}

function Rainfall({ data }: RainfallProps) {
  return (
    <div className="rainfall-info todays-highlights-item mb-5">
      <h2 className='uppercase text-xs'>Rainfall</h2>
      <p>{data} mm</p>
    </div>
  );
}

export default Rainfall;
