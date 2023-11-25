import { ReactNode, FC } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ title, icon, children, className }) => {
  const defaultClasses = 'p-3 shadow-lg text-white rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 opacity-70';
  const combinedClasses = `${defaultClasses} ${className || ''}`.trim();

  return (
    <div className={combinedClasses}>
      {(icon || title) && (
        <div className="flex text-xs gap-1 text-blue-200 mb-3 justify-start items-center">
          {icon && <span>{icon}</span>}
          {title && <span className='uppercase font-semibold'>{title}</span>}
        </div>
      )}
      <div className='text-xs'>
        {children}
      </div>
    </div>
  );
};

export default Card;
