import React from 'react';
import { IconSun } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

function UVIndex({ data }) {
  const roundedUV = Math.round(data);
  const uvPercentage = (roundedUV / 11) * 100;
  
  let riskLevel = '';
  if (roundedUV <= 2) riskLevel = 'Low';
  else if (roundedUV <= 5) riskLevel = 'Moderate';
  else if (roundedUV <= 7) riskLevel = 'High';
  else if (roundedUV <= 10) riskLevel = 'Very High';
  else riskLevel = 'Extreme';

  return (
    <InfoBox title="UV Index" IconComponent={IconSun}>
      <p className='text-2xl mb-2'>{roundedUV}  - {riskLevel}</p>
      <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
        <div 
          className="flex flex-col justify-center overflow-hidden bg-blue-500" 
          role="progressbar" 
          style={{ width: `${uvPercentage}%` }}
          aria-valuenow={roundedUV} 
          aria-valuemin="0" 
          aria-valuemax="11">
        </div>
      </div>
    </InfoBox>
  );
}

export default UVIndex;
