import React from 'react';
import { IconSunrise } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

function SunriseSunset({ data }) {
  return (
    <InfoBox title="Sunrise & Sunset" IconComponent={IconSunrise}>
      <p>Sunrise: {data.sunrise}</p>
      <p>Sunset: {data.sunset}</p>
    </InfoBox>
  );
}


export default SunriseSunset;
