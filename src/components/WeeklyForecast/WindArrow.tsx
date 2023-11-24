interface WindArrowProps {
  direction: number;
}

const WindArrow: React.FC<WindArrowProps> = ({ direction }) => {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 16 16" 
      className="bi bi-arrow-up wind-direction-icon text-gray-400 inline w-4 h-4" 
      fill="currentColor"
      style={{ transform: `rotate(${direction}deg)` }}
    >
      <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
    </svg>
  );
}

export default WindArrow;
