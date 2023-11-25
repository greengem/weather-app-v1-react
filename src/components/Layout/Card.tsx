import { ReactNode, FC } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  rows?: number;
  cols?: number;
}

const Card: FC<CardProps> = ({ title, icon, children, cols, rows }) => {
  return (
    <div className={`p-3 shadow-md bg-blue-700 text-white rounded-md col-span-${cols || 1} row-span-${rows || 1}`}>
      <div className="flex text-xs gap-1 text-blue-200 mb-2">
        <span>{icon}</span>
        <span className='uppercase font-semibold'>{title}</span>
      </div>
      <div className='text-xs'>
        {children}
      </div>
    </div>
  );
};

export default Card;
