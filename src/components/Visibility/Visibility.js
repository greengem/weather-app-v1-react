import React from 'react';
import { IconEye } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

function Visibility({ data }) {
  return (
    <InfoBox title="Visibility" IconComponent={IconEye}>
      <p className='text-4xl'>{data} mi</p>
    </InfoBox>
  );
}

export default Visibility;
