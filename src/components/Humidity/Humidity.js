import React from 'react';
import { IconDroplets } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

function Humidity({ data }) {
  return (
    <InfoBox title="Humidity" IconComponent={IconDroplets}>
      <p className='text-4xl'>{data}%</p>
    </InfoBox>
  );
}

export default Humidity;
