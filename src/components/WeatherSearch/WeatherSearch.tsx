import { useState } from 'react';
import { IconLocation, IconSearch } from '@tabler/icons-react';

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
    <>
      <label htmlFor="hs-trailing-button-add-on-with-icon" className="sr-only">Search for a city</label>
      <div className="flex rounded-md">
        <input 
          type="text" 
          id="hs-trailing-button-add-on-with-icon" 
          name="hs-trailing-button-add-on-with-icon" 
          className="py-2 px-4 block rounded-l-md text-xs text-gray-800 w-[120px]" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
        />
        <button 
          type="button" 
          className="inline-flex flex-shrink-0 justify-center items-center rounded-r-md border border-transparent bg-purple-500 text-xs px-3"
          onClick={handleSearchClick}
        ><IconSearch size={16} />
        </button>
      </div>
      <button className='bg-purple-500 px-3 rounded-md text-xs'><IconLocation size={16} /></button>
    </>
  );
}

export default WeatherSearch;
