import React, { ReactNode, FC } from 'react';

interface InfoBoxProps {
  title: string;
  IconComponent?: FC<React.SVGProps<SVGSVGElement>>;
  children: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, IconComponent, children }) => {
  return (
    <div className="mb-3">
      <h2 className='uppercase text-xs text-gray-500 flex gap-1 mb-1'>
        {IconComponent && <IconComponent height={16} width={16} />}
        {title}
      </h2>
      <div className='text-sm'>
        {children}
      </div>
    </div>
  );
}

export default InfoBox;
