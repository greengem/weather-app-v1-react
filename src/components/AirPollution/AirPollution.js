import React from 'react';
import { IconTrees } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

function AirPollution({ data }) {
  return (
    <InfoBox title="Air Q" IconComponent={IconTrees}>
      <p className='text-4xl'>{data}</p>
    </InfoBox>
  );
}

export default AirPollution;
