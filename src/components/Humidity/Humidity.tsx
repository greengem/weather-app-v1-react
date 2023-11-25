import { IconDroplets } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

interface HumidityProps {
  data: number;
}

function Humidity({ data }: HumidityProps) {
  return (
    <InfoBox title="Humidity" IconComponent={IconDroplets}>
      <p className='text-xl'>{data}%</p>
    </InfoBox>
  );
}

export default Humidity;
