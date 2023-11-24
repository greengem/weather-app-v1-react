import { useState } from 'react';
interface WeatherSearchProps {
  onSearch: (searchTerm: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className='mb-5 text-black'>
      <label htmlFor="hs-trailing-button-add-on-with-icon" className="sr-only">Search for a city</label>
      <div className="flex rounded-md shadow-sm">
        <input 
          type="text" 
          id="hs-trailing-button-add-on-with-icon" 
          name="hs-trailing-button-add-on-with-icon" 
          className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
        />
        <button 
          type="button" 
          className="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] rounded-r-md border border-transparent font-semibold bg-pink-500 text-white hover:bg-pink-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm"
          onClick={handleSearchClick}
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WeatherSearch;
