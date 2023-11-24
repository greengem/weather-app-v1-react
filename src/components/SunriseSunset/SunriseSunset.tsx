import { IconSunrise } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

interface SunriseSunsetProps {
  data: {
    sunrise: string;
    sunset: string;
  };
}

function SunriseSunset({ data }: SunriseSunsetProps) {
  return (
    <InfoBox title="Sunrise & Sunset" IconComponent={IconSunrise}>
      <p>Sunrise: {data.sunrise}</p>
      <p>Sunset: {data.sunset}</p>
    </InfoBox>
  );
}

export default SunriseSunset;
