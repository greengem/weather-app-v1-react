import { ReactNode, FC } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ title, icon, children, className }) => {
  const defaultClasses = 'p-3 shadow-md bg-blue-700 text-white rounded-md';
  const combinedClasses = `${defaultClasses} ${className || ''}`.trim();

  return (
    <div className={combinedClasses}>
      {(icon || title) && (
        <div className="flex text-xs gap-1 text-blue-200 mb-2">
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
