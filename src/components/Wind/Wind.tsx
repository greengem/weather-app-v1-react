import React from 'react';
import { IconWind } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

function Wind({ data }) {
  return (
    <InfoBox title="Wind" IconComponent={IconWind}>
      <p>Speed: {data.wind_spd} m/s</p>
      <p>Direction: {data.wind_cdir} ({data.wind_dir}°)</p>
    </InfoBox>
  );
}

export default Wind;
