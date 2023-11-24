import { IconWind } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

interface WindProps {
  data: {
    wind_spd: number;
    wind_cdir: string;
    wind_dir: number;
  };
}

function Wind({ data }: WindProps) {
  return (
    <InfoBox title="Wind" IconComponent={IconWind}>
      <p>Speed: {data.wind_spd} m/s</p>
      <p>Direction: {data.wind_cdir} ({data.wind_dir}°)</p>
    </InfoBox>
  );
}

export default Wind;
