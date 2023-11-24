import React, { ReactNode, FC } from 'react';

interface InfoBoxProps {
  title: string;
  IconComponent?: FC<React.SVGProps<SVGSVGElement>>;
  children: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, IconComponent, children }) => {
  return (
    <div className="bg-gray-800 rounded-2xl relative min-h-140 shadow-xl">
      <h2 className='uppercase text-xs text-gray-500 mb-3 px-5 pt-5'>
        {IconComponent && <IconComponent height={16} width={16} className='mr-1 inline' />}
        {title}
      </h2>
      <div className='absolute bottom-0 left-0 right-0 text-sm'>
        <div className='w-full p-5'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
