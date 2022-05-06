import { ChangeEvent } from 'react';

interface SidebarSearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const SidebarSearch = ({ query, setQuery }: SidebarSearchProps) => {
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className=''>
      <input
        value={query}
        onChange={onChange}
        className='w-full px-2 py-1 text-gray-100 bg-gray-600 rounded focus:outline-none'
        placeholder='Search...'
        type='search'
      ></input>
    </div>
  );
};

export default SidebarSearch;
