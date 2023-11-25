interface TemperatureLineProps {
  maxTempPathData: string;
  minTempPathData: string;
}

const TemperatureLine: React.FC<TemperatureLineProps> = ({ maxTempPathData, minTempPathData }) => {
  return (
    <svg style={{ top: "155px" }} className="absolute left-0 w-full" viewBox="0 0 461 150" preserveAspectRatio="none">
      <defs>
        <linearGradient id="maxTempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9d728" />
          <stop offset="100%" stopColor="#ff3a66" />
        </linearGradient>
        <linearGradient id="minTempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#20d092" />
          <stop offset="100%" stopColor="#2f91ff" />
        </linearGradient>
      </defs>
      <path d={maxTempPathData} fill="none" stroke="url(#maxTempGradient)" strokeWidth="4" />
      <path d={minTempPathData} fill="none" stroke="url(#minTempGradient)" strokeWidth="4" /> {/* Corrected this line */}
    </svg>
  );
}

export default TemperatureLine;
