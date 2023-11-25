import { IconTrees } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

interface AirPollutionProps {
  data: number;
}

function AirPollution({ data }: AirPollutionProps) {
  return (
    <InfoBox title="Air Q" IconComponent={IconTrees}>
      <p className='text-xl'>{data}</p>
    </InfoBox>
  );
}

export default AirPollution;
