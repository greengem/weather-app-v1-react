import { IconEye } from '@tabler/icons-react';
import InfoBox from '../Layout/InfoBox';

interface VisibilityProps {
  data: number;
}

function Visibility({ data }: VisibilityProps) {
  return (
    <InfoBox title="Visibility" IconComponent={IconEye}>
      <p className='text-xl'>{data} mi</p>
    </InfoBox>
  );
}

export default Visibility;
